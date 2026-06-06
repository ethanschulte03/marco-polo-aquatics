
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Shield, MapPin, ArrowRight } from "lucide-react";

const LOGO_IMG = "/images/logo-large.png";
const LESSONS_IMG = "/images/hero-group-lesson.jpg";
const MASCOT_IMG = "/images/card-private-lesson.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-secondary overflow-hidden">
      {/* Background pool image */}
      <div className="absolute inset-0">
        <img src={LESSONS_IMG} alt="Pool" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-secondary/60 to-secondary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8">
          
          <img
            src={LOGO_IMG}
            alt="Marco Polo Aquatics"
            className="w-64 sm:w-80 md:w-96 mx-auto rounded-2xl shadow-2xl" />
          
        </motion.div>

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
          
          <MapPin size={14} className="text-primary" />
          <span className="text-primary text-sm font-medium">Now Booking Within 20 Miles of Mendon, MA</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.0] mb-6">
          
          Want your child to learn
          <br />
          <span className="text-primary">how to swim</span> this summer?
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/75 text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
          
          Feels like you're <strong>overpaying for group lessons?</strong> Child not making the progress you expected? With one-on-one instruction, every minute is focused on <strong>their</strong> growth, confidence, and safety.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/50 text-sm mb-10">
          
          ⚡ Summer spots are filling quickly — reserve yours today!
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link
            to="/book-lessons"
            className="ripple-btn inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-heading font-semibold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
            
            <GraduationCap size={18} />
            Book a Swim Lesson
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/book-lifeguard"
            className="ripple-btn inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-heading font-semibold text-base hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
            
            <Shield size={18} />
            Hire a Lifeguard
          </Link>
        </motion.div>

        {/* Mascot image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-8 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-secondary"
          style={{ width: "min(400px, 92vw)", minHeight: "450px" }}
        >
          <img
            src="/images/card-private-lesson.jpg"
            alt="Marco Polo Aquatics character"
            className="w-full h-full object-contain object-center"
          />
        </motion.div>
        

        {/* Secondary links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center gap-6 mt-6">
          
          <Link to="/gift-a-lesson" className="text-white/60 hover:text-white text-sm hover:underline underline-offset-2 transition-colors">
            🎁 Gift a lesson
          </Link>
          <Link to="/waitlist" className="text-white/60 hover:text-white text-sm hover:underline underline-offset-2 transition-colors">
            📋 Join the waitlist
          </Link>
        </motion.div>
      </div>
    </section>);

}