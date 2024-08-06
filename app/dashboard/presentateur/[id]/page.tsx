import React from "react";
import { sql } from "@vercel/postgres";
import { Presentateur } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Presentateur>`SELECT * from presentateurs where id=${idCl}`;
  const { bibliographie, genre, nom, id } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier une catégorie
      </h2>
      <Formulaire
        id={id}
        nom={nom}
        bibliographie={bibliographie}
        genre={genre}
      />
    </div>
  );
}

export default Page;
