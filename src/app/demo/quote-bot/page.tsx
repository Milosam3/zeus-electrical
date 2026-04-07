"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, Download, Loader2, AlertTriangle, Clock, Wrench, DollarSign, FileText } from "lucide-react";

interface QuoteData {
  jobTitle: string;
  jobDescription: string;
  estimatedHours: { min: number; max: number };
  materialsEstimate: { min: number; max: number; breakdown: string[] };
  labourEstimate: { min: number; max: number };
  totalEstimate: { min: number; max: number };
  validityDays: number;
  notes: string[];
  urgencyFlag: "standard" | "urgent" | "complex";
}

const exampleJobs = [
  "Install 8 LED downlights in the kitchen ceiling and replace the existing light switch with a dimmer",
  "My main distribution board keeps tripping the earth leakage. I need the board inspected and a COC certificate",
  "Install a 5kW hybrid solar system with 10 panels and a 10kWh battery backup for my home in Bryanston",
  "Rewire the entire garage and add 4 new plug points and 2 outdoor lights on a timer",
];

const formatZAR = (n: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 0 }).format(n);

export default function QuoteBotPage() {
  const [form, setForm] = useState({ name: "", area: "", description: "" });
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quoteDate] = useState(new Date().toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" }));

  const generateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description.trim()) return;

    setLoading(true);
    setError("");
    setQuote(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription: form.description,
          customerName: form.name,
          area: form.area,
        }),
      });

      const data = await res.json();
      if (data.quote) {
        setQuote(data.quote);
      } else {
        setError("Failed to generate quote. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const urgencyColor = {
    standard: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    urgent: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    complex: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/20 text-[#0C2340] dark:text-[#F5C518] rounded-full px-4 py-2 mb-4">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">AI Quote Generator</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Auto-Generate Your Electrical Quote</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Describe your electrical job and our AI will generate a professional estimate in seconds. Powered by Claude AI.
          </p>
        </div>

        {/* Input Form */}
        {!quote && (
          <Card className="mb-6 shadow-md">
            <CardContent className="p-6">
              <form onSubmit={generateQuote} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name (optional)</Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area / Suburb (optional)</Label>
                    <Input
                      id="area"
                      placeholder="e.g. Roodepoort"
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Describe Your Electrical Job *</Label>
                  <Textarea
                    id="description"
                    placeholder="Be as detailed as possible — e.g. 'I need a new distribution board installed in my 3-bedroom house in Roodepoort. The current board is old and the earth leakage keeps tripping. I also want 2 new plug points in the garage.'"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={5}
                    required
                  />
                  <p className="text-xs text-muted-foreground">More detail = more accurate estimate</p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 rounded-lg p-3">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#0C2340] hover:bg-[#0C2340]/90 dark:bg-[#F5C518] dark:text-[#0C2340]"
                  disabled={loading}
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating Quote...</>
                  ) : (
                    <><Zap className="h-4 w-4 mr-2" /> Generate Quote Estimate</>
                  )}
                </Button>
              </form>

              {/* Example jobs */}
              <div className="mt-5">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Try an example:</p>
                <div className="space-y-2">
                  {exampleJobs.map((j, i) => (
                    <button
                      key={i}
                      onClick={() => setForm({ ...form, description: j })}
                      className="w-full text-left text-xs bg-muted/50 hover:bg-muted rounded-lg px-3 py-2 transition-colors line-clamp-1"
                    >
                      {j}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quote Output */}
        {quote && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <Button variant="outline" onClick={() => setQuote(null)}>
                ← Generate New Quote
              </Button>
              <Button onClick={handlePrint} className="bg-[#0C2340] text-white hover:bg-[#0C2340]/90 gap-2">
                <Download className="h-4 w-4" />
                Download Quote PDF
              </Button>
            </div>

            {/* Printable Quote */}
            <Card id="quote-document" className="shadow-lg">
              {/* Header */}
              <div className="bg-[#0C2340] text-white p-6 rounded-t-xl">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-[#F5C518] flex items-center justify-center">
                      <Zap className="h-6 w-6 text-[#0C2340]" />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Zeus Electrical Pty Ltd</div>
                      <div className="text-white/60 text-sm">Powering homes & businesses across Johannesburg</div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-white/70">
                    <div className="text-white font-semibold text-base">QUOTATION</div>
                    <div>Date: {quoteDate}</div>
                    <div>Valid for: {quote.validityDays} days</div>
                    <div>Tel: +27 60 790 2941</div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Customer & Job Info */}
                <div className="flex flex-wrap gap-4 justify-between">
                  <div>
                    {form.name && <div className="text-sm"><span className="text-muted-foreground">Prepared for: </span><span className="font-medium">{form.name}</span></div>}
                    {form.area && <div className="text-sm"><span className="text-muted-foreground">Area: </span><span className="font-medium">{form.area}</span></div>}
                  </div>
                  <Badge className={urgencyColor[quote.urgencyFlag]}>
                    {quote.urgencyFlag === "standard" ? "Standard Job" : quote.urgencyFlag === "urgent" ? "Urgent" : "Complex Job"}
                  </Badge>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#F5C518]" />
                    {quote.jobTitle}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{quote.jobDescription}</p>
                </div>

                <Separator />

                {/* Estimate Breakdown */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Estimate Breakdown</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-[#0C2340] dark:text-[#F5C518]" />
                      <div className="text-xs text-muted-foreground mb-1">Estimated Time</div>
                      <div className="font-bold text-lg">{quote.estimatedHours.min}–{quote.estimatedHours.max} hrs</div>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <Wrench className="h-6 w-6 mx-auto mb-2 text-[#0C2340] dark:text-[#F5C518]" />
                      <div className="text-xs text-muted-foreground mb-1">Materials</div>
                      <div className="font-bold text-lg">{formatZAR(quote.materialsEstimate.min)}–{formatZAR(quote.materialsEstimate.max)}</div>
                    </div>
                    <div className="bg-muted/30 rounded-xl p-4 text-center">
                      <DollarSign className="h-6 w-6 mx-auto mb-2 text-[#0C2340] dark:text-[#F5C518]" />
                      <div className="text-xs text-muted-foreground mb-1">Labour</div>
                      <div className="font-bold text-lg">{formatZAR(quote.labourEstimate.min)}–{formatZAR(quote.labourEstimate.max)}</div>
                    </div>
                  </div>

                  {/* Materials breakdown */}
                  {quote.materialsEstimate.breakdown?.length > 0 && (
                    <div className="bg-muted/20 rounded-lg p-4">
                      <div className="text-sm font-medium mb-2">Materials Breakdown</div>
                      <div className="space-y-1">
                        {quote.materialsEstimate.breakdown.map((item, i) => (
                          <div key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-[#F5C518] mt-1">•</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="bg-[#0C2340] text-white rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <div className="text-white/60 text-sm">Total Estimate (incl. VAT)</div>
                      <div className="text-3xl font-bold text-[#F5C518]">
                        {formatZAR(quote.totalEstimate.min)} – {formatZAR(quote.totalEstimate.max)}
                      </div>
                    </div>
                    <Zap className="h-10 w-10 text-[#F5C518] opacity-50" />
                  </div>
                </div>

                <Separator />

                {/* Notes */}
                {quote.notes?.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Important Notes
                    </h3>
                    <ul className="space-y-1">
                      {quote.notes.map((n, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-orange-500 mt-0.5">•</span>
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-muted/30 rounded-lg p-4 text-xs text-muted-foreground space-y-1">
                  <p><strong>Disclaimer:</strong> This is an AI-generated estimate only. Final pricing is subject to site inspection. Prices quoted are inclusive of VAT where applicable.</p>
                  <p>Quote valid for {quote.validityDays} days from date of issue. For confirmation, contact Shaldon at +27 60 790 2941.</p>
                </div>

                {/* Footer */}
                <div className="text-center pt-2 border-t text-xs text-muted-foreground">
                  Zeus Electrical Pty Ltd · +27 60 790 2941 · Roodepoort, Johannesburg
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style jsx global>{`
        @media print {
          body > * { display: none !important; }
          #quote-document { display: block !important; }
          nav, button, .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}
