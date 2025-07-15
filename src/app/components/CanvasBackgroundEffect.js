"use client";
import { useEffect, useRef } from "react";

export default function CanvasBackgroundEffect() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });
  const sparks = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1,
      radius: Math.random() * 3 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dots
      dots.forEach((dot) => {
        const distance = Math.hypot(
          mouse.current.x - dot.x,
          mouse.current.y - dot.y
        );
        if (distance < 100) {
          const angle = Math.atan2(
            mouse.current.y - dot.y,
            mouse.current.x - dot.x
          );
          dot.x += Math.cos(angle) * 0.3;
          dot.y += Math.sin(angle) * 0.3;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fill();

        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
      });

      // Sparks
      sparks.current.forEach((spark, index) => {
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.fill();

        spark.x += spark.dx;
        spark.y += spark.dy;
        spark.life -= 1;

        if (spark.life <= 0) {
          sparks.current.splice(index, 1);
        }
      });

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      for (let i = 0; i < 20; i++) {
        sparks.current.push({
          x,
          y,
          dx: (Math.random() - 0.5) * 4,
          dy: (Math.random() - 0.5) * 4,
          radius: Math.random() * 2 + 1,
          color: "rgba(255, 255, 255, 0.8)",
          life: 60,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
    />
  );
}
