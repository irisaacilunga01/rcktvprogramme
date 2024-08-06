import React from "react";
import { sql } from "@vercel/postgres";
import { Planning } from "@/lib/types";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";

export default async function Page() {
  const { rows } = await sql<Planning>`SELECT 
    p.id,
    p.heuredebut,
    p.heurefin,
    p.date,
    p.direct,
    p.programmeid,
    pr.titre AS programmenom
FROM 
    plannings p
LEFT JOIN 
    programmes pr ON p.programmeid = pr.id;
`;
  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Planning
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
