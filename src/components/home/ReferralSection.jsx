import React from "react";
import { motion } from "framer-motion";
import { Gift, Heart } from "lucide-react";

export default function ReferralSection() {
  return (
    <section className="py-20 bg-primary/5 border-y border-primary/10">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Gift size={24} className="text-primary" />
            </div>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Share the Love — Earn a Reward
          </h2>
          <p className="text-lg leading-relaxed mb-6 font-medium text-[hsl(var(--muted-foreground))]">Know a family who would love Marco Polo Aquatics? Once they have completed their first lesson and mentions your name, you'll earn 50% off your next lesson as a thank-you.

          </p>
          <div className="bg-card border border-border rounded-2xl p-6 text-left max-w-xl mx-auto">
            <div className="flex items-start gap-3 mb-3">
              <Heart size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <strong className="text-secondary">How it works:</strong> Simply have the referred family mention your name when they book their first lesson. No codes or apps needed — just a friendly heads-up.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Heart size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                There's no limit — every referral earns you a discount, as long as your most recent lesson is complete.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}