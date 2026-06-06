const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const IMG_LIFEGUARD = "/images/hero-lifeguard.jpg";
const IMG_MASCOT = "/images/mascot-main.jpg";

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

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden shadow-xl flex items-center justify-center bg-secondary/10"
              style={{ minHeight: "350px" }}>
              
              <img src={IMG_LIFEGUARD} alt="Marco Polo Aquatics Lifeguard" className="w-full h-full object-cover object-center my-20" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl flex items-center justify-center bg-secondary/10"
              style={{ minHeight: "350px" }}>
              
              <img src={IMG_MASCOT} alt="Marco Polo Aquatics" className="w-full h-full object-cover object-center" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>);

}