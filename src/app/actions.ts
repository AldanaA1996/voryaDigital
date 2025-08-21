
'use server';

import { z } from 'zod';
import { suggestPortfolioArrangement } from '@/ai/flows/suggest-portfolio-arrangement';
import type { SuggestPortfolioArrangementOutput } from '@/ai/flows/suggest-portfolio-arrangement';

// --- Contact Form Action ---

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors and try again.',
      success: false,
    };
  }
  
  // In a real app, you would send an email or save to a database here.
  console.log('Contact form submitted:', validatedFields.data);

  return {
    message: "Thank you for your message! I'll get back to you soon.",
    success: true,
  };
}


// --- Portfolio Personalization Action ---

interface PersonalizationResult {
  success: boolean;
  data?: SuggestPortfolioArrangementOutput;
  error?: string;
}

// These would typically come from a database
const availableProjects = [
  { id: 'web-proj-1', name: 'Corporate Landing Page' },
  { id: 'web-proj-2', name: 'E-commerce Store' },
  { id: 'web-proj-3', name: 'Portfolio Website' },
  { id: 'photo-proj-1', name: 'Urban Exploration' },
  { id: 'photo-proj-2', name: 'Wedding Photography' },
  { id: 'photo-proj-3', name: 'Product Shots' },
];

const availableSkills = [
  { id: 'skill-react', name: 'React' },
  { id: 'skill-nextjs', name: 'Next.js' },
  { id: 'skill-tailwind', name: 'Tailwind CSS' },
  { id: 'skill-ps', name: 'Photoshop' },
  { id: 'skill-lr', name: 'Lightroom' },
  { id: 'skill-captureone', name: 'Capture One' },
  { id: 'skill-seo', name: 'SEO' },
  { id: 'skill-copywriting', name: 'Copywriting' },
];

export async function getSuggestedArrangement(visitorInterests: string): Promise<PersonalizationResult> {
  if (!visitorInterests) {
    return { success: false, error: 'Please provide your interests.' };
  }

  try {
    const result = await suggestPortfolioArrangement({
      visitorInterests,
      availableProjects: availableProjects.map(p => p.id),
      availableSkills: availableSkills.map(s => s.id),
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('AI suggestion failed:', error);
    return { success: false, error: 'Sorry, I couldn\'t generate a suggestion at this time.' };
  }
}
