const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Waves, GraduationCap } from "lucide-react";

const LOGO_IMG = "https://media.db.com/images/public/6a21f0929c99a67411376477/1d87dddb6_08A65D47-47E1-4E89-96D1-EAEA42D029CD.png";
const MASCOT_LIFEGUARD_IMG = "https://media.db.com/images/public/6a21f0929c99a67411376477/8605ce3b7_Screenshot2026-06-04at61142PM.png";

export default function AboutSection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center">
            
            <div className="relative flex flex-col gap-4 items-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
                <img
                  src={LOGO_IMG}
                  alt="Marco Polo Aquatics — Ethan Schulte"
                  className="relative w-64 sm:w-72 rounded-2xl shadow-2xl" />
                
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl w-64 sm:w-72 flex items-center justify-center bg-secondary/40" style={{ minHeight: "350px" }}>
                <img
                  src={MASCOT_LIFEGUARD_IMG}
                  alt="Marco Polo Lifeguard"
                  className="w-full h-full object-contain object-center"
                />
              </div>
              
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-3">Meet Your Instructor</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Hi, I'm Ethan Schulte
            </h2>
            <p className="text-white/75 leading-relaxed mb-5">
              I recently graduated from Providence College with a degree in Business Economics and will be starting my career at Fidelity Investments this fall. Before then, I'm thrilled to spend another summer helping local families through Marco Polo Aquatics.
            </p>
            <p className="text-white/75 leading-relaxed mb-8">
              You may know me from Sandy Beach, where I serve as a <strong className="text-white">Supervising Lifeguard</strong>. Over the years, I've had the privilege of working as a lifeguard, swim instructor, and private lesson coach — helping children of all ages and comfort levels become safer, stronger, and more confident in the water. Nothing beats the moment a nervous swimmer realizes they can do it.
            </p>

            {/* Credentials */}
            <div className="flex flex-col gap-3">
              {[
              { icon: BadgeCheck, text: "Supervising Lifeguard at Sandy Beach" },
              { icon: GraduationCap, text: "Certified Swim Instructor" },
              { icon: Waves, text: "Fully Insured — Lessons at Your Home Pool" }].
              map((item) =>
              <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-primary" />
                  </div>
                  <span className="text-white/80 text-sm">{item.text}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}