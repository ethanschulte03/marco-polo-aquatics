import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const IMGS = [
  { src: "/images/card-backfloat-new.jpg",   alt: "Marco Polo teaching back float" },
  { src: "/images/card-group-new.jpg",        alt: "Marco Polo group lesson" },
  { src: "/images/card-underwater-new.jpg",   alt: "Underwater skills lesson" },
  { src: "/images/card-jumping-new.jpg",      alt: "Marco Polo cannonball" },
];

export default function LessonsShowcase() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-secondary mb-3">Fun, Focused Swim Instruction</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Every lesson is tailored to your child — with individualized attention that actually works.</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {IMGS.map((img, i) => (
            <motion.div key={img.src} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: "1/1" }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" style={{ objectPosition: "center center" }} />
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <Link to="/book-lessons" className="ripple-btn inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-heading font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            Book a Lesson <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
