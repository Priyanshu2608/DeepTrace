"use client";
import React from "react";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

export default function StarsContainer() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <StarsBackground />
      <ShootingStars />
    </div>
  );
}