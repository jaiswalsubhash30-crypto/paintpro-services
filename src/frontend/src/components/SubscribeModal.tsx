import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitSubscription } from "../hooks/useQueries";

interface SubscribeModalProps {
  open: boolean;
  planName: string;
  onClose: () => void;
}

export default function SubscribeModal({
  open,
  planName,
  onClose,
}: SubscribeModalProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const submit = useSubmitSubscription();

  useEffect(() => {
    if (!open) setForm({ name: "", email: "", phone: "" });
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        planName: planName,
        startDate: BigInt(Date.now()),
      });
      toast.success(`Successfully subscribed to the ${planName} plan!`);
      onClose();
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md" data-ocid="subscribe.dialog">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Subscribe to {planName}
          </DialogTitle>
          <DialogDescription>
            Complete your subscription to start enjoying premium painting
            services.
          </DialogDescription>
        </DialogHeader>

        {/* Plan badge */}
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{ background: "oklch(0.92 0.06 255)" }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">
              {planName} Plan
            </div>
            <div className="text-xs text-muted-foreground">
              Annual subscription • Cancel anytime
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="s-name">Full Name</Label>
            <Input
              id="s-name"
              data-ocid="subscribe.input"
              placeholder="Jane Smith"
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="s-email">Email Address</Label>
            <Input
              id="s-email"
              data-ocid="subscribe.email.input"
              type="email"
              placeholder="jane@example.com"
              required
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="s-phone">Phone Number</Label>
            <Input
              id="s-phone"
              data-ocid="subscribe.phone.input"
              placeholder="+1 555 000 0000"
              required
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="subscribe.cancel_button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="subscribe.submit_button"
              disabled={submit.isPending}
              className="bg-primary text-primary-foreground hover:opacity-90"
            >
              {submit.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {submit.isPending ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
