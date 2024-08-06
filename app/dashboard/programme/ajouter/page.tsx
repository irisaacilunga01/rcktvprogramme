import React from "react";
import { Formulaire } from "../form";
import { Category } from "@/lib/types";
import { sql } from "@vercel/postgres";

async function Page() {
  const { rows: categories } =
    await sql<Category>`SELECT id,nom from categories`;

  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter un programme
      </h2>
      <Formulaire categories={categories} />
    </div>
  );
}

export default Page;
