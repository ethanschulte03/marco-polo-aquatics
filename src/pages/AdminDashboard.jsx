import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Shield, Clock, Gift, Mail, CheckCircle2, Loader2, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { supabase } from "../lib/supabase"

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  completed: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  waiting: "bg-yellow-100 text-yellow-800 border-yellow-200",
  contacted: "bg-blue-100 text-blue-800 border-blue-200",
  booked: "bg-green-100 text-green-800 border-green-200",
  removed: "bg-red-100 text-red-800 border-red-200",
  redeemed: "bg-green-100 text-green-800 border-green-200",
  expired: "bg-red-100 text-red-800 border-red-200",
}

function useTable(tableName) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const fetch = async () => {
    setLoading(true)
    const { data: rows } = await supabase.from(tableName).select("*").order("created_at", { ascending: false }).limit(200)
    setData(rows || [])
    setLoading(false)
  }
  useEffect(() => { fetch() }, [])
  const update = async (id, updates) => {
    await supabase.from(tableName).update(updates).eq("id", id)
    fetch()
  }
  return { data, loading, refetch: fetch, update }
}

export default function AdminDashboard() {
  const lessons = useTable("lesson_bookings")
  const lifeguards = useTable("lifeguard_bookings")
  const waitlist = useTable("waitlist")
  const gifts = useTable("gift_lessons")
  const interested = useTable("interested_families")

  const stats = [
    { label: "Lesson Bookings", value: lessons.data.length, icon: GraduationCap, color: "text-primary" },
    { label: "Lifeguard Bookings", value: lifeguards.data.length, icon: Shield, color: "text-accent" },
    { label: "Waitlist", value: waitlist.data.filter(w => w.status === "waiting").length, icon: Clock, color: "text-yellow-500" },
    { label: "Gift Lessons", value: gifts.data.length, icon: Gift, color: "text-green-500" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-secondary mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border/50 rounded-2xl p-6">
              <stat.icon size={24} className={`${stat.color} mb-3`} />
              <p className="text-2xl font-display font-bold text-secondary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="lessons">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="lessons">Swimming Lessons</TabsTrigger>
            <TabsTrigger value="lifeguards">Lifeguard Bookings</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
            <TabsTrigger value="gifts">Gift Lessons</TabsTrigger>
            <TabsTrigger value="interested">Interested Families</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            {lessons.loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div> : (
              <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parent</TableHead><TableHead>Child</TableHead><TableHead>Type / Duration</TableHead>
                        <TableHead>Comfort</TableHead><TableHead>Date</TableHead><TableHead>Time</TableHead>
                        <TableHead>Waiver</TableHead><TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lessons.data.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell><div><p className="font-medium">{b.parent_name}</p><p className="text-xs text-muted-foreground">{b.parent_email}</p>{b.parent_phone && <p className="text-xs text-muted-foreground">{b.parent_phone}</p>}</div></TableCell>
                          <TableCell><span className="font-medium">{b.child_name}</span> <span className="text-xs text-muted-foreground">(age {b.child_age})</span></TableCell>
                          <TableCell className="text-sm">{b.lesson_type} — {b.lesson_duration}</TableCell>
                          <TableCell><span className="text-sm">{b.water_comfort_level}/5</span></TableCell>
                          <TableCell>{b.lesson_date ? format(new Date(b.lesson_date), "MMM d, yyyy") : ""}</TableCell>
                          <TableCell>{b.lesson_time}</TableCell>
                          <TableCell>{b.waiver_agreed ? <span className="flex items-center gap-1 text-green-600 text-xs"><CheckCircle2 size={12} /> Signed</span> : <span className="text-xs text-muted-foreground">—</span>}</TableCell>
                          <TableCell>
                            <Select value={b.status} onValueChange={(val) => lessons.update(b.id, { status: val })}>
                              <SelectTrigger className="w-32"><Badge className={`${statusColors[b.status]} border text-xs`}>{b.status}</Badge></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                      {lessons.data.length === 0 && <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No lesson bookings yet</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lifeguards">
            {lifeguards.loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-accent" size={32} /></div> : (
              <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>Contact</TableHead><TableHead>Date</TableHead><TableHead>Time</TableHead><TableHead>Location</TableHead><TableHead>Swimmers</TableHead><TableHead>Status</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {lifeguards.data.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell><div><p className="font-medium">{b.contact_name}</p><p className="text-xs text-muted-foreground">{b.contact_email}</p></div></TableCell>
                          <TableCell>{b.event_date ? format(new Date(b.event_date), "MMM d, yyyy") : ""}</TableCell>
                          <TableCell>{b.event_start_time} — {b.event_end_time}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{b.event_address}</TableCell>
                          <TableCell>{b.estimated_swimmers} ({b.children_count || 0} kids)</TableCell>
                          <TableCell>
                            <Select value={b.status} onValueChange={(val) => lifeguards.update(b.id, { status: val })}>
                              <SelectTrigger className="w-32"><Badge className={`${statusColors[b.status]} border text-xs`}>{b.status}</Badge></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                      {lifeguards.data.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No lifeguard bookings yet</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="waitlist">
            {waitlist.loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-yellow-500" size={32} /></div> : (
              <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>Parent</TableHead><TableHead>Phone</TableHead><TableHead>Lesson Type</TableHead><TableHead>Preferred Time</TableHead><TableHead>Notes</TableHead><TableHead>Status</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {waitlist.data.map((w) => (
                        <TableRow key={w.id}>
                          <TableCell><div><p className="font-medium">{w.parent_name}</p><p className="text-xs text-muted-foreground">{w.parent_email}</p></div></TableCell>
                          <TableCell className="text-sm">{w.parent_phone || "—"}</TableCell>
                          <TableCell className="text-sm">{w.lesson_type || "Any"}</TableCell>
                          <TableCell className="text-sm">{w.preferred_dates || "—"}</TableCell>
                          <TableCell className="text-sm max-w-[200px] truncate">{w.notes || "—"}</TableCell>
                          <TableCell>
                            <Select value={w.status} onValueChange={(val) => waitlist.update(w.id, { status: val })}>
                              <SelectTrigger className="w-32"><Badge className={`${statusColors[w.status]} border text-xs`}>{w.status}</Badge></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="waiting">Waiting</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="booked">Booked</SelectItem>
                                <SelectItem value="removed">Removed</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                      {waitlist.data.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No waitlist entries yet</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="gifts">
            {gifts.loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-green-500" size={32} /></div> : (
              <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>Purchaser</TableHead><TableHead>Recipient</TableHead><TableHead>Lesson</TableHead><TableHead>Gift Code</TableHead><TableHead>Status</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {gifts.data.map((g) => (
                        <TableRow key={g.id}>
                          <TableCell><div><p className="font-medium">{g.purchaser_name}</p><p className="text-xs text-muted-foreground">{g.purchaser_email}</p></div></TableCell>
                          <TableCell className="font-medium">{g.recipient_name}</TableCell>
                          <TableCell className="text-sm">{g.lesson_type} — {g.lesson_duration}</TableCell>
                          <TableCell><code className="text-xs bg-muted px-2 py-1 rounded font-mono">{g.gift_code}</code></TableCell>
                          <TableCell>
                            <Select value={g.status} onValueChange={(val) => gifts.update(g.id, { status: val })}>
                              <SelectTrigger className="w-32"><Badge className={`${statusColors[g.status]} border text-xs`}>{g.status}</Badge></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="redeemed">Redeemed</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                      {gifts.data.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No gift lessons yet</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="interested">
            {interested.loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary" size={32} /></div> : (
              <div className="bg-card border border-border/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Date Added</TableHead></TableRow>
                    </TableHeader>
                    <TableBody>
                      {interested.data.map((f) => (
                        <TableRow key={f.id}>
                          <TableCell>{f.name || "—"}</TableCell>
                          <TableCell><a href={`mailto:${f.email}`} className="text-primary hover:underline text-sm flex items-center gap-1"><Mail size={12} />{f.email}</a></TableCell>
                          <TableCell className="text-sm text-muted-foreground">{f.created_at ? format(new Date(f.created_at), "MMM d, yyyy") : ""}</TableCell>
                        </TableRow>
                      ))}
                      {interested.data.length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No interested families yet</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
