// app/events/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../../../../convex/_generated/api';

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
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <p className="mb-4">{event.description}</p>
      <div className="mb-4">
        <strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}
      </div>
      <div className="mb-4">
        <strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}
      </div>
    </div>
  );
};

export default EventPage;
