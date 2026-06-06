const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "/images/banner-lesson.jpg";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Pool" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider mb-4">
            🌊 Build confidence. ☀️ Learn lifelong water safety. 🏊♂️ Make this summer one to remember.
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Dive In?
          </h2>
          <p className="text-white/70 text-lg mb-4 max-w-2xl mx-auto">
            Summer spots are filling quickly. Reserve your lesson times today — or reach out with any questions.
          </p>
          <p className="text-white/50 text-sm mb-10">
            I come directly to your home pool — within 20 miles of Mendon, MA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-lessons"
              className="ripple-btn inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-heading font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
            >
              Book Swimming Lessons
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/book-lifeguard"
              className="ripple-btn inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-heading font-semibold hover:bg-white/20 transition-all"
            >
              Hire a Lifeguard
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}