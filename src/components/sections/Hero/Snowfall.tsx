"use client";

import { useEffect, useRef } from "react";
import styles from "./snowfall.module.scss";

type Flake = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  phase: number;
  sway: number;
  alpha: number;
};

const DESKTOP_COUNT = 46;
const MOBILE_COUNT = 24;

function createFlake(width: number, height: number, anywhere: boolean): Flake {
  const depth = Math.random();
  return {
    x: Math.random() * width,
    y: anywhere ? Math.random() * height : -10 - Math.random() * 40,
    radius: 1.1 + depth * 2.6,
    speed: 14 + depth * 34,
    drift: -4 + Math.random() * 8,
    phase: Math.random() * Math.PI * 2,
    sway: 0.4 + Math.random() * 0.9,
    alpha: 0.45 + depth * 0.45,
  };
}

export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let frame = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 768 ? MOBILE_COUNT : DESKTOP_COUNT;
      flakes = Array.from({ length: count }, () => createFlake(width, height, true));
    };

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible) {
        last = now;
        return;
      }
      const delta = Math.min((now - last) / 1000 || 0, 0.05);
      last = now;
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i += 1) {
        const flake = flakes[i]!;
        flake.y += flake.speed * delta;
        flake.phase += flake.sway * delta;
        flake.x += (flake.drift + Math.sin(flake.phase) * 10) * delta;

        if (flake.y > height + 10) flakes[i] = createFlake(width, height, false);
        else if (flake.x < -10) flake.x = width + 10;
        else if (flake.x > width + 10) flake.x = -10;

        const gradient = context.createRadialGradient(flake.x, flake.y, 0, flake.x, flake.y, flake.radius * 1.8);
        gradient.addColorStop(0, `hsla(0, 0%, 100%, ${flake.alpha})`);
        gradient.addColorStop(0.55, `hsla(210, 60%, 98%, ${flake.alpha * 0.7})`);
        gradient.addColorStop(1, "hsla(210, 60%, 98%, 0)");
        context.shadowColor = "hsla(218, 45%, 40%, 0.28)";
        context.shadowBlur = 3;
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(flake.x, flake.y, flake.radius * 1.8, 0, Math.PI * 2);
        context.fill();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    resize();
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.snow} aria-hidden="true" />;
}
