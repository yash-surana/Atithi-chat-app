import { Id } from "../convex/_generated/dataModel";

// src/types.ts
export interface User {
  name?: string;
  email: string;
  image: string;
  tokenIdentifier: string;
  isOnline: boolean;
  role: "user" | "vendor"; // Specify the valid values for role
  isonboarding: boolean;
  events: { eventID: Id<"events">; eventRole: "host" | "guest" | "vendor" }[]; // Add the events property
  vendorType?: string; // Optional vendor type
  }

// src/types.ts
export interface CustomUser {
  id: string;
  email_addresses: { email_address: string }[];
  first_name?: string | null;
  last_name?: string | null;
  image_url: string;
  role: string;
  isonboarding: boolean;
  // Include any other fields that Clerk's user object might have
}
