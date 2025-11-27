// src/app/become-a-teacher/form/actions.ts
'use server';

import { supabase } from '@/lib/supabase';
import { sendMail } from '@/lib/mail';
import {
  TeacherFormState,
  TeacherFormValues,
  sanitize,
  validate,
  initialFormState,
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

export async function createTeacherCandidate(
  _prevState: TeacherFormState,
  formData: FormData,
): Promise<TeacherFormState> {
  try {
    // 1. Nettoyage / validation
    const values = sanitize(formData);
    const errors = validate(values);

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        errors,
        values,
      };
    }

    // 2. Fichiers
    const idDocument = formData.get('id_document') as File | null;
    const diplomeDocument = formData.get('diplome_document') as File | null;
    const photoProfil = formData.get('photo_profil') as File | null;

    if (!idDocument || idDocument.size === 0) {
      return {
        success: false,
        errors: {
          ...errors,
          global: 'La pièce d’identité est obligatoire.',
        },
        values,
      };
    }

    if (!diplomeDocument || diplomeDocument.size === 0) {
      return {
        success: false,
        errors: {
          ...errors,
          global: 'Le diplôme ou l’attestation est obligatoire.',
        },
        values,
      };
    }

    const tarifNumber = values.tarif_horaire
      ? Number(values.tarif_horaire)
      : null;

    // 3. Insertion dans demandes_professeurs (sans les paths pour l'instant)
    const { data: demande, error: insertError } = await supabase
      .from('demandes_professeurs')
      .insert([
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
      ])
      .select('id')
      .single();

    if (insertError || !demande) {
      console.error(
        '[Kademya] Erreur insertion demande professeur :',
        insertError,
      );

      let globalMessage =
        "Une erreur est survenue lors de l'envoi de votre demande. Merci de réessayer.";

      if (insertError) {
        const code = (insertError as any).code as string | undefined;

        if (code === '23505') {
          globalMessage =
            'Une demande existe déjà avec ces informations (probablement le même numéro WhatsApp ou email).';
        } else if (code === '23502') {
          globalMessage =
            "Un champ obligatoire est manquant côté base de données : " +
            insertError.message;
        } else if (code === '42501') {
          globalMessage =
            "Problème de permissions Supabase (RLS) sur la table 'demandes_professeurs'.";
        } else if (insertError.message) {
          globalMessage = insertError.message;
        }
      }

      return {
        success: false,
        errors: {
          ...errors,
          global: globalMessage,
        },
        values,
      };
    }

    const demandeId = demande.id as string;

    // 4. Upload des documents dans Storage
    let idDocumentPath: string | null = null;
    let diplomeDocumentPath: string | null = null;
    let photoProfilPath: string | null = null;

    const getExtension = (file: File) => {
      const parts = file.name.split('.');
      return parts.length > 1 ? parts[parts.length - 1] : 'pdf';
    };

    // Pièce d’identité -> bucket teacher-documents
    try {
      const idExt = getExtension(idDocument);
      const idPath = `demande_${demandeId}/identite.${idExt}`;

      const { data: uploadIdData, error: uploadIdError } = await supabase.storage
        .from('teacher-documents')
        .upload(idPath, idDocument, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadIdError) {
        console.error(
          '[Kademya] Erreur upload pièce identité :',
          uploadIdError.message,
        );
      } else if (uploadIdData?.path) {
        idDocumentPath = uploadIdData.path;
      }
    } catch (err) {
      console.error('[Kademya] Exception upload pièce identité :', err);
    }

    // Diplôme / attestation -> bucket teacher-documents
    try {
      const diplomeExt = getExtension(diplomeDocument);
      const diplomePath = `demande_${demandeId}/diplome.${diplomeExt}`;

      const { data: uploadDiplomeData, error: uploadDiplomeError } =
        await supabase.storage
          .from('teacher-documents')
          .upload(diplomePath, diplomeDocument, {
            cacheControl: '3600',
            upsert: true,
          });

      if (uploadDiplomeError) {
        console.error(
          '[Kademya] Erreur upload diplôme :',
          uploadDiplomeError.message,
        );
      } else if (uploadDiplomeData?.path) {
        diplomeDocumentPath = uploadDiplomeData.path;
      }
    } catch (err) {
      console.error('[Kademya] Exception upload diplôme :', err);
    }

    // Photo de profil (optionnelle) -> bucket teacher-photos
    try {
      if (photoProfil && photoProfil.size > 0) {
        const photoExt = getExtension(photoProfil);
        const photoPath = `demande_${demandeId}/photo_profil.${photoExt}`;

        const { data: uploadPhotoData, error: uploadPhotoError } =
          await supabase.storage
            .from('teacher-photos')
            .upload(photoPath, photoProfil, {
              cacheControl: '3600',
              upsert: true,
            });

        if (uploadPhotoError) {
          console.error(
            '[Kademya] Erreur upload photo de profil :',
            uploadPhotoError.message,
          );
        } else if (uploadPhotoData?.path) {
          photoProfilPath = uploadPhotoData.path;
        }
      }
    } catch (err) {
      console.error('[Kademya] Exception upload photo de profil :', err);
    }

    // 5. Update des chemins dans la demande (y compris photo_profil_path)
    if (idDocumentPath || diplomeDocumentPath || photoProfilPath) {
      const { error: updateError } = await supabase
        .from('demandes_professeurs')
        .update({
          id_document_path: idDocumentPath,
          diplome_document_path: diplomeDocumentPath,
          photo_profil_path: photoProfilPath,
        })
        .eq('id', demandeId);

      if (updateError) {
        console.error(
          '[Kademya] Erreur update paths documents :',
          updateError.message,
        );
      }
    }

    // 6. Notification admin (non bloquant)
    await notifyAdminNewCandidate(values);

    // 7. Succès
    return {
      success: true,
      errors: {},
      values: initialFormState.values,
    };
  } catch (err) {
    console.error('[Kademya] Erreur serveur inattendue :', err);

    return {
      success: false,
      errors: {
        global:
          'Erreur technique côté serveur. Merci de réessayer un peu plus tard.',
      },
      values: initialFormState.values,
    };
  }
}
