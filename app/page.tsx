"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Phone, MapPin, Users, Calendar, Award, Utensils, ChefHat, Flame, ChevronRight, MessageCircle, Clock, Star, ArrowUp } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// Social icons as SVG components
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Touch Ripple Component for Mobile
const TouchRipple = () => {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (!isMobile) return;

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0];
      const id = Date.now();
      setRipples(prev => [...prev, { id, x: touch.clientX, y: touch.clientY }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    };

    document.addEventListener('touchstart', handleTouch, { passive: true });
    return () => document.removeEventListener('touchstart', handleTouch);
  }, []);

  return (
    <>
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none z-[9999]"
          initial={{ width: 20, height: 20, opacity: 0.8 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            border: '2px solid #C9A84C',
            borderRadius: '50%',
            background: 'rgba(201, 168, 76, 0.2)',
          }}
        />
      ))}
    </>
  );
};

// Custom Gold Cursor Component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) return;

    const move = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.hasAttribute('data-hover')
      );
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        animate={{ x: position.x - 6, y: position.y - 6 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{ width: 12, height: 12, background: '#C9A84C', borderRadius: '50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        animate={{ x: position.x - 20, y: position.y - 20, scale: isHovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        style={{ width: 40, height: 40, border: '1px solid #C9A84C', borderRadius: '50%', opacity: 0.5 }}
      />
    </>
  );
};

// Animated Counter Component
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Twinkling Stars Component - ONLY background effect
const TwinklingStars = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2, // Random sizes 2px to 5px
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-[#C9A84C]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2], // Brighter: 0.6 to 0.8
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Rotating Border Component
const RotatingBorder = ({ children, size = 300 }: { children: React.ReactNode; size?: number }) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, #C9A84C 60deg, transparent 120deg, #C9A84C 180deg, transparent 240deg, #C9A84C 300deg, transparent 360deg)",
          padding: "3px",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full bg-[#0a0a0a]" />
      </motion.div>
      <div className="absolute inset-[3px] rounded-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-1">
        {children}
      </div>
    </div>
  );
};

// Animations
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleOnHover = {
  scale: 1.02,
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
};

export default function Home() {
  // Cursor is in CustomCursor component
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const galleryImages = [
    { url: "https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/gallery-1.jpg", span: "row-span-2" },
    { url: "https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/gallery-2.jpg", span: "" },
    { url: "https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/gallery-3.jpg", span: "" },
    { url: "https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/gallery-4.jpg", span: "row-span-2" },
    { url: "https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/gallery-5.jpg", span: "" },
    { url: "https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/gallery-6.jpg", span: "" },
    { url: "https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/gallery-7.jpg", span: "" },
    { url: "https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/gallery-8.jpg", span: "" },
  ];

  const stats = [
    { value: 10, suffix: "+", label: "Years Experience", icon: Clock },
    { value: 500, suffix: "+", label: "Events Served", icon: Calendar },
    { value: 1000, suffix: "+", label: "Happy Customers", icon: Users },
    { value: 50, suffix: "+", label: "Event Types", icon: Award },
  ];

  const floatingStats = [
    { value: "10+", label: "Years", delay: 0 },
    { value: "500+", label: "Events", delay: 0.2 },
    { value: "100%", label: "Satisfaction", delay: 0.4 },
  ];

  return (
    <>
      <CustomCursor />
      <TouchRipple />
      <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24 px-4 md:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Dark base background */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />

          {/* Only Twinkling Stars */}
          <TwinklingStars />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <img
              src="https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/pnc-logo.jpg"
              alt="PNC Logo"
              style={{width:'120px', height:'120px', objectFit:'contain', borderRadius:'50%', margin:'0 auto'}}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 font-[var(--font-playfair)] leading-tight"
          >
            <span className="shimmer-text block text-5xl md:text-7xl font-bold">NIRVANA</span>
            <span className="text-white/90 block mt-2 text-4xl md:text-6xl font-bold">GOPINATH</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#C9A84C]" />
            <p className="text-2xl sm:text-3xl text-[#F0C060] font-medium tracking-wide">
              Founder & Head Caterer
            </p>
            <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#C9A84C]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl sm:text-2xl text-white/50 mb-12 max-w-2xl mx-auto font-light"
          >
            Bringing excellence to Hyderabad through
            <span className="text-[#C9A84C] font-medium"> Prem Nirvana Caterers</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="tel:9949753542"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(201, 168, 76, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#C9A84C] via-[#E5C87A] to-[#C9A84C] bg-[length:200%] rounded-full text-[#0a0a0a] font-bold text-lg transition-all duration-500 shadow-2xl"
            >
              <Phone className="w-6 h-6" />
              Call Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="https://wa.me/919949753542"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 168, 76, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-10 py-5 border-2 border-[#C9A84C]/50 rounded-full text-white font-semibold text-lg backdrop-blur-sm transition-all duration-300 hover:border-[#C9A84C]"
            >
              <MessageCircle className="w-6 h-6 text-[#C9A84C]" />
              WhatsApp
            </motion.a>
          </motion.div>

          {/* Floating Stats Cards - Hidden on mobile/tablet */}
          <div className="hidden md:block">
            {floatingStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + stat.delay }}
                className={`hidden md:absolute pointer-events-auto ${
                  index === 0 ? "top-1/4 left-[5%]" :
                  index === 1 ? "top-1/3 right-[8%]" :
                  "bottom-1/4 left-[10%]"
                }`}
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-[#C9A84C]/20 hover:border-[#C9A84C]/50 transition-all duration-300"
                >
                  <p className="text-3xl font-bold text-[#C9A84C]">{stat.value}</p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-7 h-12 border-2 border-[#C9A84C]/40 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-[#C9A84C] rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#C9A84C]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Profile Image Side */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center lg:items-start">
              <div className="relative">
                {/* Glow Effect - kept but softer */}
                <motion.div
                  animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-8 bg-[#C9A84C]/10 rounded-full blur-3xl"
                />

                <RotatingBorder size={320}>
                  <div className="relative w-full h-full">
                    <img
                      src="https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/gopi-profile.jpg"
                      alt="Nirvana Gopinath"
                      style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'50%'}}
                    />
                  </div>
                </RotatingBorder>
              </div>

              {/* Founder Badge - Below Photo */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4 bg-[#C9A84C] rounded-full px-4 py-1"
              >
                <span className="text-[#0a0a0a] font-bold text-sm">Founder</span>
              </motion.div>

              {/* Name Below Badge */}
              <div style={{textAlign:'center', marginTop:'12px'}}>
                <p style={{color:'#C9A84C', fontWeight:'bold', fontSize:'1.1rem'}}>Nirvana Gopinath</p>
                <p style={{color:'#888', fontSize:'0.85rem'}}>Founder, Prem Nirvana Caterers</p>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div variants={fadeInUp}>
              <motion.h2
                variants={fadeInUp}
                className="text-5xl sm:text-6xl font-bold mb-8 font-[var(--font-playfair)] leading-tight"
              >
                A Legacy Born From <br />
                <span className="gold-gradient">Passion</span>
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-white/70 text-xl leading-relaxed mb-8">
                I started Prem Nirvana Caterers on a small scale with an unwavering passion for quality and taste. When you choose Prem Nirvana Caterers, you are not just hiring a caterer. You are inviting a family that treats your celebration as their own — with care, precision, and an uncompromising commitment to excellence.
              </motion.p>

              {/* Quote */}
              <motion.blockquote
                variants={fadeInUp}
                className="border-l-[3px] border-[#C9A84C] pl-5 my-8"
              >
                <p className="text-[#C9A84C] italic text-[1.1rem] leading-relaxed">
                  &ldquo;Every dish tells a story. Every event becomes a memory.&rdquo;
                </p>
                <cite className="text-white/50 text-[0.85rem] not-italic mt-2 block">
                  — Nirvana Gopinath, Founder
                </cite>
              </motion.blockquote>

              {/* Stats Grid */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-[#C9A84C]/50 transition-all duration-500 group"
                  >
                    <stat.icon className="w-5 h-5 text-[#C9A84C] mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-3xl font-bold">
                      <span className="gold-gradient"><Counter value={stat.value} suffix={stat.suffix} /></span>
                    </p>
                    <p className="text-white/50 text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Signboard Photo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{marginTop:'2rem'}}
              >
                <img
                  src="https://londonvfxbucket.s3.ap-south-1.amazonaws.com/pnc-img/pnc-signboard.jpg"
                  alt="Our Office"
                  style={{width:'100%', borderRadius:'12px', border:'1px solid #C9A84C'}}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.span variants={fadeInUp} className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase mb-4 block">
              Event Gallery
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-5xl sm:text-6xl font-bold mb-6 font-[var(--font-playfair)]">
              Moments <span className="gold-gradient">We&apos;ve Created</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 max-w-2xl mx-auto text-xl">
              A glimpse of our events and the unforgettable experiences we deliver
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative overflow-hidden rounded-2xl group ${
                  image.span === "row-span-2" ? "row-span-2" : ""
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0"
                >
                  <img
                    src={image.url}
                    alt={`Event ${index + 1}`}
                    style={{width:'100%', height:'100%', objectFit:'cover'}}
                  />
                </motion.div>

                {/* Gold Overlay on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#C9A84C]/20 to-transparent"
                />

                {/* Hover Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="w-14 h-14 rounded-full bg-[#C9A84C] flex items-center justify-center"
                  >
                    <Utensils className="w-6 h-6 text-[#0a0a0a]" />
                  </motion.div>
                  <p className="text-white font-medium mt-4">View Event</p>
                </motion.div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-[#C9A84C]/50 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#151210] via-[#0a0a0a] to-[#0a0a0a]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="text-[#C9A84C] text-sm tracking-[0.3em] uppercase mb-4 block">
              Get in Touch
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-5xl sm:text-6xl font-bold mb-6 font-[var(--font-playfair)]">
              Let&apos;s Plan Your <span className="gold-gradient">Next Event</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 max-w-2xl mx-auto text-xl">
              Ready to make your event unforgettable? Contact us for customized catering solutions
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
          >
            {/* WhatsApp Card */}
            <motion.a
              href="https://wa.me/919949753542"
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-6 md:p-10 rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-white/10 overflow-hidden transition-all duration-500 h-full flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-green-500/30 to-green-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-green-500/30">
                  <MessageCircle className="w-7 h-7 md:w-10 md:h-10 text-green-400" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 group-hover:text-green-400 transition-colors">WhatsApp</h3>
                <p className="text-white/60 text-sm md:text-lg">99497 53542</p>
              </div>
            </motion.a>

            {/* Call Card */}
            <motion.a
              href="tel:9949753542"
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(201, 168, 76, 0.25)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-6 md:p-10 rounded-3xl bg-gradient-to-b from-[#C9A84C]/10 to-[#0f0f0f] border border-[#C9A84C]/30 overflow-hidden transition-all duration-500 h-full flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-[#C9A84C]/40 to-[#A0843A]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-[#C9A84C]/50">
                  <Phone className="w-7 h-7 md:w-10 md:h-10 text-[#C9A84C]" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 text-[#F0C060]">Call Us</h3>
                <p className="text-white/60 text-sm md:text-lg">99497 53542</p>
              </div>
            </motion.a>

            {/* Social Card */}
            <motion.div
              variants={fadeInUp}
              className="p-6 md:p-10 rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-white/10 text-center h-full flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-[#C9A84C]/30 to-[#A0843A]/10 flex items-center justify-center border border-[#C9A84C]/30">
                <Users className="w-7 h-7 md:w-10 md:h-10 text-[#C9A84C]" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Follow Us</h3>
              <div className="flex justify-center gap-3 md:gap-4 mt-4 md:mt-6">
                <motion.a
                  href="https://www.facebook.com/chinna.nenavath"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-600/20 flex items-center justify-center hover:bg-blue-600/40 transition-all duration-300 border border-blue-500/30"
                >
                  <FacebookIcon className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/premnirvanaevents"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-pink-600/20 flex items-center justify-center hover:bg-pink-600/40 transition-all duration-300 border border-pink-500/30"
                >
                  <InstagramIcon className="w-4 h-4 md:w-6 md:h-6 text-pink-400" />
                </motion.a>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              variants={fadeInUp}
              className="p-6 md:p-10 rounded-3xl bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-white/10 text-center h-full flex flex-col items-center justify-center"
            >
              <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br from-[#C9A84C]/30 to-[#A0843A]/10 flex items-center justify-center border border-[#C9A84C]/30">
                <span className="text-2xl md:text-3xl">📍</span>
              </div>
              <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">Visit Us</h3>
              <p className="text-white/60 text-sm md:text-lg">OLD GAYATHRINAGAR</p>
            </motion.div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center p-10 rounded-3xl bg-gradient-to-r from-[#C9A84C]/10 via-[#1a1a1a] to-[#C9A84C]/10 border border-[#C9A84C]/20"
          >
            <div className="flex items-center justify-center gap-3 text-[#C9A84C] mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-xl font-semibold">Serving across Hyderabad, Telangana</span>
              <MapPin className="w-6 h-6" />
            </div>
            <p className="text-white/60 text-lg">
              Available for weddings, corporate events, private parties, and all special occasions
            </p>
          </motion.div>

          {/* Google Maps */}
          <div style={{width:'100%', marginTop:'40px', borderRadius:'12px', overflow:'hidden', border:'1px solid #C9A84C'}}>
            <iframe
              src="https://maps.google.com/maps?q=17.3354483,78.5307051&output=embed"
              width="100%"
              height="350"
              style={{border:0, filter:'grayscale(20%) invert(90%) hue-rotate(180deg)'}}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#151210] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold font-[var(--font-playfair)] gold-gradient">
                Prem Nirvana Caterers
              </h3>
              <p className="text-white/50 mt-2">
                Crafting memorable culinary experiences since 2014
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <a href="tel:9949753542" className="text-white/60 hover:text-[#C9A84C] transition-colors text-lg">
                +91 99497 53542
              </a>
              <a href="tel:7780797066" className="text-white/60 hover:text-[#C9A84C] transition-colors text-lg">
                +91 77807 97066
              </a>
            </div>

            <div className="flex gap-4">
              <motion.a
                href="https://www.facebook.com/chinna.nenavath"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600/20 transition-colors border border-white/10"
              >
                <FacebookIcon className="w-5 h-5 text-white/70" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/premnirvanaevents"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600/20 transition-colors border border-white/10"
              >
                <InstagramIcon className="w-5 h-5 text-white/70" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-sm"
          >
            <p>&copy; {new Date().getFullYear()} Prem Nirvana Caterers. All rights reserved.</p>
            <p className="mt-2 text-[#C9A84C]/60">Designed with passion for taste and quality</p>
          </motion.div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/919949753542"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.15, boxShadow: "0 0 40px rgba(34, 197, 94, 0.5)" }}
        whileTap={{ scale: 0.85 }}
        className="fixed bottom-24 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center shadow-lg z-50 cursor-pointer group"
      >
        {/* Pulse animation ring */}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-green-400"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-green-400"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.6,
          }}
        />
        <MessageCircle className="w-7 h-7 text-white relative z-10" />
      </motion.a>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(201, 168, 76, 0.5)" }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#A0843A] flex items-center justify-center shadow-lg z-50 cursor-pointer"
      >
        <ArrowUp className="w-6 h-6 text-[#0a0a0a]" />
      </motion.button>
      </div>
    </>
  );
}

// Force redeploy - Sat May  2 12:07:52 UTC 2026
