# Atithi Event Website

Welcome to the Atithi Event Website! Our platform is designed to cater to two primary users: vendors and couples/users who wish to host events. Below you'll find a detailed guide on how to navigate and utilize the features available on our website.

## Table of Contents

1. [Getting Started](#getting-started)
2. [User Guide](#user-guide)
   - [Dashboard](#dashboard)
   - [Navigation](#navigation)
   - [Sidebar Options](#sidebar-options)
3. [Vendor Guide](#vendor-guide)
4. [Contact & Support](#contact--support)

## Getting Started

To begin using the Atithi Event Website, you will need to complete basic authentication via Clerk. Once authenticated, you can choose whether you are a vendor or a user.

## User Guide

### Dashboard

Upon logging in as a user, you will be greeted with a comprehensive dashboard that provides:

- **Event Countdown**: Displays the number of days left until your event.
- **Budget Overview**: Shows the decided budget, amount spent, and remaining budget.
- **To-Do List**: Keeps track of tasks to be completed.
- **Payment Schedule**: Details of upcoming and completed payments.
- **Guest Response Pie Chart**: Visual representation of expected guests, confirmed attendees, rejects, and pending responses.

### Navigation

At the bottom of the screen, you'll find a navigation bar with the following options:

- **Home**: Redirects to the events page where you can create or join events.
- **Atithigram**: A social media feature for sharing pictures, ideas, and moments related to events. Users can follow others, comment, like posts, and create new posts.
- **Chat**: A chat application similar to WhatsApp, allowing you to message guests and vendors, ask the AI for general questions or calculations, make calls, video calls, and share your screen.
- **My Profile**: Currently under development. Here, users will be able to edit their events and profiles.

### Sidebar Options

At the top of the screen, there is a sidebar icon that, when opened, reveals the following options:

- **All Events**: Redirects to the event creation page.
- **Create Event**: Opens a pop-up for event creation.
- **Add Vendors**: Allows you to upload a list of vendors.
- **Guest List**: Enables you to add, view, and edit the guest list.
- **Photobooth**: Lets you view images from your events.
- **Send E-Invites**: Compose and send email invitations to guests.
- **Spatial Arrangement**: A feature under development, planned to work like a seating arrangement tool.
- **Payments**: Displays all payments made so far.
- **AI Pose Suggestion**: Provides pose suggestions based on user input.
- **AI Outfit Suggestion**: Suggests outfits based on user input.
- **Settings**: Manage your account and preferences.

## Vendor Guide

As a vendor, you will have access to an events page that displays all past and upcoming events you are involved in. Features include:

- **Event Completion**: Mark events as completed.
- **Payment Details**: View and manage payment information.
- **Chat Application**: Communicate with users and other vendors through messaging, calls, and video calls.
- **My Profile**: Access and edit your profile (currently under development).

## Setup

1. Begin by cloning the repository to your local machine.
```bash
git clone https://github.com/602dhruviii/Atithi-chat-app.git
```

2. Navigate to the project directory and install the necessary dependencies.
```bash
npm install
```

3. Start the next Application:
```bash
npm run dev
```
4. Launch the convex using:-

```bash 
npx convex dev
```

## Technologies Used

- Node.js
- Express.js
- Next
- Convex
- Clerk
- Typescript
- ZegoCloud
- OpenAI API
- Tailwind CSS

## Demo Video
### User side
![Demo](./uservideo.gif)
### Vendor side
![Demo](./vendorvideo.gif)

