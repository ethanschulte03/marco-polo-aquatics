import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Shield } from "lucide-react";

const tiers = [
  {
    label: "Standard",
    subtitle: "Up to 15 swimmers",
    price: "$40",
    unit: "/hr",
    color: "border-accent",
    badgeColor: "bg-accent text-accent-foreground",
    badge: "Most Common",
    perks: [
      "Up to 15 swimmers",
      "In-ground or above-ground pool",
      "Full safety equipment provided",
      "Certified & experienced lifeguard",
    ],
  },
  {
    label: "Large Event",
    subtitle: "16–20+ swimmers",
    price: "$50",
    unit: "/hr",
    color: "border-primary",
    badgeColor: "bg-primary text-primary-foreground",
    badge: "Larger Groups",
    perks: [
      "16–20+ swimmers",
      "Pool parties & community events",
      "Full safety equipment provided",
      "Certified & experienced lifeguard",
    ],
  },
];

export default function LifeguardPricingSection() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield size={28} className="text-accent" />
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-secondary">
              Lifeguard Pricing
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Flat hourly rates with no hidden fees. We bring all required safety equipment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`bg-background border-2 ${tier.color} rounded-2xl p-8 flex flex-col relative overflow-hidden`}
            >
              <div className={`absolute top-5 right-5 text-xs font-semibold px-3 py-1 rounded-full ${tier.badgeColor}`}>
                {tier.badge}
              </div>

              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-secondary">{tier.label}</h3>
                <p className="text-muted-foreground text-sm">{tier.subtitle}</p>
              </div>

              <div className="flex items-end gap-1 mb-8">
                <span className="font-display text-5xl font-bold text-secondary">{tier.price}</span>
                <span className="text-muted-foreground text-lg mb-2">{tier.unit}</span>
              </div>

              <ul className="flex flex-col gap-2 mb-8 flex-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-accent flex-shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>

              <Link
                to="/book-lifeguard"
                className="ripple-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-sm transition-all bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Book a Lifeguard
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Minimum booking is <strong>2 hours</strong>. Have questions about your event?{" "}
          <a href="mailto:ethan.schulte@gmail.com" className="text-primary hover:underline">Reach out first →</a>
        </motion.p>
      </div>
    </section>
  );
}