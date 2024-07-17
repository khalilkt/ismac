import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { LoginPage } from "./routes/login_page";
import { PreInscriptionPage } from "./routes/preinscription/preinsription_page";
import { FinalInformationFormInterface } from "./routes/preinscription/rest_informations";
import axios from "axios";
import { rootUrl } from "./constants";
import { LoadingIcon } from "./comps/icons";
import { SummaryPage } from "./routes/summary_page";
import { AdminLayout, ProtectedLayout } from "./routes/protected_layouts";
import { AdminListPage } from "./routes/admin_pages";

export interface StudentDataInterface {
  id: number;
  first_name: string;
  last_name: string;
  cin: string;
  cin_file: string;
  nationality: string;
  city: string;
  date_of_birth: string;
  phone: string;
  address: string;
  codeMassar: string;
  bac_type: string;
  bac_year: string;
  bac_note: string | number;
  condidatureFile: string;
  departement: string;
  filiere: string;

  portfolio_file: string | null;

  created_at: string;
  email: string;

  is_accepted: boolean | null;
}
export interface UserInterface {
  id: number;
  name: string;
  email: string;
  student_data: StudentDataInterface;
  is_admin: boolean;
  created_at: string;
}

export interface AuthData {
  token: string;
  user: UserInterface;
}

export const AuthContext = React.createContext<{
  inited: boolean;
  authData: AuthData | null;
  logIn: (username: string, password: string) => Promise<void>;
  logOut: () => void;
  reAuth: () => void;
}>({
  inited: false,
  authData: null,
  logIn: async () => {},
  logOut: () => {},
  reAuth: () => {},
});

function App() {
  const [inited, setInited] = React.useState(false);
  const [authData, setAuthData] = React.useState<AuthData | null>(null);
  const user = authData?.user;

  async function logIn(username: string, password: string) {
    try {
      const response = await axios.post(rootUrl + "auth/login/", {
        username: username,
        password: password,
      });
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        setAuthData(response.data);
      }
    } catch (e) {
      console.log(e);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    setAuthData(null);
  }

  async function init() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(rootUrl + "auth/token/", {
          token: token,
        });
        if (response.data) {
          setAuthData(response.data);
        } else {
          localStorage.removeItem("token");
        }
      } catch (e) {
        console.log(e);
      }
    }
    setInited(true);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          inited: inited,
          authData: authData,
          logIn: logIn,
          logOut: logOut,
          reAuth: init,
        }}
      >
        {!inited ? (
          <div className="flex h-screen items-center justify-center">
            <LoadingIcon />
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedLayout shouldBeLogged={false} isAdmin={false} />
              }
            >
              <Route path="/" element={<LoginPage />} />
              <Route path="/preinscription" element={<PreInscriptionPage />} />
            </Route>

            <Route
              path="/resume"
              element={
                <ProtectedLayout shouldBeLogged={true} isAdmin={false} />
              }
            >
              <Route path="/resume" element={<SummaryPage />} />
            </Route>

            <Route
              path="/"
              element={<ProtectedLayout shouldBeLogged={true} isAdmin={true} />}
            >
              <Route
                key="ecrit"
                id="ecrit"
                path="/admin/ecrit"
                element={<AdminListPage type="ecrit" />}
              />
              <Route
                key="oral"
                id="oral"
                path="/admin/oral"
                element={<AdminListPage type="oral" />}
              />
              <Route path="*" element={<Navigate to="/admin/ecrit" />} />
            </Route>
          </Routes>
          // <Routes>
          //   {authData  ? (
          //     <Route path="/" element={<SummaryPage />} />
          //   ) : (
          //     <Route path="/" element={<LoginPage />} />
          //   )}
          //   <Route
          //     path="/"
          //     element={<ProtectedLayout shouldBeLogged={false} />}
          //   >
          //     <Route path="/preinscription" element={<PreInscriptionPage />} />
          //   </Route>
          // </Routes>
        )}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
