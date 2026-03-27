import { motion } from "motion/react";

const galleryItems = [
  {
    before: "oklch(0.75 0.02 50)",
    after: "oklch(0.78 0.08 210)",
    room: "Living Room",
    label: "Warm Beige → Coastal Teal",
  },
  {
    before: "oklch(0.82 0.01 100)",
    after: "oklch(0.52 0.17 255)",
    room: "Master Bedroom",
    label: "Off-White → Navy Blue",
  },
  {
    before: "oklch(0.70 0.03 80)",
    after: "oklch(0.92 0.04 150)",
    room: "Kitchen",
    label: "Golden Oak → Sage Green",
  },
  {
    before: "oklch(0.80 0.02 60)",
    after: "oklch(0.72 0.17 55)",
    room: "Dining Room",
    label: "Cream → Warm Orange",
  },
  {
    before: "oklch(0.88 0.01 200)",
    after: "oklch(0.22 0.025 240)",
    room: "Home Office",
    label: "Light Gray → Charcoal",
  },
  {
    before: "oklch(0.85 0.02 120)",
    after: "oklch(0.62 0.1 300)",
    room: "Kids Room",
    label: "Mint → Lavender",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Project Gallery
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See the stunning transformations we've achieved for our happy
            clients.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.room}
              data-ocid={`gallery.item.${i + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl overflow-hidden border border-border shadow-card group cursor-default"
            >
              {/* Before / After split */}
              <div className="h-44 flex relative overflow-hidden">
                <div
                  className="w-1/2 h-full transition-all duration-500 group-hover:w-2/5"
                  style={{ background: item.before }}
                />
                <div
                  className="w-1/2 h-full transition-all duration-500 group-hover:w-3/5"
                  style={{ background: item.after }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-foreground">
                    Before → After
                  </div>
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="font-semibold text-foreground text-sm">
                  {item.room}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {item.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
