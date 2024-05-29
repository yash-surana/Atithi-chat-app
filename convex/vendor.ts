import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const checkVendorsExist = mutation({
  args: { vendors: v.array(v.object({ name: v.string(), email: v.string() })), eventId: v.id("events") },
  handler: async (ctx, args) => {
    // Retrieve all users from the database
    const allUsers = await ctx.db.query("users").collect();

    const nonExistentVendors = [];
    const existingVendors = [];

    for (const vendor of args.vendors) {
      // Normalize the vendor email to lowercase to ensure case-insensitive comparison
      const normalizedVendorEmail = vendor.email.toLowerCase();
      
      // Check if an existing user with the same email (case-insensitive) exists
      const existingVendor = allUsers.find(user => user.email.toLowerCase() === normalizedVendorEmail);
      
      if (!existingVendor) {
        nonExistentVendors.push({ name: vendor.name, email: vendor.email });
      } else {
        // Add event ID and role to the existing vendor's events array
        const events = existingVendor.events || [];
        events.push({ eventID: args.eventId, eventRole: "vendor" });
        await ctx.db.patch(existingVendor._id, { events });

        existingVendors.push(existingVendor);
      }
    }

    return { nonExistentVendors, existingVendors };
  }
});
