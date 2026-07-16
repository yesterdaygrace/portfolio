import { useEffect, useRef } from "react";
import { animate, random, remove } from "animejs";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Particles
    const numParticles = 60;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.5 ? "rgba(99,102,241,0.4)" : "rgba(139,92,246,0.2)",
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const particleAnims = particles.map((p) =>
      animate(p, {
        x: { to: () => random(0, canvas.width), duration: random(10000, 20000) },
        y: { to: () => random(0, canvas.height), duration: random(10000, 20000) },
        alpha: { to: () => random(0.1, 0.6), duration: random(6000, 12000) },
        loop: true,
        direction: "alternate",
        ease: "linear",
      })
    );

    // Floating code glyphs
    const glyphs = "01<>{}[]/XYZ".split("");
    const floatingCode = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      text: glyphs[Math.floor(Math.random() * glyphs.length)],
      alpha: 0,
      vy: -(Math.random() * 0.4 + 0.2), // slow upward drift per frame
    }));

    const codeAnims = floatingCode.map((c) =>
      animate(c, {
        alpha: [
          { to: Math.random() * 0.2 + 0.05, duration: 3000, ease: "outSine" },
          { to: 0, duration: 3000, ease: "inSine", delay: 5000 },
        ],
        loop: true,
        delay: random(0, 8000),
      })
    );

    let animFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 1;
      const g = 60;
      for (let x = 0; x < canvas.width; x += g) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += g) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Particles
      ctx.globalAlpha = 1;
      particles.forEach((p) => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Slowly drift code glyphs upward
      floatingCode.forEach((c) => {
        c.y += c.vy;
        if (c.y < -20) {
          c.y = canvas.height + 20;
          c.x = Math.random() * canvas.width;
          c.text = glyphs[Math.floor(Math.random() * glyphs.length)];
        }
        ctx.globalAlpha = c.alpha;
        ctx.font = "14px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(99,102,241,0.9)";
        ctx.fillText(c.text, c.x, c.y);
      });

      ctx.globalAlpha = 1;
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameId);
      particleAnims.forEach((a) => a.pause());
      codeAnims.forEach((a) => a.pause());
      remove(particles);
      remove(floatingCode);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundColor: "#000000" }}
    />
  );
}
