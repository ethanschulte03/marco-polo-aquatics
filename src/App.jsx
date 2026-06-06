import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PageNotFound from './lib/PageNotFound'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import BookLessons from '@/pages/BookLessons'
import BookLifeguard from '@/pages/BookLifeguard'
import Confirmation from '@/pages/Confirmation'
import AdminDashboard from '@/pages/AdminDashboard'
import Waitlist from '@/pages/Waitlist'
import GiftALesson from '@/pages/GiftALesson'
import SwimProgram from '@/pages/SwimProgram'

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/book-lessons" element={<BookLessons />} />
            <Route path="/book-lifeguard" element={<BookLifeguard />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/gift-a-lesson" element={<GiftALesson />} />
            <Route path="/swim-program" element={<SwimProgram />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
