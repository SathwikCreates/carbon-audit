'use server';

/**
 * @fileOverview A flow to extract electricity (kWh) and diesel (liters) quantities from OCR-extracted invoice text.
 *
 * - extractInvoiceData - A function that handles the extraction process.
 * - ExtractInvoiceDataInput - The input type for the extractInvoiceData function.
 * - ExtractInvoiceDataOutput - The return type for the extractInvoiceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractInvoiceDataInputSchema = z.object({
  invoiceText: z.string().describe('OCR-extracted text from an invoice.'),
});
export type ExtractInvoiceDataInput = z.infer<typeof ExtractInvoiceDataInputSchema>;

const ExtractInvoiceDataOutputSchema = z.object({
  electricity_kWh: z.number().describe('The electricity quantity in kWh.'),
  diesel_liters: z.number().describe('The diesel quantity in liters.'),
});
export type ExtractInvoiceDataOutput = z.infer<typeof ExtractInvoiceDataOutputSchema>;

export async function extractInvoiceData(input: ExtractInvoiceDataInput): Promise<ExtractInvoiceDataOutput> {
  return extractInvoiceDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractInvoiceDataPrompt',
  input: {schema: ExtractInvoiceDataInputSchema},
  output: {schema: ExtractInvoiceDataOutputSchema},
  prompt: `You are an AI assistant tasked with extracting information from invoices.

  Given the following OCR-extracted text from an invoice, extract the electricity (kWh) and diesel (liters) quantities. If a value cannot be found, return 0 for that value.

  Invoice Text: {{{invoiceText}}}
  \n
  Return the extracted values in JSON format.
  `,
});

const extractInvoiceDataFlow = ai.defineFlow(
  {
    name: 'extractInvoiceDataFlow',
    inputSchema: ExtractInvoiceDataInputSchema,
    outputSchema: ExtractInvoiceDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
