// app/api/logs/route.js
let LOGS = [];

export async function GET() {
  return new Response(JSON.stringify({ logs: LOGS }), {
    headers: { "Content-Type": "application/json" }
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const entry = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      ...body,
      timestamp: new Date().toISOString()
    };
    LOGS = [entry, ...LOGS].slice(0, 200);
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ success: false }), { headers: { "Content-Type": "application/json" }, status: 500 });
  }
}
