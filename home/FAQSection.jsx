import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What if my child cries or refuses to get in the water?",
    a: "This is completely normal, especially for first-time swimmers. We always work at the child's pace — never rushing or forcing them to do anything too far out of their comfort zone. Many hesitant swimmers become confident after just a few sessions.",
  },
  {
    q: "What should my child bring to their lesson?",
    a: "A swimsuit, a towel, goggles (optional but helpful), and sunscreen applied before the lesson begins. That's it!",
  },
  {
    q: "What happens if it rains?",
    a: "Light rain is generally fine — lessons can still proceed safely. In the case of thunder or lightning, the lesson will be rescheduled at no charge.",
  },
  {
    q: "Do you bring any equipment?",
    a: "Yes. Ethan brings all necessary teaching aids, including kickboards, pool noodles, and flotation devices. You don't need to provide anything.",
  },
  {
    q: "Is a parent required to stay for the lesson?",
    a: "Yes — a parent or guardian must be present for the entirety of every lesson. This is a non-negotiable safety requirement, regardless of the child's age or swimming ability.",
  },
  {
    q: "How far in advance should I book?",
    a: "As early as possible. Summer slots fill quickly and availability is limited. If your preferred time is taken, you can join the waitlist and be notified when something opens up.",
  },
  {
    q: "Do you offer make-up lessons?",
    a: "Make-up lessons are offered for cancellations made with at least 24 hours' notice, or in cases of weather-related cancellation. Cancellations with less than 24 hours' notice may be subject to a cancellation fee.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Lessons cancelled with less than 24 hours' notice may be subject to a cancellation fee. Lessons cancelled due to weather or pool unavailability will always be rescheduled at no charge.",
  },
  {
    q: "What are the Mommy & Me lessons?",
    a: "Mommy & Me lessons are designed for children under 2, as well as toddlers and young children who are timid or anxious around water. A parent or caregiver enters the pool alongside the child to build trust and reduce anxiety in a gentle, pressure-free environment — a wonderful first introduction to the water.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/40 transition-colors"
      >
        <span className="font-heading font-semibold text-secondary text-base pr-4">{q}</span>
        <ChevronDown
          size={18}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/30 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-24 bg-background" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know before booking. Don't see your question?{" "}
            <a href="mailto:ethan.schulte@gmail.com" className="text-primary hover:underline">
              Reach out directly.
            </a>
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <FAQItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}