import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import type { SubscriptionPlan } from "../backend.d";
import { useSubscriptionPlans } from "../hooks/useQueries";

const fallbackPlans: SubscriptionPlan[] = [
  {
    name: "Starter",
    pricePerYear: 99n,
    features: [
      "1 Room Interior Painting",
      "Color Consultation",
      "Free Touch-Ups (30 days)",
      "Basic Paint Warranty",
    ],
  },
  {
    name: "Professional",
    pricePerYear: 199n,
    features: [
      "Up to 5 Rooms",
      "Premium Paint Brands",
      "Exterior Accent Work",
      "Priority Scheduling",
      "1-Year Warranty",
    ],
  },
  {
    name: "Premium",
    pricePerYear: 349n,
    features: [
      "Whole Home Coverage",
      "Cabinet & Trim Painting",
      "Color Design Consultation",
      "Commercial Grade Paints",
      "2-Year Full Warranty",
      "Dedicated Project Manager",
    ],
  },
];

interface PricingProps {
  onSubscribe: (planName: string) => void;
}

export default function Pricing({ onSubscribe }: PricingProps) {
  const { data: plans, isLoading } = useSubscriptionPlans();
  const displayPlans = plans && plans.length > 0 ? plans : fallbackPlans;

  return (
    <section id="pricing" className="py-20 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Flexible Painting Plans
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Subscribe to a plan and enjoy priority service, exclusive discounts,
            and ongoing maintenance throughout the year.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid md:grid-cols-3 gap-6"
            data-ocid="pricing.loading_state"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[420px] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {displayPlans.map((plan, i) => {
              const isPro = plan.name === "Professional";
              const isPremium = plan.name === "Premium";
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-2xl p-8 flex flex-col gap-6 relative ${
                    isPro
                      ? "bg-primary text-primary-foreground shadow-[0_8px_40px_rgba(47,111,221,0.25)] scale-[1.04]"
                      : "bg-white border border-border shadow-card"
                  }`}
                >
                  {isPro && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div
                      className={`text-sm font-semibold mb-1 ${isPro ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {isPremium ? "🏆 " : ""}
                      {plan.name}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold">
                        ${plan.pricePerYear.toString()}
                      </span>
                      <span
                        className={`text-sm ${isPro ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        /year
                      </span>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            isPro ? "bg-white/20" : "bg-secondary"
                          }`}
                        >
                          <Check
                            className={`w-2.5 h-2.5 ${isPro ? "text-white" : ""}`}
                            style={
                              !isPro ? { color: "oklch(0.52 0.17 255)" } : {}
                            }
                          />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    data-ocid={`pricing.${plan.name.toLowerCase()}.primary_button`}
                    onClick={() => onSubscribe(plan.name)}
                    className={`w-full rounded-[10px] font-semibold ${
                      isPro
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    Subscribe Now
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
