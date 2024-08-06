import React from "react";
import { Formulaire } from "../form";

function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter un utilisateur
      </h2>
      <Formulaire />
    </div>
  );
}

export default Page;
