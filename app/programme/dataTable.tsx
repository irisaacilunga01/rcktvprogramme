// "use client";

// import * as React from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   ArrowUpDown,
//   ChevronDown,
//   MoreHorizontal,
//   Plus,
//   Pen,
//   Delete,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ReservationResult as Payment } from "@/lib/types";
// import Link from "next/link";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { deleteReservation } from "@/lib/actions";
// import { toast } from "@/components/ui/use-toast";
// export const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "reservation_id",
//     header: "Id",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("reservation_id")}</div>
//     ),
//   },
//   {
//     accessorKey: "jourArr",
//     header: "Jour arrivé",
//     cell: ({ row }) => {
//       return (
//         <div className="capitalize">
//           {row.original.jourarr?.toLocaleDateString("fr-FR", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "jourDep",
//     header: "Jour départ",
//     cell: ({ row }) => {
//       return (
//         <div className="capitalize">
//           {row.original.jourdep?.toLocaleDateString("fr-FR", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           })}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "nbJours",
//     header: "Nombre de jours",

//     cell: ({ row }) => (
//       <div className="capitalize">{row.original.nbjours.toString()}</div>
//     ),
//   },
//   {
//     accessorKey: "reservation",
//     header: "Reservation",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("reservation")}</div>
//     ),
//   },
//   {
//     accessorKey: "nom_client",
//     header: "nom client",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("nom_client")}</div>
//     ),
//   },
//   {
//     accessorKey: "personnel_nom",
//     header: "nom personnel",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("personnel_nom")}</div>
//     ),
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       return (
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <Delete className="h-5 w-5 rounded-full text-white bg-red-800 hover:bg-red-600 p-1" />
//             </Button>
//           </DialogTrigger>

//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle> Suppression reservation</DialogTitle>
//               <DialogDescription>
//                 Etes-vous sur de supprimer {row.original.reservation_id}
//                 définitivement?
//               </DialogDescription>
//             </DialogHeader>

//             <DialogFooter className="justify-end">
//               <DialogClose asChild>
//                 <Button type="button" variant="secondary">
//                   Fermer
//                 </Button>
//               </DialogClose>
//               <Button
//                 variant="destructive"
//                 onClick={async () => {
//                   try {
//                     await deleteReservation(row.original.reservation_id);
//                     toast({
//                       title: "Supprimer",
//                       description: `le reservation ${row.original.reservation_id}  a été supprimer avec succès`,
//                       className: "bg-green-700 text-white",
//                     });
//                   } catch (error) {
//                     toast({
//                       title: "Erreur supprimer",
//                       description: `Erreur lors de la suppression du reservation`,
//                       className: "bg-red-700 text-white",
//                     });
//                   }
//                 }}
//               >
//                 Confirmer
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       );
//     },
//   },
// ];

// export function DataTable({ data }: { data: Payment[] }) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [pageSize, setPageSize] = React.useState(6);
//   const [pageIndex, setPageIndex] = React.useState(0);

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//       pagination: {
//         pageIndex,
//         pageSize,
//       },
//     },
//   });

//   return (
//     <div className="w-full px-4 pt-4">
//       <div className="flex items-center pb-4">
//         <Input
//           placeholder="Rechercher Reservation..."
//           value={
//             (table.getColumn("reservation")?.getFilterValue() as string) ?? ""
//           }
//           onChange={(event) =>
//             table.getColumn("reservation")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   Aucun resultat.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-end space-x-2 py-4">
//         <div className="flex-1 text-sm text-muted-foreground">
//           Total : {table.getFilteredRowModel().rows.length} reservations.
//         </div>
//         <div className="space-x-2">
//           <Button
//             variant="outline"
//             onClick={() => {
//               setPageIndex((prevPageIndex) => prevPageIndex - 1);
//               table.previousPage();
//             }}
//             disabled={!table.getCanPreviousPage()}
//             size="icon"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => {
//               setPageIndex((prevPageIndex) => prevPageIndex + 1);
//               table.nextPage();
//             }}
//             disabled={!table.getCanNextPage()}
//             size="icon"
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
