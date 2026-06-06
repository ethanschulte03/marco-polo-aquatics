import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const towns = [
  "Hopkinton", "Milford", "Uxbridge", "Grafton",
  "Northborough", "Southborough", "Medway", "Millis",
  "Franklin", "Bellingham", "Hopedale", "Upton",
];

export default function ServiceAreaSection() {
  return (
    <section className="py-24 bg-secondary text-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin size={28} className="text-primary" />
            <h2 className="font-display text-4xl lg:text-5xl font-bold">
              Service Area
            </h2>
          </div>
          <p className="text-white/70 max-w-xl mx-auto">
            Marco Polo Aquatics proudly serves families within a 25-mile radius of Mendon, MA.
          </p>
        </motion.div>

        {/* Map placeholder — centered on Mendon, MA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden mb-10 border border-white/10 shadow-2xl"
          style={{ height: 360 }}
        >
          <iframe
            title="Service Area Map"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Mendon,+MA&z=10&output=embed"
            allowFullScreen
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-heading font-semibold text-white mb-4 text-center text-lg">
            Towns Currently Served (examples)
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {towns.map((town) => (
              <span key={town} className="bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80">
                {town}
              </span>
            ))}
          </div>
          <p className="text-center text-white/60 text-sm flex items-center justify-center gap-2">
            <Navigation size={14} className="text-primary" />
            Not sure if we cover your area?{" "}
            <a href="mailto:ethan.schulte@gmail.com" className="text-primary hover:underline ml-1">
              Reach out and we'll let you know.
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}