import React, { useRef, useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  tint?: [number, number, number];
  speed?: number;
  mouse?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  tint = [0.5, 0.6, 0.8],
  speed = 1.0,
  mouse = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false });
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    const particleCount = Math.min(120, Math.floor((width * height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random(),
        maxLife: 0.5 + Math.random() * 0.5,
        hue: Math.random() * 60 + 200, // Blue-purple range
        size: 1 + Math.random() * 2,
      });
    }

    return particles;
  };

  // Create gradient for fallback
  const createFallbackGradient = () => {
    const [r, g, b] = tint;
    return `
      background: linear-gradient(
        135deg,
        rgba(${Math.floor(100 * r)}, ${Math.floor(150 * g)}, ${Math.floor(200 * b)}, 0.1) 0%,
        rgba(${Math.floor(150 * r)}, ${Math.floor(100 * g)}, ${Math.floor(180 * b)}, 0.15) 25%,
        rgba(${Math.floor(120 * r)}, ${Math.floor(160 * g)}, ${Math.floor(220 * b)}, 0.1) 50%,
        rgba(${Math.floor(80 * r)}, ${Math.floor(120 * g)}, ${Math.floor(160 * b)}, 0.2) 75%,
        rgba(${Math.floor(60 * r)}, ${Math.floor(100 * g)}, ${Math.floor(140 * b)}, 0.1) 100%
      );
      filter: blur(40px);
    `;
  };

  // Animation function
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const particles = particlesRef.current;
    const mousePos = mouseRef.current;

    // Clear canvas with subtle transparency for trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((particle, index) => {
      // Update particle life
      particle.life += 0.005 * speed;
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.hue = Math.random() * 60 + 200;
      }

      // Mouse interaction
      if (mouse && mousePos.isMoving && !reducedMotion) {
        const dx = mousePos.x - particle.x;
        const dy = mousePos.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.001;
          particle.vy += (dy / distance) * force * 0.001;
        }
      }

      // Update position
      particle.x += particle.vx * speed;
      particle.y += particle.vy * speed;

      // Apply some friction
      particle.vx *= 0.998;
      particle.vy *= 0.998;

      // Wrap around screen
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Calculate iridescent color
      const lifeRatio = particle.life / particle.maxLife;
      const alpha = Math.sin(lifeRatio * Math.PI) * 0.6;

      // Apply tint multipliers to create iridescent effect
      const hueShift = particle.hue + lifeRatio * 30;
      const r = Math.floor(Math.sin(hueShift * 0.02) * 127 + 128) * tint[0];
      const g = Math.floor(Math.sin(hueShift * 0.02 + 2) * 127 + 128) * tint[1];
      const b = Math.floor(Math.sin(hueShift * 0.02 + 4) * 127 + 128) * tint[2];

      // Draw particle with gradient
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size * 3,
      );
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Add connection lines between nearby particles
      particles.slice(index + 1, index + 4).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          const opacity = ((80 - distance) / 80) * alpha * 0.3;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    });

    if (!reducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  // Setup canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Reinitialize particles
      particlesRef.current = initParticles(
        window.innerWidth,
        window.innerHeight,
      );
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Mouse/touch tracking
    const handleMouse = (e: MouseEvent | TouchEvent) => {
      if (!mouse) return;

      const clientX = "touches" in e ? e.touches[0]?.clientX || 0 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY || 0 : e.clientY;

      mouseRef.current = {
        x: clientX,
        y: clientY,
        isMoving: true,
      };

      // Reset moving state after a delay
      setTimeout(() => {
        mouseRef.current.isMoving = false;
      }, 100);
    };

    if (mouse && !reducedMotion) {
      window.addEventListener("mousemove", handleMouse);
      window.addEventListener("touchmove", handleMouse);
    }

    // Start animation
    if (!reducedMotion) {
      animate();
    }

    return () => {
      window.removeEventListener("resize", updateSize);
      if (mouse) {
        window.removeEventListener("mousemove", handleMouse);
        window.removeEventListener("touchmove", handleMouse);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [tint, speed, mouse, reducedMotion]);

  if (reducedMotion) {
    // Static gradient fallback
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background: createFallbackGradient(),
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default AnimatedBackground;
