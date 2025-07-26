"use client";

import { useState } from 'react';
import type { FormEvent } from 'react';
import { AlertTriangle, Leaf, Loader2, Zap, Flame, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { calculateEmissions, type EmissionResult } from './actions';

export default function Home() {
  const [invoiceText, setInvoiceText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmissionResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!invoiceText.trim()) {
      toast({
        variant: "destructive",
        title: "Input Required",
        description: "Please paste some invoice text before calculating.",
      });
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const emissionData = await calculateEmissions(invoiceText);
      setResult(emissionData);
    } catch (err) {
      const error = err as Error;
      toast({
        variant: "destructive",
        title: "Calculation Failed",
        description: error.message || "An unknown error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
            <Leaf className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            Emission Audit
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Paste your OCR-extracted invoice text to automatically calculate CO₂e emissions and check for compliance.
          </p>
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5"/>
              Invoice Data Input
            </CardTitle>
            <CardDescription>
              Enter the text extracted from your invoice below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Textarea
                value={invoiceText}
                onChange={(e) => setInvoiceText(e.target.value)}
                placeholder="E.g., 'Electricity consumption: 15,000 kWh... Diesel fuel purchased: 950 liters...'"
                className="min-h-[150px] resize-y text-base"
                aria-label="Invoice Text Input"
              />
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Calculate Emissions'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <section id="results" className="space-y-6 animate-in fade-in-50 duration-500">
            {result.warnings.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Compliance Warning</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5">
                    {result.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <Card className="bg-primary/5 text-center shadow-lg">
              <CardHeader>
                <CardDescription>Total CO₂e Emissions</CardDescription>
                <CardTitle className="text-5xl font-extrabold text-primary">
                  {result.totalEmissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">kg CO₂e</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <Zap className="h-6 w-6" />
                    Electricity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="font-medium">{result.electricity.kwh.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emissions:</span>
                    <span className="font-medium">{result.electricity.emissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg CO₂e</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <Flame className="h-6 w-6" />
                    Diesel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="font-medium">{result.diesel.liters.toLocaleString()} Liters</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emissions:</span>
                    <span className="font-medium">{result.diesel.emissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg CO₂e</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
