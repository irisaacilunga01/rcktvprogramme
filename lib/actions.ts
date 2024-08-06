"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  Abonne,
  Animation,
  Category,
  Commentaire,
  Planning,
  Presentateur,
  Programme,
  User,
} from "./types";
function revalidate() {
  revalidatePath("/dashboard/categorie");
  revalidatePath("/dashboard/programme");
  revalidatePath("/dashboard/planning");
  revalidatePath("/dashboard/presentateur");
  revalidatePath("/dashboard/animation");
  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard");
  revalidatePath("/programme");
}
export async function addAbonnee(data: Omit<Abonne, "id">) {
  const { nom, datenais, email, etatcivil, genre, password } = data;
  try {
    await sql`
    INSERT INTO abonnees (nom, datenais, email, etatcivil, genre, password)
    VALUES (${nom}, ${datenais}, ${email}, ${etatcivil}, ${genre}, ${password});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
}
export async function addCategorie(data: Omit<Category, "id">) {
  const { nom, description } = data;
  try {
    await sql`
    INSERT INTO categories (nom, description)
    VALUES (${nom}, ${description});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/categorie");
}
export async function upDateCategorie(id: number, data: Omit<Category, "id">) {
  const { nom, description } = data;
  try {
    await sql`
    UPDATE categories
SET nom = ${nom},
    description = ${description}
WHERE id = ${id};`;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/categorie");
}
export async function deleteCategorie(id: number) {
  try {
    await sql`
    DELETE FROM categories
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/categorie");
}

export async function addProgramme(data: Omit<Programme, "id">) {
  const { categorieid, description, duree, titre } = data;
  try {
    await sql`
    INSERT INTO programmes (titre,duree,description,categorieid)
    VALUES (${titre},${duree},${description},${categorieid});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }

  revalidate();
  redirect("/dashboard/programme");
}
export async function upDateProgramme(id: number, data: Omit<Programme, "id">) {
  const { categorieid, description, duree, titre } = data;
  try {
    await sql`
    UPDATE programmes
SET titre = ${titre},
duree=${duree},
    description = ${description},
  categorieid= ${categorieid}
WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/programme");
}
export async function deleteProgramme(id: number) {
  try {
    await sql`
    DELETE FROM programmes
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/programme");
}

export async function addPlanning(data: Omit<Planning, "id">) {
  const { direct, heuredebut, heurefin, programmeid, date } = data;
  try {
    await sql`
    INSERT INTO plannings (direct,heuredebut,heurefin,programmeid,date)
    VALUES (${direct},${heuredebut},${heurefin},${programmeid},${date});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }

  revalidate();
  redirect("/dashboard/planning");
}
export async function upDatePlanning(id: number, data: Omit<Planning, "id">) {
  const { direct, heuredebut, heurefin, programmeid, date } = data;
  try {
    await sql`
    UPDATE plannings
SET direct=${direct},heuredebut=${heuredebut},heurefin=${heurefin},programmeid=${programmeid} ,date=${date}
WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/planning");
}
export async function deletePlanning(id: number) {
  try {
    await sql`
    DELETE FROM plannings
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/planning");
}

export async function addPresentateur(data: Omit<Presentateur, "id">) {
  const { nom, genre, bibliographie } = data;
  try {
    await sql`
    INSERT INTO presentateurs (nom,genre,bibliographie)
    VALUES (${nom},${genre},${bibliographie});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }

  revalidate();
  redirect("/dashboard/presentateur");
}
export async function upDatePresentateur(
  id: number,
  data: Omit<Presentateur, "id">
) {
  const { nom, genre, bibliographie } = data;
  try {
    await sql`
    UPDATE presentateurs
SET nom=${nom},genre=${genre},bibliographie=${bibliographie} 
WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/presentateur");
}
export async function deletePresentateur(id: number) {
  try {
    await sql`
    DELETE FROM presentateurs
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/presentateur");
}

export async function addAnimation(data: Omit<Animation, "id">) {
  const { presentateurid, programmeid, role } = data;
  try {
    await sql`
    INSERT INTO animations (presentateurid,programmeid,role)
    VALUES (${presentateurid},${programmeid},${role});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }

  revalidate();
  redirect("/dashboard/animation");
}
export async function upDateAnimation(id: number, data: Omit<Animation, "id">) {
  const { presentateurid, programmeid, role } = data;
  try {
    await sql`
    UPDATE animations
SET presentateurid=${presentateurid},programmeid=${programmeid},role=${role} 
WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/animation");
}
export async function deleteAnimation(id: number) {
  try {
    await sql`
    DELETE FROM animations
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/animation");
}

export async function addUser(data: Omit<User, "id">) {
  const { nom, email, password } = data;
  try {
    await sql`
    INSERT INTO users (nom, email, password)
    VALUES (${nom}, ${email}, ${password});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}
export async function upDateUser(id: number, data: Omit<User, "id">) {
  const { nom, email, password } = data;
  try {
    await sql`
    UPDATE users
SET nom = ${nom},
    email = ${email},
    password = ${password}
WHERE id = ${id};  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}
export async function deleteUser(id: number) {
  try {
    await sql`
    DELETE FROM users
    WHERE id = ${id};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/users");
}

export async function addCOmmentaire(data: Omit<Commentaire, "id">) {
  const { abonneid, datepub, description, programmeid } = data;
  try {
    await sql`
    INSERT INTO commentaires (abonneid,datepub,description,programmeid)
    VALUES (${abonneid},${datepub},${description},${programmeid});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
}

export async function handlelogin(data: { email: string; mdp: string }) {
  const { email, mdp } = data;

  const { rows, rowCount } =
    await sql<Abonne>`SELECT * from abonnees WHERE email=${email} AND password=${mdp};`;
  if (rowCount != null && rowCount >= 1) {
    const { id, nom } = rows[0];

    return {
      data: {
        id,
        nom,
      },
      role: "Abonnee",
    };
  } else {
    const { rows, rowCount } =
      await sql<User>`SELECT * from users WHERE email=${email} AND password=${mdp};`;

    if (rowCount != null && rowCount >= 1) {
      const { id, nom } = rows[0];
      return {
        data: {
          id,
          nom,
        },
        role: "Admin",
      };
    } else {
      return {
        data: {},
        role: "",
      };
    }
  }
}
