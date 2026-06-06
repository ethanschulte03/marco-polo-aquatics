import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Shirt, Eye, Play, Smile, XCircle, AlertCircle } from "lucide-react";

const items = [
  {
    icon: Shirt,
    title: "What to Bring",
    points: [
      "A well-fitted swimsuit",
      "A towel",
      "Goggles (optional, but helpful)",
      "Sunscreen applied before the lesson",
    ],
  },
  {
    icon: Eye,
    title: "Parent Presence Required",
    points: [
      "A parent or guardian must be present for the entire lesson — no exceptions",
      "This is a safety requirement, not a preference",
      "You're welcome to observe and cheer from poolside",
    ],
    highlight: true,
  },
  {
    icon: Play,
    title: "What a Typical Lesson Looks Like",
    points: [
      "Brief warm-up and water introduction",
      "Skill-based drills tailored to your child's level",
      "Fun, game-based activities to build confidence",
      "Cool-down and feedback for parents",
    ],
  },
  {
    icon: Smile,
    title: "If Your Child Is Nervous or Cries",
    points: [
      "This is completely normal and expected",
      "Ethan always works at the child's pace — never rushing or forcing",
      "Many hesitant swimmers become confident after just a few sessions",
      "Mommy & Me lessons available for extra support",
    ],
  },
  {
    icon: XCircle,
    title: "Cancellation & Rescheduling",
    points: [
      "Cancel at least 24 hours in advance for a free reschedule",
      "Cancellations under 24 hours may incur a fee",
      "Weather or pool-related cancellations are always rescheduled at no charge",
    ],
  },
];

export default function WhatToExpectSection() {
  return (
    <section className="py-24 bg-muted/30" id="what-to-expect">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-4">
            What to Expect at Your First Lesson
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            First-timers are always welcome. Here's everything you need to know to feel confident and prepared.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card border rounded-2xl p-7 ${item.highlight ? "border-accent/50 bg-accent/5" : "border-border/50"}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.highlight ? "bg-accent/20" : "bg-primary/10"}`}>
                  <item.icon size={20} className={item.highlight ? "text-accent" : "text-primary"} />
                </div>
                <h3 className="font-heading font-semibold text-secondary text-lg">{item.title}</h3>
              </div>
              <ul className="flex flex-col gap-2">
                {item.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={15} className={`mt-0.5 flex-shrink-0 ${item.highlight ? "text-accent" : "text-primary"}`} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Lifeguard checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 bg-secondary text-white rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-5">
            <AlertCircle size={22} className="text-primary flex-shrink-0" />
            <h3 className="font-heading font-semibold text-lg">Before You Book a Lifeguard — Be Prepared</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Pool address and access instructions",
              "Approximate number of swimmers and their ages",
              "Whether you need any additional safety equipment",
              "Exact start time and expected duration",
              "Any specific safety concerns or requirements",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-white/80">
                <CheckCircle2 size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}