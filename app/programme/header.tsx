"use client";
import { ModeToggle } from "@/components/toggletheme";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Search, User } from "lucide-react";
import React, { useState } from "react";
// import { serverRedirect } from "./server";

function Header({ nom = "", email = "" }) {
  const [date, setDate] = useState("");
  return (
    <div className="flex gap-2 justify-between p-4 bg-secondary shadow-md">
      <div className="flex gap-2 justify-center items-center">
        {/* <Input
          type="date"
          name="s"
          required
          id="date"
          value={date}
          className="max-sm:w-60"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        /> */}
        <Button
          size="icon"
          className="rounded-full"
          onClick={() => {
            if (date != "") {
            }
          }}
        >
          <Search className="w-6 h-6" />
        </Button>
      </div>
      <div className="flex justify-center items-center">
        <ModeToggle />
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
      </div>
    </div>
  );
}

export default Header;
