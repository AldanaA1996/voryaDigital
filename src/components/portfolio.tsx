'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getSuggestedArrangement } from '@/app/actions';
import { Lightbulb, Loader2 } from 'lucide-react';
import type { SuggestPortfolioArrangementOutput } from '@/ai/flows/suggest-portfolio-arrangement';
import { cn } from '@/lib/utils';

const projects = [
    { id: 'web-proj-1', title: 'Landing Page', description: 'Una landing page moderna y elegante.', category: 'Desarrollo Web', image: '/images/kauna.png', dataAiHint: 'corporate website' },
    { id: 'photo-proj-1', title: 'Exploración Urbana', description: 'Capturando el alma de las calles de la ciudad.', category: 'Fotografía', image: '/images/sitio-24.jpg', dataAiHint: 'city photography' },
    { id: 'web-proj-2', title: 'Diseño de Identidad de Marca', description: 'Diseño de paleta de colores, logo y carteleria para emprendimiento', category: 'Diseño', image: '/images/DISTC.png', dataAiHint: 'online store' },
    { id: 'photo-proj-2', title: 'Fotografía de Bodas', description: 'Documentando momentos hermosos de un día especial.', category: 'Fotografía', image: '/images/bodas(9).jpg', dataAiHint: 'wedding event' },
    { id: 'web-proj-3', title: 'Books de Fotos', description: 'Capturando imagenes perfectas para su dia mas importante.', category: 'Fotografía', image: '/images/bodas(4).jpg', dataAiHint: 'wedding photograpy' },
    { id: 'photo-proj-3', title: 'Fotografías de Producto', description: 'Fotografía de productos limpia y profesional para una marca en línea.', category: 'Fotografía', image: '/images/servicios.jpg', dataAiHint: 'product commercial' },
];

const skills = [
    { id: 'skill-react', name: 'React' },
    { id: 'skill-nextjs', name: 'Next.js' },
    { id: 'skill-tailwind', name: 'Tailwind CSS' },
    { id: 'skill-ps', name: 'Photoshop' },
    { id: 'skill-lr', name: 'Lightroom' },
    { id: 'skill-captureone', name: 'Capture One' },
    { id: 'skill-seo', name: 'SEO' },
    { id: 'skill-copywriting', name: 'Copywriting' },
];

export default function Portfolio() {
  const [isPending, startTransition] = useTransition();
  const [interests, setInterests] = useState('');
  const [suggestion, setSuggestion] = useState<SuggestPortfolioArrangementOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePersonalize = () => {
    setError(null);
    setSuggestion(null);
    startTransition(async () => {
      const result = await getSuggestedArrangement(interests);
      if (result.success && result.data) {
        setSuggestion(result.data);
      } else {
        setError(result.error || 'Ocurrió un error desconocido.');
      }
    });
  };
  
  const suggestedProjectIds = new Set(suggestion?.suggestedProjects || []);
  const suggestedSkillIds = new Set(suggestion?.suggestedSkills || []);

  return (
    <section id="portfolio" className="w-full py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl font-title">Portafolio Unificado</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Una muestra de mi trabajo en desarrollo web, fotografía y creación de contenido.
          </p>
        </div>

      


        {suggestion && suggestion.suggestedSkills.length > 0 && (
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center font-headline">Habilidades Sugeridas</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                    {skills.map(skill => {
                         const isSuggested = suggestedSkillIds.has(skill.id);
                         return (
                            <Badge key={skill.id} variant={isSuggested ? "default" : "secondary"} className={cn("transition-all", isSuggested ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
                                {skill.name}
                            </Badge>
                         )
                    })}
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => {
            const isSuggested = suggestedProjectIds.has(project.id);
            const showAll = suggestedProjectIds.size === 0;
            return (
              <Card key={project.id} className={cn("overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1", isSuggested ? 'ring-2 ring-primary' : 'ring-0', !showAll && !isSuggested ? 'opacity-50' : 'opacity-100' )}>
                <CardHeader className="p-0">
                  <Image src={project.image} alt={project.title} width={600} height={400} className="w-full h-auto object-cover" data-ai-hint={project.dataAiHint} />
                </CardHeader>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                  <CardTitle className="text-xl font-semibold mb-2 font-headline">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
}