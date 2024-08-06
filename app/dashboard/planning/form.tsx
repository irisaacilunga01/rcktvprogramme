"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { addPlanning, upDatePlanning } from "@/lib/actions";
import { useState } from "react";

const FormSchema = z.object({
  heuredebut: z.string().min(2, {
    message: "le titre doit contenir aumoins 2 caractères.",
  }),
  heurefin: z.string().min(2, {
    message: "le duree doit être différente de zéro.",
  }),
  direct: z.boolean({
    message: "la description doit contenir aumoins 2 caractères.",
  }),
  date: z.string({
    message: "la date doit contenir être définit.",
  }),
  programmeid: z.coerce.number({
    message: "selectionner le planning votre programme",
  }),
});

export function Formulaire({
  id = 0,
  heuredebut = "",
  heurefin = "",
  date = "",
  direct = false,
  programmeid = 0,
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
      heuredebut,
      heurefin,
      direct,
      date,
      programmeid,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (id == 0) {
      try {
        await addPlanning(data);
        toast({
          title: "Ajouter",
          description: `le planning pour le programme ${data.programmeid}  a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du planning`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDatePlanning(id, data);
        toast({
          title: "Modifier",
          description: `le planning N°${id} a été modifier avec succès`,
          className: "bg-blue-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur modifification",
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
          name="programmeid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Programme</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner un programme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programmes.map((prog, index) => (
                    <SelectItem key={index} value={prog.id?.toString()}>
                      {prog.titre}
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
          name="heuredebut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heure début</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heurefin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heure fin</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de diffusion</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="direct"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <FormLabel className="text-base">
                {field.value == true
                  ? "Programme En direct"
                  : "Programme en redifusion"}
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
