/**
 * @fileOverview This file contains the cloud functions for the application.
 */

import {initializeApp} from 'firebase-admin/app';
import {onCall} from 'firebase-functions/v2/https';
import {z} from 'zod';
import {genkit, ai} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize Firebase Admin SDK and Genkit
initializeApp();
genkit({
  plugins: [googleAI()],
});


// Define Zod schemas for input validation
const DetectBookingConflictInputSchema = z.object({
  calendar1Events: z.string().describe('Events from the first calendar in iCal format.'),
  calendar2Events: z.string().describe('Events from the second calendar in iCal format.'),
  unitName: z.string().describe('The name of the rental unit.'),
});
export type DetectBookingConflictInput = z.infer<typeof DetectBookingConflictInputSchema>;

const DetectBookingConflictOutputSchema = z.object({
  hasConflict: z.boolean().describe('Whether or not there is a booking conflict.'),
  conflictDescription: z
    .string()
    .describe('The description of the booking conflict, if any.'),
});
export type DetectBookingConflictOutput = z.infer<typeof DetectBookingConflictOutputSchema>;


/**
 * Genkit flow to detect booking conflicts.
 */
const detectBookingConflictFlow = ai.defineFlow(
  {
    name: 'detectBookingConflictFlow',
    inputSchema: DetectBookingConflictInputSchema,
    outputSchema: DetectBookingConflictOutputSchema,
  },
  async input => {
    const prompt = `You are an AI assistant designed to detect booking conflicts between two calendars for a rental unit.

      You are given two sets of calendar events in iCal format, and the name of the rental unit.

      Calendar 1 Events:
      {{{calendar1Events}}}

      Calendar 2 Events:
      {{{calendar2Events}}}

      Rental Unit Name: {{unitName}}

      Determine if there are any overlapping bookings between the two calendars. If there is a conflict,
      explain the nature of the conflict, including the dates and times that overlap. If there is no conflict,
      simply state that there is no conflict.

      Return your answer in JSON format.`;
      
    const {output} = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.5-flash',
      input,
      output: {
        schema: DetectBookingConflictOutputSchema,
      },
    });
    return output!;
  }
);


/**
 * Callable Cloud Function that wraps the Genkit flow.
 */
export const detectBookingConflict = onCall<DetectBookingConflictInput>(async (request) => {
    // The Zod schema automatically validates the request.data.
    // If validation fails, an error is thrown.
    const input = DetectBookingConflictInputSchema.parse(request.data);
    return await detectBookingConflictFlow(input);
});
