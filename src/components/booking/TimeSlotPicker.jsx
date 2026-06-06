import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock, Lock } from "lucide-react"
import { format } from "date-fns"
import { supabase } from "../../lib/supabase"

const ALL_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM",
]

// Lessons: Sundays all day, weekdays after 6pm only
function getAvailableSlots(date) {
  if (!date) return []
  const day = date.getDay()
  const isSunday = day === 0
  if (isSunday) return ALL_SLOTS
  // Weekdays (Mon-Fri): only 6pm and 7pm
  return ["6:00 PM", "7:00 PM"]
}

function slotToMinutes(slot) {
  const [time, period] = slot.split(" ")
  let [h, m] = time.split(":").map(Number)
  if (period === "PM" && h !== 12) h += 12
  if (period === "AM" && h === 12) h = 0
  return h * 60 + m
}

function blockedUntilMinutes(slot, durationMinutes) {
  return slotToMinutes(slot) + durationMinutes + 30
}

export default function TimeSlotPicker({ value, onChange, date, lessonDuration }) {
  const [bookedSlots, setBookedSlots] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!date) return
    const dateStr = format(date, "yyyy-MM-dd")
    setLoading(true)
    supabase
      .from("lesson_bookings")
      .select("lesson_time, lesson_duration, status")
      .eq("lesson_date", dateStr)
      .neq("status", "cancelled")
      .then(({ data }) => {
        setBookedSlots(data || [])
        setLoading(false)
      })
  }, [date])

  if (!date) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock size={32} className="mx-auto mb-3 opacity-50" />
        <p className="text-sm">Select a date first to see available times</p>
      </div>
    )
  }

  const blockedRanges = bookedSlots.map((b) => {
    const dur = b.lesson_duration === "60 min" ? 60 : 30
    const start = slotToMinutes(b.lesson_time)
    const end = blockedUntilMinutes(b.lesson_time, dur)
    return { start, end }
  })

  const isBlocked = (slot) => {
    const slotMin = slotToMinutes(slot)
    return blockedRanges.some(({ start, end }) => slotMin >= start && slotMin < end)
  }

  return (
    <div className="space-y-4">
      <label className="block font-heading font-semibold text-secondary text-lg">Pick a Time</label>
      {loading ? (
        <p className="text-sm text-muted-foreground">Checking availability...</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {getAvailableSlots(date).map((slot, i) => {
            const blocked = isBlocked(slot)
            return (
              <motion.button
                key={slot}
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                disabled={blocked}
                onClick={() => !blocked && onChange(slot)}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                  blocked
                    ? "bg-muted/50 text-muted-foreground/40 cursor-not-allowed line-through"
                    : value === slot
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {blocked && <Lock size={12} />}
                {slot}
              </motion.button>
            )
          })}
        </div>
      )}
      {getAvailableSlots(date).every(isBlocked) && !loading && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-3">No available slots on this date.</p>
          <a href="/waitlist" className="text-primary text-sm font-medium hover:underline">→ Join the waitlist for this date</a>
        </div>
      )}
    </div>
  )
}
