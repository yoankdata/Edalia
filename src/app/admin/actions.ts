// src/app/become-a-teacher/form/actions.ts
'use server';

import { supabase } from '@/lib/supabase';
import { sendMail } from '@/lib/mail';
import {
  TeacherFormState,
  TeacherFormValues,
  sanitize,
  validate,
} from './form-state';

// Mail à l'admin pour chaque nouvelle demande
async function notifyAdminNewCandidate(values: TeacherFormValues) {
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL ?? 'ykilolo77@gmail.com';

  const subject = 'Nouvelle demande professeur – Kademya';

  const textLines = [
    'Une nouvelle demande professeur vient d’être soumise sur Kademya.',
    '',
    `Nom : ${values.nom_complet}`,
    `Matière : ${values.matiere}`,
    `Niveau : ${values.niveau}`,
    `Commune : ${values.commune}`,
    `WhatsApp : ${values.numero_whatsapp}`,
    values.email ? `Email : ${values.email}` : '',
    values.tarif_horaire
      ? `Tarif souhaité : ${values.tarif_horaire} FCFA / h`
      : '',
    '',
    'Connectez-vous à votre espace admin pour traiter cette demande.',
  ].filter(Boolean);

  try {
    await sendMail({
      to: adminEmail,
      subject,
      text: textLines.join('\n'),
    });
  } catch (err) {
    console.error('[Kademya] Erreur envoi email admin :', err);
  }
}

// Server Action utilisée par useActionState
export async function createTeacherCandidate(
  _prevState: TeacherFormState,
  formData: FormData
): Promise<TeacherFormState> {
  // 1) Nettoyage + validation
  const values = sanitize(formData);
  const errors = validate(values);

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      values,
    };
  }

  // 2) Conversion tarif
  const tarifNumber = values.tarif_horaire
    ? Number(values.tarif_horaire)
    : null;

  // 3) Insertion dans demandes_professeurs
  const { error } = await supabase.from('demandes_professeurs').insert([
    {
      nom_complet: values.nom_complet,
      email: values.email || null,
      matiere: values.matiere,
      niveau: values.niveau,
      commune: values.commune,
      numero_whatsapp: values.numero_whatsapp,
      tarif_horaire: tarifNumber,
      biographie: values.biographie || null,
      statut: 'en_attente',
    },
  ]);

  if (error) {
    console.error('Erreur insertion demande professeur :', error.message);

    return {
      success: false,
      errors: {
        ...errors,
        global:
          "Une erreur est survenue lors de l'envoi de votre demande. Merci de réessayer.",
      },
      values,
    };
  }

  // 4) Notification admin (non bloquant pour l’utilisateur)
  await notifyAdminNewCandidate(values);

  // 5) Succès : on retourne un state avec success = true
  // (le composant client affiche alors l’écran de succès)
  return {
    success: true,
    errors: {},
    values,
  };
}
