import { analyzeNetworkPacket } from "@/lib/aiEngine";

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      let closed = false;
      function send(data) {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch (e) {
          // If enqueue fails (controller closed), stop interval and close stream
          clearInterval(iv);
          try { controller.close(); } catch {}
          closed = true;
        }
      }

      // initial welcome
      send({ type: "welcome", message: "SSE stream open" });

      const iv = setInterval(() => {
        try {
          const pkt = {
            ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            bytes: Math.floor(Math.random() * 300000),
            method: Math.random() > 0.6 ? "POST" : "GET",
            path: ["/", "/login", "/admin", "/api"][Math.floor(Math.random() * 4)],
            userAgent: ["mozilla", "sqlmap", "bot", "crawler"][Math.floor(Math.random() * 4)],
          };
          const analysis = analyzeNetworkPacket(pkt);
          send({ type: "analysis", analysis });
        } catch (e) {
          send({ type: "error", message: e?.message || String(e) });
        }
      }, 3000);

      // when closed/cancelled by client
      // No reliable request.signal cross-runtime in Next App Router; set controller._cleanup for safety
      controller._cleanup = () => {
        clearInterval(iv);
      };
    },
    cancel() {
      // nothing else
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
