import Image from "next/image";
import Header from "./header";
import { cookies } from "next/headers";
import { Users, verifyToken } from "@/lib/verification";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token")?.value;

  let verificationcookie: Users | null = null;
  if (tokenCookie) {
    verificationcookie = verifyToken(tokenCookie);
  }
  return (
    <main className="w-full flex flex-col">
      <Header nom={verificationcookie?.nom} email={verificationcookie?.email} />
      <div className="p-4 flex justify-center items-center flex-wrap">
        <Image src="/rck.png" width={300} height={300} alt="rck logo" />
        <h1>Consulter programme</h1>
      </div>

      {children}
    </main>
  );
}
