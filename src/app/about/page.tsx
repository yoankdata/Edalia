import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { findImage } from '@/lib/placeholder-data';

const aboutImage = findImage('about-us');

export default function AboutPage() {
  return (
    <div className="bg-background">
      <header className="bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">About Edalia</h1>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Our mission is to bridge the gap between dedicated educators and learners, fostering a community of growth and knowledge sharing across Africa.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24 space-y-20">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">Our Story</h2>
            <p className="text-foreground/80 mb-4">
              Edalia was born from a simple idea: that quality education should be accessible to everyone, everywhere. We saw a world of talented, passionate teachers and a generation of eager learners who needed a better way to connect.
            </p>
            <p className="text-foreground/80">
              We built a platform that is more than just a directory. It's a community built on trust, transparency, and a shared love for learning. By verifying every teacher and providing simple tools for communication, we empower parents to make the best choice for their child's future.
            </p>
          </div>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </section>

        <section id="contact" className="text-center">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">Get in Touch</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-12">
                Have questions or want to partner with us? We'd love to hear from you.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 bg-accent/20 rounded-full">
                        <Mail className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground">Send us a message</p>
                    <a href="mailto:hello@edalia.com" className="text-primary hover:underline">hello@edalia.com</a>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 bg-accent/20 rounded-full">
                        <Phone className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-muted-foreground">Mon-Fri from 9am to 5pm</p>
                    <a href="tel:+27112345678" className="text-primary hover:underline">+27 11 234 5678</a>
                </div>
                <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 bg-accent/20 rounded-full">
                        <MapPin className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg">Office</h3>
                    <p className="text-muted-foreground">123 Education Lane, Cape Town</p>
                    <p className="text-primary">South Africa</p>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
