import { NextRequest, NextResponse } from "next/server";

// ── Helpers ────────────────────────────────────────────────────────────────────

function extractJobType(text: string): string {
  const t = text.toLowerCase();
  if (t.match(/solar|panel|pv|inverter|battery|load.?shed/)) return "Solar Installation";
  if (t.match(/coc|certificate|compliance|sell|transfer/)) return "COC Certificate";
  if (t.match(/db|distribution.?board|board|fuse|breaker|trip|earth.?leak/)) return "Distribution Board";
  if (t.match(/fault|no power|power.?out|dead|spark|shock|burn/)) return "Fault Finding";
  if (t.match(/geyser|hot.?water|element/)) return "Geyser Repair";
  if (t.match(/light|downlight|led|plug|socket|outlet|switch|dimmer/)) return "Lights & Plugs";
  if (t.match(/gate|motor|intercom|alarm|camera|security/)) return "Security / Gate Motor";
  if (t.match(/3.?phase|three.?phase|commercial|factory|office/)) return "Commercial / 3-Phase";
  return "General Electrical";
}

function extractArea(text: string): string {
  const known = [
    "Roodepoort", "Bryanston", "Sandton", "Randburg", "Fourways",
    "Northcliff", "Florida", "Weltevredenpark", "Constantia Kloof",
    "Honeydew", "Linden", "Parktown", "Sunninghill", "Midrand",
    "Johannesburg", "Joburg", "Soweto", "Centurion", "Pretoria",
  ];
  for (const area of known) {
    if (text.toLowerCase().includes(area.toLowerCase())) return area;
  }
  // Capitalise first word as area fallback
  const first = text.trim().split(/\s+/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function extractUrgency(text: string): "emergency" | "scheduled" {
  const t = text.toLowerCase();
  if (t.match(/emergency|urgent|asap|now|today|immediately|no power|sparks?|danger|can.?t wait/)) {
    return "emergency";
  }
  return "scheduled";
}

function extractName(text: string): string {
  const cleaned = text.trim().replace(/^(my name is|i.?m|it.?s|this is)\s+/i, "");
  // Title-case the first two words max
  return cleaned
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function extractPhone(text: string): string {
  const digits = text.replace(/\D/g, "");
  if (digits.length >= 9) {
    // Format as South African number
    const core = digits.startsWith("27") ? digits.slice(2) : digits.startsWith("0") ? digits.slice(1) : digits;
    return `+27 ${core.slice(0, 2)} ${core.slice(2, 5)} ${core.slice(5, 9)}`;
  }
  return text.trim();
}

// ── Main Handler ───────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { messages } = await req.json() as {
    messages: { role: string; content: string }[];
  };

  // messages[0] = initial assistant greeting
  // messages[1] = first user message (job description)
  // messages[2] = bot step-0 reply
  // messages[3] = second user message (area)
  // ...
  // Step is determined by how many complete user+bot pairs have happened
  // after the greeting. User messages are at odd indices (1,3,5,7,9).

  const userMsgs = messages.filter((m) => m.role === "user");
  const step = userMsgs.length; // 1=job, 2=area, 3=urgency, 4=name, 5=phone

  // Simulate a short "thinking" delay so it feels live
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

  const firstMsg = userMsgs[0]?.content ?? "";
  const jobType = extractJobType(firstMsg);

  let text = "";
  let lead = null;

  switch (step) {
    case 1: {
      // Acknowledged job type → ask area
      const friendly: Record<string, string> = {
        "Solar Installation": "Solar is a great investment right now 🌞",
        "COC Certificate": "No problem, COC certs are one of our most common requests",
        "Distribution Board": "DB board issues can definitely cause headaches",
        "Fault Finding": "Sounds like we need to get that sorted quickly",
        "Geyser Repair": "Geyser problems are always a pain, especially in winter",
        "Lights & Plugs": "That's a straightforward one for us",
        "Security / Gate Motor": "We do gate motors and security installations regularly",
        "Commercial / 3-Phase": "Happy to help with commercial work",
        "General Electrical": "Sure, we can help with that",
      };
      const intro = friendly[jobType] ?? "Sure, we can help with that";
      text = `${intro}! 👍\n\nWhich area or suburb are you in? (e.g. Roodepoort, Bryanston, Sandton)`;
      break;
    }

    case 2: {
      // Got area → ask urgency
      const area = extractArea(userMsgs[1]?.content ?? "");
      text = `Got it — we cover ${area} regularly. 📍\n\nIs this an *emergency* (needs attention today) or can it be *scheduled* for a convenient time?`;
      break;
    }

    case 3: {
      // Got urgency → ask name
      const urgency = extractUrgency(userMsgs[2]?.content ?? "");
      if (urgency === "emergency") {
        text = `Understood, we'll treat this as urgent 🚨 — Shaldon will prioritise your job.\n\nCould I get your name please?`;
      } else {
        text = `Perfect, we'll get something scheduled at a time that suits you. 📅\n\nWhat's your name?`;
      }
      break;
    }

    case 4: {
      // Got name → ask phone
      const name = extractName(userMsgs[3]?.content ?? "");
      text = `Thanks ${name}! 😊\n\nLastly, what's the best number to reach you on? Shaldon will give you a call to confirm details and pricing.`;
      break;
    }

    case 5:
    default: {
      // Got phone → build lead card
      const area = extractArea(userMsgs[1]?.content ?? "");
      const urgency = extractUrgency(userMsgs[2]?.content ?? "");
      const name = extractName(userMsgs[3]?.content ?? "");
      const phone = extractPhone(userMsgs[4]?.content ?? "");

      const summaries: Record<string, string> = {
        "Solar Installation": `Solar installation quote requested for property in ${area}`,
        "COC Certificate": `COC compliance certificate needed in ${area}`,
        "Distribution Board": `Distribution board inspection/upgrade in ${area}`,
        "Fault Finding": `Electrical fault investigation required in ${area}`,
        "Geyser Repair": `Geyser fault or replacement in ${area}`,
        "Lights & Plugs": `Lighting and plug points installation in ${area}`,
        "Security / Gate Motor": `Gate motor / security electrical work in ${area}`,
        "Commercial / 3-Phase": `Commercial / 3-phase electrical work in ${area}`,
        "General Electrical": `General electrical job in ${area}`,
      };

      lead = {
        jobType,
        area,
        urgency,
        name,
        phone,
        summary: summaries[jobType] ?? `Electrical job in ${area}`,
      };

      text = urgency === "emergency"
        ? `Perfect, ${name}! ✅ I've logged your details as *urgent*. Shaldon will call you on ${phone} within the next 30 minutes.\n\nIf it's an active hazard, please switch off your main breaker and call us directly: *+27 60 790 2941* 🔴`
        : `All done, ${name}! ✅ I've sent your details through to Shaldon. He'll call you on ${phone} within 2 hours to discuss your ${jobType.toLowerCase()} and arrange a time.\n\nThanks for choosing Zeus Electrical! ⚡`;
      break;
    }
  }

  return NextResponse.json({ text, lead });
}
