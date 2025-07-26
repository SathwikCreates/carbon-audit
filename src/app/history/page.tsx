"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { EmissionResult } from '../actions';
import { useRouter } from 'next/navigation';

export default function HistoryPage() {
  const [history, setHistory] = useState<EmissionResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedHistory = localStorage.getItem('emissionHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const viewResult = (result: EmissionResult) => {
    localStorage.setItem('currentEmissionResult', JSON.stringify(result));
    router.push('/result');
  }

  const clearHistory = () => {
    localStorage.removeItem('emissionHistory');
    setHistory([]);
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-8">
        <header className="flex justify-between items-center">
            <div className="text-left">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                    Audit History
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    A log of your past emission calculations.
                </p>
            </div>
            {history.length > 0 && (
                 <Button onClick={clearHistory} variant="destructive">Clear History</Button>
            )}
        </header>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Previous Audits</CardTitle>
            <CardDescription>
              Here are the results from your previous emission audits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {history.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Total Emissions (kg CO₂e)</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
                      <TableCell className="text-right">{item.totalEmissions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => viewResult(item)}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No history found.</p>
                <Button onClick={() => router.push('/')}>Start a New Audit</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
