// Implemented the Genkit flow for the SuggestPortfolioArrangement story.

'use server';

/**
 * @fileOverview An AI agent for suggesting personalized portfolio arrangements based on visitor interests.
 *
 * - suggestPortfolioArrangement - A function that handles the portfolio arrangement suggestion process.
 * - SuggestPortfolioArrangementInput - The input type for the suggestPortfolioArrangement function.
 * - SuggestPortfolioArrangementOutput - The return type for the suggestPortfolioArrangement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPortfolioArrangementInputSchema = z.object({
  visitorInterests: z
    .string()
    .describe(
      'A description of the visitor interests, used to tailor the portfolio arrangement suggestion.'
    ),
  availableProjects: z
    .array(z.string())
    .describe('A list of available project IDs in the portfolio.'),
  availableSkills: z
    .array(z.string())
    .describe('A list of available skill IDs to showcase.'),
});
export type SuggestPortfolioArrangementInput = z.infer<
  typeof SuggestPortfolioArrangementInputSchema
>;

const SuggestPortfolioArrangementOutputSchema = z.object({
  suggestedProjects: z
    .array(z.string())
    .describe('A list of project IDs suggested for the portfolio arrangement.'),
  suggestedSkills: z
    .array(z.string())
    .describe('A list of skill IDs suggested for the portfolio arrangement.'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the suggested arrangement.'),
});
export type SuggestPortfolioArrangementOutput = z.infer<
  typeof SuggestPortfolioArrangementOutputSchema
>;

export async function suggestPortfolioArrangement(
  input: SuggestPortfolioArrangementInput
): Promise<SuggestPortfolioArrangementOutput> {
  return suggestPortfolioArrangementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPortfolioArrangementPrompt',
  input: {schema: SuggestPortfolioArrangementInputSchema},
  output: {schema: SuggestPortfolioArrangementOutputSchema},
  prompt: `You are an expert portfolio curator. A visitor to a content creator's portfolio has the following interests: {{{visitorInterests}}}. Given the following available projects: {{{availableProjects}}} and available skills: {{{availableSkills}}}, suggest a portfolio arrangement that aligns with the visitor's interests. Explain your reasoning for the suggested arrangement.

Output in JSON format:
{
  "suggestedProjects": ["project1", "project2"],
  "suggestedSkills": ["skill1", "skill2"],
  "reasoning": "Explanation of the suggested arrangement based on visitor interests."
}`,
});

const suggestPortfolioArrangementFlow = ai.defineFlow(
  {
    name: 'suggestPortfolioArrangementFlow',
    inputSchema: SuggestPortfolioArrangementInputSchema,
    outputSchema: SuggestPortfolioArrangementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
