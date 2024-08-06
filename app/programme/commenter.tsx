"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { addCOmmentaire } from "@/lib/actions";
import { Send } from "lucide-react";
import React, { useState } from "react";

function Commenter({ abonneid = 0, programmeid = 0 }) {
  const [description, setDescription] = useState("");
  const hadlecommente = async () => {
    const datepub = new Date().toDateString();
    const data = { abonneid, datepub, description, programmeid };
    console.log({ data });

    try {
      await addCOmmentaire(data);
      setDescription("");
      toast({
        title: "Ajouter",
        description: `le programme  a été commenté avec succès`,
        className: "bg-green-700 text-white",
      });
    } catch (error) {
      toast({
        title: "Erreur ajouter",
        description: `erreur d'ajout du commrntaire`,
        className: "bg-red-700 text-white",
      });
    }
  };
  return (
    <>
      <Input
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Écrire un commentaire..."
        className="flex-1"
      />
      <Button
        onClick={() => {
          hadlecommente();
        }}
      >
        <Send className="h-4 w-4" />
      </Button>
    </>
  );
}

export default Commenter;
