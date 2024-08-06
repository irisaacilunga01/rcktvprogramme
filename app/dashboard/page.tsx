// import { ChartRound } from "@/components/chartRound";
// import { ChartTimes } from "@/components/chartTimes";
// import { ModeToggle } from "@/components/toggletheme";
// import { CountsResult } from "@/lib/types";
// import { sql } from "@vercel/postgres";
// import React from "react";

// async function Page() {
//   const { rows: counts } = await sql<CountsResult>`SELECT
//         (SELECT COUNT(*) FROM Chambre) AS nombre_chambres,
//         (SELECT COUNT(*) FROM Personnel) AS nombre_utilisateurs,
//         (SELECT COUNT(*) FROM Client) AS nombre_clients,
//         (SELECT COUNT(*) FROM Reservation) AS nombre_reservations,
//         (SELECT COUNT(*) FROM Hotel) AS nombre_hotels`;

//   const { rows: revenueData } = await sql<{
//     date: Date;
//     revenu_total: number;
//   }>`SELECT
//         DATE(date) AS date,
//         SUM(montant) AS revenu_total
//       FROM
//           paiement
//       GROUP BY
//           DATE(date)
//       ORDER BY
//           DATE(date);`;

//   // Convert the `revenueData` rows into a format expected by `ChartTimes`
//   const chartData = revenueData.map((row) => ({
//     date: `${row.date?.getFullYear()}-${
//       row.date?.getMonth() + 1
//     }-${row.date?.getDate()}`,
//     revenu_total: row.revenu_total,
//   }));

//   return (
//     <div className="flex flex-col">
//       <main className="gap-4 p-4 lg:gap-6 lg:p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
//         <ChartRound
//           nb={counts[0].nombre_chambres}
//           title="Total Chambres"
//           label="chambres"
//         />
//         <ChartRound
//           nb={counts[0].nombre_clients}
//           title="Total Clients"
//           label="clients"
//         />
//         <ChartRound
//           nb={counts[0].nombre_reservations}
//           title="Total Reservations"
//           label="reservations"
//         />
//         <ChartRound
//           nb={counts[0].nombre_utilisateurs}
//           title="Total Utilisateurs"
//           label="utilisateurs"
//         />
//       </main>
//       <div>
//         <ChartTimes chartData={chartData} />
//       </div>
//     </div>
//   );
// }

// export default Page;
import React from "react";

function Page() {
  return <div>Page</div>;
}

export default Page;
