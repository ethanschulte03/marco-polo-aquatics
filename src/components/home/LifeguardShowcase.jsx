
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const IMG_LIFEGUARD = "/images/banner-lifeguard.jpg";
const IMG_WALKING = "/images/lifeguard-walking.jpg";

export default function LifeguardShowcase() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-secondary mb-4">
              Professional Lifeguard Services
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Planning a pool party or summer event? Get a certified, experienced lifeguard on duty. Safety and peace of mind — guaranteed.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether it's a family gathering, birthday party, or neighborhood event, we're here to ensure everyone stays safe while having fun in the water.
            </p>
            <Link
              to="/book-lifeguard"
              className="ripple-btn inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-full font-heading font-semibold hover:bg-accent/90 transition-all">
              Book a Lifeguard
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ aspectRatio: "16/7" }}>
              <img src={IMG_LIFEGUARD} alt="Marco Polo Aquatics Lifeguard" className="w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ aspectRatio: "16/7" }}>
              <img src={IMG_WALKING} alt="Marco Polo Aquatics Lifeguard Walking" className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
