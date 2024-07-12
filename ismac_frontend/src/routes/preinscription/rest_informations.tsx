import { Input, SubTitle, Title } from "../../comps/comps";
import { ErrorMessage, FileInput, Labeled } from "../../comps/form_comps";

export interface BacInformationFormInterface {
  codeMassar: string;
  bac_type: string;
  bac_year: string;
  bac_note: string;
  condidatureFile: File | null;
}

export type BacInformationFormErrors = Omit<
  BacInformationFormInterface,
  "condidatureFile"
> & {
  condidatureFile: string;
};

export function BacInformationsForm({
  formData,
  onChange: setFormData,
  errors,
}: {
  formData: BacInformationFormInterface;
  onChange: (data: BacInformationFormInterface) => void;
  errors: BacInformationFormErrors;
  //   onErrorChange: (errors: BacInformationFormErrors) => void;
}) {
  return (
    <>
      <Title>Préinscription - Informations Baccalauréat</Title>
      <SubTitle className="mt-3">
        Veuillez entrer vos détails pour créer votre compte de candidature.
      </SubTitle>
      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-6">
        <Labeled label="Code Massar" className="col-span-1">
          <Input
            placeholder="Entrez votre code Massar"
            className="text-lg"
            value={formData.codeMassar}
            onChange={(e) =>
              setFormData({ ...formData, codeMassar: e.target.value })
            }
          />
          {errors.codeMassar && (
            <ErrorMessage>{errors.codeMassar}</ErrorMessage>
          )}
        </Labeled>
        <Labeled label="Type de baccalauréat" className="col-span-1">
          <Input
            placeholder="Entrez votre type de baccalauréat"
            className="text-lg"
            value={formData.bac_type}
            onChange={(e) =>
              setFormData({ ...formData, bac_type: e.target.value })
            }
          />
          {errors.bac_type && <ErrorMessage>{errors.bac_type}</ErrorMessage>}
        </Labeled>
        <Labeled label="Année du baccalauréat" className="col-span-1">
          <Input
            placeholder="Entrez votre année de Babaccalauréatc"
            className="text-lg"
            value={formData.bac_year}
            onChange={(e) =>
              setFormData({ ...formData, bac_year: e.target.value })
            }
          />
          {errors.bac_year && <ErrorMessage>{errors.bac_year}</ErrorMessage>}
        </Labeled>
        <Labeled label="Note de Bac" className="col-span-1">
          <Input
            placeholder="Entrez votre note de Bac"
            className="text-lg"
            max={20}
            min={0}
            value={formData.bac_note}
            onChange={(e) => {
              const value = e.target.value;

              if (
                value.length === 0 ||
                (value.match(/^\d+$/) && value.length <= 2)
              ) {
                setFormData({ ...formData, bac_note: e.target.value });
              }
            }}
          />
          {errors.bac_note && <ErrorMessage>{errors.bac_note}</ErrorMessage>}
        </Labeled>
        <Labeled label="Fichier de condidature" className="col-span-1">
          <FileInput
            type="file"
            file={formData.condidatureFile}
            error={errors.condidatureFile}
            onChange={(e) =>
              setFormData({
                ...formData,
                condidatureFile: e.target.files?.[0] ?? null,
              })
            }
          />
        </Labeled>
      </div>
    </>
  );
}

export interface FinalInformationFormInterface {
  departement: string;
  filiere: string;
}

export type FinalInformationFormErrors = FinalInformationFormInterface;

export function FinalInformationsForm({
  formData,
  onChange: setFormData,
  errors,
}: {
  formData: FinalInformationFormInterface;
  onChange: (data: FinalInformationFormInterface) => void;
  errors: FinalInformationFormErrors;
}) {
  return (
    <>
      <Title>Préinscription - Département et Filière</Title>
      <SubTitle className="mt-3">
        Veuillez choisir le département et filière dont lesquels vous souhaitez
        poursvuire vos études.
      </SubTitle>
      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-6">
        <Labeled label="Département" className="col-span-1">
          <Input
            placeholder="Entrez votre département"
            className="text-lg"
            value={formData.departement}
            onChange={(e) =>
              setFormData({ ...formData, departement: e.target.value })
            }
          />
          {errors.departement && (
            <ErrorMessage>{errors.departement}</ErrorMessage>
          )}
        </Labeled>
        <Labeled label="Filière" className="col-span-1">
          <Input
            placeholder="Entrez votre filière"
            className="text-lg"
            value={formData.filiere}
            onChange={(e) =>
              setFormData({ ...formData, filiere: e.target.value })
            }
          />
          {errors.filiere && <ErrorMessage>{errors.filiere}</ErrorMessage>}
        </Labeled>
      </div>
    </>
  );
}
