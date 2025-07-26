# **App Name**: Emission Audit

## Core Features:

- OCR Text Input: Input box to paste OCR-extracted invoice text.
- Entity Extraction: Use an AI tool to extract electricity_kWh and diesel_liters quantities from the input text.
- Emission Calculation: Calculate total CO₂e emissions from electricity and diesel using emission factors (Electricity: 0.233 kg CO₂ per kWh, Diesel: 2.68 kg CO₂ per liter).
- Compliance Checker: Flag electricity usage if > 12,000 kWh or diesel usage if > 1000 liters based on ISO 14064 thresholds.
- Report Display: Display total CO₂e emissions, electricity emissions, diesel emissions, and any compliance warnings.

## Style Guidelines:

- Primary color: Forest green (#34A05F) to evoke sustainability and environmental awareness.
- Background color: Light grey (#F0F0F0) to provide a clean and neutral backdrop.
- Accent color: Teal (#008080) to highlight important information and CTAs.
- Body and headline font: 'Inter' (sans-serif) for a modern, objective, and readable interface.