import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submitContact = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync({
        name: form.name,
        email: form.email,
        message: form.message,
        timestamp: BigInt(Date.now()),
      });
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Get in Touch
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have questions? Ready to start your project? Reach out and our team
            will respond promptly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: MapPin,
                  label: "Address",
                  value: "123 Paint Street, Color City, CA 90210",
                },
                { icon: Phone, label: "Phone", value: "+1 (555) PAINT-PRO" },
                { icon: Mail, label: "Email", value: "hello@paintpro.com" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "oklch(0.92 0.06 255)" }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "oklch(0.52 0.17 255)" }}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground mb-0.5">
                      {label}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-card flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-name">Full Name</Label>
                <Input
                  id="contact-name"
                  data-ocid="contact.input"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-email">Email Address</Label>
                <Input
                  id="contact-email"
                  data-ocid="contact.email.input"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                data-ocid="contact.textarea"
                placeholder="Tell us about your painting project..."
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                required
              />
            </div>
            <Button
              type="submit"
              data-ocid="contact.submit_button"
              disabled={submitContact.isPending}
              className="w-full bg-primary text-primary-foreground hover:opacity-90 rounded-[10px] font-semibold"
            >
              {submitContact.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {submitContact.isPending ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
