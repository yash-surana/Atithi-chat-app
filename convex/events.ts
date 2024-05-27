
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";



export const createEvent = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    startDate: v.string(), 
    endDate: v.string(),   
    host: v.id("users"),
  },
  handler: async (ctx, args) => {
    const eventId = await ctx.db.insert("events", {
      name: args.name,
      description: args.description,
      startDate: args.startDate,
      endDate: args.endDate,
      host: args.host,
    });
    return eventId;
  }
});

export const getEventById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.id);
    if (!event) {
      throw new Error(`Event with ID ${args.id} not found`);
    }
    return event;
  }
});
