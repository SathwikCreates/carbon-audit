"use client";

import { useState, useEffect } from 'react';
import { AlertTriangle, Zap, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { EmissionResult } from '../actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ResultPage() {
  const [result, setResult] = useState<EmissionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedResult = localStorage.getItem('currentEmissionResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
        <p>Loading results...</p>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8 text-center">
        <p className="text-lg text-muted-foreground mb-4">No emission results to display.</p>
        <Button onClick={() => router.push('/')}>Start a New Audit</Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                Emission Results
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
                An analysis of the provided invoice data.
            </p>
        </header>

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
        </div>
    </main>
  );
}
