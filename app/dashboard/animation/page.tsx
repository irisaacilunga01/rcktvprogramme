import React from "react";
import { sql } from "@vercel/postgres";
import { Animation } from "@/lib/types";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";

export default async function Page() {
  const { rows } = await sql<Animation>`SELECT 
    a.id,
    a.programmeid,
    a.presentateurid,
    p.nom AS presentateurnom,
    pr.titre AS programmenom,
    a.role
FROM 
    animations a
JOIN 
    presentateurs p ON a.presentateurid = p.id
JOIN 
    programmes pr ON a.programmeid = pr.id;
`;
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Animation
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
