import { ModeToggle } from "@/components/layout/ModeToggle";
import { Button } from "@/components/ui/button";
import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import Image from "next/image";

interface HomePageProps{
  params: Promise<{locale:Locale}>
}

export function generateStaticParams(){
  return i18n.locales.map((locale) => ({locale}))
}

export default async function Home({params}:HomePageProps) {

  const { locale } = await params;

  const dict = await getDictionary(locale);

  return (
    
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">

      <h1 className="text-3xl font-bold">{dict.site.title}</h1>
      <p className="text-muted-foreground max-w-xl text-center">
        {dict.site.description}
      </p>
      <ModeToggle/>
    </main>

  );
}
