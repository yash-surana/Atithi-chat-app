// app/events/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../../../../convex/_generated/api';
import LandingPageCouple from '@/components/home/LandingPageCouple';

const EventPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const event = useQuery(api.events.getEventById, id ? { id } : "skip");

  if (!event) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <LandingPageCouple />
    </div>
  );
};

export default EventPage;
