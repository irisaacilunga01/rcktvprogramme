"use client";
import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function LogoutButton() {
  return (
    <Button
      variant="link"
      onClick={async () => {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          // Redirige l'utilisateur après une connexion réussie
          window.location.href = "/";
        }
      }}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
    >
      <LogOut className="h-4 w-4" />
      Se déconnecter
    </Button>
  );
}
