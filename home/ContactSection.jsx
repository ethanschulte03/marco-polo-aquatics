import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-24 bg-secondary text-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Questions? Reach Out!
          </h2>
          <p className="text-white/70">
            Can't find an open slot? Have questions about lessons? Let me know — I'm happy to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <motion.a
            href="mailto:ethan.schulte@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/40 transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <Mail size={24} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Email</h3>
            <p className="text-white/70 text-sm break-all">ethan.schulte@gmail.com</p>
          </motion.a>

          <motion.a
            href="tel:8137674801"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/40 transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
              <Phone size={24} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Phone</h3>
            <p className="text-white/70 text-sm">(813) 767-4801</p>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group bg-white/10 border border-white/20 rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <MapPin size={24} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">Service Area</h3>
            <p className="text-white/70 text-sm">Within 20 miles of Mendon, MA</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}