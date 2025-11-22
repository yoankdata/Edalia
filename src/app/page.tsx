import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Search, Star, Verified, Phone, ShieldCheck, Banknote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TeacherCard } from '@/components/teacher-card';
import { teachers, findImage } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Pattern } from '@/components/pattern';

const heroImage = findImage('hero-image');
const featuredTeachers = teachers.slice(0, 3);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 opacity-[.06]">
            <Pattern />
          </div>
          <div className="container mx-auto px-4 md:px-6 py-28 md:py-40 grid md:grid-cols-2 gap-x-12 gap-y-8 items-center relative">


            {/* LEFT SIDE */}
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-headline font-semibold">
                Trouvez un professeur fiable à Abidjan en 2 minutes
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Professeurs vérifiés • Sans commission • Contact direct WhatsApp
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/teachers">Voir les profs</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/become-a-teacher">Devenir Prof</Link>
                </Button>
              </div>
            </div>

            {/* HERO IMAGE — FIXED, NOT DEFORMED */}
            <div className="flex justify-center md:justify-end">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={520}       // Largeur propre
                  height={360}      // Ratio équilibré
                  className="rounded-2xl object-contain shadow-xl"
                  priority
                />
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold">Comment ça marche ?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">C'est simple comme bonjour.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-x-8 gap-y-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-secondary p-4 rounded-full">
                  <Search className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-headline font-semibold">1. Cherchez</h3>
                <p className="text-muted-foreground">Parcourez les profils de profs vérifiés par matière et par commune.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-secondary p-4 rounded-full">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-headline font-semibold">2. Choisissez</h3>
                <p className="text-muted-foreground">Consultez les profils détaillés avec les tarifs, les avis et les diplômes.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-secondary p-4 rounded-full">
                  <Phone className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-headline font-semibold">3. Contactez</h3>
                <p className="text-muted-foreground">Échangez directement avec le prof sur WhatsApp pour fixer le cours.</p>
              </div>
            </div>
            <div className="text-center mt-16 max-w-2xl mx-auto">
              <Badge variant="outline" className="text-base px-4 py-2 border-accent text-accent bg-accent/10">
                <Verified className="w-5 h-5 mr-2" />
                Tous les professeurs sont vérifiés par Edalia
              </Badge>
              <p className="text-sm text-muted-foreground mt-4">
                Chaque professeur est vérifié via pièce d’identité et une vérification manuelle de son expérience pour garantir la fiabilité.
              </p>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-20 md:py-28 bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-[.06]">
            <Pattern />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold">Sécurité & Confiance</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Votre tranquillité d'esprit est notre priorité.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center shadow-md">
                <CardContent className="p-8 flex flex-col items-center space-y-3">
                  <div className="bg-secondary p-3 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold font-headline text-lg">Vérification Manuelle</h3>
                  <p className="text-muted-foreground text-sm">
                    Chaque profil est examiné par notre équipe pour assurer la qualité et la sécurité.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-md">
                <CardContent className="p-8 flex flex-col items-center space-y-3">
                  <div className="bg-secondary p-3 rounded-full">
                    <Banknote className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold font-headline text-lg">Aucun Paiement en Ligne</h3>
                  <p className="text-muted-foreground text-sm">
                    Vous payez directement le professeur. Pas de transactions sur notre site.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-md">
                <CardContent className="p-8 flex flex-col items-center space-y-3">
                  <div className="bg-secondary p-3 rounded-full">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold font-headline text-lg">Contact Direct</h3>
                  <p className="text-muted-foreground text-sm">
                    Discutez directement et en toute sécurité avec l'enseignant via WhatsApp.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Teachers Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold">Nos professeurs à la une</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Découvrez quelques-uns de nos enseignants les plus appréciés.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>

            <div className="text-center mt-16">
              <Button size="lg" asChild>
                <Link href="/teachers">Voir tous les profs</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
