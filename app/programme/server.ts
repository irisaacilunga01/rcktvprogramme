"use server";
import { redirect } from "next/navigation";

export function serverRedirect(params: string) {
  redirect(`/programme/${params}`);
}
