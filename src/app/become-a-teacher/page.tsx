import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { findImage } from '@/lib/placeholder-data';
import { CheckCircle } from 'lucide-react';

const pageImage = findImage('become-teacher');

export default function BecomeATeacherPage() {
  return (
    <div className="bg-background">
      <header className="relative h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
        {pageImage && (
          <Image
            src={pageImage.imageUrl}
            alt={pageImage.description}
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
            data-ai-hint={pageImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/70 z-10" />
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Join Our Community of Educators</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-primary-foreground/90">
            Inspire the next generation and build your tutoring career with Edalia.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-3xl font-bold text-primary mb-6">Why Teach with Edalia?</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Reach More Students</h3>
                  <p className="text-muted-foreground">Connect with parents and students actively seeking your skills, without the marketing hassle.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Set Your Own Terms</h3>
                  <p className="text-muted-foreground">You control your schedule, rates, and teaching style. Edalia is flexible to fit your life.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Simple &amp; Direct Communication</h3>
                  <p className="text-muted-foreground">Parents contact you directly via WhatsApp. No commissions, no middlemen. Just teaching.</p>
                </div>
              </li>
               <li className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Trusted Platform</h3>
                  <p className="text-muted-foreground">Join a curated community of verified educators and enhance your professional profile.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-lg border">
            <h2 className="font-headline text-2xl font-bold text-primary mb-6 text-center">Start Your Journey Today</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <Input id="name" placeholder="e.g., Jane Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <Input id="email" type="email" placeholder="e.g., jane.doe@example.com" />
              </div>
              <div>
                <label htmlFor="subjects" className="block text-sm font-medium mb-1">Subjects You Teach</label>
                <Input id="subjects" placeholder="e.g., Mathematics, English, Piano" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Tell Us About Yourself</label>
                <Textarea id="message" placeholder="Briefly describe your teaching experience and passion." />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Application</Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
