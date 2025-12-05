// app/api/monitor/route.js
export async function GET() {
  const samples = [
    { type: "SQL Injection", ip: "103.244.52.18", desc: "SQL injection payload pattern", ts: new Date().toLocaleTimeString() },
    { type: "Suspicious Crawler", ip: "192.168.1.44", desc: "High-frequency crawling", ts: new Date().toLocaleTimeString() },
    { type: "Brute Force", ip: "77.92.14.199", desc: "Multiple failed login attempts", ts: new Date().toLocaleTimeString() },
    { type: "Port Scan", ip: "45.77.12.3", desc: "Port scanning sequence detected", ts: new Date().toLocaleTimeString() },
    { type: "DDoS", ip: "198.51.100.12", desc: "Large request volume spike", ts: new Date().toLocaleTimeString() }
  ];

  // return 1-3 random samples to simulate bursts
  const count = 1 + Math.floor(Math.random() * 2);
  const out = Array.from({ length: count }).map(() => samples[Math.floor(Math.random() * samples.length)]);
  return Response.json(out);
}
