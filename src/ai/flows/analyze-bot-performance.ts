'use server';
/**
 * @fileOverview Analyzes Telegram bot performance and suggests improvements.
 *
 * - analyzeBotPerformance - A function that analyzes bot performance.
 * - AnalyzeBotPerformanceInput - The input type for the analyzeBotPerformance function.
 * - AnalyzeBotPerformanceOutput - The return type for the analyzeBotPerformance function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeBotPerformanceInputSchema = z.object({
  botName: z.string().describe('The name of the Telegram bot to analyze.'),
  collectedData: z
    .string()
    .describe(
      'Collected data related to bot performance, such as user interactions, response times, and error logs.'
    ),
});
export type AnalyzeBotPerformanceInput = z.infer<typeof AnalyzeBotPerformanceInputSchema>;

const AnalyzeBotPerformanceOutputSchema = z.object({
  insights: z.string().describe('AI-driven insights into the bot performance.'),
  suggestions: z
    .string()
    .describe(
      'Suggestions on how to improve bot responses and configurations to maximize user engagement.'
    ),
});
export type AnalyzeBotPerformanceOutput = z.infer<typeof AnalyzeBotPerformanceOutputSchema>;

export async function analyzeBotPerformance(
  input: AnalyzeBotPerformanceInput
): Promise<AnalyzeBotPerformanceOutput> {
  return analyzeBotPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBotPerformancePrompt',
  input: {
    schema: z.object({
      botName: z.string().describe('The name of the Telegram bot to analyze.'),
      collectedData:
        z.string().describe('Collected data related to bot performance, such as user interactions, response times, and error logs.'),
    }),
  },
  output: {
    schema: z.object({
      insights: z.string().describe('AI-driven insights into the bot performance.'),
      suggestions:
        z.string().describe('Suggestions on how to improve bot responses and configurations to maximize user engagement.'),
    }),
  },
  prompt: `You are an AI assistant specializing in analyzing Telegram bot performance.

You will receive collected data about a Telegram bot, and you will analyze it to provide insights and suggestions on how to improve the bot's performance and maximize user engagement.

Bot Name: {{{botName}}}
Collected Data: {{{collectedData}}}

Provide clear and actionable insights and suggestions.
`,
});

const analyzeBotPerformanceFlow = ai.defineFlow<
  typeof AnalyzeBotPerformanceInputSchema,
  typeof AnalyzeBotPerformanceOutputSchema
>(
  {
    name: 'analyzeBotPerformanceFlow',
    inputSchema: AnalyzeBotPerformanceInputSchema,
    outputSchema: AnalyzeBotPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
