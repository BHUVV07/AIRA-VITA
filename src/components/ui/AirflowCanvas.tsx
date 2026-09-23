"use client";

import React, { useEffect, useRef } from "react";

export default function AirflowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Airflow Particle Streams
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      length: number;
      color: string;
      alpha: number;
      size: number;
    }> = [];

    const colors = [
      "rgba(109, 40, 217, ",  // purple
      "rgba(2, 132, 199, ",   // hvac blue
      "rgba(56, 189, 248, ",  // sky blue
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedX: 0.8 + Math.random() * 1.5,
        speedY: (Math.random() - 0.5) * 0.4,
        length: 30 + Math.random() * 70,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.15 + Math.random() * 0.35,
        size: 1.5 + Math.random() * 1.5,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render flowing airflow streamlines
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += Math.sin(p.x * 0.008) * 0.4 + p.speedY;

        if (p.x > width + p.length) {
          p.x = -p.length;
          p.y = Math.random() * height;
        }

        // Draw particle line head and glow trail
        const gradient = ctx.createLinearGradient(p.x - p.length, p.y, p.x, p.y);
        gradient.addColorStop(0, `${p.color}0)`);
        gradient.addColorStop(0.7, `${p.color}${p.alpha})`);
        gradient.addColorStop(1, `${p.color}${p.alpha * 1.4})`);

        ctx.beginPath();
        ctx.moveTo(p.x - p.length, p.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.size;
        ctx.stroke();

        // Small glowing particle head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * 1.5})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
}
