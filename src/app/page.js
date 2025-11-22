"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
  const cardRef = useRef(null);
  const textOverlayRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const getRandomCharacter = () => {
    return Math.random() < 0.5 ? "0" : "1";
  };

  const createRandomString = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += getRandomCharacter();
    }
    return result;
  };

  useGSAP(() => {
    if (isHovered && textOverlayRef.current) {
      gsap.to(textOverlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else if (textOverlayRef.current) {
      gsap.to(textOverlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  const handleMouseMove = (event) => {
    if (!cardRef.current || !textOverlayRef.current) return;

    const cardBounds = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - cardBounds.left;
    const mouseY = event.clientY - cardBounds.top;

    textOverlayRef.current.textContent = createRandomString(2000);

    const maskRadius = 300;
    textOverlayRef.current.style.maskImage = `radial-gradient(
      ${maskRadius}px circle at ${mouseX}px ${mouseY}px, 
      rgba(255, 255, 255, 0.50) 20%, 
      rgba(255, 255, 255, 0.20), 
      transparent
    )`;
    textOverlayRef.current.style.webkitMaskImage = `radial-gradient(
      ${maskRadius}px circle at ${mouseX}px ${mouseY}px, 
      rgba(255, 255, 255, 0.50) 20%, 
      rgba(255, 255, 255, 0.20), 
      transparent
    )`;
  };

  return (
    <div className="h-screen w-full flex justify-center items-center p-6">
      <div className="w-full max-w-sm aspect-square relative">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex size-full items-center justify-center relative rounded-4xl overflow-hidden cursor-pointer border border-white/15"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            fill="none"
            className="size-20 relative z-4"
          >
            <path
              d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 64 L 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z"
              fill="#FF5A00"
            />
          </svg>

          <div
            className="absolute inset-0 pointer-events-none z-3"
            style={{
              background:
                "radial-gradient(rgb(0, 0, 0) 40%, rgb(256, 256, 256) 50%)",
              mixBlendMode: "darken",
            }}
          />

          <div
            ref={textOverlayRef}
            className="absolute left-0 top-0 size-full text-white text-xs font-mono font-light tracking-widest wrap-break-word opacity-0"
            style={{
              transform: "scale(1.03)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
