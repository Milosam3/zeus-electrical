export const config = {
  business: {
    name: "Zeus Electrical",
    legalName: "Zeus Electrical Pty Ltd",
    tagline: "Powering homes & businesses across Johannesburg since 2018.",
    phone: "+27607902941",
    phoneDisplay: "+27 60 790 2941",
    whatsapp: "27607902941",
    address: "20 Tielman Roos Ave, Florida Park, Roodepoort, 1709",
    area: "Joburg West & Surrounds",
    ownerName: "Shaldon",
  },
  hero: {
    headline: "Johannesburg's Trusted Electricians",
    accentLine: "Available 24/7",
    subheadline:
      "Powering homes & businesses across Johannesburg. From emergency callouts to full solar installations — done right, done safely.",
  },
  whatsappMessage: "Hi Zeus Electrical! I'd like to request a quote.",
  services: [
    {
      title: "Fault Finding",
      desc: "Expert diagnosis of electrical faults — from tripping breakers to dead outlets. Fast, accurate, fixed right.",
    },
    {
      title: "Solar Installation",
      desc: "Full solar PV system design and installation. Hybrid, grid-tied or off-grid solutions for homes & businesses.",
    },
    {
      title: "COC Certificates",
      desc: "Certificates of Compliance issued by registered electricians. Required for property sales and insurance.",
    },
    {
      title: "Distribution Boards",
      desc: "DB board upgrades, rewiring, and new installations. Ensure your home meets SANS 10142 standards.",
    },
    {
      title: "Emergency Callouts",
      desc: "24/7 emergency electrical response. No power? Sparks? Call us — we're on the road within the hour.",
    },
    {
      title: "General Electrical",
      desc: "Lights, plugs, geysers, security systems, gate motors. Your one-stop residential & commercial electrician.",
    },
  ],
  reviews: [
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
  ],
  areas: [
    "Roodepoort",
    "Northcliff",
    "Bryanston",
    "Sandton",
    "Randburg",
    "Florida",
    "Weltevredenpark",
    "Constantia Kloof",
    "Honeydew",
    "Fourways",
    "Linden",
    "Parktown North",
  ],
} as const
