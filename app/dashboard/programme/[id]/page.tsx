import React from "react";
import { sql } from "@vercel/postgres";
import { Category, Programme } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } =
    await sql<Programme>`SELECT * from programmes where id=${idCl}`;
  const { rows: categories } =
    await sql<Category>`SELECT id,nom from categories`;

  const { categorieid, description, duree, titre, id } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un programme
      </h2>
      <Formulaire
        id={id}
        titre={titre}
        categories={categories}
        categorieid={categorieid}
        duree={duree}
        description={description}
      />
    </div>
  );
}

export default Page;
