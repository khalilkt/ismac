import { useState } from "react";
import { Input, Select, SubTitle, Title } from "../../comps/comps";
import { ErrorMessage, FileInput, Labeled } from "../../comps/form_comps";

export interface BacInformationFormInterface {
  is_master: boolean | null;
  licence_name: string | null;
  is_foreign_bac: boolean;
  codeMassar: string;
  bac_type: string;
  diplome_year: string;
  diplome_note: string;
  condidatureFile: File | null;
}

const BAC_TYPES = [
  "Sciences Chariaa",
  "Langue Arabe",
  "Lettres",
  "Sciences Humaines",
  "Sciences Economiques",
  "Sciences de Gestion et Comptabilité",
  "Arts Appliqués",
  "Sciences de la vie et de la terre",
  "Sciences physique chimie",
  "Sciences Agronomiques",
  "Sciences Mathématiques A",
  "Sciences Mathématiques B",
  "Sciences et Technologies Electrique",
  "Sciences et Technologies Mécanique",
];

export type BacInformationFormErrors = Omit<
  BacInformationFormInterface,
  "condidatureFile" | "is_foreign_bac" | "is_master"
> & {
  condidatureFile: string;
  is_foreign_bac: string;
  is_master: string;
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
  const [isCustomBacType, setIsCustomBacType] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Title>Préinscription - Informations Baccalauréat</Title>
      <SubTitle className="mt-3">
        Veuillez entrer vos détails pour créer votre compte de candidature.
      </SubTitle>
      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-6">
        <Labeled label="Choisissez votre programme" className="col-span-1">
          <Select
            value={
              formData.is_master === null
                ? ""
                : formData.is_master
                  ? "master"
                  : "licence"
            }
            onChange={(e) => {
              const value = e.target.value;
              if (value !== "master" && value !== "licence") return;
              setFormData({
                ...formData,
                is_master: value === "master",
                licence_name: null,
              });
            }}
          >
            <option value="" disabled>
              Choisissez votre programme
            </option>
            <option value="licence">Licence</option>
            <option value="master">Master</option>
          </Select>
          {errors.is_master && <ErrorMessage>{errors.is_master}</ErrorMessage>}
        </Labeled>
        {formData.is_master !== null && (
          <>
            <Labeled label="Bac étranger" className="col-span-1">
              <Select
                className="text-lg"
                value={formData.is_foreign_bac ? "oui" : "non"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_foreign_bac: e.target.value === "oui",
                  })
                }
              >
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </Select>
            </Labeled>
            <Labeled
              label={
                formData.is_foreign_bac
                  ? "Référence du baccalauréat"
                  : "Code Massar"
              }
              className="col-span-1"
            >
              <Input
                placeholder={
                  formData.is_foreign_bac
                    ? "Entrez la référence de votre baccalauréat"
                    : "Entrez votre code Massar"
                }
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
              {isCustomBacType ? (
                <Input
                  placeholder="Entrez le type de votre baccalauréat"
                  className="text-lg"
                  value={formData.bac_type}
                  onChange={(e) =>
                    setFormData({ ...formData, bac_type: e.target.value })
                  }
                />
              ) : (
                <Select
                  value={formData.bac_type}
                  onChange={(e) => {
                    if (e.target.value === "OTHER") {
                      setIsCustomBacType(true);
                      setFormData({ ...formData, bac_type: "" });
                      return;
                    }
                    setFormData({ ...formData, bac_type: e.target.value });
                  }}
                >
                  <option value="" disabled>
                    Sélectionnez un type de baccalauréat
                  </option>
                  {BAC_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                  <option value="OTHER">Autre</option>
                </Select>
              )}
              {errors.bac_type && (
                <ErrorMessage>{errors.bac_type}</ErrorMessage>
              )}
            </Labeled>
            {formData.is_master && (
              <Labeled label={"Licence"} className="col-span-1">
                <Input
                  placeholder={"Entrez le nom de votre licence"}
                  className="text-lg"
                  value={formData.licence_name ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, licence_name: e.target.value })
                  }
                />
                {errors.licence_name && (
                  <ErrorMessage>{errors.licence_name}</ErrorMessage>
                )}
              </Labeled>
            )}
            <Labeled
              label={
                formData.is_master
                  ? "Année de licence"
                  : "Année du baccalauréat"
              }
              className="col-span-1"
            >
              <Select
                value={formData.diplome_year}
                onChange={(e) =>
                  setFormData({ ...formData, diplome_year: e.target.value })
                }
              >
                <option value="" disabled>
                  Sélectionnez l'année de votre{" "}
                  {formData.is_master ? "licence" : "baccalauréat"}
                </option>
                {[
                  `${currentYear - 2}-${currentYear - 1}`,
                  `${currentYear - 1}-${currentYear}`,
                ].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              {errors.diplome_year && (
                <ErrorMessage>{errors.diplome_year}</ErrorMessage>
              )}
            </Labeled>
            <Labeled
              label={
                "Moyenne générale " + (formData.is_master ? "(licence)" : "")
              }
              className="col-span-1"
            >
              <Input
                placeholder="Entrez votre moyenne générale"
                className="text-lg"
                max={20}
                min={0}
                value={formData.diplome_note}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value.length === 0 ||
                    (value.match(/^\d+(\.\d{0,2})?$/) && value.length <= 5)
                  ) {
                    setFormData({ ...formData, diplome_note: e.target.value });
                  }
                }}
              />
              {errors.diplome_note && (
                <ErrorMessage>{errors.diplome_note}</ErrorMessage>
              )}
            </Labeled>

            <Labeled label="Fichier de condidature" className="col-span-1">
              <FileInput
                type="file"
                accept=".zip"
                note={
                  <span>
                    Un fichier compressé (zip) avec des pièces format PDF ou
                    JPEG, taille maximale : 10Mo.
                    <br />
                    <span className="font-semibold">
                      Le dossier de candidature est composé de:
                      {formData.is_master ? (
                        <>
                          <br /> - Copie de la CIN <br />- Copie du Baccalauréat{" "}
                          <br />- Copie de Licence
                        </>
                      ) : (
                        <>
                          <br /> - Copie de la CIN <br />- Copie du Baccalauréat{" "}
                          <br />- Relevé des notes.
                        </>
                      )}
                    </span>
                  </span>
                }
                maxSize={10 * 1024}
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
          </>
        )}
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
