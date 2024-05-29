import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const checkGuestsExist = mutation({
  args: { guests: v.array(v.object({ name: v.string(), email: v.string() })), eventId: v.id("events") },
  handler: async (ctx, args) => {
    // Retrieve all users from the database
    const allUsers = await ctx.db.query("users").collect();

    const nonExistentGuests = [];
    const existingGuests = [];

    for (const guest of args.guests) {
      // Normalize the guest email to lowercase to ensure case-insensitive comparison
      const normalizedGuestEmail = guest.email.toLowerCase();
      
      // Check if an existing user with the same email (case-insensitive) exists
      const existingGuest = allUsers.find(user => user.email.toLowerCase() === normalizedGuestEmail);
      
      if (!existingGuest) {
        nonExistentGuests.push({ name: guest.name, email: guest.email });
      } else {
        // Add event ID and role to the existing guest's events array
        const events = existingGuest.events || [];
        events.push({ eventID: args.eventId, eventRole: "guest" });
        await ctx.db.patch(existingGuest._id, { events });

        // Fetch the event and ensure it is not null
        const event = await ctx.db.get(args.eventId);
        if (event) {
          const guests = event.guests || [];
          guests.push(existingGuest._id);
          await ctx.db.patch(args.eventId, { guests });
        }

        existingGuests.push(existingGuest);
      }
    }

    return { nonExistentGuests, existingGuests };
  }
});
