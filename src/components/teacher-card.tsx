import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Verified, Phone } from 'lucide-react';
import { findImage } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

type BaseTeacher = {
  id: string;
  name: string;
  location: string;
  subjects: string[];           // ex: ["Mathématiques", "Lycée"]
  rate: number;                 // tarif horaire
  whatsappNumber: string;       // numéro sans +
  rating?: number;              // optionnel, défaut 5.0
  avatarImageId?: string;       // pour les données placeholder
  photoUrl?: string | null;     // pour Supabase
  verified?: boolean;           // verifie = true/false en base
};

interface TeacherCardProps {
  teacher: BaseTeacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const placeholderPhoto = '/images/teachers/placeholder-teacher.jpg';

  // On commence par un fallback neutre
  let imageUrl = placeholderPhoto;
  let imageHint = 'portrait enseignant Edalia';

  // 1) Si avatarImageId existe (données placeholder), on l’utilise
  if (teacher.avatarImageId) {
    const img = findImage(teacher.avatarImageId);
    if (img) {
      imageUrl = img.imageUrl;
      imageHint = img.imageHint;
    }
  }

  // 2) Si une vraie photo (Supabase) est fournie, elle prend le dessus
  if (teacher.photoUrl && teacher.photoUrl.trim() !== '') {
    imageUrl = teacher.photoUrl;
    imageHint = 'portrait enseignant réel';
  }

  const rating = teacher.rating ?? 5.0;
  const whatsappLink = `https://wa.me/${teacher.whatsappNumber}`;

  const mainSubjects = teacher.subjects.slice(0, 2);
  const extraCount =
    teacher.subjects.length > 2 ? teacher.subjects.length - 2 : 0;

  return (
    <Card className="w-full overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl group bg-secondary border-none shadow-md">
      <CardHeader className="p-0">
        <Link href={`/teachers/${teacher.id}`} className="block relative h-64 w-full">
          <Image
            src={imageUrl}
            alt={`Portrait de ${teacher.name}`}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={imageHint}
          />
          <div className="absolute top-3 right-3">
            {teacher.verified && (
              <Badge className="bg-accent text-accent-foreground border-accent shadow">
                <Verified className="w-4 h-4 mr-1.5" />
                Vérifié
              </Badge>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-headline text-xl font-semibold text-foreground">
            {teacher.name}
          </h3>
          <div className="flex items-center gap-1.5 text-accent flex-shrink-0 pt-1">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold text-foreground">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <MapPin className="w-5 h-5" />
          <span>{teacher.location}</span>
        </div>

        {mainSubjects.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {mainSubjects.map((subject) => (
              <Badge
                key={subject}
                variant="outline"
                className="border-primary/20 text-primary"
              >
                {subject}
              </Badge>
            ))}
            {extraCount > 0 && (
              <Badge
                variant="outline"
                className="border-primary/20 text-primary"
              >
                +{extraCount}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center bg-secondary">
        <div>
          <span className="font-bold text-lg text-foreground">
            {teacher.rate.toLocaleString('fr-FR')} F
          </span>
          <span className="text-sm text-muted-foreground">/h</span>
        </div>
        <Button asChild size="sm">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Phone className="mr-2 h-4 w-4" /> WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
