import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Star, ChevronDown } from "lucide-react";

const levels = [
  {
    number: 0,
    name: "Little Guppies",
    range: "6 months – 3 years",
    emoji: "🐠",
    color: "from-cyan-400 to-cyan-600",
    goal: "Build water comfort, parent confidence, and positive associations with swimming.",
    skillGroups: [
      {
        name: "Water Adjustment",
        skills: ["Water poured over head", "Splashing and kicking", "Comfortable ear wetting", "Bubbles on lips and nose"],
      },
      {
        name: "Safety Skills",
        skills: ["Wall holds", "Assisted wall climbs", "Parent-supported back float"],
      },
      {
        name: "Body Position",
        skills: ["Assisted front float", "Assisted back float", "Assisted kicking"],
      },
    ],
    graduation: ["Comfortable with water on face", "Assisted front and back float", "Reaching for wall independently"],
  },
  {
    number: 1,
    name: "Tadpoles",
    range: "Beginner",
    emoji: "🐸",
    color: "from-green-400 to-green-600",
    goal: "Become comfortable independently in shallow water.",
    skillGroups: [
      {
        name: "Water Comfort",
        skills: ["Fully submerge face", "Open eyes underwater", "Bobbing", "Breath control"],
      },
      {
        name: "Floating",
        skills: ["Front float 5 seconds", "Back float 5 seconds", "Starfish float"],
      },
      {
        name: "Safety & Mobility",
        skills: ["Wall holds", "Monkey crawl", "Assisted jump and return", "Front and back glide"],
      },
    ],
    graduation: ["Front float", "Back float", "Submerge head", "Return to wall"],
  },
  {
    number: 2,
    name: "Minnows",
    range: "Beginner",
    emoji: "🐟",
    color: "from-blue-400 to-blue-600",
    goal: "Learn survival swimming foundations.",
    skillGroups: [
      {
        name: "Floating",
        skills: ["Front float 10 seconds", "Back float 10 seconds", "Front and back float to stand"],
      },
      {
        name: "Survival Skills",
        skills: ["Tap-Tap-Roll", "Roll front to back", "Roll back to front"],
      },
      {
        name: "Locomotion",
        skills: ["Streamline glide", "Flutter kick", "Kicking on front and back", "Jump in and recover"],
      },
    ],
    graduation: ["Tap-Tap-Roll independently", "Back float 10 seconds", "Front float 10 seconds", "Swim 10 feet independently"],
  },
  {
    number: 3,
    name: "Sea Turtles",
    range: "Beginner – Intermediate",
    emoji: "🐢",
    color: "from-teal-400 to-teal-600",
    goal: "Develop beginner swimming skills.",
    skillGroups: [
      {
        name: "Freestyle Foundations",
        skills: ["Big arm circles", "Flutter kick", "Face in water", "Streamline body"],
      },
      {
        name: "Backstroke Foundations",
        skills: ["Back float", "Straight arms", "Flutter kick"],
      },
      {
        name: "Water Competency",
        skills: ["Tread water introduction", "Retrieve underwater objects", "Jump-turn-swim-grab"],
      },
    ],
    graduation: ["Swim 15 feet freestyle", "Swim 15 feet backstroke", "Tread water 15 seconds", "Retrieve object underwater"],
  },
  {
    number: 4,
    name: "Stingrays",
    range: "Intermediate",
    emoji: "🪸",
    color: "from-violet-400 to-violet-600",
    goal: "Develop stroke mechanics and endurance.",
    skillGroups: [
      {
        name: "Freestyle",
        skills: ["Side breathing", "Rotary breathing", "Proper kick timing"],
      },
      {
        name: "Backstroke",
        skills: ["Straight arm recovery", "Body rotation"],
      },
      {
        name: "New Strokes",
        skills: ["Breaststroke frog kick", "Pull-breathe-kick-glide", "Butterfly dolphin kick", "Deep-water introduction"],
      },
    ],
    graduation: ["Freestyle 25 yards", "Backstroke 25 yards", "Tread water 30 seconds", "Surface dive"],
  },
  {
    number: 5,
    name: "Dolphins",
    range: "Intermediate – Advanced",
    emoji: "🐬",
    color: "from-sky-400 to-sky-600",
    goal: "Become a confident deep-water swimmer.",
    skillGroups: [
      {
        name: "Freestyle",
        skills: ["Bilateral breathing", "Endurance swimming"],
      },
      {
        name: "Backstroke & Breaststroke",
        skills: ["Continuous backstroke", "Full breaststroke timing"],
      },
      {
        name: "Butterfly & Safety",
        skills: ["Two kicks one pull", "Treading water 1 minute", "Deep-water recovery"],
      },
    ],
    graduation: ["Freestyle 50 yards", "Backstroke 50 yards", "Breaststroke 25 yards", "Tread water 1 minute"],
  },
  {
    number: 6,
    name: "Barracudas",
    range: "Advanced",
    emoji: "🦈",
    color: "from-orange-400 to-orange-600",
    goal: "Master all four strokes.",
    skillGroups: [
      {
        name: "All Four Strokes",
        skills: ["Freestyle efficiency", "Backstroke rotation", "Breaststroke timing", "Butterfly rhythm"],
      },
      {
        name: "Competitive Skills",
        skills: ["Open turns", "Racing dives"],
      },
    ],
    graduation: ["100-yard freestyle", "50-yard backstroke", "50-yard breaststroke", "25-yard butterfly", "Tread water 2 minutes"],
  },
  {
    number: 7,
    name: "Sharks",
    range: "Advanced",
    emoji: "🔱",
    color: "from-red-400 to-red-600",
    goal: "Swim team preparation.",
    skillGroups: [
      {
        name: "Competitive Technique",
        skills: ["Flip turns", "Streamlines", "Underwaters", "Backstroke starts"],
      },
      {
        name: "All Strokes Competition Ready",
        skills: ["Breaststroke pullouts", "Butterfly racing technique"],
      },
      {
        name: "Endurance",
        skills: ["Interval swimming", "Pace training"],
      },
    ],
    graduation: ["200-yard continuous swim", "Flip turns", "100 IM", "Swim-team readiness"],
  },
  {
    number: 8,
    name: "Orcas",
    range: "Elite",
    emoji: "🏆",
    color: "from-yellow-400 to-yellow-600",
    goal: "Advanced swimmer development.",
    skillGroups: [
      {
        name: "Racing Skills",
        skills: ["Starts", "Turns", "Finishes"],
      },
      {
        name: "Conditioning",
        skills: ["Sprint sets", "Distance sets"],
      },
      {
        name: "Stroke Refinement",
        skills: ["Video analysis", "Efficiency drills"],
      },
    ],
    graduation: ["Legal execution of all four strokes", "500-yard swim", "Competitive readiness"],
  },
];

