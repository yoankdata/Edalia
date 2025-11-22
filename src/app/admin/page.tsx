'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

type DemandeProf = {
  id: string;
  nom_complet: string;
  matiere: string;
  niveau: string;
  commune: string;
  tarif_horaire: number | null;
  numero_whatsapp: string;
  email: string | null;
  biographie: string | null;
  statut: string;
  cree_le: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [demandes, setDemandes] = useState<DemandeProf[]>([]);

  // Protection : vérifier que l'utilisateur est bien l'admin
  useEffect(() => {
    async function checkAuth() {
      const { data, error } = await supabaseBrowser.auth.getUser();
      if (error || !data.user) {
        router.replace('/admin/login');
        return;
      }
      setLoadingUser(false);
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (loadingUser) return;

    async function fetchDemandes() {
      setLoadingData(true);
      const { data, error } = await supabaseBrowser
        .from('demandes_professeurs')
        .select('*')
        .order('cree_le', { ascending: false });

      if (error) {
        console.error('Erreur récupération demandes:', error.message);
        setLoadingData(false);
        return;
      }

      setDemandes((data as DemandeProf[]) || []);
      setLoadingData(false);
    }

    fetchDemandes();
  }, [loadingUser]);

  async function handleApprove(demande: DemandeProf) {
    // Créer le professeur dans la table professeurs
    const { error: insertError } = await supabaseBrowser.from('professeurs').insert([
      {
        nom_complet: demande.nom_complet,
        matiere: demande.matiere,
        niveau: demande.niveau,
        commune: demande.commune,
        tarif_horaire: demande.tarif_horaire,
        biographie: demande.biographie,
        photo_url: null,
        numero_whatsapp: demande.numero_whatsapp,
        verifie: true,
      },
    ]);

    if (insertError) {
      console.error('Erreur insertion professeur:', insertError.message);
      return;
    }

    // Mettre à jour la demande comme approuvée
    const { error: updateError } = await supabaseBrowser
      .from('demandes_professeurs')
      .update({ statut: 'approuve' })
      .eq('id', demande.id);

    if (updateError) {
      console.error('Erreur maj demande:', updateError.message);
      return;
    }

    setDemandes((prev) =>
      prev.map((d) =>
        d.id === demande.id ? { ...d, statut: 'approuve' } : d,
      ),
    );
  }

  async function handleReject(demande: DemandeProf) {
    const { error } = await supabaseBrowser
      .from('demandes_professeurs')
      .update({ statut: 'refuse' })
      .eq('id', demande.id);

    if (error) {
      console.error('Erreur maj demande:', error.message);
      return;
    }

    setDemandes((prev) =>
      prev.map((d) =>
        d.id === demande.id ? { ...d, statut: 'refuse' } : d,
      ),
    );
  }

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Vérification de l&apos;accès…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-headline font-semibold">
            Administration Edalia – Professeurs
          </h1>
          <Button
            variant="outline"
            onClick={async () => {
              await supabaseBrowser.auth.signOut();
              router.replace('/admin/login');
            }}
          >
            Se déconnecter
          </Button>
        </div>

        {loadingData ? (
          <p className="text-muted-foreground">Chargement des demandes…</p>
        ) : demandes.length === 0 ? (
          <p className="text-muted-foreground">
            Aucune demande pour l&apos;instant.
          </p>
        ) : (
          <div className="space-y-4">
            {demandes.map((demande) => (
              <Card key={demande.id} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="font-headline text-lg">
                      {demande.nom_complet}{' '}
                      <span className="text-sm text-muted-foreground">
                        — {demande.matiere} ({demande.niveau})
                      </span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {demande.commune} • WhatsApp : {demande.numero_whatsapp}
                      {demande.email && ` • Email : ${demande.email}`}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      demande.statut === 'approuve'
                        ? 'border-green-500 text-green-600'
                        : demande.statut === 'refuse'
                        ? 'border-red-500 text-red-600'
                        : 'border-amber-500 text-amber-600'
                    }
                  >
                    {demande.statut === 'en_attente' && 'En attente'}
                    {demande.statut === 'approuve' && 'Approuvé'}
                    {demande.statut === 'refuse' && 'Refusé'}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {demande.biographie && (
                    <p className="text-sm text-muted-foreground">
                      {demande.biographie}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      disabled={demande.statut !== 'en_attente'}
                      onClick={() => handleApprove(demande)}
                    >
                      Valider & publier
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={demande.statut !== 'en_attente'}
                      onClick={() => handleReject(demande)}
                    >
                      Refuser
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
