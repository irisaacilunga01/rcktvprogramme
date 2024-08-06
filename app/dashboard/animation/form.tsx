"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { addAnimation, upDateAnimation } from "@/lib/actions";

const FormSchema = z.object({
  programmeid: z.coerce.number().min(2, {
    message: "selectionner un programme !!",
  }),
  presentateurid: z.coerce.number().min(2, {
    message: "selectionner un présentateur !!",
  }),
  role: z.string().min(2, {
    message: "le rôle comporter au-mois 2 caractères.",
  }),
});

export function Formulaire({
  id = 0,
  programmeid = 0,
  presentateurid = 0,
  role = "",

  presentateurs = [
    {
      id: 0,
      nom: "aucun nom",
    },
  ],
  programmes = [
    {
      id: 0,
      titre: "aucun nom",
    },
  ],
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      programmeid,
      presentateurid,
      role,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (id == 0) {
      try {
        await addAnimation(data);
        toast({
          title: "Ajouter",
          description: `l'animation a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout de l'animation`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateAnimation(id, data);
        toast({
          title: "Modifier",
          description: `l'animation a été modifier avec succès`,
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rôle</FormLabel>
              <FormControl>
                <Input
                  placeholder="role de l'animateur pour le programme"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="programmeid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programmes</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programmes.map((pres, index) => (
                    <SelectItem key={index} value={pres.id?.toString()}>
                      {pres.titre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="presentateurid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Présentateur</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {presentateurs.map((pres, index) => (
                    <SelectItem key={index} value={pres.id?.toString()}>
                      {pres.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
