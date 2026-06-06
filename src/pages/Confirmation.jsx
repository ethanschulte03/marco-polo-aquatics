import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Clock, Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Confirmation() {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const name = params.get("name");
  const date = params.get("date");
  const time = params.get("time");
  const comfort = params.get("comfort");

  const isLesson = type === "lesson";

  const COMFORT_LABELS = [
    "",
    "Never been in water",
    "Nervous but willing",
    "Comfortable with floaties",
    "Can swim a little",
    "Confident swimmer",
  ];

  return (
    <div className="min-h-screen caustic-bg flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full"
      >
        {/* Success Card */}
        <div className="bg-card border border-border/50 rounded-2xl p-10 shadow-2xl shadow-primary/10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-green-600" />
          </motion.div>

          <h1 className="font-display text-3xl font-bold text-secondary mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground mb-8">
            A confirmation email has been sent to your inbox.
          </p>

          {/* Booking Details */}
          <div className="bg-muted rounded-xl p-6 text-left space-y-4 mb-8">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary">
              {isLesson ? "Lesson Details" : "Lifeguard Booking"}
            </h3>

            {name && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Droplets size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{isLesson ? "Swimmer" : "Contact"}</p>
                  <p className="font-medium text-secondary">{name}</p>
                </div>
              </div>
            )}

            {date && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium text-secondary">{date}</p>
                </div>
              </div>
            )}

            {time && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium text-secondary">{time}</p>
                </div>
              </div>
            )}

            {isLesson && comfort && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Droplets size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Water Comfort</p>
                  <p className="font-medium text-secondary">{COMFORT_LABELS[Number(comfort)] || ""}</p>
                </div>
              </div>
            )}
          </div>

          <Link to="/">
            <Button className="rounded-full bg-primary text-primary-foreground w-full">
              Back to Home
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}