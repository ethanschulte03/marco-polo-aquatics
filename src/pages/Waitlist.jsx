import React, { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CheckCircle2, Loader2, ArrowRight } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function Waitlist() {
  const [form, setForm] = useState({ parent_name: "", parent_email: "", parent_phone: "", preferred_dates: "", lesson_type: "", notes: "" })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }))
  const canSubmit = form.parent_name && form.parent_email

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await supabase.from("waitlist").insert([{ ...form, status: "waiting" }])
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <div className="min-h-screen caustic-bg flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border/50 rounded-2xl p-10 max-w-md w-full text-center shadow-xl">
          <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-secondary mb-2">You're on the Waitlist!</h2>
          <p className="text-muted-foreground">We'll reach out as soon as a slot opens up that matches your preferences. Thank you for your patience!</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen caustic-bg">
      <div className="max-w-xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4"><Clock size={28} className="text-primary" /></div>
          <h1 className="font-display text-4xl font-bold text-secondary mb-2">Join the Waitlist</h1>
          <p className="text-muted-foreground">All current slots are full. Leave your info and we'll reach out as soon as something opens up.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2"><Label>Parent Name *</Label><Input placeholder="Full name" value={form.parent_name} onChange={(e) => update("parent_name", e.target.value)} /></div>
              <div className="space-y-2"><Label>Email *</Label><Input type="email" placeholder="you@email.com" value={form.parent_email} onChange={(e) => update("parent_email", e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label>Phone Number</Label><Input type="tel" placeholder="(555) 123-4567" value={form.parent_phone} onChange={(e) => update("parent_phone", e.target.value)} /></div>
            <div className="space-y-2">
              <Label>Lesson Type Preference</Label>
              <Select value={form.lesson_type} onValueChange={(v) => update("lesson_type", v)}>
                <SelectTrigger><SelectValue placeholder="Any preference?" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Semi-Private">Semi-Private</SelectItem>
                  <SelectItem value="Mommy & Me">Mommy &amp; Me</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Preferred Days / Time Range</Label><Input placeholder="e.g. Weekday mornings, Saturday afternoons" value={form.preferred_dates} onChange={(e) => update("preferred_dates", e.target.value)} /></div>
            <div className="space-y-2"><Label>Anything else we should know?</Label><Textarea placeholder="Child's age, specific needs, etc." value={form.notes} onChange={(e) => update("notes", e.target.value)} rows={3} /></div>
            <Button type="submit" disabled={!canSubmit || loading} className="w-full rounded-full bg-primary text-primary-foreground py-3 font-heading font-semibold text-base">
              {loading ? <><Loader2 size={18} className="mr-2 animate-spin" />Submitting...</> : <>Join Waitlist <ArrowRight size={16} className="ml-2" /></>}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
