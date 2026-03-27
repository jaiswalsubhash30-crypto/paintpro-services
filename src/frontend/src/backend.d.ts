import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Subscription {
    name: string;
    email: string;
    phone: string;
    planName: string;
    startDate: bigint;
}
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface BookingRequest {
    serviceType: ServiceType;
    name: string;
    email: string;
    message: string;
    preferredDate: bigint;
    timestamp: bigint;
    phone: string;
    selectedPlan?: string;
}
export interface SubscriptionPlan {
    features: Array<string>;
    name: string;
    pricePerYear: bigint;
}
export interface UserProfile {
    name: string;
}
export enum ServiceType {
    cabinetPainting = "cabinetPainting",
    interiorPainting = "interiorPainting",
    commercial = "commercial",
    exteriorPainting = "exteriorPainting"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addSubscriptionPlan(plan: SubscriptionPlan): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteSubscriptionPlan(planName: string): Promise<void>;
    getAllBookingRequests(): Promise<Array<BookingRequest>>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllSubscriptions(): Promise<Array<Subscription>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getSubscriptionPlans(): Promise<Array<SubscriptionPlan>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBookingRequest(booking: BookingRequest): Promise<void>;
    submitContactMessage(message: ContactMessage): Promise<void>;
    submitSubscription(subscription: Subscription): Promise<void>;
}