const survivalSteps = [
  { step: 1, label: "Jump in" },
  { step: 2, label: "Fully submerge" },
  { step: 3, label: "Surface" },
  { step: 4, label: "Tap-Tap-Roll" },
  { step: 5, label: "Back float" },
  { step: 6, label: "Roll to stomach" },
  { step: 7, label: "Swim to wall" },
  { step: 8, label: "Grab wall" },
  { step: 9, label: "Monkey crawl" },
  { step: 10, label: "Exit pool" },
];

function LevelCard({ level, isSelected, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full text-left rounded-2xl p-5 border-2 transition-all shadow-md ${
        isSelected
          ? "border-primary bg-primary/10 shadow-primary/20"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${level.color} text-white font-bold text-lg mb-3 shadow-lg`}>
        {level.number}
      </div>
      <div className="text-2xl mb-1">{level.emoji}</div>
      <h3 className="font-display font-bold text-secondary text-base leading-tight">{level.name}</h3>
      <p className="text-muted-foreground text-xs mt-1">{level.range}</p>
      {isSelected && (
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary" />
      )}
    </motion.button>
  );
}

function LevelDetail({ level }) {
  return (
    <motion.div
      key={level.number}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-3xl border border-border shadow-xl p-8"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0`}>
          {level.number}
        </div>
        <div>
          <div className="text-3xl mb-1">{level.emoji}</div>
          <h2 className="font-display text-2xl font-bold text-secondary">Level {level.number} — {level.name}</h2>
          <p className="text-muted-foreground text-sm">{level.range}</p>
        </div>
      </div>

      {/* Goal */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl px-5 py-4 mb-6">
        <p className="font-heading font-semibold text-primary text-sm uppercase tracking-wide mb-1">Level Goal</p>
        <p className="text-secondary font-medium">{level.goal}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="font-heading font-semibold text-secondary text-base mb-3">Skills Covered</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {level.skillGroups.map((group, gi) => (
            <div key={gi} className="bg-muted/50 rounded-xl p-4">
              <p className="font-heading font-semibold text-secondary text-sm mb-2">{group.name}</p>
              <ul className="space-y-1">
                {group.skills.map((skill, si) => (
                  <li key={si} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Graduation */}
      <div>
        <h3 className="font-heading font-semibold text-secondary text-base mb-3">Graduation Requirements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {level.graduation.map((req, ri) => (
            <div key={ri} className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-secondary">{req}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SwimProgram() {
  const [selectedLevel, setSelectedLevel] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-secondary overflow-hidden py-28 px-6">
        <div className="absolute inset-0 caustic-bg opacity-30" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6"
          >
            <Star size={14} className="text-primary" />
            <span className="text-primary text-sm font-medium">9-Level Progression System</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            The Marco Polo<br />
            <span className="text-primary">Swim Adventure Program</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Every swimmer starts somewhere. Our 9-level progression system takes children from their very first splash all the way to elite competitive readiness — at their own pace, in the comfort of their own pool.
          </motion.p>
        </div>
      </section>

      {/* Level Selector */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-secondary mb-3">
              Explore All 9 Levels
            </h2>
            <p className="text-muted-foreground">Tap any level to see its goals, skills, and graduation requirements.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Level grid */}
            <div className="lg:col-span-1">
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                {levels.map((level) => (
                  <LevelCard
                    key={level.number}
                    level={level}
                    isSelected={selectedLevel === level.number}
                    onClick={() => setSelectedLevel(level.number)}
                  />
                ))}
              </div>
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <LevelDetail key={selectedLevel} level={levels[selectedLevel]} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Survival Sequence */}
      <section className="py-20 px-6 bg-gradient-to-br from-cyan-900 to-secondary">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              🛡️ Safety First
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Marco Polo Signature Survival Sequence
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              Introduced at the <strong className="text-cyan-300">Minnows level</strong> and reinforced at every level afterward, this 10-step sequence teaches children what to do if they ever fall into a pool unexpectedly. It mirrors water competency standards used by organizations such as the <strong className="text-cyan-300">American Red Cross</strong> and the <strong className="text-cyan-300">YMCA</strong>.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {survivalSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white/10 border border-cyan-400/20 rounded-2xl p-4 text-center backdrop-blur-sm"
              >
                <div className="w-9 h-9 rounded-full bg-cyan-400 text-secondary font-bold text-base flex items-center justify-center mx-auto mb-2 shadow-lg shadow-cyan-400/30">
                  {s.step}
                </div>
                <p className="text-white text-sm font-medium leading-tight">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-secondary mb-4">
              Ready to Find Your Swimmer's Level?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Book a lesson today and we'll assess your child in person and place them in the right level from the very first session.
            </p>
            <Link
              to="/book-lessons"
              className="ripple-btn inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-full font-heading font-semibold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
            >
              Book a Swim Lesson
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}