import { CITIES } from "../../assets/data/cities";
import { COUNTRIES } from "../../assets/data/countries";
import {
  FilledButton,
  Input,
  OutlinedButton,
  SubTitle,
  Title,
} from "../../comps/comps";
import {
  ErrorMessage,
  FileInput,
  Labeled,
  ProfilePictureInput,
  SearchSelect,
} from "../../comps/form_comps";
import ReactCountryFlag from "react-country-flag";

export interface PersonalInformationFormInterface {
  first_name: string;
  last_name: string;
  cin: string;
  profile_picture: File | null;
  nationality: string;
  city: string;
  date_of_birth: string;
  email: string;
  phone: string;
  address: string;
}

export type PersonalInformationFormErrors = Omit<
  PersonalInformationFormInterface,
  "profile_picture"
> & {
  profile_picture: string;
};

export function PersonalInformationForm({
  formData,
  setFormData,
  errors,
  setErrors,
}: {
  formData: PersonalInformationFormInterface;
  setFormData: (data: PersonalInformationFormInterface) => void;
  errors: PersonalInformationFormErrors;
  setErrors: (errors: PersonalInformationFormErrors) => void;
}) {
  return (
    <>
      <Title>Préinscription - Informations Personnelles</Title>
      <SubTitle className="mt-3">
        Veuillez entrer vos détails pour créer votre compte de candidature.
      </SubTitle>
      <div className="mt-8 flex grid-cols-1 flex-col gap-x-4 gap-y-6 lg:grid lg:grid-cols-2">
        <div className="col-span-2 flex flex-col items-center gap-y-3 self-center">
          <ProfilePictureInput
            error={errors.profile_picture.length > 0}
            file={formData.profile_picture}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFormData({
                  ...formData,
                  profile_picture: e.target.files[0],
                });
              }
            }}
          />
          <span className="text-lg">Photo de Profil</span>
          {errors.profile_picture && (
            <ErrorMessage>{errors.profile_picture}</ErrorMessage>
          )}
        </div>
        <Labeled label="Prénom" className="col-span-1">
          <Input
            placeholder="Entrez votre prénom"
            className="text-lg"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          {errors.first_name && (
            <ErrorMessage>{errors.first_name}</ErrorMessage>
          )}
        </Labeled>
        <Labeled label="Nom" className="col-span-1">
          <Input
            placeholder="Entrez votre nom"
            className="text-lg"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          {errors.last_name && <ErrorMessage>{errors.last_name}</ErrorMessage>}
        </Labeled>
        <Labeled label="CNIE / Passport" className="lg:col-span-2">
          <Input
            placeholder="Entrez votre CNIE / Passport"
            className="text-lg"
            value={formData.cin}
            onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
          />
          {errors.cin && <ErrorMessage>{errors.cin}</ErrorMessage>}
        </Labeled>

        <Labeled label="Nationalité" className="col-span-1">
          <SearchSelect
            options={
              COUNTRIES.map((country) => ({
                value: country.translations.fr ?? country.name,
                icon: <ReactCountryFlag countryCode={country.alpha2Code} />,
              })) ?? []
            }
            placeholder="Entrez votre nationalité"
            value={formData.nationality}
            onChange={function (value: string): void {
              setFormData({ ...formData, nationality: value });
            }}
          />
          {errors.nationality && (
            <ErrorMessage>{errors.nationality}</ErrorMessage>
          )}
          {/* <div className="absolute left-0 top-0 flex h-full items-center px-3">
              <ReactCountryFlag countryCode="MA" />
            </div> */}
          {/* {errors.nationality && <ErrorMessage>{errors.nationality}</ErrorMessage>} */}
        </Labeled>

        <Labeled label="Date de naissance" className="lg:col-span-1">
          <Input
            type="date"
            value={formData.date_of_birth}
            onChange={(e) =>
              setFormData({ ...formData, date_of_birth: e.target.value })
            }
          />
          {errors.date_of_birth && (
            <ErrorMessage>{errors.date_of_birth}</ErrorMessage>
          )}
        </Labeled>
        <Labeled label="Email" className="col-span-1">
          <Input
            placeholder="Entrez votre email"
            className="text-lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Labeled>
        <Labeled label="N° de téléphone" className="col-span-1">
          <Input
            placeholder="Entrez votre téléphone"
            className="text-lg"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
        </Labeled>
        <Labeled label="Adresse" className="lg:col-span-2">
          <Input
            placeholder="Entrez votre adresse"
            className="text-lg"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
        </Labeled>
        <Labeled label="Ville" className="col-span-2">
          <SearchSelect
            options={
              CITIES.map((city) => ({
                value: city.ville,
              })) ?? []
            }
            placeholder="Entrez votre ville"
            value={formData.city}
            onChange={function (value: string): void {
              setFormData({ ...formData, city: value });
            }}
          />
          {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
        </Labeled>
      </div>
    </>
  );
}
