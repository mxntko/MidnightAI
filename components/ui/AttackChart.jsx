"use client";

import { useEffect, useRef } from "react";

export function AttackChart({ data }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const cvs = canvasRef.current;
        const ctx = cvs.getContext("2d");

        cvs.width = 500;
        cvs.height = 250;

        ctx.clearRect(0, 0, 500, 250);

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 200 - data[0] * 3);

        data.forEach((v, i) => {
            ctx.lineTo(i * 30, 200 - v * 3);
        });

        ctx.strokeStyle = "#00FFC6";
        ctx.stroke();
    }, [data]);

    return (
        <canvas
            ref={canvasRef}
            className="rounded-xl border border-white/10 bg-black/10 backdrop-blur-lg"
        />
    );
}
