import { TypewriterEffect } from "@/components/typewriter-effect";
import { Users, verifyToken } from "@/lib/verification";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token")?.value;

  let verificationcookie: Users | null = null;
  if (tokenCookie) {
    verificationcookie = verifyToken(tokenCookie);
    redirect("/dashboard");
  }
  const words = [
    {
      text: "Tous",
    },
    {
      text: "sur",
    },
    {
      text: "la",
    },
    {
      text: "RCK",
      className: "text-red-500 dark:text-blue-500",
    },
    {
      text: "Tv",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
        Bienvenue sur la page de programme de la RCK tv
      </p>
      <div className="flex gap-4 justify-center items-center">
        <Image src="/rck.png" width={300} height={300} alt="rck logo" />
        <TypewriterEffect words={words} />
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Link href="/programme">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Voir programme
          </button>
        </Link>
        <Link href="/dashboard">
          {" "}
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Se Connecter
          </button>
        </Link>
      </div>
    </div>
  );
}
