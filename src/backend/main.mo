import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ServiceType = {
    #interiorPainting;
    #exteriorPainting;
    #commercial;
    #cabinetPainting;
  };

  public type SubscriptionPlan = {
    name : Text;
    pricePerYear : Nat;
    features : [Text];
  };

  public type BookingRequest = {
    name : Text;
    email : Text;
    phone : Text;
    serviceType : ServiceType;
    preferredDate : Int;
    message : Text;
    selectedPlan : ?Text;
    timestamp : Int;
  };

  public type Subscription = {
    name : Text;
    email : Text;
    phone : Text;
    planName : Text;
    startDate : Int;
  };

  public type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  let subscriptionPlans = Map.empty<Text, SubscriptionPlan>();
  let bookingRequests = List.empty<BookingRequest>();
  let subscriptions = List.empty<Subscription>();
  let contactMessages = List.empty<ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Initialize with base subscription plans
  let starterPlan : SubscriptionPlan = {
    name = "Starter";
    pricePerYear = 99;
    features = [
      "Basic interior painting",
      "Exterior painting (up to 1000 sq ft)",
      "1-year warranty",
    ];
  };

  let professionalPlan : SubscriptionPlan = {
    name = "Professional";
    pricePerYear = 199;
    features = [
      "All features of Starter",
      "Commercial painting (up to 5000 sq ft)",
      "Cabinet painting",
      "2-year warranty",
    ];
  };

  let premiumPlan : SubscriptionPlan = {
    name = "Premium";
    pricePerYear = 349;
    features = [
      "All features of Professional",
      "Unlimited commercial painting",
      "Premium exterior paint",
      "3-year warranty",
      "Priority support",
    ];
  };

  subscriptionPlans.add(starterPlan.name, starterPlan);
  subscriptionPlans.add(professionalPlan.name, professionalPlan);
  subscriptionPlans.add(premiumPlan.name, premiumPlan);

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public query to list all subscription plans (no authorization needed)
  public query ({ caller }) func getSubscriptionPlans() : async [SubscriptionPlan] {
    subscriptionPlans.values().toArray();
  };

  // Public function - anyone including guests can submit booking requests
  public shared ({ caller }) func submitBookingRequest(booking : BookingRequest) : async () {
    let newBooking : BookingRequest = {
      booking with
      timestamp = Time.now();
    };
    bookingRequests.add(newBooking);
  };

  // Public function - anyone including guests can subscribe
  public shared ({ caller }) func submitSubscription(subscription : Subscription) : async () {
    let newSubscription : Subscription = {
      subscription with
      startDate = Time.now();
    };
    subscriptions.add(newSubscription);
  };

  // Public function - anyone including guests can submit contact messages
  public shared ({ caller }) func submitContactMessage(message : ContactMessage) : async () {
    let newMessage : ContactMessage = {
      message with
      timestamp = Time.now();
    };
    contactMessages.add(newMessage);
  };

  // Admin-only function to view all booking requests
  public query ({ caller }) func getAllBookingRequests() : async [BookingRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all booking requests");
    };
    bookingRequests.toArray();
  };

  // Admin-only function to view all subscriptions
  public query ({ caller }) func getAllSubscriptions() : async [Subscription] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all subscriptions");
    };
    subscriptions.toArray();
  };

  // Admin-only function to view all contact messages
  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all contact messages");
    };
    contactMessages.toArray();
  };

  // Admin-only function to add subscription plans
  public shared ({ caller }) func addSubscriptionPlan(plan : SubscriptionPlan) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add subscription plans");
    };
    subscriptionPlans.add(plan.name, plan);
  };

  // Admin-only function to delete subscription plans
  public shared ({ caller }) func deleteSubscriptionPlan(planName : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete subscription plans");
    };
    if (not subscriptionPlans.containsKey(planName)) {
      Runtime.trap("Subscription plan does not exist");
    };
    subscriptionPlans.remove(planName);
  };
};
