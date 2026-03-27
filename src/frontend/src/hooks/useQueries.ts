import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BookingRequest,
  ContactMessage,
  Subscription,
} from "../backend.d";
import { useActor } from "./useActor";

export function useSubscriptionPlans() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["subscriptionPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSubscriptionPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (booking: BookingRequest) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBookingRequest(booking);
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (message: ContactMessage) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(message);
    },
  });
}

export function useSubmitSubscription() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (sub: Subscription) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitSubscription(sub);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subscriptionPlans"] });
    },
  });
}
