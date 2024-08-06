import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";
import { Presentateur, Programme } from "@/lib/types";

async function Page() {
  const { rows: programmes } =
    await sql<Programme>`SELECT id,titre from programmes`;
  const { rows: presentateurs } =
    await sql<Presentateur>`SELECT id,nom from presentateurs`;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter une animation de programme
      </h2>
      <Formulaire presentateurs={presentateurs} programmes={programmes} />
    </div>
  );
}

export default Page;
