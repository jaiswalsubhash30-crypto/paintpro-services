import { Building2, Home, Layers, Paintbrush } from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Home,
    title: "Interior Painting",
    description:
      "Breathe new life into your living spaces. We handle walls, ceilings, trim, and accent walls with precision and care.",
    color: "oklch(0.92 0.06 255)",
    iconColor: "oklch(0.52 0.17 255)",
  },
  {
    icon: Building2,
    title: "Exterior Painting",
    description:
      "Protect and beautify your home's exterior with weather-resistant paints that last through every season.",
    color: "oklch(0.92 0.07 55)",
    iconColor: "oklch(0.62 0.17 55)",
  },
  {
    icon: Layers,
    title: "Commercial Painting",
    description:
      "Keep your business looking professional. We work around your schedule to minimize disruption to operations.",
    color: "oklch(0.93 0.06 210)",
    iconColor: "oklch(0.65 0.1 210)",
  },
  {
    icon: Paintbrush,
    title: "Cabinet Painting",
    description:
      "Transform your kitchen or bathroom cabinets with a factory-smooth finish at a fraction of replacement cost.",
    color: "oklch(0.93 0.04 150)",
    iconColor: "oklch(0.55 0.12 150)",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From single-room touch-ups to full home makeovers, we offer a
            complete range of painting services.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6 border border-border hover:shadow-card transition-shadow cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: service.color }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: service.iconColor }}
                  />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
