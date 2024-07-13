import { ReactNode, useState } from "react";
import logo from "../../assets/images/logo text.png";
import {
  FilledButton,
  Input,
  LogoutButton,
  MDiv,
  OutlinedButton,
  SubTitle,
  Title,
} from "../../comps/comps";
import { ErrorIcon, LoadingIcon } from "../../comps/icons";
import ReactCountryFlag from "react-country-flag";
import {
  ErrorMessage,
  FileInput,
  Labeled,
  SearchSelect,
} from "../../comps/form_comps";
import { COUNTRIES } from "../../assets/data/countries";
import { CITIES } from "../../assets/data/cities";
import {
  PersonalInformationForm,
  PersonalInformationFormInterface,
} from "./personal_information";
import {
  BacInformationFormInterface,
  BacInformationsForm,
  FinalInformationsForm,
} from "./rest_informations";
import { RegisterDataInterface, ValidationPage } from "./validation_page";
import axios from "axios";
import { rootUrl } from "../../constants";

type PageStep =
  | "personal_informations"
  | "bac_informations"
  | "final_informations"
  | "validation"
  | "done";

export function PreInscriptionPage() {
  const [step, setStep] = useState<PageStep>("personal_informations");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didAcceptTerms, setDidAcceptTerms] = useState(false);

  const [formData, setFormData] = useState<PersonalInformationFormInterface>({
    first_name: "",
    last_name: "",
    cin: "",
    cinFile: null,
    nationality: "",
    city: "",
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
    profile_picture: null,
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    cin: "",
    cinFile: "",
    nationality: "",
    city: "",
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
    profile_picture: "",
  });

  const [bacFormData, setBacFormData] = useState<BacInformationFormInterface>({
    codeMassar: "",
    bac_type: "",
    bac_year: "",
    bac_note: "",
    condidatureFile: null,
  });

  const [bacErrors, setBacErrors] = useState({
    codeMassar: "",
    bac_type: "",
    bac_year: "",
    bac_note: "",
    condidatureFile: "",
  });

  const [finalForm, setFinalForm] = useState({
    departement: "",
    filiere: "",
  });
  const [finalErros, setFinalErros] = useState({
    departement: "",
    filiere: "",
  });

  function clearErrors() {
    setErrors({
      first_name: "",
      last_name: "",
      cin: "",
      nationality: "",
      city: "",
      date_of_birth: "",
      email: "",
      phone: "",
      address: "",
      cinFile: "",
      profile_picture: "",
    });
    setBacErrors({
      codeMassar: "",
      bac_type: "",
      bac_year: "",
      bac_note: "",
      condidatureFile: "",
    });
    setFinalErros({
      departement: "",
      filiere: "",
    });
  }

  function validateForm() {
    let isGood = true;
    clearErrors();
    if (step === "personal_informations") {
      for (const fieldName in formData) {
        if (
          formData[fieldName as keyof PersonalInformationFormInterface] === ""
        ) {
          setErrors((prev) => ({
            ...prev,
            [fieldName]: "Ce champ est requis",
          }));
          isGood = false;
        } else if (fieldName === "cinFile") {
          if (!formData.cinFile) {
            setErrors((prev) => ({
              ...prev,
              [fieldName]: "Veuillez ajouter un fichier",
            }));
            isGood = false;
          }
        } else if (fieldName === "profile_picture") {
          if (!formData.profile_picture) {
            setErrors((prev) => ({
              ...prev,
              [fieldName]: "Veuillez ajouter un fichier",
            }));
            isGood = false;
          }
        }
        if (fieldName.toLowerCase() === "nationality") {
          if (
            !COUNTRIES.find(
              (country) => country.translations.fr === formData.nationality,
            )
          ) {
            setErrors((prev) => ({
              ...prev,
              [fieldName]: "Verifiez le pays",
            }));
            isGood = false;
          }
        } else if (fieldName.toLowerCase() === "city") {
          if (
            !CITIES.find(
              (city) =>
                city.ville.toLowerCase() === formData.city.toLowerCase(),
            )
          ) {
            setErrors((prev) => ({
              ...prev,
              [fieldName]: "Verifiez la ville",
            }));
            isGood = false;
          }
        } else if (fieldName.toLowerCase() === "email") {
          //regex for email
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!emailRegex.test(formData.email)) {
            setErrors((prev) => ({
              ...prev,
              [fieldName]: "Email invalide",
            }));
            isGood = false;
          }
        } else if (fieldName.toLowerCase() === "phone") {
          //check if everthing is a number, the only characters allowed are + at the start and it is not required
          const phoneRegex = /^\+?[0-9]*$/;
          if (!phoneRegex.test(formData.phone)) {
            setErrors((prev) => ({
              ...prev,
              [fieldName]: "Numéro de téléphone invalide",
            }));
            isGood = false;
          }
        }
      }
    } else if (step === "bac_informations") {
      for (const fieldName in bacFormData) {
        if (
          bacFormData[fieldName as keyof BacInformationFormInterface] === ""
        ) {
          setBacErrors((prev) => ({
            ...prev,
            [fieldName]: "Ce champ est requis",
          }));
          isGood = false;
        } else if (fieldName.toLowerCase() == "bac_note") {
          if (
            parseFloat(bacFormData.bac_note) > 20 ||
            parseFloat(bacFormData.bac_note) < 0
          ) {
            setBacErrors((prev) => ({
              ...prev,
              [fieldName]: "Note invalide",
            }));
            isGood = false;
          }
        } else if (fieldName === "condidatureFile") {
          if (!bacFormData.condidatureFile) {
            setBacErrors((prev) => ({
              ...prev,
              [fieldName]: "Veuillez ajouter un fichier",
            }));
            isGood = false;
          }
        }
      }
    } else if (step === "final_informations") {
      for (const fieldName in finalForm) {
        if (finalForm[fieldName as keyof typeof finalForm] === "") {
          setFinalErros((prev) => ({
            ...prev,
            [fieldName]: "Ce champ est requis",
          }));
          isGood = false;
        }
      }
    }

    return isGood;
  }

  async function createStudentProfile(finalForm: RegisterDataInterface) {
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        rootUrl + "register/",
        {
          student_data: {
            ...finalForm,
            condidatureFile: null,
            cinFile: null,
            profile_picture: null,
          },
          name: finalForm.first_name + " " + finalForm.last_name,
          email: finalForm.email,
        },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        },
      );
      const id = res.data.id;
      await axios.post(
        rootUrl + "students/" + id + "/files/",
        {
          cin_file: formData.cinFile,
          condidatureFile: bacFormData.condidatureFile,
          profile_picture: formData.profile_picture,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setStep("done");
    } catch (e) {
      alert(
        "Erreur lors de la création de votre compte, veuillez réessayer plus tard",
      );
    }
    setIsSubmitting(false);
  }

  function fillDummyData() {
    const randomNumber = Math.floor(Math.random() * 1000);
    setFormData({
      first_name: "Moohamed khalil",
      last_name: "Ktiri",
      cin: "AA0221",
      nationality: "Maroc",
      city: "Rabat",
      date_of_birth: "1990-01-01",
      email: "example" + randomNumber.toString() + "@example.com",
      phone: "+1234567890",
      address: "123 Main St",
      cinFile: null,
      profile_picture: null,
    });
    setBacFormData({
      codeMassar: "123456789",
      bac_type: "Sciences",
      bac_year: "2020",
      bac_note: "18.5",
      condidatureFile: null,
    });
    setFinalForm({
      departement: "Computer Science",
      filiere: "Software Engineering",
    });
  }

  return (
    <div
      className={`mx-auto flex h-screen w-screen flex-col px-5 lg:w-[660px] lg:px-0 ${step === "done" ? "justify-center" : ""}`}
    >
      {step !== "done" && (
        <img src={logo} alt="logo" className="mb-8 mt-16 w-[91px]" />
      )}
      {step === "done" && (
        <MDiv>
          <h2 className="mb-6 text-3xl font-semibold">Verifier votre email</h2>
          <div className="mb-10 font-light">
            Nous avons envoyé un e-mail à{" "}
            <span className="font-semibold">{formData.email + " "}</span>avec
            votre mot de passe et votre convocation
          </div>
          <hr className="mb-6 border-gray" />
          <LogoutButton />
        </MDiv>
      )}
      {step !== "done" && (
        <OutlinedButton
          onClick={() => {
            fillDummyData();
          }}
        >
          DUMMY DATA
        </OutlinedButton>
      )}
      {step === "personal_informations" && (
        <PersonalInformationForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
        />
      )}
      {step === "bac_informations" && (
        <BacInformationsForm
          formData={bacFormData}
          onChange={setBacFormData}
          errors={bacErrors}
          // onErrorChange={setBacErrors}
        />
      )}
      {step === "final_informations" && (
        <FinalInformationsForm
          formData={finalForm}
          onChange={setFinalForm}
          errors={finalErros}
        />
      )}
      {step === "validation" && (
        <ValidationPage
          finalForm={{
            ...formData,
            ...bacFormData,
            ...finalForm,
          }}
        />
      )}
      {step === "validation" && (
        <div className="mt-4 flex items-center gap-x-3">
          <input
            type="checkbox"
            checked={didAcceptTerms}
            onChange={(e) => {
              setDidAcceptTerms(e.target.checked);
            }}
          />
          <span>
            Je certifie sur l’honneur que les informations que j’ai fournis
            ci-dessus sont exactes.
          </span>{" "}
        </div>
      )}
      {step !== "done" && (
        <>
          <div className="mt-9 flex gap-x-4">
            <OutlinedButton
              onClick={() => {
                if (step === "personal_informations") {
                  window.location.href = "/";
                  return;
                }
                let prevStep = undefined;
                if (step === "validation") prevStep = "final_informations";
                else if (step === "final_informations")
                  prevStep = "bac_informations";
                else if (step === "bac_informations")
                  prevStep = "personal_informations";

                setStep(prevStep as PageStep);
                window.scrollTo(0, 0);
              }}
              className="w-full"
            >
              {step === "personal_informations" ? "Annuler" : "Précédent"}
            </OutlinedButton>
            <FilledButton
              disabled={step === "validation" && !didAcceptTerms}
              className="w-full disabled:opacity-30"
              onClick={() => {
                if (step === "validation") {
                  createStudentProfile({
                    ...formData,
                    ...bacFormData,
                    ...finalForm,
                  });

                  return;
                }

                if (!validateForm()) {
                  return;
                }

                let nextStep = undefined;
                if (step === "personal_informations") {
                  nextStep = "bac_informations";
                } else if (step === "bac_informations") {
                  nextStep = "final_informations";
                } else if (step === "final_informations") {
                  nextStep = "validation";
                }

                setStep(nextStep as PageStep);
                window.scrollTo(0, 0);
              }}
            >
              {isSubmitting ? (
                <LoadingIcon className="mx-auto stroke-white" />
              ) : step === "validation" ? (
                "Créer un compte"
              ) : (
                "Suivant"
              )}
            </FilledButton>
          </div>
          <button
            className="mb-16 mt-12"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Vous avez déjà un compte ?{" "}
            <span className="text-secondary">Se connecter</span>
          </button>
        </>
      )}
    </div>
  );
}
