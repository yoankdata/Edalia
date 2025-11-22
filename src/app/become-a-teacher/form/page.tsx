import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

async function createTeacherCandidate(formData: FormData) {
  'use server';

  const nom_complet = (formData.get('nom_complet') as string | null)?.trim() ?? '';
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const matiere = (formData.get('matiere') as string | null)?.trim() ?? '';
  const niveau = (formData.get('niveau') as string | null)?.trim() ?? '';
  const commune = (formData.get('commune') as string | null)?.trim() ?? '';
  const numero_whatsapp = (formData.get('numero_whatsapp') as string | null)?.trim() ?? '';
  const tarif_horaire_raw = formData.get('tarif_horaire') as string | null;
  const biographie = (formData.get('biographie') as string | null)?.trim() ?? '';

  const tarif_horaire =
    tarif_horaire_raw && tarif_horaire_raw !== ''
      ? Number(tarif_horaire_raw)
      : null;

  if (!nom_complet || !matiere || !niveau || !commune || !numero_whatsapp) {
    // On pourrait gérer un message d'erreur plus tard
    return;
  }

  const { error } = await supabase.from('demandes_professeurs').insert([
    {
      nom_complet,
      email: email || null,
      matiere,
      niveau,
      commune,
      numero_whatsapp,
      tarif_horaire,
      biographie: biographie || null,
    },
  ]);

  if (error) {
    console.error('Erreur insertion demande professeur :', error.message);
    return;
  }

  redirect('/become-a-teacher/form?submitted=1');
}

type PageProps = {
  searchParams: {
    submitted?: string;
  };
};

export default function TeacherFormPage({ searchParams }: PageProps) {
  const submitted = searchParams.submitted === '1';

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-3xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-headline font-semibold">
            Créer mon profil enseignant
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Remplissez ce formulaire pour rejoindre Edalia. Nous vérifions chaque profil
            manuellement avant publication pour garantir la confiance des familles.
          </p>
        </div>

        {submitted && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
            Votre demande a bien été envoyée. Nous vous contacterons sous 24h pour finaliser
            la vérification de votre profil.
          </div>
        )}

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline text-xl">
              Informations principales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createTeacherCandidate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nom_complet">Nom complet</Label>
                  <Input id="nom_complet" name="nom_complet" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse e-mail (optionnel)</Label>
                  <Input id="email" name="email" type="email" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="matiere">Matière principale</Label>
                  <Input
                    id="matiere"
                    name="matiere"
                    placeholder="Mathématiques, Français..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="niveau">Niveau</Label>
                  <Input
                    id="niveau"
                    name="niveau"
                    placeholder="Primaire, Collège, Lycée, Supérieur..."
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="commune">Commune</Label>
                  <Input
                    id="commune"
                    name="commune"
                    placeholder="Cocody, Yopougon, Marcory..."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tarif_horaire">Tarif horaire (FCFA)</Label>
                  <Input
                    id="tarif_horaire"
                    name="tarif_horaire"
                    type="number"
                    min={0}
                    placeholder="6000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numero_whatsapp">Numéro WhatsApp</Label>
                <Input
                  id="numero_whatsapp"
                  name="numero_whatsapp"
                  placeholder="2250700000000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="biographie">Présentez-vous</Label>
                <Textarea
                  id="biographie"
                  name="biographie"
                  rows={5}
                  placeholder="Parlez de votre expérience, de votre façon d’enseigner, des niveaux que vous prenez en charge..."
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" size="lg">
                  Envoyer ma candidature
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
