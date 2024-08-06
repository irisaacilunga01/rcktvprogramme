import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { handlelogin } from "@/lib/actions";

const SECRET_KEY = "shownew"; // Changez ceci pour une clé plus sécurisée en production

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const { data, role } = await handlelogin({ email, mdp: password });
    // Remplacez ceci par votre logique de vérification

    if (data) {
      // Créer un JWT
      const token = jwt.sign(
        { email, nom: data.nom, id: data.id, role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      // Définir le cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Utiliser 'secure' en production
          sameSite: "strict",
          maxAge: 3600, // 1 heure
          path: "/",
        })
      );

      res.status(200).json({ message: "Connexion réussie" });
    } else {
      res.status(401).json({ error: "Identifiants invalides" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
