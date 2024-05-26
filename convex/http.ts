// src/server/http.ts
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { CustomUser } from ".././src/types"; // Import the custom user type

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const payloadString = await req.text();
    const headerPayload = req.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-signature": headerPayload.get("svix-signature")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
        },
      });

      if (result.type.startsWith("user.")) {
        const user = result.data as CustomUser;

        switch (result.type) {
          case "user.created":
            await ctx.runMutation(internal.users.createUser, {
              tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${user.id}`,
              email: user.email_addresses[0]?.email_address,
              name: `${user.first_name ?? "Guest"} ${user.last_name ?? ""}`,
              image: user.image_url,
              role: user.role,
              isonboarding: user.isonboarding,
            });
            break;
          case "user.updated":
            await ctx.runMutation(internal.users.updateUser, {
              tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${user.id}`,
              image: user.image_url,
            });
            break;
          case "session.created":
            await ctx.runMutation(internal.users.setUserOnline, {
              tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${user.id}`,
            });
            break;
          case "session.ended":
            await ctx.runMutation(internal.users.setUserOffline, {
              tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${user.id}`,
            });
            break;
        }

        return new Response(null, {
          status: 200,
        });
      }

      return new Response("Invalid event type", {
        status: 400,
      });
    } catch (error) {
      console.log("Webhook Error🔥🔥", error);
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;
