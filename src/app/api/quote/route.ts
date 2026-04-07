import { NextRequest, NextResponse } from "next/server";

// ── Types ──────────────────────────────────────────────────────────────────────

interface QuoteTemplate {
  jobTitle: string;
  jobDescription: (desc: string, area: string, name: string) => string;
  estimatedHours: { min: number; max: number };
  materialsEstimate: { min: number; max: number; breakdown: string[] };
  labourEstimate: { min: number; max: number };
  totalEstimate: { min: number; max: number };
  validityDays: number;
  notes: string[];
  urgencyFlag: "standard" | "urgent" | "complex";
}

// ── Quote Templates ────────────────────────────────────────────────────────────

const TEMPLATES: { match: RegExp; template: QuoteTemplate }[] = [
  {
    match: /solar|panel|pv|inverter|battery|off.?grid|hybrid|grid.?tied/i,
    template: {
      jobTitle: "Hybrid Solar PV System Installation",
      jobDescription: (_, area) =>
        `Supply and installation of a hybrid solar PV system at the customer's property in ${area || "Johannesburg"}. Includes roof-mounted solar panels, hybrid inverter, battery bank, and integration with the existing DB board. System sized to significantly reduce Eskom dependency and provide backup during load shedding.`,
      estimatedHours: { min: 10, max: 16 },
      materialsEstimate: {
        min: 42000,
        max: 68000,
        breakdown: [
          "5kW Hybrid Inverter (Deye/Sunsynk): R12 500 – R18 000",
          "10 x 455W Solar Panels: R14 000 – R20 000",
          "10.24kWh Lithium Battery (BYD/Pylontech): R18 000 – R28 000",
          "Mounting rails, DC cable, combiner box: R3 500 – R5 000",
          "AC isolators, surge protection, DB upgrades: R1 800 – R2 500",
        ],
      },
      labourEstimate: { min: 5500, max: 8500 },
      totalEstimate: { min: 47500, max: 76500 },
      validityDays: 14,
      notes: [
        "Final price subject to roof type, panel layout, and cable run lengths — a site visit is required.",
        "System includes COC certificate and municipality grid-tie application (where applicable).",
        "Finance options available through our approved partners.",
        "10-year panel warranty, 5-year inverter warranty, 3-year battery warranty standard.",
      ],
      urgencyFlag: "complex",
    },
  },
  {
    match: /coc|certificate of compliance|compliance cert|selling|property sale|transfer/i,
    template: {
      jobTitle: "Certificate of Compliance (COC) — Inspection & Issue",
      jobDescription: (_, area) =>
        `Electrical compliance inspection and Certificate of Compliance (COC) issue for the property in ${area || "Johannesburg"}. A registered electrician will conduct a full inspection of the distribution board, wiring, earthing, and all fixed installations to ensure compliance with SANS 10142. Any defects identified will be quoted separately before rectification.`,
      estimatedHours: { min: 2, max: 5 },
      materialsEstimate: {
        min: 800,
        max: 3500,
        breakdown: [
          "COC inspection fee & certificate: R850 – R1 200",
          "Minor rectification materials (if required): R500 – R1 800",
          "Earth spike / bonding (if required): R450 – R900",
        ],
      },
      labourEstimate: { min: 900, max: 2500 },
      totalEstimate: { min: 1700, max: 6000 },
      validityDays: 14,
      notes: [
        "A pre-inspection is recommended before listing a property — defects must be rectified before a COC can be issued.",
        "COC is valid for 2 years from date of issue (or until ownership changes).",
        "Major defects (rewiring, full DB replacement) will be quoted separately.",
        "We can turn around urgent COC requests within 24 hours for property transfers.",
      ],
      urgencyFlag: "standard",
    },
  },
  {
    match: /distribution.?board|db.?board|fuse.?board|main.?board|breaker|earth.?leak|rcb|rcd|mcb|upgrade.*board|board.*upgrade/i,
    template: {
      jobTitle: "Distribution Board Upgrade & Replacement",
      jobDescription: (_, area) =>
        `Supply and installation of a new distribution board at the property in ${area || "Johannesburg"}. Scope includes removal of the existing board, installation of a new DIN-rail board with updated circuit breakers, earth leakage protection (RCD), and surge protection. Work carried out in accordance with SANS 10142 and followed by a COC certificate.`,
      estimatedHours: { min: 4, max: 8 },
      materialsEstimate: {
        min: 3200,
        max: 7500,
        breakdown: [
          "18-way DB board (Schneider/ABB): R1 800 – R3 200",
          "Circuit breakers (MCBs) x 12: R1 200 – R2 000",
          "40A Earth leakage (RCD) x 2: R800 – R1 400",
          "Surge protection device: R650 – R1 200",
          "Consumables (cable, terminals, labels): R350 – R600",
        ],
      },
      labourEstimate: { min: 2000, max: 4000 },
      totalEstimate: { min: 5200, max: 11500 },
      validityDays: 14,
      notes: [
        "Price varies based on number of circuits and board location (surface vs. flush-mounted).",
        "COC certificate included with all new DB board installations.",
        "Power will be off for approximately 3–5 hours during installation.",
        "Split-board configurations (separate earth leakage zones) quoted on request.",
      ],
      urgencyFlag: "standard",
    },
  },
  {
    match: /fault|no power|trip|tripping|power.?out|dead.?outlet|dead.?plug|circuit.?down|spark|shock|burning/i,
    template: {
      jobTitle: "Electrical Fault Finding & Repair",
      jobDescription: (_, area) =>
        `Fault finding and repair of an electrical fault at the customer's property in ${area || "Johannesburg"}. The electrician will systematically diagnose the fault using test equipment, isolate the cause, and carry out the necessary repair. Common faults include tripping earth leakages, wiring faults, failed circuits, and damaged outlets.`,
      estimatedHours: { min: 1, max: 4 },
      materialsEstimate: {
        min: 350,
        max: 2200,
        breakdown: [
          "Fault finding call-out & first hour: R650",
          "Replacement outlets / switches (if needed): R280 – R600",
          "Cable repair / junction materials: R200 – R500",
          "Additional components (breakers, RCCB, etc.): R350 – R900",
        ],
      },
      labourEstimate: { min: 650, max: 2400 },
      totalEstimate: { min: 1000, max: 4600 },
      validityDays: 14,
      notes: [
        "Fault finding is charged at R650 for the first hour, then R480/hour thereafter.",
        "If the fault requires major rewiring or a board replacement, a separate quote will be provided.",
        "Emergency call-out surcharge (after hours / weekends): R450 additional.",
        "We carry most common parts on the vehicle to resolve faults on the first visit.",
      ],
      urgencyFlag: "urgent",
    },
  },
  {
    match: /geyser|hot.?water|water.?heater|element|thermostat/i,
    template: {
      jobTitle: "Geyser Repair / Replacement",
      jobDescription: (_, area) =>
        `Supply and installation of a new geyser or repair of the existing unit at the property in ${area || "Johannesburg"}. Scope includes assessment of the existing installation, replacement of the element and/or thermostat if faulty, or full geyser replacement with all associated plumbing connections and electrical re-termination.`,
      estimatedHours: { min: 2, max: 5 },
      materialsEstimate: {
        min: 1200,
        max: 8500,
        breakdown: [
          "Geyser element replacement: R850 – R1 200",
          "Thermostat replacement: R450 – R750",
          "150L geyser (Kwikot/Heatech) — full replacement: R4 500 – R7 200",
          "Pressure control valve, vacuum breaker: R350 – R600",
          "Electrical re-termination & isolator: R380 – R650",
        ],
      },
      labourEstimate: { min: 900, max: 2800 },
      totalEstimate: { min: 2100, max: 11300 },
      validityDays: 14,
      notes: [
        "Element/thermostat replacement vs. full unit replacement determined after inspection.",
        "Geysers older than 10 years are generally more cost-effective to replace than repair.",
        "Geyser blankets and timer installations available to reduce running costs.",
        "Solar geyser conversions quoted separately.",
      ],
      urgencyFlag: "standard",
    },
  },
  {
    match: /light|downlight|led|lamp|fitting|chandelier|plug|socket|outlet|switch|dimmer|fan/i,
    template: {
      jobTitle: "Lighting & Plug Points Installation",
      jobDescription: (_, area) =>
        `Supply and installation of LED downlights, plug points, and associated switching at the property in ${area || "Johannesburg"}. Scope includes installation of new fittings, wiring from the nearest existing circuit (or new dedicated circuit from the DB board), switch mounting, and testing. All work compliant with SANS 10142.`,
      estimatedHours: { min: 2, max: 6 },
      materialsEstimate: {
        min: 1500,
        max: 5500,
        breakdown: [
          "LED downlights x 8 (10W CCT): R1 200 – R2 400",
          "Double plug points x 4 (surface/flush): R800 – R1 600",
          "1-way & 2-way switches: R350 – R700",
          "Cable (2.5mm² TPS), conduit, back-boxes: R600 – R1 200",
          "Dimmer switch (if applicable): R380 – R650",
        ],
      },
      labourEstimate: { min: 1000, max: 3200 },
      totalEstimate: { min: 2500, max: 8700 },
      validityDays: 14,
      notes: [
        "Price per fitting/point varies based on ceiling type (concrete slab vs. timber/IBR) and cable run length.",
        "Exposed surface conduit used where in-slab wiring is not feasible.",
        "Outdoor and weatherproof fittings are priced at a premium.",
        "Quotation based on standard residential installation — commercial/high-bay lighting quoted separately.",
      ],
      urgencyFlag: "standard",
    },
  },
];

