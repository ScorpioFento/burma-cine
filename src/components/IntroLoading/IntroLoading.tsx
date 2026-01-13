"use client";

import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { cameraman } from "../../assets";
import { VideoCameraSvg } from "../../lib/svgHelper";
import "./IntroLoading.css";

/* =====================
   Constants
===================== */
const MOVE_DURATION = 4;
const PAUSE_DURATION = 0.5;
const WHEEL_ROTATION = 720;

/* =====================
   Main Component
===================== */
export default function IntroLoading() {
  const logoRef = useRef<HTMLDivElement>(null);
  const cameramanRef = useRef<HTMLImageElement>(null);
  const cameraWheelRef = useRef<HTMLDivElement>(null);
  const pulseLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animateLogo();
      animateCameraman();
    });

    return () => ctx.revert();
  }, []);

  const animateLogo = () => {
    if (!logoRef.current) return;

    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      }
    );
  };

  const animateCameraman = () => {
    if (
      !cameramanRef.current ||
      !cameraWheelRef.current ||
      !pulseLineRef.current
    )
      return;

    const lineWidth = pulseLineRef.current.getBoundingClientRect().width;
    const startX = -lineWidth / 2;

    setInitialPositions(startX);
    createMovementTimeline(lineWidth);
    createFloatingEffect();
  };

  const setInitialPositions = (startX: number) => {
    gsap.set(cameramanRef.current, {
      x: startX + 20,
      y: 0,
      scale: 0.8,
      transformOrigin: "center",
    });

    gsap.set(cameraWheelRef.current, {
      x: startX - 15,
      y: 0,
      rotation: 0,
      transformOrigin: "center",
    });
  };

  const rotateWheel = (direction: 1 | -1, progress: number) => {
    if (!cameraWheelRef.current) return;

    gsap.set(cameraWheelRef.current, {
      rotation: direction * progress * WHEEL_ROTATION,
    });
  };

  const createMovementTimeline = (lineWidth: number) => {
    gsap
      .timeline({ repeat: -1 })
      .to([cameramanRef.current, cameraWheelRef.current], {
        x: `+=${lineWidth}`,
        duration: MOVE_DURATION,
        ease: "none",
        onUpdate() {
          rotateWheel(1, this.progress());
        },
      })
      .to({}, { duration: PAUSE_DURATION })
      .to([cameramanRef.current, cameraWheelRef.current], {
        x: `-=${lineWidth}`,
        duration: MOVE_DURATION,
        ease: "none",
        onUpdate() {
          rotateWheel(-1, this.progress());
        },
      })
      .to({}, { duration: PAUSE_DURATION });
  };

  const createFloatingEffect = () => {
    gsap.to([cameramanRef.current, cameraWheelRef.current], {
      y: "-=1",
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  };

  return (
    <div className="fixed inset-0 bg-linear-to-b from-gray-950 to-black z-50 overflow-hidden floating-container">
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="relative mb-10">
          <div ref={logoRef} className="opacity-0">
            <div className="text-white font-bold tracking-wider text-[clamp(2.5rem,5vw,3rem)] text-center">
              <span className="text-amber-500">Burmese</span> Cine
            </div>

            {/* Pulse Line */}
            <div ref={pulseLineRef} className="relative h-px w-48 mx-auto mt-3">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500 to-transparent animate-pulse" />

              <CameraWheel ref={cameraWheelRef} />
              <Cameraman ref={cameramanRef} />
            </div>
          </div>
        </div>

        <VideoCameraSvg />

        <p className="mt-8 text-gray-400 text-sm text-center tracking-widest font-mono">
          LOADING CINEMATIC MASTERPIECES...
        </p>

        <p className="absolute bottom-8 text-gray-600 text-xs tracking-wider font-mono">
          BURMESE CINE
        </p>
      </div>
      {/* CinematicLights component removed - styles are now in CSS file */}
    </div>
  );
}

/* =====================
   ForwardRef Components
===================== */
const CameraWheel = forwardRef<HTMLDivElement>((_, ref) => {
  const lines = 8; // Number of lines in the wheel
  const rotationStep = 360 / lines;

  return (
    <div
      ref={ref}
      className="absolute z-10 w-8 h-8 rounded-full border-2 border-amber-500/70 bg-black/60"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        filter: "drop-shadow(0 0 5px rgba(255,193,7,0.5))",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Create multiple lines for a more complete wheel */}
        {Array.from({ length: lines }).map((_, index) => {
          const rotation = index * rotationStep;
          return (
            <div
              key={index}
              className="absolute w-full h-0.5 bg-amber-500/60"
              style={{
                transform: `rotate(${rotation}deg)`,
                // Make every other line shorter for a more interesting pattern
                width: index % 2 === 0 ? "90%" : "100%",
              }}
            />
          );
        })}
      </div>
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
});

const Cameraman = forwardRef<HTMLImageElement>((_, ref) => (
  <img
    ref={ref}
    src={cameraman}
    alt="Cameraman"
    className="absolute z-20 w-16 h-16 object-contain"
    style={{
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      filter: "drop-shadow(0 0 8px rgba(255,193,7,0.6))",
    }}
  />
));

Cameraman.displayName = "Cameraman";
