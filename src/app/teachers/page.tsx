// src/app/teachers/page.tsx
import { supabase } from '@/lib/supabase';
import { TeacherCard } from '@/components/teacher-card';

type ProfesseurRow = {
  id: string;
  nom_complet: string;
  matiere: string;
  niveau: string;
  tarif_horaire: number;
  commune: string;
  biographie: string | null;
  photo_url: string | null;
  numero_whatsapp: string;
  verifie: boolean;
  cree_le: string;
};

export default async function TeachersPage() {
  // Lecture de la table Supabase
  const { data, error } = await supabase
    .from('professeurs')
    .select('*')
    .order('cree_le', { ascending: false });

  if (error) {
    console.error('Erreur Supabase:', error.message);
    return (
      <div className="container py-16">
        <h1 className="text-3xl md:text-4xl font-headline font-semibold mb-4">
          Nos professeurs
        </h1>
        <p className="text-muted-foreground">
          Impossible de charger les professeurs pour le moment.
        </p>
      </div>
    );
  }

  const rows = (data ?? []) as ProfesseurRow[];

  // Transformer les lignes Supabase → format TeacherCard
  const teachersForCard = rows.map((p) => ({
    id: p.id,
    name: p.nom_complet,
    location: p.commune,
    subjects: [p.matiere, p.niveau],
    rate: p.tarif_horaire,
    whatsappNumber: p.numero_whatsapp,
    rating: 5.0,
    photoUrl: p.photo_url,
    verified: p.verifie,
  }));

  return (
    <div className="container py-16">
      <h1 className="text-3xl md:text-4xl font-headline font-semibold mb-6">
        Nos professeurs à Abidjan
      </h1>

      <p className="text-muted-foreground mb-10 max-w-2xl">
        Découvrez des enseignants vérifiés, disponibles pour accompagner vos enfants à domicile ou en ligne.
      </p>

      {teachersForCard.length === 0 ? (
        <p className="text-muted-foreground">
          Aucun professeur n&apos;est encore inscrit.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachersForCard.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>
      )}
    </div>
  );
}
