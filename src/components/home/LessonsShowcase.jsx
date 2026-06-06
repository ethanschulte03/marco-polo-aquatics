const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const IMG_UNDERWATER = "/images/card-underwater.jpg";
const IMG_GROUP = "/images/card-semi-private.jpg";
const IMG_PRIVATE = "/images/card-high-five.jpg";
const IMG_BACKFLOAT = "/images/card-floating.jpg";

function ImageCard({ src, alt, animateProps, delay = 0 }) {
  return (
    <motion.div
      {...animateProps}
      viewport={{ once: true }}
      transition={{ delay }}
      className="rounded-2xl overflow-hidden shadow-xl flex items-center justify-center bg-secondary/10"
      style={{ minHeight: "350px" }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover object-center" />
    </motion.div>
  );
}

export default function LessonsShowcase() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-secondary mb-3">
            Fun, Focused Swim Instruction
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every lesson is tailored to your child — with individualized attention that actually works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ImageCard src={IMG_PRIVATE} alt="Private swim lesson" animateProps={{ initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 } }} />
          <ImageCard src={IMG_BACKFLOAT} alt="Learning to float" animateProps={{ initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 } }} delay={0.1} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <ImageCard src={IMG_GROUP} alt="Group swim lesson" animateProps={{ initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 } }} delay={0.1} />
          <ImageCard src={IMG_UNDERWATER} alt="Underwater swim lesson" animateProps={{ initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 } }} delay={0.2} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/book-lessons"
            className="ripple-btn inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-heading font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Book a Lesson <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}