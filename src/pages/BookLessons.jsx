import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, ArrowLeft, Loader2, AlertCircle } from "lucide-react"
import WaterComfortSlider from "../components/booking/WaterComfortSlider"
import TimeSlotPicker from "../components/booking/TimeSlotPicker"
import LiabilityWaiver from "../components/booking/LiabilityWaiver"
import { format } from "date-fns"
import { supabase } from "../lib/supabase"
import { sendEmail } from "../lib/email"

const COMFORT_LABELS = [
  "",
  "New to the water",
  "Getting comfortable",
  "Somewhat comfortable",
  "Pretty confident",
  "Total water lover!",
]

export default function BookLessons() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    parent_name: "",
    parent_email: "",
    parent_phone: "",
    child_name: "",
    child_age: "",
    lesson_type: "Private",
    lesson_duration: "30 min",
    water_comfort_level: 1,
    lesson_date: null,
    lesson_time: "",
    additional_notes: "",
    waiver_agreed: false,
    waiver_signature: "",
  })

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const canAdvance = () => {
    if (step === 1) return form.parent_name && form.parent_email && form.child_name && form.child_age && form.lesson_type && form.lesson_duration
    if (step === 2) return form.water_comfort_level >= 1
    if (step === 3) return form.lesson_date && form.lesson_time
    if (step === 4) return form.waiver_agreed && form.waiver_signature.trim().length >= 3
    return true
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    const lessonDate = form.lesson_date ? format(form.lesson_date, "yyyy-MM-dd") : ""

    const { error } = await supabase.from("lesson_bookings").insert([{
      parent_name: form.parent_name,
      parent_email: form.parent_email,
      parent_phone: form.parent_phone,
      child_name: form.child_name,
      child_age: Number(form.child_age),
      lesson_type: form.lesson_type,
      lesson_duration: form.lesson_duration,
      water_comfort_level: form.water_comfort_level,
      water_comfort_label: COMFORT_LABELS[form.water_comfort_level],
      lesson_date: lessonDate,
      lesson_time: form.lesson_time,
      additional_notes: form.additional_notes,
      waiver_agreed: form.waiver_agreed,
      waiver_signature: form.waiver_signature,
      status: "pending",
    }])

    if (error) {
      console.error("Booking error:", error)
      setSubmitting(false)
      return
    }

    const formattedDate = form.lesson_date ? format(form.lesson_date, "MMMM d, yyyy") : ""

    await sendEmail({
      to: form.parent_email,
      subject: `Lesson Confirmed — ${form.child_name} on ${formattedDate}`,
      html: `
        <h2>Booking Confirmed — Marco Polo Aquatics</h2>
        <p>Hi ${form.parent_name},</p>
        <p>Your swimming lesson has been booked successfully. Here are the details:</p>
        <ul>
          <li><strong>Lesson Type:</strong> ${form.lesson_type} — ${form.lesson_duration}</li>
          <li><strong>Child:</strong> ${form.child_name} (Age: ${form.child_age})</li>
          <li><strong>Water Comfort:</strong> ${COMFORT_LABELS[form.water_comfort_level]}</li>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${form.lesson_time}</li>
          ${form.additional_notes ? `<li><strong>Notes:</strong> ${form.additional_notes}</li>` : ""}
        </ul>
        <p><strong>Reminder:</strong> A parent or guardian must be present for the entire duration of the lesson.</p>
        <p><strong>Cancellation Policy:</strong> Please cancel at least 24 hours in advance to avoid a cancellation fee.</p>
        <p>See you poolside! — Ethan, Marco Polo Aquatics</p>
      `,
    })

    await sendEmail({
      to: "ethan.schulte@gmail.com",
      subject: `New Booking: ${form.child_name} (Age ${form.child_age}) — ${formattedDate}`,
      html: `
        <h2>New Lesson Booking</h2>
        <ul>
          <li><strong>Parent:</strong> ${form.parent_name} (${form.parent_email}, ${form.parent_phone || "No phone"})</li>
          <li><strong>Child:</strong> ${form.child_name} (Age: ${form.child_age})</li>
          <li><strong>Lesson Type:</strong> ${form.lesson_type} — ${form.lesson_duration}</li>
          <li><strong>Water Comfort:</strong> ${form.water_comfort_level}/5 — ${COMFORT_LABELS[form.water_comfort_level]}</li>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${form.lesson_time}</li>
          <li><strong>Waiver Signed By:</strong> ${form.waiver_signature}</li>
          ${form.additional_notes ? `<li><strong>Notes:</strong> ${form.additional_notes}</li>` : ""}
        </ul>
      `,
    })

    setSubmitting(false)
    navigate(`/confirmation?type=lesson&name=${encodeURIComponent(form.child_name)}&date=${encodeURIComponent(formattedDate)}&time=${encodeURIComponent(form.lesson_time)}&comfort=${form.water_comfort_level}`)
  }

  const steps = [
    { number: 1, label: "Details" },
    { number: 2, label: "Assessment" },
    { number: 3, label: "Schedule" },
    { number: 4, label: "Waiver" },
  ]

  return (
    <div className="min-h-screen caustic-bg">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-3">Book a Swimming Lesson</h1>
          <p className="text-muted-foreground">Tell us about your child so we can tailor the perfect lesson.</p>
        </motion.div>

        <div className="flex items-start gap-3 bg-accent/10 border border-accent/30 rounded-xl p-4 mb-8">
          <AlertCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-secondary">Parent/guardian presence required:</strong> A parent or guardian must be present for the full duration of every lesson. This is a non-negotiable safety requirement.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((s, i) => (
            <React.Fragment key={s.number}>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${step === s.number ? "bg-primary text-primary-foreground" : step > s.number ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">{s.number}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${step > s.number ? "bg-primary" : "bg-border"}`} />}
            </React.Fragment>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl shadow-primary/5">
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Parent / Guardian Name *</Label>
                  <Input placeholder="Full name" value={form.parent_name} onChange={(e) => updateForm("parent_name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email Address *</Label>
                  <Input type="email" placeholder="you@email.com" value={form.parent_email} onChange={(e) => updateForm("parent_email", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input type="tel" placeholder="(555) 123-4567" value={form.parent_phone} onChange={(e) => updateForm("parent_phone", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Child's Name *</Label>
                  <Input placeholder="Child's first name" value={form.child_name} onChange={(e) => updateForm("child_name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Child's Age *</Label>
                  <Input type="number" min="1" max="18" placeholder="Age" value={form.child_age} onChange={(e) => updateForm("child_age", e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Lesson Type *</Label>
                  <Select value={form.lesson_type} onValueChange={(v) => updateForm("lesson_type", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Private">Private (1 swimmer)</SelectItem>
                      <SelectItem value="Semi-Private">Semi-Private (2–6 swimmers)</SelectItem>
                      <SelectItem value="Mommy & Me">Mommy &amp; Me</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration *</Label>
                  <Select value={form.lesson_duration} onValueChange={(v) => updateForm("lesson_duration", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 min">30 minutes</SelectItem>
                      <SelectItem value="60 min">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <WaterComfortSlider value={form.water_comfort_level} onChange={(val) => updateForm("water_comfort_level", val)} />
              {form.lesson_type === "Mommy & Me" && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-muted-foreground">
                  <strong className="text-secondary">Mommy &amp; Me lessons</strong> are designed for children under 2, as well as toddlers and young children who are timid or anxious around water. A parent or caregiver enters the water with the child to build trust and reduce anxiety in a gentle, pressure-free environment.
                </div>
              )}
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea placeholder="Any special needs, fears, goals, or anything else we should know?" value={form.additional_notes} onChange={(e) => updateForm("additional_notes", e.target.value)} rows={4} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div>
                <label className="block font-heading font-semibold text-secondary text-lg mb-4">Pick a Date</label>
                <div className="flex justify-center">
                  <Calendar mode="single" selected={form.lesson_date} onSelect={(date) => { updateForm("lesson_date", date); updateForm("lesson_time", "") }} disabled={(date) => date < new Date() || date.getDay() === 0} className="rounded-xl border" />
                </div>
              </div>
              <TimeSlotPicker value={form.lesson_time} onChange={(time) => updateForm("lesson_time", time)} date={form.lesson_date} lessonDuration={form.lesson_duration === "60 min" ? 60 : 30} />
            </div>
          )}

          {step === 4 && (
            <LiabilityWaiver signature={form.waiver_signature} onSignatureChange={(val) => updateForm("waiver_signature", val)} agreed={form.waiver_agreed} onAgreedChange={(val) => updateForm("waiver_agreed", val)} />
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="rounded-full">
                <ArrowLeft size={16} className="mr-2" /> Back
              </Button>
            ) : <div />}
            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canAdvance()} className="rounded-full bg-primary text-primary-foreground">
                Continue <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!canAdvance() || submitting} className="rounded-full bg-primary text-primary-foreground">
                {submitting ? <><Loader2 size={16} className="mr-2 animate-spin" />Booking...</> : <>Confirm Booking <ArrowRight size={16} className="ml-2" /></>}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
