import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import UrgencyBanner from "./UrgencyBanner";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <UrgencyBanner />
      <Navbar />
      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}