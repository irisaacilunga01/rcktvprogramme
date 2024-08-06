import React from "react";
import { sql } from "@vercel/postgres";
import { Animation, Programme, Presentateur } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Animation>`SELECT * from animations where id=${idCl}`;
  const { rows: programmes } =
    await sql<Programme>`SELECT id,titre from programmes`;
  const { rows: presentateurs } =
    await sql<Presentateur>`SELECT id,nom from presentateurs`;
  const { presentateurid, programmeid, role, id } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une animation de programme
      </h2>
      <Formulaire
        id={id}
        presentateurid={presentateurid}
        programmeid={programmeid}
        role={role}
        presentateurs={presentateurs}
        programmes={programmes}
      />
    </div>
  );
}

export default Page;
