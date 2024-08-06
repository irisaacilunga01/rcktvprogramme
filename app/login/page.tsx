// // pages/auth/signin.tsx
"use client";
import Image from "next/image";
import "./index.css";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       // Redirige l'utilisateur après une connexion réussie
//       window.location.href = "/dashboard";
//     } else {
//       const data = await response.json();
//       setError(data.error);
//     }
//   };

//   return (
//     <div classNameName="w-full lg:grid lg:grid-cols-2 h-screen justify-center">
//       <div className="flex items-center justify-center h-screen">
//         <div className="mx-auto grid w-[350px] gap-6">
//           <div className="grid gap-2 text-center">
//             <h1 className="text-3xl font-bold">Se connecter</h1>
//             <p className="text-balance text-muted-foreground">
//               Entrer vos informations pour vous connecter
//             </p>
//           </div>
//           <form onSubmit={handleSubmit} className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Mot de passe</Label>
//               </div>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {error && <div className="text-red-500">{error}</div>}
//             <Button type="submit" className="w-full">
//               Connecter
//             </Button>
//             <span className="ml-auto inline-block text-sm">
//               Guest-House-OKAPI
//             </span>
//           </form>
//         </div>
//       </div>
//       <div className="hidden bg-muted lg:block relative">
//         <Image
//           src="/okapi-portrait.jpg"
//           alt="Image"
//           width="1250"
//           height="928"
//           className="h-full w-full object-cover dark:brightness-[0.4]"
//         />
//         <h1 className="text-6xl absolute bottom-0 right-0 left-0 uppercase font-bold justify-center text-green-700 flex gap-2">
//           <span className="text-red-700">Guest</span> House{" "}
//           <span className="text-blue-700">OKAPI</span>
//         </h1>
//       </div>
//     </div>
//   );
// }

// // import Image from "next/image";
// // import Link from "next/link";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";

// // export default function Login() {
// //   return (
// //     <div className="w-full lg:grid  lg:grid-cols-2 h-screen justify-center">
// //       <div className="flex items-center justify-center h-screen">
// //         <div className="mx-auto grid w-[350px] gap-6">
// //           <div className="grid gap-2 text-center">
// //             <h1 className="text-3xl font-bold">Se connecter</h1>
// //             <p className="text-balance text-muted-foreground">
// //               Entrer vos informations pour vous connecter
// //             </p>
// //           </div>
// //           <div className="grid gap-4">
// //             <div className="grid gap-2">
// //               <Label htmlFor="email">Email</Label>
// //               <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="m@example.com"
// //                 required
// //               />
// //             </div>
// //             <div className="grid gap-2">
// //               <div className="flex items-center">
// //                 <Label htmlFor="password">Mot de passe</Label>
// //               </div>
// //               <Input id="password" type="password" required />
// //             </div>
// //             <Button type="submit" className="w-full">
// //               Connecter
// //             </Button>
// //             <span className="ml-auto inline-block text-sm">
// //               Guest-House-OKAPI
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="hidden bg-muted lg:block relative">
// //         <Image
// //           src="/okapi-portrait.jpg"
// //           alt="Image"
// //           width="1250"
// //           height="928"
// //           className="h-full w-full object-cover dark:brightness-[0.4]"
// //         />
// //         <h1 className="text-6xl absolute bottom-0 right-0 left-0 uppercase font-bold justify-center text-green-700 flex gap-2">
// //           <span className="text-red-700">Guest</span> House{" "}
// //           <span className="text-blue-700">OKAPI</span>
// //         </h1>
// //       </div>
// //     </div>
// //   );
// // }

import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { addAbonnee } from "@/lib/actions";
// import "../styles/style.css";

const AuthForm = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleVisible = () => {
    setIsLoginActive((v) => !v);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Redirige l'utilisateur après une connexion réussie

      toast({
        title: "Authentification",
        description: `Authentification avec succès`,
        className: "bg-green-700 text-white",
      });
      window.location.href = "/dashboard";
    } else {
      const data = await response.json();
      setError(data.error);
      toast({
        title: "Authentification",
        description: `Authentification : ${error}`,
        className: "bg-green-700 text-white",
      });
    }
  };

  return (
    <div className="container flex">
      <div className="facebook-page flex">
        <div className="text">
          <Image src="/rck.png" width={300} height={300} alt="rck logo" />

          <p className="text-black">Une église au milieu du village </p>
          <p className="text-black"> votre télévision.</p>
        </div>
        {isLoginActive ? (
          <div className="form">
            <input
              name="nom"
              placeholder="Votre nom & prénom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="text-black"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Votre adresse Email"
              className="text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              name="password"
              placeholder="Password"
              className="text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="link">
              <button
                className="login"
                onClick={async () => {
                  const data = { nom, email, password };
                  try {
                    await addAbonnee(data);
                    const response = await fetch("/api/auth/login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, password }),
                    });

                    if (response.ok) {
                      // Redirige l'utilisateur après une connexion réussie

                      toast({
                        title: "Créeation succès",
                        description: `Compte créé avec succès`,
                        className: "bg-green-700 text-white",
                      });
                      window.location.href = "/dashboard";
                    } else {
                      const data = await response.json();
                      setError(data.error);
                      toast({
                        title: "Authentification Erreur",
                        description: `Authentification : ${error}`,
                        className: "bg-green-700 text-white",
                      });
                    }
                  } catch (e) {
                    toast({
                      title: "Création Erreur",
                      description: `Erreur création compte: contacter le developpeur`,
                      className: "bg-green-700 text-white",
                    });
                  }
                }}
              >
                Créer compte
              </button>
            </div>
            <hr />

            <button
              className="button"
              onClick={() => {
                handleVisible();
              }}
            >
              Se connecter
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <input
              type="email"
              placeholder="Email or phone number"
              className="text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="link">
              <button type="submit" className="login">
                Se connecter
              </button>
            </div>
            <hr />

            <button
              className="button"
              onClick={() => {
                handleVisible();
              }}
            >
              Créer un compte
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
