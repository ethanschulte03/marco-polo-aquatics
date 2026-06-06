import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
{
  type: "Private",
  subtitle: "One swimmer",
  color: "border-primary",
  badge: "Most Popular",
  badgeColor: "bg-primary text-primary-foreground",
  options: [
  { duration: "30 minutes", price: "$40" },
  { duration: "60 minutes", price: "$50" }],

  perks: [
  "100% focused on your child",
  "Personalized curriculum",
  "Faster skill development",
  "Flexible scheduling"],

  cta: "Book Private Lessons",
  href: "/book-lessons",
  accent: false
},
{
  type: "Semi-Private",
  subtitle: "2–6 swimmers",
  color: "border-accent",
  badge: "Great for Siblings and Neighbors",
  badgeColor: "bg-accent text-accent-foreground",
  options: [
  { duration: "30 minutes", price: "$25/kid" },
  { duration: "60 minutes", price: "$30/kid" }],

  perks: [
  "Perfect for siblings",
  "Social, fun environment",
  "Same personalized approach",
  "Up to 6 swimmers"],

  cta: "Book Group Lessons",
  href: "/book-lessons",
  accent: true
}];

export default function PricingSection() {
  return (
    <section className="py-24 caustic-bg">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">No hidden fees. I come directly to your home pool — no travel to a facility required.

          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, i) =>
          <motion.div
            key={plan.type}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`bg-card border-2 ${plan.color} rounded-2xl p-8 flex flex-col relative overflow-hidden`}>
            
              {/* Badge */}
              <div className={`absolute top-5 right-5 text-xs font-semibold px-3 py-1 rounded-full ${plan.badgeColor}`}>
                {plan.badge}
              </div>

              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-secondary">{plan.type}</h3>
                <p className="text-muted-foreground text-sm">{plan.subtitle}</p>
              </div>

              {/* Pricing options */}
              <div className="flex flex-col gap-3 mb-8">
                {plan.options.map((opt) =>
              <div key={opt.duration} className="flex items-center justify-between bg-muted rounded-xl px-4 py-3">
                    <span className="text-sm font-medium text-secondary">{opt.duration}</span>
                    <span className="font-display text-2xl font-bold text-secondary">{opt.price}</span>
                  </div>
              )}
              </div>

              {/* Perks */}
              <ul className="flex flex-col gap-2 mb-8 flex-1">
                {plan.perks.map((perk) =>
              <li key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary flex-shrink-0" />
                    {perk}
                  </li>
              )}
              </ul>

              <Link
              to={plan.href}
              className={`ripple-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-sm transition-all ${
              plan.accent ?
              "bg-accent text-accent-foreground hover:bg-accent/90" :
              "bg-primary text-primary-foreground hover:bg-primary/90"}`
              }>
              
                {plan.cta}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8">
          
          Also offering <strong>Mommy &amp; Me</strong> lessons and <strong>Lifeguard services</strong> for pool parties.
          <Link to="/book-lifeguard" className="text-primary ml-1 hover:underline">Hire a lifeguard →</Link>
        </motion.p>
      </div>
    </section>);

}