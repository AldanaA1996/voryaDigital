
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
    { id: 'web-proj-1', title: 'Corporate Landing Page', description: 'A modern and sleek landing page for a corporate client.', category: 'Web Development', image: 'https://placehold.co/600x400.png', dataAiHint: 'corporate website' },
    { id: 'photo-proj-1', title: 'Urban Exploration', description: 'Capturing the soul of the city streets.', category: 'Photography', image: 'https://placehold.co/600x400.png', dataAiHint: 'city photography' },
    { id: 'web-proj-2', title: 'E-commerce Store', description: 'A fully functional e-commerce platform with a custom CMS.', category: 'Web Development', image: 'https://placehold.co/600x400.png', dataAiHint: 'online store' },
    { id: 'photo-proj-2', title: 'Wedding Photography', description: 'Documenting beautiful moments from a special day.', category: 'Photography', image: 'https://placehold.co/600x400.png', dataAiHint: 'wedding event' },
    { id: 'web-proj-3', title: 'Portfolio Website', description: 'A personal portfolio for a graphic designer.', category: 'Web Development', image: 'https://placehold.co/600x400.png', dataAiHint: 'artist portfolio' },
    { id: 'photo-proj-3', title: 'Product Shots', description: 'Clean and professional product photography for an online brand.', category: 'Photography', image: 'https://placehold.co/600x400.png', dataAiHint: 'product commercial' },
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
        setError(result.error || 'An unknown error occurred.');
      }
    });
  };
  
  const suggestedProjectIds = new Set(suggestion?.suggestedProjects || []);
  const suggestedSkillIds = new Set(suggestion?.suggestedSkills || []);

  return (
    <section id="portfolio" className="w-full py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl font-headline">Unified Portfolio</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            A showcase of my work in web development, photography, and content creation.
          </p>
        </div>

        <Card className="mb-12 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="text-accent" />
              Portfolio Personalization
            </CardTitle>
            <CardDescription>
              Tell me what you're interested in, and I'll tailor my portfolio for you using AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                placeholder="e.g., 'a modern website for my new cafe' or 'wedding photos'"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePersonalize()}
                disabled={isPending}
              />
              <Button onClick={handlePersonalize} disabled={isPending} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Personalize ✨'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {error && <Alert variant="destructive" className="mb-8"><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

        {suggestion && (
          <Alert className="mb-8 border-accent">
            <Lightbulb className="h-4 w-4 text-accent" />
            <AlertTitle className="text-accent">AI-Powered Suggestion</AlertTitle>
            <AlertDescription>
              {suggestion.reasoning}
            </AlertDescription>
          </Alert>
        )}

        {suggestion && suggestion.suggestedSkills.length > 0 && (
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-center font-headline">Suggested Skills</h3>
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
