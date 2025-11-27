// src/app/contact/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, PhoneCall, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact – Kademya',
  description:
    'Contactez l’équipe Kademya pour toute question, demande d’aide ou partenariat.',
};

export default function ContactPage() {
  // Numéro français 07 60 16 49 98 -> +33 7 60 16 49 98
  const whatsappUrl =
    'https://wa.me/33760164998?text=Bonjour%20Kademya%2C%20j%E2%80%99aimerais%20avoir%20plus%20d%E2%80%99informations%20sur%20la%20plateforme.';

  const PRIMARY = '#1A3626';
  const ACCENT = '#6BBD78';

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        {/* HERO / INTRO */}
        <header className="mb-10">
          <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 mb-4">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
            Besoin d&apos;aide ? L&apos;équipe Kademya est là pour toi.
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">
            Contact – <span style={{ color: PRIMARY }}>Kademya</span>
          </h1>

          <p className="max-w-2xl text-sm md:text-base text-gray-700 leading-relaxed">
            Une question, un souci, une idée pour améliorer la plateforme ?
            Tu peux joindre l’équipe Kademya par email, WhatsApp ou via le
            formulaire. Nous te répondons dès que possible.
          </p>
        </header>

        {/* GRID PRINCIPALE */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] items-start">
          {/* COLONNE GAUCHE : EMAILS + WHATSAPP */}
          <section className="space-y-6">
            {/* Bloc emails + explication */}
            <div className="rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm p-5 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                Choisir la bonne adresse
              </h2>

              <div className="space-y-4">
                {/* Assistance */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 flex gap-3">
                  <div className="mt-1">
                    <Mail className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Pour l’aide au quotidien (parents &amp; professeurs)
                    </p>
                    <p className="mt-1 text-xs md:text-sm text-gray-700">
                      Utilise cette adresse si tu as une question sur
                      l’utilisation du site, un problème avec un profil, un avis
                      ou un document.
                    </p>
                    <p className="mt-2 text-xs md:text-sm">
                      Email&nbsp;:{' '}
                      <a
                        href="mailto:assistance.kademya@gmail.com"
                        className="font-medium text-emerald-700 underline"
                      >
                        assistance.kademya@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Contact / Partenariats */}
                <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex gap-3">
                  <div className="mt-1">
                    <PhoneCall className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Pour les écoles, partenaires &amp; demandes officielles
                    </p>
                    <p className="mt-1 text-xs md:text-sm text-gray-700">
                      Utilise cette adresse si tu nous contactes au nom d&apos;une
                      école, d&apos;une association, d&apos;une entreprise ou pour un
                      partenariat.
                    </p>
                    <p className="mt-2 text-xs md:text-sm">
                      Email&nbsp;:{' '}
                      <a
                        href="mailto:contact.kademya@gmail.com"
                        className="font-medium text-emerald-700 underline"
                      >
                        contact.kademya@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloc WhatsApp */}
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-[#25D366] to-[#128C7E] p-[1px] shadow-md">
              <div className="flex flex-col justify-between gap-4 rounded-[1rem] bg-[#0F172A] px-5 py-4 md:flex-row md:items-center">
                <div className="space-y-1">
                  <h2 className="text-sm md:text-base font-semibold text-white flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                      <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    </span>
                    Contacter Kademya sur WhatsApp
                  </h2>
                  <p className="text-xs md:text-sm text-gray-200/80 max-w-sm">
                    Pour une réponse rapide, écris-nous directement sur WhatsApp
                    en cliquant sur le bouton ci-dessous.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-xs md:text-sm font-semibold text-white shadow-lg hover:bg-[#21be59] transition-colors"
                >
                  <span>💬</span>
                  <span>Écrire à Kademya sur WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Lien retour */}
            <div className="mt-2">
              <Link
                href="/"
                className="text-xs md:text-sm text-emerald-700 underline hover:text-emerald-800"
              >
                ← Retour à l&apos;accueil
              </Link>
            </div>
          </section>

          {/* COLONNE DROITE : FORMULAIRE */}
          <section>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                Envoyer un message à l’équipe
              </h2>
              <p className="text-xs md:text-sm text-gray-700 mb-5">
                Tu peux nous laisser un message directement depuis cette page.
                Nous te répondrons par email dès que possible.
              </p>

              {/* Formulaire simple en mailto */}
              <form
                action="mailto:assistance.kademya@gmail.com"
                method="POST"
                encType="text/plain"
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs md:text-sm font-medium text-gray-900 mb-1.5"
                    >
                      Nom et prénom
                    </label>
                    <input
                      id="name"
                      name="Nom"
                      type="text"
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Ex. : Koffi Ahoua"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs md:text-sm font-medium text-gray-900 mb-1.5"
                    >
                      Adresse email
                    </label>
                    <input
                      id="email"
                      name="Email"
                      type="email"
                      required
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Ex. : exemple@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-xs md:text-sm font-medium text-gray-900 mb-1.5"
                  >
                    Je suis
                  </label>
                  <select
                    id="type"
                    name="Profil"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    defaultValue="Parent / Élève"
                  >
                    <option>Parent / Élève</option>
                    <option>Professeur</option>
                    <option>École / Partenaire</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs md:text-sm font-medium text-gray-900 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="Message"
                    required
                    rows={5}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Explique-nous simplement ta situation ou ta question."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-all"
                  style={{ backgroundColor: PRIMARY }}
                >
                  Envoyer mon message
                </button>

                <p className="text-[11px] text-gray-500 leading-snug">
                  En envoyant ce message, tu acceptes que Kademya traite ces
                  informations pour pouvoir te répondre. Pour en savoir plus,
                  consulte la{' '}
                  <Link
                    href="/politique-confidentialite"
                    className="text-emerald-700 underline"
                  >
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
