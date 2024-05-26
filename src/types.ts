// src/types.ts
export interface User {
    name?: string;
    email: string;
    image: string;
    tokenIdentifier: string;
    isOnline: boolean;
    role: string; // New role property
    isonboarding: boolean; // New isonboarding property
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
    