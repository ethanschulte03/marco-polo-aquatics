import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Loader2, ArrowRight, Users, MapPin } from "lucide-react"
import { format } from "date-fns"
import { supabase } from "../lib/supabase"
import { sendEmail } from "../lib/email"

const POOL_TYPES = ["In-ground", "Above-ground", "Community pool", "Other"]
const ALL_LIFEGUARD_TIMES = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM"]
const EVENING_ONLY = ["6:00 PM","7:00 PM","8:00 PM"]

function getLifeguardTimes(date) {
  if (!date) return ALL_LIFEGUARD_TIMES
  const day = date.getDay()
  return day === 5 ? EVENING_ONLY : ALL_LIFEGUARD_TIMES
}

export default function BookLifeguard() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    contact_name: "", contact_email: "", contact_phone: "",
    event_date: null, event_start_time: "", event_end_time: "",
    event_address: "", pool_type: "", estimated_swimmers: "",
    children_count: "", additional_notes: "",
  })

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const isValid = form.contact_name && form.contact_email && form.event_date && form.event_start_time && form.event_end_time && form.event_address && form.estimated_swimmers

  const handleSubmit = async () => {
    setSubmitting(true)
    const eventDate = form.event_date ? format(form.event_date, "yyyy-MM-dd") : ""

    const { error } = await supabase.from("lifeguard_bookings").insert([{
      contact_name: form.contact_name,
      contact_email: form.contact_email,
      contact_phone: form.contact_phone,
      event_date: eventDate,
      event_start_time: form.event_start_time,
      event_end_time: form.event_end_time,
      event_address: form.event_address,
      pool_type: form.pool_type,
      estimated_swimmers: Number(form.estimated_swimmers),
      children_count: Number(form.children_count) || 0,
      additional_notes: form.additional_notes,
      status: "pending",
    }])

    if (error) { console.error(error); setSubmitting(false); return }

    const formattedDate = form.event_date ? format(form.event_date, "MMMM d, yyyy") : ""

    await sendEmail({
      to: form.contact_email,
      subject: `Lifeguard Booking Confirmed — ${formattedDate}`,
      html: `
        <h2>Lifeguard Booking Confirmed — Marco Polo Aquatics</h2>
        <p>Hi ${form.contact_name},</p>
        <p>Your private lifeguard has been booked. Here are the details:</p>
        <ul>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${form.event_start_time} — ${form.event_end_time}</li>
          <li><strong>Location:</strong> ${form.event_address}</li>
          <li><strong>Expected Swimmers:</strong> ${form.estimated_swimmers}</li>
        </ul>
        <p>We'll be in touch to confirm all the details. Safety first! — Marco Polo Aquatics</p>
      `,
    })

    await sendEmail({
      to: "ethan.schulte@gmail.com",
      subject: `New Lifeguard Booking: ${form.contact_name} — ${formattedDate}`,
      html: `
        <h2>New Lifeguard Booking</h2>
        <ul>
          <li><strong>Contact:</strong> ${form.contact_name} (${form.contact_email}, ${form.contact_phone || "No phone"})</li>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${form.event_start_time} — ${form.event_end_time}</li>
          <li><strong>Location:</strong> ${form.event_address}</li>
          <li><strong>Pool Type:</strong> ${form.pool_type || "Not specified"}</li>
          <li><strong>Swimmers:</strong> ${form.estimated_swimmers} (${form.children_count || 0} children)</li>
          ${form.additional_notes ? `<li><strong>Notes:</strong> ${form.additional_notes}</li>` : ""}
        </ul>
      `,
    })

    setSubmitting(false)
    navigate(`/confirmation?type=lifeguard&name=${encodeURIComponent(form.contact_name)}&date=${encodeURIComponent(formattedDate)}&time=${encodeURIComponent(form.event_start_time + " — " + form.event_end_time)}`)
  }

  return (
    <div className="min-h-screen caustic-bg">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-accent" />
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-secondary mb-3">Hire a Private Lifeguard</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Professional lifeguard services for your pool party or private event. Tell us about your event and we'll handle the safety.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border/50 rounded-2xl p-8 shadow-xl shadow-accent/5">
          <div className="space-y-8">
            <div>
              <h3 className="font-heading font-semibold text-lg text-secondary mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2"><Label>Your Name *</Label><Input placeholder="Full name" value={form.contact_name} onChange={(e) => updateForm("contact_name", e.target.value)} /></div>
                <div className="space-y-2"><Label>Email *</Label><Input type="email" placeholder="you@email.com" value={form.contact_email} onChange={(e) => updateForm("contact_email", e.target.value)} /></div>
              </div>
              <div className="mt-4 space-y-2"><Label>Phone Number</Label><Input type="tel" placeholder="(555) 123-4567" value={form.contact_phone} onChange={(e) => updateForm("contact_phone", e.target.value)} /></div>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-lg text-secondary mb-4">Event Details</h3>
              <div className="mb-6">
                <Label className="mb-2 block">Event Date *</Label>
                <div className="flex justify-center">
                  <Calendar mode="single" selected={form.event_date} onSelect={(date) => updateForm("event_date", date)} disabled={(date) => { const day = date.getDay(); const isPast = date < new Date(new Date().setHours(0,0,0,0)); const isAllowed = day === 5 || day === 6 || day === 0; return isPast || !isAllowed; }} className="rounded-xl border" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Start Time *</Label>
                  <Select value={form.event_start_time} onValueChange={(val) => updateForm("event_start_time", val)}>
                    <SelectTrigger><SelectValue placeholder="Select start" /></SelectTrigger>
                    <SelectContent>{getLifeguardTimes(form.event_date).map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>End Time *</Label>
                  <Select value={form.event_end_time} onValueChange={(val) => updateForm("event_end_time", val)}>
                    <SelectTrigger><SelectValue placeholder="Select end" /></SelectTrigger>
                    <SelectContent>{getLifeguardTimes(form.event_date).map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-lg text-secondary mb-4 flex items-center gap-2"><MapPin size={18} /> Location &amp; Pool</h3>
              <div className="space-y-4">
                <div className="space-y-2"><Label>Event Address *</Label><Input placeholder="Full address" value={form.event_address} onChange={(e) => updateForm("event_address", e.target.value)} /></div>
                <div className="space-y-2">
                  <Label>Pool Type</Label>
                  <Select value={form.pool_type} onValueChange={(val) => updateForm("pool_type", val)}>
                    <SelectTrigger><SelectValue placeholder="Select pool type" /></SelectTrigger>
                    <SelectContent>{POOL_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-lg text-secondary mb-4 flex items-center gap-2"><Users size={18} /> Swimmer Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2"><Label>Estimated Swimmers *</Label><Input type="number" min="1" placeholder="Total swimmers" value={form.estimated_swimmers} onChange={(e) => updateForm("estimated_swimmers", e.target.value)} /></div>
                <div className="space-y-2"><Label>Number of Children</Label><Input type="number" min="0" placeholder="Children attending" value={form.children_count} onChange={(e) => updateForm("children_count", e.target.value)} /></div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Additional Notes</Label>
              <Textarea placeholder="Any special requirements or details about the event?" value={form.additional_notes} onChange={(e) => updateForm("additional_notes", e.target.value)} rows={3} />
            </div>

            <Button onClick={handleSubmit} disabled={!isValid || submitting} className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-base font-heading font-semibold">
              {submitting ? <><Loader2 size={18} className="mr-2 animate-spin" />Booking...</> : <>Confirm Lifeguard Booking <ArrowRight size={18} className="ml-2" /></>}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
