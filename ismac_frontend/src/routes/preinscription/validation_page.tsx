import { OutlinedButton, SubTitle, Title } from "../../comps/comps";
import { PersonalInformationFormInterface } from "./personal_information";
import {
  BacInformationFormInterface,
  FinalInformationFormInterface,
} from "./rest_informations";

export interface RegisterDataInterface
  extends PersonalInformationFormInterface,
    BacInformationFormInterface,
    FinalInformationFormInterface {}

export function SummaryTable({ data }: { data: { [label: string]: string } }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {Object.entries(data).map(([label, value], index) => (
        <Tile label={label} value={value} />
      ))}
    </div>
  );
}
function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="-mb-px -ml-px border border-gray p-3 text-sm md:p-4 md:text-sm">
      <div className="flex items-center">
        <span className="md:line-clamp-1">{label}</span>:
        <span className="ml-1 line-clamp-1 text-ellipsis font-light text-textGray">
          {value}
        </span>
      </div>
    </div>
  );
}

export function ValidationPage({
  finalForm,
}: {
  finalForm: RegisterDataInterface;
}) {
  return (
    <>
      <Title>Validation de Préinscriptiont </Title>
      <SubTitle className="mb-6 mt-3">
        Veuillez vérifer vos détails avant de créer votre compte.
      </SubTitle>
      <SummaryTable
        data={{
          "Nom Complet": finalForm.first_name + " " + finalForm.last_name,
          CIN: finalForm.cin,
          Nationalité: finalForm.nationality,
          Ville: finalForm.city,
          "Date de naissance": finalForm.date_of_birth,
          Email: finalForm.email,
          "N° de téléphone": finalForm.phone,
          Adresse: finalForm.address,
          "Code Massar": finalForm.codeMassar,
          "Type de Baccalauréat": finalForm.bac_type,
          "Année du Baccalauréat": finalForm.bac_year,
          "Note du Baccalauréat": finalForm.bac_note.toString(),
          Département: finalForm.departement,
          Filière: finalForm.filiere,
        }}
      />
    </>
  );
}
