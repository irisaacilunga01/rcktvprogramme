import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";
import { Programme } from "@/lib/types";
async function Page() {
  const { rows :programmes} = await sql<Programme>`SELECT id,titre from programmes`;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter un planning pour un programme
      </h2>
      <Formulaire programmes={programmes} />
    </div>
  );
}

export default Page;
