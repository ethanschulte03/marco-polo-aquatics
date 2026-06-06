import React, { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, Loader2, ArrowRight } from "lucide-react"
import { supabase } from "../lib/supabase"
import { sendEmail } from "../lib/email"

function generateCode() {
  return "MP-" + Math.random().toString(36).substr(2, 6).toUpperCase()
}

export default function GiftALesson() {
  const [form, setForm] = useState({ purchaser_name: "", purchaser_email: "", recipient_name: "", lesson_type: "", lesson_duration: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }))
  const canSubmit = form.purchaser_name && form.purchaser_email && form.recipient_name && form.lesson_type && form.lesson_duration

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const code = generateCode()
    await supabase.from("gift_lessons").insert([{ ...form, gift_code: code, status: "pending" }])
    await sendEmail({
      to: form.purchaser_email,
      subject: `Your Marco Polo Aquatics Gift Lesson — Code: ${code}`,
      html: `
        <h2>Gift Lesson Confirmed!</h2>
        <p>Hi ${form.purchaser_name},</p>
        <p>Your gift lesson for <strong>${form.recipient_name}</strong> has been created.</p>
        <ul>
          <li><strong>Lesson Type:</strong> ${form.lesson_type}</li>
          <li><strong>Duration:</strong> ${form.lesson_duration}</li>
          <li><strong>Gift Code:</strong> <strong style="font-size:1.3em">${code}</strong></li>
          ${form.message ? `<li><strong>Your message:</strong> "${form.message}"</li>` : ""}
        </ul>
        <p>Have ${form.recipient_name} mention this code when booking. — Marco Polo Aquatics</p>
      `,
    })
    setLoading(false)
    setResult({ code })
  }

  if (result) {
    return (
      <div className="min-h-screen caustic-bg flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border/50 rounded-2xl p-10 max-w-md w-full text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5"><Gift size={30} className="text-primary" /></div>
          <h2 className="font-display text-3xl font-bold text-secondary mb-2">Gift Created!</h2>
          <p className="text-muted-foreground mb-6">A confirmation has been sent to <strong>{form.purchaser_email}</strong>.</p>
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-6 py-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Gift Code</p>
            <p className="font-display text-3xl font-bold text-primary tracking-widest">{result.code}</p>
          </div>
          <p className="text-sm text-muted-foreground">Have <strong>{form.recipient_name}</strong> mention this code when booking a lesson. Ethan will honor it!</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen caustic-bg">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4"><Gift size={28} className="text-primary" /></div>
          <h1 className="font-display text-4xl font-bold text-secondary mb-2">Gift a Lesson</h1>
          <p className="text-muted-foreground">Give the gift of water confidence — the perfect summer present.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2"><Label>Your Name *</Label><Input placeholder="Your full name" value={form.purchaser_name} onChange={(e) => update("purchaser_name", e.target.value)} /></div>
              <div className="space-y-2"><Label>Your Email *</Label><Input type="email" placeholder="you@email.com" value={form.purchaser_email} onChange={(e) => update("purchaser_email", e.target.value)} /></div>
            </div>
            <div className="space-y-2"><Label>Recipient's Name *</Label><Input placeholder="Who is this gift for?" value={form.recipient_name} onChange={(e) => update("recipient_name", e.target.value)} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Lesson Type *</Label>
                <Select value={form.lesson_type} onValueChange={(v) => update("lesson_type", v)}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Private">Private (1 swimmer)</SelectItem>
                    <SelectItem value="Semi-Private">Semi-Private (2–6 swimmers)</SelectItem>
                    <SelectItem value="Mommy & Me">Mommy &amp; Me</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration *</Label>
                <Select value={form.lesson_duration} onValueChange={(v) => update("lesson_duration", v)}>
                  <SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 min">30 minutes</SelectItem>
                    <SelectItem value="60 min">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2"><Label>Personal Message (optional)</Label><Textarea placeholder="Add a warm note..." value={form.message} onChange={(e) => update("message", e.target.value)} rows={3} /></div>
            <Button type="submit" disabled={!canSubmit || loading} className="w-full rounded-full bg-primary text-primary-foreground py-3 text-base font-heading font-semibold">
              {loading ? <><Loader2 size={18} className="mr-2 animate-spin" />Processing...</> : <>Create Gift Lesson <ArrowRight size={16} className="ml-2" /></>}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
