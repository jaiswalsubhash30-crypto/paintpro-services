import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import BookNowModal from "./components/BookNowModal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import LoginModal from "./components/LoginModal";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import SubscribeModal from "./components/SubscribeModal";

export default function App() {
  const [bookOpen, setBookOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [subscribePlan, setSubscribePlan] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);

  const openSubscribe = (planName: string) => {
    setSubscribePlan(planName);
    setSubscribeOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster position="top-right" richColors />

      <Navbar
        onBookNow={() => setBookOpen(true)}
        onLogin={() => setLoginOpen(true)}
      />

      <main>
        <Hero onGetStarted={() => setBookOpen(true)} />
        <HowItWorks />
        <Services />
        <Pricing onSubscribe={openSubscribe} />
        <Gallery />
        <Contact />
      </main>

      <Footer />

      <BookNowModal open={bookOpen} onClose={() => setBookOpen(false)} />
      <SubscribeModal
        open={subscribeOpen}
        planName={subscribePlan}
        onClose={() => setSubscribeOpen(false)}
      />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
