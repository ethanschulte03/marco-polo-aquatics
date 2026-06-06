
import React, { useState } from "react";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, Loader2 } from "lucide-react";

export default function EmailCaptureSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await db.entities.InterestedFamily.create({ email, name, source: "homepage" });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-20 caustic-bg">
      <div className="max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
            <Bell size={26} className="text-primary" />
          </div>
          <h2 className="font-display text-3xl font-bold text-secondary mb-3">
            Not Ready to Book Yet?
          </h2>
          <p className="text-muted-foreground mb-8">
            Drop your email and we'll notify you when new slots open up. No spam — just a heads-up when availability returns.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <CheckCircle2 size={20} />
              You're on the list! We'll be in touch when new slots open.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1"
              />
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="rounded-full bg-primary text-primary-foreground px-6 whitespace-nowrap">
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Notify Me"}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}