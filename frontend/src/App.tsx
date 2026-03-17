import { Outlet, Route, Routes } from "react-router-dom";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { Dashboard } from "@/pages/Dashboard";
import { NFTGallery } from "@/pages/NFTGallery";
import { Transactions } from "@/pages/Transactions";

function Shell() {
  return (
    <div className="relative min-h-screen overflow-hidden text-foreground">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 sm:px-6">
        <Navbar />
        <MobileNav />
        <main className="mt-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/nfts" element={<NFTGallery />} />
      </Route>
    </Routes>
  );
}
