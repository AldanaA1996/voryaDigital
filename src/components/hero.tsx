'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="relative w-full py-24 md:py-32 lg:py-40 bg-background overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 -right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight text-foreground mb-4">
                Crafting Digital Experiences
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                A passionate <span className="text-primary font-semibold">Photographer</span>, <span className="text-primary font-semibold">Web Developer</span>, and <span className="text-primary font-semibold">Content Creator</span> bringing ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105">
                    <Link href="#portfolio">View My Work</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="transition-transform hover:scale-105">
                    <Link href="#contact">Get In Touch</Link>
                </Button>
            </div>
        </div>

        <style jsx>{`
            .animate-blob {
                animation: blob 7s infinite;
            }
            .animation-delay-2000 {
                animation-delay: 2s;
            }
            .animation-delay-4000 {
                animation-delay: 4s;
            }
            @keyframes blob {
                0% {
                    transform: translate(0px, 0px) scale(1);
                }
                33% {
                    transform: translate(30px, -50px) scale(1.1);
                }
                66% {
                    transform: translate(-20px, 20px) scale(0.9);
                }
                100% {
                    transform: translate(0px, 0px) scale(1);
                }
            }
        `}</style>
    </section>
  );
}
