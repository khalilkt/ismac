import logo from "../assets/images/logo text.png";
import { FilledButton, Input, SubTitle, Title } from "../comps/comps";

import image from "../assets/images/login.jpg";
import { Labeled } from "../comps/form_comps";
import React from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";

export function LoginPage() {
  const authContext = React.useContext(AuthContext);
  const [form, setForm] = React.useState({
    // email: "example674@example.com",
    // password: "Moohamed khalil_Ktiri_9147",
    email: "",
    password: "",
  });

  function logIn() {
    authContext.logIn(form.email, form.password);
  }

  if (authContext.authData) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen overflow-clip">
      <div className="flex w-full flex-col gap-y-3 px-5 lg:w-1/2 lg:px-[8%]">
        <div className="flex-1">
          <img src={logo} alt="logo" className="mt-16 w-[91px]" />
        </div>

        <Title>Plate-forme de candidature Formation initiale</Title>
        <SubTitle>Connectez-vous à votre compte ci-dessous</SubTitle>

        <Labeled label="Email" className="mt-6">
          <Input
            placeholder="Entrez votre email"
            className="text-lg"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
        </Labeled>
        <Labeled label="Mot de passe" className="mt-3">
          <Input
            placeholder="Entrez votre mot de passe"
            className="text-lg"
            type="password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
        </Labeled>
        <div className="mt-3 flex gap-x-2">
          {/* <button className="ml-auto text-sm font-medium text-secondary">
            Mot de passe oublié ?
          </button> */}
        </div>
        <FilledButton
          className="mt-10"
          onClick={() => {
            logIn();
          }}
        >
          Se connecter
        </FilledButton>
        <span className="text-center">ou</span>
        <FilledButton
          onClick={() => {
            window.location.href = "/preinscription";
          }}
          bg="primary"
        >
          Créer un compte
        </FilledButton>
        <div className="flex-1" />
      </div>
      <img src={image} className="hidden lg:block lg:w-[50vw]" />
    </div>
  );
}
