"use client";

import {
  BookMinus,
  Home,
  LineChart,
  MonitorPlay,
  NotebookPen,
  Origami,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Tv,
  User,
  UserCog,
  Users,
  Users2,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "./ui/use-toast";

function LinkUrl({ nom = "", email = "" }) {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <MonitorPlay className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Rck tv</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard" ? "bg-muted text-primary" : null
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/programme"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/programme"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <Tv className="h-5 w-5" />
                <span className="sr-only">Programme</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Programmes</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/categorie"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/categorie"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <BookMinus className="h-5 w-5" />
                <span className="sr-only">Catégorie</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Catégories</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/planning"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/planning"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <NotebookPen className="h-5 w-5" />

                <span className="sr-only">Plannings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Plannings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/presentateur"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/presentateur"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="sr-only">Présentateurs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Présentateurs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/animation"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/animation"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <Origami className="h-5 w-5" />
                <span className="sr-only">Animations</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Animations</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/users"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/users"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <UserCog className="h-5 w-5" />
                <span className="sr-only">Utilisateurs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Utilisateurs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-7 h-7 bg-blue-700 cursor-pointer" asChild>
              <User className="p-1" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{nom}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-[10px] font-thin">
              {email}
            </DropdownMenuLabel>
            {/* <DropdownMenuItem>Reglage</DropdownMenuItem>
            <DropdownMenuItem>à propos</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const response = await fetch("/api/auth/logout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                  // Redirige l'utilisateur après une connexion réussie
                  toast({
                    title: "Déconnexion",
                    description: `Déconnexion avec succès`,
                    className: "bg-green-700 text-white",
                  });
                  window.location.href = "/dashboard";
                } else {
                  toast({
                    title: "Erreur déconnetion",
                    description: `Déconnexion erreur`,
                    className: "bg-green-700 text-white",
                  });
                }
              }}
            >
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}

export default LinkUrl;
