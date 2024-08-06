import LinkUrl from "@/components/linkUrl";
import { Button } from "@/components/ui/button";
import { SheetContent, Sheet, SheetTrigger } from "@/components/ui/sheet";
import {
  BookMinus,
  Home,
  LineChart,
  MonitorPlay,
  NotebookPen,
  Origami,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Tv,
  UserCog,
  Users,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { Users as User, verifyToken } from "@/lib/verification";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token")?.value;

  let verificationcookie: User | null = null;
  if (tokenCookie) {
    verificationcookie = verifyToken(tokenCookie);
    if (verificationcookie?.role) {
      if (verificationcookie?.role == "Abonnee") {
        redirect("/programme");
      }
    }
  } else {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <LinkUrl
          nom={verificationcookie?.nom}
          email={verificationcookie?.email}
        />
      </aside>
      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/programme"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Tv className="h-5 w-5" />
                  Programme
                </Link>
                <Link
                  href="/dashboard/categorie"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <BookMinus className="h-5 w-5" />
                  Catégorie
                </Link>
                <Link
                  href="/dashboard/planning"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <NotebookPen className="h-5 w-5" />
                  Plannings
                </Link>
                <Link
                  href="/dashboard/presentateur"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Présentateurs
                </Link>
                <Link
                  href="/dashboard/animation"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Origami className="h-5 w-5" />
                  Animations
                </Link>
                <Link
                  href="/dashboard/users"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <UserCog className="h-5 w-5" />
                  Utilisateurs
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
