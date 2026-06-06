import React from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

const levels = [
  { value: 1, label: "New to the water", emoji: "🌊", color: "bg-sky-300" },
  { value: 2, label: "Getting comfortable", emoji: "🐣", color: "bg-yellow-400" },
  { value: 3, label: "Somewhat comfortable", emoji: "🙂", color: "bg-green-400" },
  { value: 4, label: "Pretty confident", emoji: "🐟", color: "bg-cyan-400" },
  { value: 5, label: "Total water lover!", emoji: "🐬", color: "bg-primary" },
];

export default function WaterComfortSlider({ value, onChange }) {
  const currentLevel = levels.find((l) => l.value === value) || levels[0];

  // Water fill percentage based on comfort
  const fillPercent = ((value - 1) / 4) * 100;

  return (
    <div className="space-y-6">
      <label className="block font-heading font-semibold text-secondary text-lg">
        How comfortable is your child in the water?
      </label>

      {/* Visual indicator */}
      <div className="relative h-40 rounded-2xl overflow-hidden bg-secondary/5 border border-border">
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/30 to-primary/10"
          animate={{ height: `${fillPercent}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <motion.span
              key={value}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl block mb-2"
            >
              {currentLevel.emoji}
            </motion.span>
            <motion.p
              key={currentLevel.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading font-semibold text-secondary"
            >
              {currentLevel.label}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Slider buttons */}
      <div className="flex gap-2">
        {levels.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => onChange(level.value)}
            className={`flex-1 py-4 rounded-xl font-medium transition-all border-2 ${
              value === level.value
                ? "border-cyan-400 bg-cyan-400/20 text-secondary shadow-lg shadow-cyan-400/20"
                : "border-border bg-muted text-muted-foreground hover:bg-muted/80 hover:border-cyan-400/40"
            }`}
          >
            <span className="block text-2xl mb-2">{level.emoji}</span>
            <span className="hidden sm:block text-xs leading-tight">{level.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}