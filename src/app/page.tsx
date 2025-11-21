import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Search, Smile, Star, GraduationCap, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TeacherCard } from '@/components/teacher-card';
import { teachers, findImage } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const heroImage = findImage('hero-image');
const featuredTeachers = teachers.slice(0, 3);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-primary/5">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 text-center md:text-left">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary tracking-tight">
                    Find Your Perfect Teacher
                    </h1>
                    <p className="text-lg md:text-xl text-foreground/80">
                    Connect with verified, passionate educators for personalized learning experiences. Unlock your potential with Edalia.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                            <Link href="/teachers">Find a Teacher</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/become-a-teacher">Become a Teacher</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-2xl">
                    {heroImage && (
                        <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        data-ai-hint={heroImage.imageHint}
                        />
                    )}
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">How Edalia Works</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Finding a great teacher is as easy as 1, 2, 3.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-accent/20 p-4 rounded-full">
                  <Search className="h-10 w-10 text-accent" />
                </div>
                <h3 className="font-headline text-2xl font-semibold text-primary">1. Browse Teachers</h3>
                <p className="text-foreground/80">Search our directory of verified teachers by subject, location, and more.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-headline text-2xl font-semibold text-primary">2. View Profiles</h3>
                <p className="text-foreground/80">Get to know our educators through detailed profiles, including rates and reviews.</p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-green-500/10 p-4 rounded-full">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-headline text-2xl font-semibold text-primary">3. Connect Directly</h3>
                <p className="text-foreground/80">Contact teachers directly via WhatsApp to discuss your learning needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Teachers Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Featured Teachers</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Meet some of our most trusted and highly-rated educators.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/teachers">View All Teachers</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">What Parents Are Saying</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/parent1/100/100" data-ai-hint="parent portrait" />
                      <AvatarFallback>SN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">Sarah N.</h4>
                      <p className="text-sm text-muted-foreground">Parent of 2</p>
                    </div>
                  </div>
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-foreground/80">"Edalia made it so easy to find a math tutor for my son. Amina has been incredible, and his grades have improved so much. The direct contact via WhatsApp is a game-changer!"</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/parent2/100/100" data-ai-hint="parent portrait" />
                      <AvatarFallback>DJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">David J.</h4>
                      <p className="text-sm text-muted-foreground">Parent of 1</p>
                    </div>
                  </div>
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-foreground/80">"I was looking for a music teacher for my daughter and found Kwame. The platform is user-friendly, and the quality of teachers is excellent. Highly recommend Edalia!"</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
