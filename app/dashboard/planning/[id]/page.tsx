import React from "react";
import { sql } from "@vercel/postgres";
import { Planning, Programme } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Planning>`SELECT * from plannings where id=${idCl}`;
  const { rows: programmes } =
    await sql<Programme>`SELECT id,titre from programmes`;

  const { id, direct, heuredebut, heurefin, programmeid } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire Modifier un planning pour un programme
      </h2>
      <Formulaire
        id={id}
        direct={direct}
        heuredebut={heuredebut}
        heurefin={heurefin}
        programmeid={programmeid}
        programmes={programmes}
      />
    </div>
  );
}

export default Page;
