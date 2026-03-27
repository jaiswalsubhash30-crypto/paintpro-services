import { CalendarDays, ClipboardList, Smile } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: CalendarDays,
    title: "Book a Consultation",
    description:
      "Schedule a free in-home consultation at your convenience. Our experts will assess your space and understand your vision.",
    step: "01",
  },
  {
    icon: ClipboardList,
    title: "Get a Free Quote",
    description:
      "Receive a detailed, transparent quote with no hidden fees. We'll recommend the best paints and finishes for your needs.",
    step: "02",
  },
  {
    icon: Smile,
    title: "We Paint & You Relax",
    description:
      "Our professional team handles everything from prep to cleanup. Sit back and enjoy your beautifully transformed home.",
    step: "03",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Getting a fresh coat of paint on your home is easier than you think.
            Three simple steps to a transformed space.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-2xl p-8 shadow-card relative"
              >
                <div
                  className="absolute top-6 right-6 text-5xl font-extrabold"
                  style={{ color: "oklch(0.92 0.01 250)" }}
                >
                  {step.step}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "oklch(0.92 0.06 255)" }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: "oklch(0.52 0.17 255)" }}
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
