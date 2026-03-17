import { AnimatePresence, motion } from "framer-motion";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { Dashboard } from "@/pages/Dashboard";
import { Landing } from "@/pages/Landing";
import { NFTGallery } from "@/pages/NFTGallery";
import { Transactions } from "@/pages/Transactions";

function Shell() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden text-foreground">
      <AnimatedBackground />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-24 sm:px-6 md:pb-10">
        <Navbar />
        <MobileNav />
        <main className="mt-6 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Landing />;
  }

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
