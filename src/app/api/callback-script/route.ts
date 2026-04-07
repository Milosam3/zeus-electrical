import { NextRequest, NextResponse } from "next/server";

// ── Script Templates ───────────────────────────────────────────────────────────
// Each template is a function so the caller name and time slot can be injected.

const SCRIPT_TEMPLATES: ((name: string, time: string, number: string) => string)[] = [
  (name, time) =>
    `Hey ${name}, it's Shaldon from Zeus Electrical — sorry I missed your call at ${time}, I was on a job. Just calling to find out what you need done. Are we talking an emergency, or is it something we can schedule? Either way, happy to come out and give you a quote.`,

  (name, time) =>
    `Hi ${name}, Shaldon here from Zeus Electrical. I see you called around ${time} — apologies for missing you! What can I help you with today? If you need something urgently, I can try fit you in this afternoon. Otherwise we can book a time that works for you.`,

  (name, time) =>
    `${name}, hi — it's Shaldon from Zeus Electrical calling back. Sorry I missed your call at ${time}. What electrical problem can I help sort out? Whether it's fault finding, a new installation, or a quote for solar, just let me know and we'll take it from there.`,

  (name, time) =>
    `Hi there ${name}, Shaldon from Zeus Electrical. You called us at ${time} and I wasn't available — I do apologise. What's the job? Once you give me the details I can either come out today if it's urgent, or we can lock in a day that suits you. We're based in Roodepoort but we cover all of Joburg.`,

  (name, time) =>
    `${name}, good day — Shaldon from Zeus Electrical returning your call from ${time}. Sorry for missing you, we're pretty busy at the moment. What did you need? If it's an emergency like no power or a safety issue, tell me and I'll come straight away. Otherwise let's get you on the schedule.`,
];

function pickScript(
  callerName: string,
  callTime: string,
  callerNumber: string
): string {
  // Deterministically pick a template based on the number so it's stable across demo re-renders
  const digits = callerNumber.replace(/\D/g, "");
  const lastDigit = parseInt(digits[digits.length - 1] ?? "0", 10);
  const idx = lastDigit % SCRIPT_TEMPLATES.length;

  const displayName = callerName === "Unknown" ? "there" : callerName.split(" ")[0];
  return SCRIPT_TEMPLATES[idx](displayName, callTime, callerNumber);
}

// ── Handler ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { callerName, callerNumber, callTime } = await req.json() as {
    callerName: string;
    callerNumber: string;
    callTime: string;
    duration?: string;
  };

  // Simulate a brief generation delay
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));

  const script = pickScript(
    callerName || "Unknown",
    callTime || "earlier",
    callerNumber || "0"
  );

  return NextResponse.json({ script });
}
