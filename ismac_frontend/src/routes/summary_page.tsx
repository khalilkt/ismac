import { useContext } from "react";
import { AuthContext } from "../App";
import { SummaryTable } from "./preinscription/validation_page";
import logo from "../assets/images/logo text.png";
import {
  DisconnectButton,
  LogoutButton,
  MDiv,
  SubTitle,
  Title,
} from "../comps/comps";
import { FileInput } from "../comps/form_comps";
import React from "react";
import axios from "axios";
import { rootUrl } from "../constants";
import { LoadingIcon } from "../comps/icons";
const didOralStart = true;

function PortfolioUpdatePage() {
  const authContext = useContext(AuthContext);
  const user = authContext.authData!.user!;
  const [portfolioFile, setPortfolioFile] = React.useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function submit() {
    setIsSubmitting(true);
    try {
      await axios.post(
        rootUrl + "students/" + user.id + "/files/",
        {
          portfolio_file: portfolioFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      await authContext.reAuth();
    } catch (e) {
      console.error(e);
    }
    setIsSubmitting(false);
  }
  return (
    <MDiv className="gap-y-2">
      <Title>Félicitation!</Title>
      <SubTitle>
        Félicitation d’avoir réussir le premier test. Veuillez présentez votre
        portfolio ci-dessous.
      </SubTitle>
      <div className="mt-8">
        <FileInput
          file={portfolioFile}
          onChange={(e) => setPortfolioFile(e.target.files?.[0] ?? null)}
          error={""}
          type={"file"}
          mini={true}
        />
      </div>
      <hr className="mb-6 mt-11 border-gray" />
      <div className="flex items-center justify-between">
        <LogoutButton className="" />
        <button
          disabled={!portfolioFile || isSubmitting}
          onClick={submit}
          className="flex items-center gap-x-2 text-secondary disabled:opacity-40"
        >
          {isSubmitting ? (
            <LoadingIcon className="stroke-secondary" />
          ) : (
            <>
              <span>Confirmer</span>
              <svg
                width="16"
                height="15"
                className="rotate-180 fill-secondary disabled:opacity-40"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.49857 8.45832L8.1944 13.1542C8.38607 13.3458 8.47791 13.5694 8.46992 13.825C8.46194 14.0805 8.36211 14.3042 8.17044 14.4958C7.97878 14.6715 7.75517 14.7634 7.49961 14.7713C7.24405 14.7793 7.02044 14.6875 6.82878 14.4958L0.503776 8.17082C0.407943 8.07499 0.340061 7.97117 0.30013 7.85937C0.2602 7.74756 0.240234 7.62777 0.240234 7.49999C0.240234 7.37221 0.2602 7.25242 0.30013 7.14062C0.340061 7.02881 0.407943 6.92499 0.503776 6.82916L6.82878 0.504158C7.00447 0.328463 7.22409 0.240616 7.48763 0.240616C7.75117 0.240616 7.97878 0.328463 8.17044 0.504158C8.36211 0.695824 8.45794 0.923428 8.45794 1.18697C8.45794 1.45051 8.36211 1.67812 8.17044 1.86978L3.49857 6.54166H14.2079C14.4795 6.54166 14.7071 6.6335 14.8908 6.81718C15.0744 7.00086 15.1663 7.22846 15.1663 7.49999C15.1663 7.77152 15.0744 7.99912 14.8908 8.1828C14.7071 8.36648 14.4795 8.45832 14.2079 8.45832H3.49857Z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </MDiv>
  );
}

export function SummaryPage() {
  const user = useContext(AuthContext).authData!.user!;

  const data = {
    "Nom Complet":
      user.student_data.first_name + " " + user.student_data.last_name,
    CIN: user.student_data.cin,
    Nationalité: user.student_data.nationality,
    Ville: user.student_data.city,
    "Date de naissance": user.student_data.date_of_birth,
    Email: user.email,
    "N° de téléphone": user.student_data.phone,
    Adresse: user.student_data.address,
    "Code Massar": user.student_data.codeMassar,
    "Type de Baccalauréat": user.student_data.bac_type,
    "Année du Baccalauréat": user.student_data.bac_year,
    "Note du Baccalauréat": user.student_data.bac_note.toString(),
    Département: user.student_data.departement,
    Filière: user.student_data.filiere,
  };

  const shouldUploadPortfolio =
    didOralStart && user.student_data.portfolio_file === null;
  return (
    <div
      className={`mx-auto flex h-screen w-full flex-col px-5 text-sm lg:w-[660px] lg:px-0 lg:text-base ${shouldUploadPortfolio ? "justify-center" : ""}`}
    >
      {shouldUploadPortfolio ? (
        <PortfolioUpdatePage />
      ) : (
        <>
          <img src={logo} alt="logo" className="mb-8 mt-16 w-[91px]" />
          <Title>Détails de votre Préinscription</Title>
          <SubTitle className="mb-9 mt-3">
            Les épreuves orales ne sont pas encore commencée
          </SubTitle>
          <SummaryTable data={data} />
          {user.student_data.portfolio_file && (
            <div
              className={`mt-6 flex items-center gap-x-4 rounded border border-gray bg-white px-3 py-4`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_316_21"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_316_21)">
                  <path
                    d="M9.55021 15.15L18.0252 6.675C18.2252 6.475 18.4585 6.375 18.7252 6.375C18.9919 6.375 19.2252 6.475 19.4252 6.675C19.6252 6.875 19.7252 7.1125 19.7252 7.3875C19.7252 7.6625 19.6252 7.9 19.4252 8.1L10.2502 17.3C10.0502 17.5 9.81687 17.6 9.55021 17.6C9.28354 17.6 9.05021 17.5 8.85021 17.3L4.55021 13C4.35021 12.8 4.25437 12.5625 4.26271 12.2875C4.27104 12.0125 4.37521 11.775 4.57521 11.575C4.77521 11.375 5.01271 11.275 5.28771 11.275C5.56271 11.275 5.80021 11.375 6.00021 11.575L9.55021 15.15Z"
                    fill="#3259E8"
                  />
                </g>
              </svg>
              <span>Votre portfolio a été bien envoyé, Merci!</span>
            </div>
          )}
          <LogoutButton className="mt-10" />
        </>
      )}
    </div>
  );
}
