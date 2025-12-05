// lib/aiEngine.js
export function analyzeNetworkPacket(packet) {
  if (!packet || typeof packet !== "object") throw new Error("Packet must be object");

  const ip = packet.ip || "0.0.0.0";
  const bytes = Number(packet.bytes ?? packet.size ?? 0);
  const method = packet.method || "GET";
  const path = packet.path || "/";
  const ua = (packet.userAgent || "").toLowerCase();

  const weights = [0.3, 0.5, 0.8, 0.2];
  const input = [bytes / 10000, method === "POST" ? 1 : 0, path.includes("login") ? 1 : 0, ua.includes("bot") ? 1 : 0];

  let nn = 0;
  for (let i = 0; i < weights.length; i++) nn += (weights[i] || 0) * (input[i] || 0);
  const anomalyScore = Math.round(Math.min(1, nn) * 100) / 100;

  let attackType = "Normal Traffic";
  if (bytes > 200000) attackType = "Potential DDoS";
  if (path.includes("'") || path.includes("--")) attackType = "SQL Injection Attempt";
  if (method === "POST" && path.includes("login")) attackType = "Brute Force Login";
  if (ua.includes("crawler")) attackType = "Suspicious Crawler";
  if (ua.includes("sqlmap")) attackType = "SQLmap Automated Attack";

  return {
    ip,
    bytes,
    method,
    path,
    userAgent: packet.userAgent || "",
    anomalyScore,
    attackType,
    timestamp: new Date().toISOString(),
  };
}
