import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="pt-16 min-h-screen flex items-center bg-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 w-fit">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-orange text-orange" />
              ))}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              Trusted by 2,400+ homeowners
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight">
            Professional
            <br />
            <span style={{ color: "oklch(0.52 0.17 255)" }}>
              House Painting
            </span>
            <br />
            Services
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            Transform your home with our expert painting services. Premium
            quality, flawless finishes, and lasting results — guaranteed. Get a
            free quote today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              data-ocid="hero.get_started.primary_button"
              onClick={onGetStarted}
              className="bg-orange text-white hover:opacity-90 font-semibold rounded-[10px] text-base px-8"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              data-ocid="hero.explore_plans.button"
              onClick={() =>
                document
                  .getElementById("pricing")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-semibold text-base"
            >
              Explore Plans
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-2">
            {[
              { value: "500+", label: "Projects Done" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "10yr", label: "Experience" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-extrabold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Painted room image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden shadow-card h-[480px]"
        >
          <img
            src="/assets/generated/hero-room.dim_900x700.jpg"
            alt="Beautifully painted interior room"
            className="w-full h-full object-cover"
          />
          {/* Floating badge */}
          <div className="absolute bottom-6 left-6 bg-white rounded-xl px-4 py-3 shadow-card flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.97 0.08 210)" }}
            >
              <span className="text-xl">🎨</span>
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">
                Premium Finish
              </div>
              <div className="text-xs text-muted-foreground">
                100% Satisfaction
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
