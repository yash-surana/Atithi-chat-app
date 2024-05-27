// src/server/users.ts
import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { User } from ".././src/types"; // Import the User type

export const createUser = internalMutation({
  args: {
    tokenIdentifier: v.string(),
    email: v.string(),
    name: v.string(),
    image: v.string(),
    role: v.string(),
    isonboarding: v.boolean()
  },
  handler: async (ctx, args) => {
    const newUser: User = {
      tokenIdentifier: args.tokenIdentifier,
      email: args.email,
      name: args.name,
      image: args.image,
      isOnline: true,
      role: args.role,
      isonboarding: false // Or use args.isonboarding if it should come from args
    };
    await ctx.db.insert("users", newUser);
  }
});

export const updateUser = internalMutation({
  args: { tokenIdentifier: v.string(), image: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      image: args.image,
    });
  }
});

export const updateRole = mutation({
  args: { userId: v.id("users"), role: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new ConvexError("User not found");
    }
    else if (args.role==="" || args.role===null) {
      throw new ConvexError("Role cannot be empty");
    }

    await ctx.db.patch(args.userId, {
      role: args.role,
      isonboarding: true, // Set isonboarding to true when role is updated
    });

    return await ctx.db.get(args.userId); // Return updated user
  }
});

export const setUserOnline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, { isOnline: true });
  }
});

export const setUserOffline = internalMutation({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", args.tokenIdentifier))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, { isOnline: false });
  }
});

export const getUsers = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const users = await ctx.db.query("users").collect();
    return users.filter((user) => user.tokenIdentifier !== identity.tokenIdentifier);
  }
});

export const getMe = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    return user;
  }
});

export const getGroupMembers = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Unauthorized");
    }

    const conversation = await ctx.db
      .query("conversations")
      .filter((q) => q.eq(q.field("_id"), args.conversationId))
      .first();
    if (!conversation) {
      throw new ConvexError("Conversation not found");
    }

    const users = await ctx.db.query("users").collect();
    const groupMembers = users.filter((user) => conversation.participants.includes(user._id));

    return groupMembers;
  }
});
