import {
  Zap, Sun, Shield, AlertTriangle, Phone, Star,
  MapPin, MessageCircle, CheckCircle, Clock, Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { config } from "@/client.config"

const waLink = `https://wa.me/${config.business.whatsapp}?text=${encodeURIComponent(config.whatsappMessage)}`

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Fault Finding": <AlertTriangle className="h-8 w-8" />,
  "Solar Installation": <Sun className="h-8 w-8" />,
  "COC Certificates": <Award className="h-8 w-8" />,
  "Distribution Boards": <Zap className="h-8 w-8" />,
  "Emergency Callouts": <Phone className="h-8 w-8" />,
  "General Electrical": <Shield className="h-8 w-8" />,
  "Electrical Repairs & Installations": <Zap className="h-8 w-8" />,
  "Fibre & Network Solutions": <Shield className="h-8 w-8" />,
  "Handyman Services": <Award className="h-8 w-8" />,
  "Painting": <Shield className="h-8 w-8" />,
  "Free Quotes": <CheckCircle className="h-8 w-8" />,
}

const BADGE_ICONS = [
  <CheckCircle key="0" className="h-4 w-4" style={{ color: "var(--brand-accent)" }} />,
  <Clock key="1" className="h-4 w-4" style={{ color: "var(--brand-accent)" }} />,
  <Award key="2" className="h-4 w-4" style={{ color: "var(--brand-accent)" }} />,
]

export default function Home() {
  return (
    <main className="relative">

      {/* Hero */}
      <section className="relative text-white overflow-hidden" style={{ backgroundColor: "var(--brand-primary)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, var(--brand-accent) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--brand-accent) 0%, transparent 40%)`
          }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6" style={{ color: "var(--brand-accent)" }} />
              <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "var(--brand-accent)" }}>{config.business.legalName}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {config.hero.headline}
              <span className="block" style={{ color: "var(--brand-accent)" }}>{config.hero.accentLine}</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl">
              {config.hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-base w-full sm:w-auto gap-2">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp for a Free Quote
                </Button>
              </a>
              <a href={`tel:${config.business.phone}`}>
                <Button size="lg" className="bg-white hover:bg-white/90 font-bold text-base w-full sm:w-auto gap-2" style={{ color: "var(--brand-primary)" }}>
                  <Phone className="h-5 w-5" />
                  Call Now: {config.business.phoneDisplay}
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-white/70">
              {config.trustBadges.map((badge, i) => (
                <div key={badge} className="flex items-center gap-2">
                  {BADGE_ICONS[i]}
                  {badge}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: "var(--brand-accent)" }} />
                {config.business.area}
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
            <p className="text-muted-foreground max-w-xl mx-auto">{config.servicesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.services.map((s) => (
              <Card key={s.title} className="group hover:shadow-lg transition-shadow border-l-4" style={{ borderLeftColor: "var(--brand-accent)" }}>
                <CardContent className="p-6">
                  <div className="mb-4 group-hover:scale-110 transition-transform inline-block" style={{ color: "var(--brand-accent)" }}>
                    {SERVICE_ICONS[s.title] ?? <Zap className="h-8 w-8" />}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Fiksr demo cards */}
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
            <Link href="/dashboard">
              <Card className="group cursor-pointer hover:shadow-lg transition-all border-2" style={{ borderColor: `color-mix(in srgb, var(--brand-accent) 30%, transparent)` }}>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--brand-accent)" }}>
                    <Zap className="h-6 w-6" style={{ color: "var(--brand-primary)" }} />
                  </div>
                  <div>
                    <div className="font-bold">Owner Dashboard</div>
                    <div className="text-sm text-muted-foreground">Manage leads & missed calls</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 text-white" style={{ backgroundColor: "var(--brand-primary)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-5 w-5" style={{ fill: "var(--brand-accent)", color: "var(--brand-accent)" }} />)}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Customers Say</h2>
            <p className="text-white/60">{config.reviewsSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.reviews.map((r) => (
              <div key={r.name} className="bg-white/10 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4" style={{ fill: "var(--brand-accent)", color: "var(--brand-accent)" }} />)}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold" style={{ color: "var(--brand-accent)" }}>{r.name}</span>
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
            <p className="text-muted-foreground">{config.areasSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {config.areas.map((a) => (
              <div key={a} className="flex items-center gap-2 bg-card border rounded-full px-4 py-2 text-sm font-medium">
                <MapPin className="h-3 w-3" style={{ color: "var(--brand-accent)" }} />
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section id="contact" className="py-20 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get a Free Quote</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            WhatsApp us and we&apos;ll get back to you within 2 hours.
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-10 py-6 gap-3">
              <MessageCircle className="h-6 w-6" />
              WhatsApp for a Free Quote
            </Button>
          </a>
          <p className="mt-6 text-sm text-muted-foreground">
            Or call us:{" "}
            <a href={`tel:${config.business.phone}`} className="font-semibold text-foreground hover:underline">
              {config.business.phoneDisplay}
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-12" style={{ backgroundColor: "var(--brand-primary)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6" style={{ color: "var(--brand-accent)" }} />
                <span className="font-bold text-lg">{config.business.legalName}</span>
              </div>
              <p className="text-white/60 text-sm">{config.business.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "var(--brand-accent)" }}>Contact</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${config.business.phone}`} className="hover:text-white">{config.business.phoneDisplay}</a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <a href={waLink} className="hover:text-white">WhatsApp Us</a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {config.business.address}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3" style={{ color: "var(--brand-accent)" }}>Powered by</h4>
              <div className="space-y-2 text-sm text-white/70">
                <div><a href="https://fiksr.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-white">Fiksr</a></div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} {config.business.legalName}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" />
      </a>

    </main>
  )
}
