"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { addPresentateur, upDatePresentateur } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  nom: z.string().min(2, {
    message: "le nom doit contenir aumoins 2 caractères.",
  }),
  genre: z.string().min(2, {
    message: "le genre doit contenir aumoins 2 caractères.",
  }),
  bibliographie: z.string().min(2, {
    message: "le genre doit contenir aumoins 2 caractères.",
  }),
});

export function Formulaire({
  id = 0,
  nom = "",
  genre = "",
  bibliographie = "",
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nom,
      genre,
      bibliographie,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (id == 0) {
      try {
        await addPresentateur(data);
        toast({
          title: "Ajouter",
          description: `le présentateur ${data.nom}  a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du présentateur`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDatePresentateur(id, data);
        toast({
          title: "Modifier",
          description: `le présentateur ${data.nom}  a été modifier avec succès`,
          className: "bg-blue-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur modifier",
          description: `Erreur lors de la modification`,
          className: "bg-red-700 text-white",
        });
      }
    }
    handleHidden();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner votre genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem key={1} value="Homme">
                    Homme
                  </SelectItem>
                  <SelectItem key={1} value="Femme">
                    Femme
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bibliographie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bibliographie</FormLabel>
              <FormControl>
                <Input placeholder="une bref présentation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={hidden} aria-disabled={hidden}>
          soumettre
        </Button>
      </form>
    </Form>
  );
}
