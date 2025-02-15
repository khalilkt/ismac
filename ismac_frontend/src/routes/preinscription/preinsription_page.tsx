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
  // | "final_informations"
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
    nationality: "",
    city: "",
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
    profile_picture: "",
  });

  const [bacFormData, setBacFormData] = useState<BacInformationFormInterface>({
    is_master: null,
    licence_name: null,
    codeMassar: "",
    bac_type: "",
    diplome_year: "",
    diplome_note: "",
    condidatureFile: null,
    is_foreign_bac: false,
  });

  const [bacErrors, setBacErrors] = useState({
    codeMassar: "",
    bac_type: "",
    diplome_year: "",
    diplome_note: "",
    condidatureFile: "",
    is_foreign_bac: "",
    is_master: "",
    licence_name: "",
  });

  const [finalForm, setFinalForm] = useState({
    departement: "--",
    filiere: "--",
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
      profile_picture: "",
    });
    setBacErrors({
      codeMassar: "",
      bac_type: "",
      diplome_year: "",
      diplome_note: "",
      condidatureFile: "",
      is_foreign_bac: "",
      is_master: "",
      licence_name: "",
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
        if(fieldName === "diplome_year") {
          if(bacFormData.diplome_year === "") {
            setBacErrors((prev) => ({
              ...prev,
              [fieldName]: "Ce champ est requis",
            }));
            isGood = false;
          }
          if (bacFormData.diplome_year.split("-").length !== 2 || bacFormData.diplome_year.split("-")[0].length !== 4 || bacFormData.diplome_year.split("-")[1].length !== 4) {
            setBacErrors((prev) => ({
              ...prev,
              [fieldName]: "Année invalide (format: 0000-0000)",
            }));
            isGood = false;
          }
        }
        if (fieldName === "licence_name") {
          if (
            (bacFormData.is_master === true &&
              bacFormData.licence_name === null) ||
            bacFormData.licence_name === ""
          ) {
            setBacErrors((prev) => ({
              ...prev,
              [fieldName]: "Ce champ est requis",
            }));
            isGood = false;
          }
        } else if (
          bacFormData[fieldName as keyof BacInformationFormInterface] === ""
        ) {
          setBacErrors((prev) => ({
            ...prev,
            [fieldName]: "Ce champ est requis",
          }));
          isGood = false;
        } else if (
          fieldName.toLowerCase() === "is_master" &&
          bacFormData.is_master === null
        ) {
          setBacErrors((prev) => ({
            ...prev,
            [fieldName]: "Ce champ est requis",
          }));
          isGood = false;
        } else if (fieldName.toLowerCase() == "diplome_note") {
          if (
            parseFloat(bacFormData.diplome_note) > 20 ||
            parseFloat(bacFormData.diplome_note) < 0
          ) {
            setBacErrors((prev) => ({
              ...prev,
              [fieldName]: "Note invalide",
            }));
            isGood = false;
          }
          if (parseFloat(bacFormData.diplome_note) < 12) {
            setBacErrors((prev) => ({
              ...prev,
              [fieldName]: "Note inférieure à 12",
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
    }
    // else if (step === "final_informations") {
    //   for (const fieldName in finalForm) {
    //     if (finalForm[fieldName as keyof typeof finalForm] === "") {
    //       setFinalErros((prev) => ({
    //         ...prev,
    //         [fieldName]: "Ce champ est requis",
    //       }));
    //       isGood = false;
    //     }
    //   }
    // }

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

  // function fillDummyData() {
  //   const randomNumber = Math.floor(Math.random() * 1000);
  //   setFormData({
  //     first_name: "Moohamed khalil",
  //     last_name: "Ktiri",
  //     cin: "AA0221",
  //     nationality: "Maroc",
  //     city: "Rabat",
  //     date_of_birth: "1990-01-01",
  //     email: "example" + randomNumber.toString() + "@example.com",
  //     phone: "+1234567890",
  //     address: "123 Main St",
  //     profile_picture: null,
  //   });
  //   setBacFormData({
  //     codeMassar: "123456789",
  //     bac_type: "Sciences",
  //     diplome_year: "2023-2024",
  //     diplome_note: "18.5",
  //     condidatureFile: null,
  //     is_foreign_bac: false,
  //     is_master: bull,
  //   });
  //   setFinalForm({
  //     departement: "Computer Science",
  //     filiere: "Software Engineering",
  //   });
  // }

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
            votre mot de passe
          </div>
          <hr className="mb-6 border-gray" />
          <LogoutButton />
        </MDiv>
      )}
      {/* {step !== "done" && (
        <OutlinedButton
          onClick={() => {
            fillDummyData();
          }}
        >
          DUMMY DATA
        </OutlinedButton>
      )} */}
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
      {/* {step === "final_informations" && (
        <FinalInformationsForm
          formData={finalForm}
          onChange={setFinalForm}
          errors={finalErros}
        />
      )} */}
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
                let prevStep: PageStep | undefined = undefined;
                if (step === "validation") prevStep = "bac_informations";
                // else if (step === "final_informations")
                //   prevStep = "bac_informations";
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
              bg="primary"
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

                let nextStep: PageStep | undefined = undefined;
                if (step === "personal_informations") {
                  nextStep = "bac_informations";
                } else if (step === "bac_informations") {
                  nextStep = "validation";
                }
                // else if (step === "final_informations") {
                //   nextStep = "validation";
                // }

                setStep(nextStep as PageStep);
                window.scrollTo(0, 0);
              }}
            >
              {isSubmitting ? (
                <LoadingIcon className="mx-auto stroke-white" />
              ) : step === "validation" ? (
                "Valider"
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
