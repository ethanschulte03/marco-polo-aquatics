import React from "react";
import { motion } from "framer-motion";
import { Droplets, ShieldCheck, Home, Users, Baby } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "All Skill Levels Welcome",
    description: "Whether your child has never been near a pool or is refining their technique, every lesson is fully personalized to their current level and goals.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Instructor",
    description: "Experienced lifeguard, certified swim instructor, and private coach with years of hands-on experience teaching children of all ages.",
  },
  {
    icon: ShieldCheck,
    title: "Fully Insured",
    description: "Marco Polo Aquatics is fully insured, so you can sit back, relax, and enjoy watching your child thrive in the water.",
  },
  {
    icon: Home,
    title: "We Come to You",
    description: "Lessons take place at your home pool. Familiar surroundings help kids relax faster, build confidence sooner, and get more from every session.",
  },
  {
    icon: Users,
    title: "Flexible Formats",
    description: "One-on-one private lessons, sibling or neighbor groups, and Mommy & Me sessions for our youngest swimmers. A format for every family.",
  },
  {
    icon: Baby,
    title: "Mommy & Me",
    description: "Designed for children under 2 and anxious toddlers. A parent enters the water alongside the child to build trust in a gentle, pressure-free environment.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 caustic-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Why Marco Polo Aquatics?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Skip the crowded group classes. Get focused, one-on-one instruction that actually moves the needle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{gridAutoRows: "1fr"}}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-card border border-border/50 rounded-2xl p-8 h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-secondary mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* What lessons help with */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-card border border-border/50 rounded-2xl p-10 max-w-3xl mx-auto"
        >
          <h3 className="font-display text-2xl font-bold text-secondary mb-6 text-center">
            What We Work On
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "🛟 Water safety & drowning prevention",
              "💪 Water confidence & comfort",
              "🏊 Fundamental swim skills",
              "🌊 Stroke development & technique",
              "⚡ Endurance & physical ability",
              "👶 Gentle Mommy & Me water introduction",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="text-base leading-5">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}