// Default template for anything not matched
const DEFAULT_TEMPLATE: Omit<QuoteTemplate, "jobDescription"> = {
  jobTitle: "General Electrical Works",
  estimatedHours: { min: 2, max: 6 },
  materialsEstimate: {
    min: 1200,
    max: 4500,
    breakdown: [
      "Electrical materials & components: R800 – R2 800",
      "Consumables (cable, terminals, connectors): R400 – R1 200",
      "Miscellaneous fixings & hardware: R200 – R500",
    ],
  },
  labourEstimate: { min: 1000, max: 3500 },
  totalEstimate: { min: 2200, max: 8000 },
  validityDays: 14,
  notes: [
    "This is a preliminary estimate. A site visit is required for an accurate final quote.",
    "All work carried out to SANS 10142 standards and covered by a 1-year workmanship guarantee.",
    "COC certificate available on request after completion.",
  ],
  urgencyFlag: "standard",
};

// ── Handler ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { jobDescription, customerName, area } = await req.json() as {
    jobDescription: string;
    customerName?: string;
    area?: string;
  };

  // Simulate generation delay
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 600));

  const name = customerName || "Customer";
  const location = area || "Johannesburg";
  const desc = jobDescription || "";

  // Find matching template
  const match = TEMPLATES.find((t) => t.match.test(desc));

  if (match) {
    const t = match.template;
    return NextResponse.json({
      quote: {
        jobTitle: t.jobTitle,
        jobDescription: t.jobDescription(desc, location, name),
        estimatedHours: t.estimatedHours,
        materialsEstimate: t.materialsEstimate,
        labourEstimate: t.labourEstimate,
        totalEstimate: t.totalEstimate,
        validityDays: t.validityDays,
        notes: t.notes,
        urgencyFlag: t.urgencyFlag,
      },
    });
  }

  // Default: derive a plausible quote from the description length / complexity
  const words = desc.split(/\s+/).length;
  const complexityFactor = words > 40 ? 1.6 : words > 20 ? 1.2 : 1.0;

  const base = DEFAULT_TEMPLATE;
  return NextResponse.json({
    quote: {
      jobTitle: "General Electrical Works",
      jobDescription: `Supply of labour and materials to carry out general electrical works at the customer's property in ${location}. ${desc.length > 20 ? desc.charAt(0).toUpperCase() + desc.slice(1).replace(/\.$/, "") + "." : "Full scope to be confirmed on site."}  All work performed to SANS 10142 standards with a 1-year workmanship guarantee.`,
      estimatedHours: {
        min: Math.round(base.estimatedHours.min * complexityFactor),
        max: Math.round(base.estimatedHours.max * complexityFactor),
      },
      materialsEstimate: {
        min: Math.round(base.materialsEstimate.min * complexityFactor),
        max: Math.round(base.materialsEstimate.max * complexityFactor),
        breakdown: base.materialsEstimate.breakdown,
      },
      labourEstimate: {
        min: Math.round(base.labourEstimate.min * complexityFactor),
        max: Math.round(base.labourEstimate.max * complexityFactor),
      },
      totalEstimate: {
        min: Math.round(base.totalEstimate.min * complexityFactor),
        max: Math.round(base.totalEstimate.max * complexityFactor),
      },
      validityDays: 14,
      notes: base.notes,
      urgencyFlag: base.urgencyFlag,
    },
  });
}
