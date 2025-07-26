'use server';

import { extractInvoiceData } from '@/ai/flows/extract-invoice-data';

const ELECTRICITY_EMISSION_FACTOR = 0.233; // kg CO₂ per kWh
const DIESEL_EMISSION_FACTOR = 2.68; // kg CO₂ per liter
const ELECTRICITY_THRESHOLD = 12000; // kWh
const DIESEL_THRESHOLD = 1000; // liters

export interface EmissionResult {
  id: string;
  date: string;
  totalEmissions: number;
  electricity: {
    kwh: number;
    emissions: number;
  };
  diesel: {
    liters: number;
    emissions: number;
  };
  warnings: string[];
}

export async function calculateEmissions(invoiceText: string): Promise<EmissionResult> {
  if (!invoiceText) {
    throw new Error('Invoice text cannot be empty.');
  }

  try {
    const extractedData = await extractInvoiceData({ invoiceText });

    const electricityKwh = extractedData.electricity_kWh || 0;
    const dieselLiters = extractedData.diesel_liters || 0;

    const electricityEmissions = electricityKwh * ELECTRICITY_EMISSION_FACTOR;
    const dieselEmissions = dieselLiters * DIESEL_EMISSION_FACTOR;
    const totalEmissions = electricityEmissions + dieselEmissions;

    const warnings: string[] = [];
    if (electricityKwh > ELECTRICITY_THRESHOLD) {
      warnings.push(`Electricity usage of ${electricityKwh.toLocaleString()} kWh exceeds the ISO 14064 threshold of ${ELECTRICITY_THRESHOLD.toLocaleString()} kWh.`);
    }
    if (dieselLiters > DIESEL_THRESHOLD) {
      warnings.push(`Diesel usage of ${dieselLiters.toLocaleString()} liters exceeds the ISO 14064 threshold of ${DIESEL_THRESHOLD.toLocaleString()} liters.`);
    }

    return {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      totalEmissions,
      electricity: {
        kwh: electricityKwh,
        emissions: electricityEmissions,
      },
      diesel: {
        liters: dieselLiters,
        emissions: dieselEmissions,
      },
      warnings,
    };
  } catch (error) {
    console.error("Error in calculateEmissions action:", error);
    throw new Error('Failed to extract data using AI. Please check the invoice text format and try again.');
  }
}
