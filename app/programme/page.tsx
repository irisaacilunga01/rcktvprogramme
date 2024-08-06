import PlanningProgress from "@/components/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, verifyToken } from "@/lib/verification";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { sql } from "@vercel/postgres";
import { BellRing, Send } from "lucide-react"; // Assuming you're using the lucide-react icon set
import { cookies } from "next/headers";
import Link from "next/link";
import Commenter from "./commenter";

type PlanningWithDetails = {
  planningid: number;
  heuredebut: string;
  heurefin: string;
  direct: boolean;
  date: string;
  programmeid: number;
  programmenom: string;
  programmedescription: string;
  categorienom: string;
  categoriedescription: string;
  presentateurnom: string;
};

type CommentaireWithAbonnee = {
  commentaireid: number;
  commentairedescription: string;
  commentairedatepub: string;
  abonneenom: string;
  abonneemail: string;
};
//e.target.value?.replace("-", ".")
export default async function Page() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token")?.value;

  let verificationcookie: Users | null = null;
  if (tokenCookie) {
    verificationcookie = verifyToken(tokenCookie);
  }

  const { rows: plannings } = await sql<PlanningWithDetails>`SELECT
      plannings.id AS planningid,
      plannings.heuredebut,
      plannings.heurefin,
      plannings.direct,
      plannings.date,
      programmes.id AS programmeid,
      programmes.titre AS programmenom,
      programmes.description AS programmedescription,
      categories.nom AS categorienom,
      categories.description AS categoriedescription,
      presentateurs.nom AS presentateurnom
    FROM
      plannings
    JOIN
      programmes ON plannings.programmeid = programmes.id
    JOIN
      categories ON programmes.categorieid = categories.id
    JOIN
      animations ON animations.programmeid = programmes.id
    JOIN
      presentateurs ON animations.presentateurid = presentateurs.id
    WHERE
      plannings.date = CURRENT_DATE
    ORDER BY
      plannings.heuredebut;`;

  const planningsWithComments = await Promise.all(
    plannings.map(async (planning) => {
      const { rows: commentaires } = await sql<CommentaireWithAbonnee>` SELECT
          commentaires.id AS commentaireid,
          commentaires.description AS commentairedescription,
          commentaires.datepub AS commentairedatepub,
          abonnees.nom AS abonneenom,
          abonnees.email AS abonneemail
        FROM
          commentaires
        JOIN
          abonnees ON commentaires.abonneid = abonnees.id
        WHERE
          commentaires.programmeid = ${planning.programmeid}
        ORDER BY
          commentaires.datepub DESC;`;

      return { ...planning, commentaires };
    })
  );

  return (
    <div className="grid grid-cols-1 p-4 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full overflow-hidden">
      {planningsWithComments.map((planningWithComments, index) => (
        <Card key={index} className="max-sm:w-full">
          <Tabs defaultValue="programme">
            <TabsList className="grid w-full p-0 grid-cols-3">
              <TabsTrigger value="programme">Programme</TabsTrigger>
              {verificationcookie?.role == "Abonnee" ? (
                <TabsTrigger value="commentaire">Commentaires</TabsTrigger>
              ) : (
                <TabsTrigger value="">
                  <Link href="/login">Se connecter</Link>
                </TabsTrigger>
              )}
              <TabsTrigger value="detail">Détails</TabsTrigger>
            </TabsList>
            <TabsContent value="programme">
              <Card>
                <CardContent className="space-y-2 py-0">
                  <div className="text-primary font-bold">
                    {planningWithComments.programmenom}
                  </div>
                  <PlanningProgress
                    heuredebut={planningWithComments.heuredebut}
                    heurefin={planningWithComments.heurefin}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="commentaire">
              <Card>
                <CardHeader>
                  <CardDescription className="text-bold">
                    <Separator />
                    Voici les commentaires des abonnés pour le programme{" "}
                    {planningWithComments.programmenom}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {planningWithComments.commentaires.map((commentaire) => (
                    <div key={commentaire.commentaireid} className="mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <div className="bg-secondary p-3 rounded-lg">
                            <div className="font-semibold">
                              {commentaire.abonneenom}
                            </div>
                            <div className="text-sm text-gray-600">
                              {commentaire.abonneemail}
                            </div>
                            <p className="mt-1">
                              {commentaire.commentairedescription}
                            </p>
                            <small className="text-xs text-gray-500">
                              Publié le{" "}
                              {new Date(
                                commentaire.commentairedatepub
                              ).toLocaleDateString("fr-FR", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Commenter
                      abonneid={Number(verificationcookie?.id) || 0}
                      programmeid={planningWithComments.programmeid}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="detail">
              <Card>
                <CardHeader>
                  <CardDescription className="text-bold">
                    <Separator />
                    Détails sur le programme {planningWithComments.programmenom}
                    .
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <BellRing />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {planningWithComments.direct
                          ? "En direct"
                          : "En rédiffusion"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {planningWithComments.direct
                          ? "Programme en Direct"
                          : "Programme en Rédiffusion"}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full ${
                        !planningWithComments.direct
                          ? "bg-red-700"
                          : "bg-green-700"
                      }`}
                    />
                  </div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Programme : {planningWithComments.programmenom}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {planningWithComments.programmedescription}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Catégorie : {planningWithComments.categorienom}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {planningWithComments.categoriedescription}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Présentateur(trice)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {planningWithComments.presentateurnom}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      ))}

      {planningsWithComments.length == 0 ? (
        <div className="text-2xl h-24 flex justify-center w-full">
          Aucun programme pour aujourd&apos;hui
        </div>
      ) : null}
    </div>
  );
}
