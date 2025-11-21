import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import type { Teacher } from '@/lib/placeholder-data';
import { findImage } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface TeacherCardProps {
  teacher: Teacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const image = findImage(teacher.avatarImageId);

  return (
    <Card className="w-full overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl group">
      <CardHeader className="p-0">
        <Link href={`/teachers/${teacher.id}`} className="block relative h-56 w-full">
            {image && (
                <Image
                src={image.imageUrl}
                alt={`Portrait of ${teacher.name}`}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
                />
            )}
        </Link>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
            <h3 className="font-headline text-xl font-semibold text-primary">{teacher.name}</h3>
            <div className="flex items-center gap-1 text-accent flex-shrink-0">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold">{teacher.rating.toFixed(1)}</span>
            </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{teacher.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {teacher.subjects.slice(0, 2).map((subject) => (
            <Badge key={subject} variant="secondary">{subject}</Badge>
          ))}
          {teacher.subjects.length > 2 && <Badge variant="outline">+{teacher.subjects.length - 2}</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <div>
            <span className="font-bold text-lg text-primary">${teacher.rate}</span>
            <span className="text-sm text-muted-foreground">/hr</span>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href={`/teachers/${teacher.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
