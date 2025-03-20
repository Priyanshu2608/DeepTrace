"use client";
import React, { useEffect, useRef } from "react";

export function ShootingStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Setting canvas to full viewport size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    // Shooting stars array
    let shootingStars = [];
    
    // Create a shooting star
    function createShootingStar() {
      const star = {
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.floor(Math.random() * 80) + 100,
        // Increased speed range from 15-25 to 25-40
        speed: Math.floor(Math.random() * 15) + 25,
        size: Math.random() * 2 + 1,
        angle: (Math.random() * 20 + 20) * (Math.PI / 180),
        life: 0,
        // Decreased max life for faster shooting stars
        maxLife: Math.floor(Math.random() * 40) + 60
      };
      
      shootingStars.push(star);
      
      // Increased maximum number of shooting stars
      if (shootingStars.length > 5) {
        shootingStars.shift();
      }
    }
    
    // Create shooting stars at intervals
    const interval = setInterval(() => {
      // Increased chance of shooting star appearing (from 30% to 40%)
      if (Math.random() < 0.4) {
        createShootingStar();
      }
    }, 1500); // Decreased interval from 2000ms to 1500ms
    
    // Animation
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw shooting stars
      shootingStars.forEach((star, index) => {
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.life++;
        
        // Remove if off screen or expired
        if (star.x < 0 || star.x > canvas.width || star.y > canvas.height || star.life > star.maxLife) {
          shootingStars.splice(index, 1);
          return;
        }
        
        // Draw shooting star
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - star.life / star.maxLife})`;
        ctx.lineWidth = star.size;
        ctx.lineCap = "round";
        
        const tailX = star.x - Math.cos(star.angle) * star.length * (1 - star.life / star.maxLife);
        const tailY = star.y - Math.sin(star.angle) * star.length * (1 - star.life / star.maxLife);
        
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}