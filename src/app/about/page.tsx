import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { findImage } from '@/lib/placeholder-data';
import { Pattern } from '@/components/pattern';

const aboutImage = findImage('about-us');

export default function AboutPage() {
  return (
    <div className="bg-background">
      
      {/* ======================== HEADER ======================== */}
      <header className="relative bg-white py-16 md:py-24 overflow-hidden border-b">
        <div className="absolute inset-0 opacity-[.04]">
          <Pattern />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            À Propos d'Edalia
          </h1>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Edalia connecte les professeurs passionnés et les élèves motivés, pour construire
            une communauté d’apprentissage moderne, fiable et accessible à Abidjan.
          </p>
        </div>
      </header>

      {/* ======================== MAIN ======================== */}
      <main className="container mx-auto px-4 py-16 md:py-24 space-y-24">
        
        {/* ======================== HISTOIRE ======================== */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Notre Histoire
            </h2>
            <p className="text-foreground/70 mb-4 leading-relaxed">
              Edalia est née d’une conviction : l’éducation doit être accessible, moderne et
              adaptée aux réalités d’Abidjan. Nous avons observé des professeurs talentueux,
              passionnés, et des élèves désireux de progresser — mais souvent sans moyen simple
              pour se rencontrer.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Nous avons construit Edalia comme un espace humain, transparent et utile.
              Chaque professeur est vérifié, chaque parent peut comparer, contacter et choisir 
              en toute confiance. Pas de commission, pas d’intermédiaire : juste la rencontre 
              entre savoir-faire et envie d’apprendre.
            </p>
          </div>

          <div className="flex justify-center">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={580}
                height={400}
                className="rounded-xl object-cover shadow-subtle"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </section>

        {/* ======================== MISSION ======================== */}
        <section className="text-center bg-secondary py-16 rounded-xl relative overflow-hidden shadow-subtle">
          <div className="absolute inset-0 opacity-[.04]">
            <Pattern />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Notre Mission
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Offrir à chaque élève d’Abidjan un accès rapide et fiable à un enseignement de qualité,
              et permettre à chaque professeur de valoriser son expertise sans contraintes.
              Edalia facilite le soutien scolaire avec une approche humaine, locale, et transparente —
              pensée pour le quotidien des familles et des enseignants.
            </p>
          </div>
        </section>

        {/* ======================== CONTACT ======================== */}
        <section id="contact" className="text-center">
          <h2 className="font-headline text-3xl font-bold text-primary mb-4">
            Contactez-nous
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Vous avez des questions ou souhaitez collaborer avec nous ?  
            L’équipe Edalia vous répond avec plaisir.
          </p>

          <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
            
            {/* EMAIL */}
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-accent/10 rounded-full shadow-subtle">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-muted-foreground">Nous écrire</p>
              <a href="mailto:contact@edalia.ci" className="text-primary font-medium hover:underline">
                contact@edalia.ci
              </a>
            </div>

            {/* TÉLÉPHONE */}
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-accent/10 rounded-full shadow-subtle">
                <Phone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Téléphone</h3>
              <p className="text-muted-foreground">Lun–Ven, 9h–17h</p>
              <a href="tel:+2250712345678" className="text-primary font-medium hover:underline">
                +225 07 12 34 56 78
              </a>
            </div>

            {/* ADRESSE */}
            <div className="flex flex-col items-center space-y-3">
              <div className="p-3 bg-accent/10 rounded-full shadow-subtle">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-semibold text-lg">Bureau</h3>
              <p className="text-muted-foreground">Cocody Angré</p>
              <p className="text-primary font-medium">Abidjan, Côte d'Ivoire</p>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
