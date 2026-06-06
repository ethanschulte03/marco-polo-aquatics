import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", path: "/" },
    { label: "Swim Lessons", path: "/book-lessons" },
    { label: "Swim Program", path: "/swim-program" },
    { label: "Private Lifeguard", path: "/book-lifeguard" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:"rgba(10,26,58,0.97)",borderBottom:"1px solid rgba(34,211,238,0.2)",backdropFilter:"blur(20px)"}}>
      <div style={{maxWidth:"1280px",margin:"0 auto",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Link to="/"><img src="/images/logo-navbar.png" alt="Marco Polo Aquatics" style={{height:"52px",width:"auto"}} /></Link>
        <div style={{display:"flex",gap:"32px",alignItems:"center"}} className="hidden md:flex">
          {links.map((link) => (
            <Link key={link.path} to={link.path}
              style={{color: isActive(link.path) ? "#22d3ee" : "#ffffff", fontWeight:"500", fontSize:"15px", textDecoration:"none"}}>
              {link.label}
            </Link>
          ))}
        </div>
        <button style={{color:"white",background:"none",border:"none",cursor:"pointer"}} className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}}
            style={{background:"rgba(10,26,58,0.98)",borderTop:"1px solid rgba(34,211,238,0.15)"}}>
            <div style={{padding:"16px 24px",display:"flex",flexDirection:"column",gap:"16px"}}>
              {links.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                  style={{color: isActive(link.path) ? "#22d3ee" : "#ffffff", fontWeight:"500", fontSize:"14px", textDecoration:"none"}}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
