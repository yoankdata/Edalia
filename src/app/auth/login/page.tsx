

import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-md space-y-8">

        {/* En-tête visuel */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Logo />
          <div>
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
              Portail enseignant
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Connectez-vous pour gérer votre profil, vos informations et votre abonnement Kademya.
            </p>
          </div>
        </div>

        {/* Carte de connexion */}
        <Card className="shadow-lg border border-border/70">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Connexion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Adresse e-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@example.com"
                  autoComplete="email"
                />
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>

              {/* Bouton principal */}
              <Button type="submit" className="w-full mt-2">
                <Lock className="h-4 w-4 mr-2" />
                Se connecter
              </Button>
            </form>

            {/* Lien vers inscription prof */}
            <p className="mt-6 text-xs text-muted-foreground text-center">
              Pas encore de compte enseignant ?{' '}
              <Link
                href="/become-a-teacher"
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Devenir prof sur Kademya
              </Link>
            </p>

            {/* Note provisoire */}
            <p className="mt-3 text-[11px] text-muted-foreground text-center">
              Cette page est pour l’instant une maquette visuelle. L’authentification sera branchée
              plus tard (Supabase / autre système).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
