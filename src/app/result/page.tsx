
"use client";

import { useState, useEffect } from 'react';
import { AlertTriangle, Zap, Flame, Lightbulb, Fuel, Info, HelpCircle, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { EmissionResult } from '../actions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const faqData = [
    {
        question: "What is CO₂e?",
        answer: "CO₂e stands for \"carbon dioxide equivalent.\" It's a standardized unit used to express the global warming potential of different greenhouse gases as a single number. For example, methane and nitrous oxide are converted into CO₂e for easier comparison."
    },
    {
        question: "Why is 12,000 kWh the electricity threshold?",
        answer: "This value is based on ISO 14064 and typical benchmarks for medium industrial facilities. Exceeding it indicates unusually high energy consumption that may need review."
    },
    {
        question: "How do you calculate emissions?",
        answer: "We multiply the extracted values (like electricity in kWh or diesel in liters) by standard emission factors, such as: <ul><li>Electricity: 0.233 kg CO₂ per kWh</li><li>Diesel: 2.68 kg CO₂ per liter</li></ul>"
    },
    {
        question: "What should I do if my emissions are high?",
        answer: "Start by conducting an internal energy audit. Consider reducing peak-time usage, switching to cleaner fuels, or upgrading to energy-efficient machinery. See the “Reduce & Prevent” section above for more tips."
    },
    {
        question: "Is this tool compliant with ISO 14064?",
        answer: "The tool is inspired by ISO 14064 principles and uses standard emission factors and compliance checks, but it is not a certified verification platform."
    },
     {
        question: "Can this data be exported or stored?",
        answer: "Yes, users can download reports as PDF or CSV and optionally integrate with Firebase Firestore or ERP systems for history and compliance tracking."
    }
];


export default function ResultPage() {
  const [result, setResult] = useState<EmissionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedResult = localStorage.getItem('currentEmissionResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
    setLoading(false);
  }, []);

  const hasHighElectricity = result && result.electricity.kwh > 12000;
  const hasHighDiesel = result && result.diesel.liters > 1000;

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
    <main className="container mx-auto flex min-h-screen flex-col items-center p-4 md:p-8">
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
                        <ul className="list-disc pl-5 space-y-2">
                        {hasHighElectricity && (
                            <li>
                                <strong>High Electricity Usage:</strong> Exceeds the ISO 14064 recommended benchmark. This may indicate inefficient machinery or overuse during peak hours.
                            </li>
                        )}
                        {hasHighDiesel && (
                             <li>
                                <strong>High Diesel Usage:</strong> Contributes significantly to Scope 1 emissions. This may indicate inefficient generator use or lack of electrification.
                            </li>
                        )}
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

        <section id="reduce-prevent" className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Reduce & Prevent</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb />Electricity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>Optimize usage during non-peak hours</li>
                            <li>Switch to energy-efficient motors and lighting</li>
                            <li>Install smart meters and motion sensors</li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Fuel />Diesel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            <li>Use biodiesel or electric generators</li>
                            <li>Improve logistics and delivery routing</li>
                            <li>Conduct preventive maintenance on fuel systems</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>

        <section id="definitions">
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <div className="flex items-center gap-2 font-semibold"><Info className="h-5 w-5" /> What Do These Numbers Mean?</div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li><b>kWh:</b> Kilowatt-hour, a measure of energy.</li>
                            <li><b>kg CO₂e:</b> Kilograms of CO₂ equivalent, a standard GHG metric.</li>
                            <li><b>ISO 14064:</b> International standard for greenhouse gas accounting.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>

        <section id="cta" className="text-center">
            <Button onClick={() => setShowRecommendations(true)} size="lg">
                <ChevronRight className="h-5 w-5 mr-2" />
                Get Recommendations
            </Button>
            {showRecommendations && (
                <Card className="mt-4 text-left shadow-lg animate-in fade-in-50">
                    <CardHeader>
                        <CardTitle>Tailored Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                         {(hasHighElectricity || hasHighDiesel) ? (
                            <ul className="list-disc pl-5 space-y-2">
                                {hasHighElectricity && <li>Your electricity usage is high. Suggestion: <b>Conduct a professional energy audit</b> to identify wastage.</li>}
                                {hasHighDiesel && <li>Your diesel consumption is high. Suggestion: <b>Implement a fuel tracking solution</b> to monitor and optimize usage.</li>}
                            </ul>
                         ) : (
                            <p className="text-muted-foreground">✅ Your emissions are within the recommended benchmarks. Keep up the great work!</p>
                         )}
                    </CardContent>
                </Card>
            )}
        </section>

        <section id="faq" className="space-y-4">
             <h2 className="text-2xl font-bold tracking-tight text-foreground text-center">Frequently Asked Questions (FAQ)</h2>
             <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                     <AccordionItem value={`faq-${index}`} key={index}>
                        <AccordionTrigger>
                           <div className="flex items-center gap-2 font-semibold"><HelpCircle className="h-5 w-5 text-primary"/> {item.question}</div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.answer }} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
             </Accordion>
        </section>

      </div>
    </main>
  );
}
