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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ServiceType } from "../backend.d";
import { useSubmitBooking } from "../hooks/useQueries";

interface BookNowModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BookNowModal({ open, onClose }: BookNowModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "" as ServiceType | "",
    preferredDate: "",
    message: "",
    selectedPlan: "",
  });
  const submit = useSubmitBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.serviceType) {
      toast.error("Please select a service type.");
      return;
    }
    try {
      await submit.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        serviceType: form.serviceType as ServiceType,
        preferredDate: form.preferredDate
          ? BigInt(new Date(form.preferredDate).getTime())
          : BigInt(Date.now()),
        message: form.message,
        timestamp: BigInt(Date.now()),
        selectedPlan: form.selectedPlan || undefined,
      });
      toast.success(
        "Booking request submitted! We'll confirm within 24 hours.",
      );
      onClose();
      setForm({
        name: "",
        email: "",
        phone: "",
        serviceType: "",
        preferredDate: "",
        message: "",
        selectedPlan: "",
      });
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto"
        data-ocid="booking.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Book a Consultation
          </DialogTitle>
          <DialogDescription>
            Fill in your details and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="b-name">Full Name</Label>
              <Input
                id="b-name"
                data-ocid="booking.input"
                placeholder="Jane Smith"
                required
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="b-phone">Phone Number</Label>
              <Input
                id="b-phone"
                data-ocid="booking.phone.input"
                placeholder="+1 555 000 0000"
                required
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="b-email">Email Address</Label>
            <Input
              id="b-email"
              data-ocid="booking.email.input"
              type="email"
              placeholder="jane@example.com"
              required
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label>Service Type</Label>
              <Select
                value={form.serviceType}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, serviceType: v as ServiceType }))
                }
              >
                <SelectTrigger data-ocid="booking.select">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ServiceType.interiorPainting}>
                    Interior Painting
                  </SelectItem>
                  <SelectItem value={ServiceType.exteriorPainting}>
                    Exterior Painting
                  </SelectItem>
                  <SelectItem value={ServiceType.commercial}>
                    Commercial Painting
                  </SelectItem>
                  <SelectItem value={ServiceType.cabinetPainting}>
                    Cabinet Painting
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="b-date">Preferred Date</Label>
              <Input
                id="b-date"
                data-ocid="booking.date.input"
                type="date"
                value={form.preferredDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, preferredDate: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="b-plan">Optional Plan (if subscribing)</Label>
            <Select
              value={form.selectedPlan}
              onValueChange={(v) => setForm((p) => ({ ...p, selectedPlan: v }))}
            >
              <SelectTrigger data-ocid="booking.plan.select">
                <SelectValue placeholder="None selected" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="Starter">Starter ($99/yr)</SelectItem>
                <SelectItem value="Professional">
                  Professional ($199/yr)
                </SelectItem>
                <SelectItem value="Premium">Premium ($349/yr)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="b-msg">Message</Label>
            <Textarea
              id="b-msg"
              data-ocid="booking.textarea"
              placeholder="Tell us about your project..."
              rows={3}
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="booking.cancel_button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="booking.submit_button"
              disabled={submit.isPending}
              className="bg-orange text-white hover:opacity-90"
            >
              {submit.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {submit.isPending ? "Submitting..." : "Book Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
