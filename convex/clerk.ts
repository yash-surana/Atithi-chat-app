// src/server/clerk.ts
"use node";

import type { WebhookEvent, UserJSON } from "@clerk/clerk-sdk-node";
import { v } from "convex/values";
import { Webhook } from "svix";
import { internalAction } from "./_generated/server";
import { CustomUser } from ".././src/types"; // Import the custom user type

const WEB_HOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET as string;

export const fulfill = internalAction({
  args: {
    headers: v.any(),
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    const wh = new Webhook(WEB_HOOK_SECRET);
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent;

    if (payload.type.startsWith("user.")) {
      const user = payload.data as UserJSON;

      // Ensure the role and isonboarding fields are set
      const customUser: CustomUser = {
        ...user,
        role: (user as any).role || "user", // Default role if not provided
        isonboarding: (user as any).isonboarding || false, // Default onboarding status if not provided
      };

      return { ...payload, data: customUser };
    }

    return payload;
  },
});

// https://docs.convex.dev/functions/internal-functions
