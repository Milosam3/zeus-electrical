"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Zap,
  Sun,
  Shield,
  AlertTriangle,
  Phone,
  Star,
  MapPin,
  MessageCircle,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <AlertTriangle className="h-8 w-8" />,
    title: "Fault Finding",
    desc: "Expert diagnosis of electrical faults — from tripping breakers to dead outlets. Fast, accurate, fixed right.",
  },
  {
    icon: <Sun className="h-8 w-8" />,
    title: "Solar Installation",
    desc: "Full solar PV system design and installation. Hybrid, grid-tied or off-grid solutions for homes & businesses.",
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "COC Certificates",
    desc: "Certificates of Compliance issued by registered electricians. Required for property sales and insurance.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Distribution Boards",
    desc: "DB board upgrades, rewiring, and new installations. Ensure your home meets SANS 10142 standards.",
  },
  {
    icon: <Phone className="h-8 w-8" />,
    title: "Emergency Callouts",
    desc: "24/7 emergency electrical response. No power? Sparks? Call us — we're on the road within the hour.",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "General Electrical",
    desc: "Lights, plugs, geysers, security systems, gate motors. Your one-stop residential & commercial electrician.",
  },
];

const reviews = [
  {
    name: "Thabo M.",
    rating: 5,
    text: "Shaldon and his team were absolutely phenomenal. Had a major fault in my distribution board — they arrived within 45 minutes and had everything sorted same day. Professional, clean work. Highly recommended!",
    date: "2 weeks ago",
  },
  {
    name: "Sarah van der Berg",
    rating: 5,
    text: "Called Zeus Electrical for a COC certificate when selling my house. Shaldon was honest about what needed upgrading and the price was very fair. No hidden costs. Will definitely use again.",
    date: "1 month ago",
  },
  {
    name: "Pieter Coetzee",
    rating: 5,
    text: "Had a solar system installed by Zeus Electrical. Shaldon knew his stuff inside out — walked me through the whole system and the installation was neat and done on time. Saving R3000/month on electricity!",
    date: "3 weeks ago",
  },
];

const areas = [
  "Roodepoort", "Northcliff", "Bryanston", "Sandton", "Randburg",
  "Florida", "Weltevredenpark", "Constantia Kloof", "Honeydew",
  "Fourways", "Linden", "Parktown North",
];

const jobTypes = [
  "Fault Finding",
  "Solar Installation",
  "COC Certificate",
  "Distribution Board",
  "Emergency Callout",
  "General Electrical",
  "Geyser",
  "Lights & Plugs",
  "Security / Gate Motor",
  "Other",
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
    jobType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <main className="relative">
      {/* Hero */}
      <section className="relative bg-[#0C2340] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #F5C518 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F5C518 0%, transparent 40%)"
          }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-[#F5C518]" />
              <span className="text-[#F5C518] font-semibold text-sm uppercase tracking-wider">Zeus Electrical Pty Ltd</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Johannesburg&apos;s Trusted Electricians
              <span className="block text-[#F5C518]">Available 24/7</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              Powering homes & businesses across Johannesburg. From emergency callouts to full solar installations — done right, done safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:+27607902941">
                <Button size="lg" className="bg-[#F5C518] text-[#0C2340] hover:bg-[#F5C518]/90 font-bold text-base w-full sm:w-auto">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now: +27 60 790 2941
                </Button>
              </a>
              <a href="#quote">
                <Button size="lg" className="bg-white text-[#0C2340] hover:bg-white/90 font-bold text-base w-full sm:w-auto">
                  Request a Free Quote
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#F5C518]" />
                Registered & Insured
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#F5C518]" />
                24/7 Emergency Response
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#F5C518]" />
                COC Certified
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#F5C518]" />
                Joburg West & Surrounds
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Full-service electrical contracting for residential and commercial clients across Johannesburg.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Card key={s.title} className="group hover:shadow-lg transition-shadow border-l-4 border-l-[#F5C518]">
                <CardContent className="p-6">
                  <div className="text-[#0C2340] dark:text-[#F5C518] mb-4 group-hover:scale-110 transition-transform inline-block">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo links */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link href="/demo/whatsapp-bot">
              <Card className="group cursor-pointer hover:shadow-lg transition-all border-2 border-green-500/30 hover:border-green-500">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold">WhatsApp Bot Demo</div>
                    <div className="text-sm text-muted-foreground">AI-powered intake assistant</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/demo/quote-bot">
              <Card className="group cursor-pointer hover:shadow-lg transition-all border-2 border-[#F5C518]/30 hover:border-[#F5C518]">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-[#F5C518] flex items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-[#0C2340]" />
                  </div>
                  <div>
                    <div className="font-bold">Auto Quote Generator</div>
                    <div className="text-sm text-muted-foreground">AI-generated electrical quote</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-[#0C2340] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-[#F5C518] text-[#F5C518]" />)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-white/60">Real reviews from Google — Johannesburg&apos;s most trusted electricians</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white/10 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-[#F5C518] text-[#F5C518]" />)}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#F5C518]">{r.name}</span>
                  <span className="text-white/40 text-xs">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Areas We Serve</h2>
            <p className="text-muted-foreground">Covering all of Johannesburg West and surrounding suburbs</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {areas.map((a) => (
              <div key={a} className="flex items-center gap-2 bg-card border rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="h-3 w-3 text-[#F5C518]" />
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Free Quote</h2>
            <p className="text-muted-foreground">
              Fill in your details and we&apos;ll get back to you within 2 hours.
            </p>
          </div>

          {submitted ? (
            <Card className="border-green-500/30">
              <CardContent className="p-10 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Quote Request Received!</h3>
                <p className="text-muted-foreground mb-6">
                  Thanks {formData.name}! Shaldon will contact you on {formData.phone} within 2 hours.
                </p>
                <Button onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", area: "", jobType: "", message: "" }); }}>
                  Submit Another Request
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g. John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="e.g. 082 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="area">Area / Suburb *</Label>
                      <Input
                        id="area"
                        placeholder="e.g. Roodepoort"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Job Type *</Label>
                      <Select onValueChange={(v) => setFormData({ ...formData, jobType: v })} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type..." />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTypes.map((j) => (
                            <SelectItem key={j} value={j}>{j}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your job</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe what you need done — the more detail the better..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#0C2340] hover:bg-[#0C2340]/90 dark:bg-[#F5C518] dark:text-[#0C2340] dark:hover:bg-[#F5C518]/90"
                    disabled={submitting}
                  >
                    {submitting ? "Sending..." : "Request Free Quote"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Or WhatsApp us directly:{" "}
                    <a href="https://wa.me/27607902941" className="text-green-600 font-medium hover:underline">
                      +27 60 790 2941
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0C2340] text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-[#F5C518]" />
                <span className="font-bold text-lg">Zeus Electrical Pty Ltd</span>
              </div>
              <p className="text-white/60 text-sm">
                Powering homes & businesses across Johannesburg since 2018.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#F5C518]">Contact</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+27607902941" className="hover:text-white">+27 60 790 2941</a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <a href="https://wa.me/27607902941" className="hover:text-white">WhatsApp Us</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Roodepoort, Johannesburg
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-[#F5C518]">Tools</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div><a href="/demo/whatsapp-bot" className="hover:text-white">WhatsApp Bot Demo</a></div>
                <div><a href="/demo/quote-bot" className="hover:text-white">Quote Generator</a></div>
                <div><a href="/dashboard" className="hover:text-white">Owner Dashboard</a></div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
            © 2024 Zeus Electrical Pty Ltd. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/27607902941"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </a>
    </main>
  );
}
