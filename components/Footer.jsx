const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Link } from "react-router-dom";
import { Waves, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/mascot-main.jpg"
                alt="Marco Polo Aquatics"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="font-display font-bold text-lg">
                Marco Polo Aquatics
              </span>
            </div>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed">
              Professional swimming instruction and private lifeguard services. Safety, skill, and confidence in the water.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-primary">
              Services
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/book-lessons" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Swimming Lessons
              </Link>
              <Link to="/book-lifeguard" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Private Lifeguard
              </Link>
              <Link to="/gift-a-lesson" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Gift a Lesson
              </Link>
              <Link to="/waitlist" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Join the Waitlist
              </Link>
              <a href="#faq" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                FAQ
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider text-primary">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:ethan.schulte@gmail.com" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors flex items-center gap-2">
                <Mail size={14} />
                ethan.schulte@gmail.com
              </a>
              <a href="tel:8137674801" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors flex items-center gap-2">
                <Phone size={14} />
                (813) 767-4801
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/40">
            © {new Date().getFullYear()} Marco Polo Aquatics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}