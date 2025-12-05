// app/api/analyze/route.js
import { NextResponse } from "next/server";

function computeAnomalyScore(payload) {
  const bytes = Number(payload.bytes ?? payload.size ?? 0);
  const duration = Number(payload.duration ?? 0);
  const proto = (payload.protocol || "").toUpperCase();
  const flags = Array.isArray(payload.flags) ? payload.flags : [];

  let score = 0;
  // simple heuristic scoring (0-100)
  if (bytes > 200000) score += 40;
  if (duration > 5000) score += 20;
  if (proto === "ICMP") score += 10;
  if (flags.includes("SYN") && !flags.includes("ACK")) score += 25;
  if ((payload.path || "").includes("login") && payload.method === "POST") score += 15;
  return Math.min(100, Math.round(score));
}

function classify(score) {
  if (score >= 75) return "Critical Attack";
  if (score >= 40) return "Suspicious Activity";
  return "Normal Traffic";
}

export async function POST(req) {
  try {
    const body = await req.json();
    const pkt = body?.packet || body; // support both { packet: {} } and raw pkt

    if (!pkt || typeof pkt !== "object") {
      return NextResponse.json({ success: false, error: "Missing packet object" }, { status: 400 });
    }

    // safe defaults
    const ip = pkt.ip || pkt.sourceIP || "0.0.0.0";
    const bytes = Number(pkt.bytes ?? pkt.size ?? 0);
    const method = (pkt.method || "GET").toUpperCase();
    const path = pkt.path || "/";
    const userAgent = pkt.userAgent || "";

    const score = computeAnomalyScore({ ...pkt, method, path });
    const attackType = classify(score);

    const result = {
      ip,
      bytes,
      method,
      path,
      userAgent,
      anomalyScore: +(score / 100).toFixed(2), // normalized 0-1
      attackType,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (err) {
    console.error("Analyze API error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "OK", usage: "POST { packet: {...} }" });
}
