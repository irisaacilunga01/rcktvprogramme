import jwt from "jsonwebtoken";

// Définir le type pour les données du payload du JWT
export type Users = {
  id: string;
  email: string;
  nom: string;
  role: string;
};

const SECRET_KEY = "shownew";

// Fonction pour décoder le JWT en utilisant le type `Users`
export function verifyToken(token: string): Users | null {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as Users;
    return decoded;
  } catch (err) {
    return null;
  }
}
