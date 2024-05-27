// pages/events/[id].tsx
import { useRouter } from 'next/router';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import React from 'react';

const EventPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const event = useQuery(api.events.getEventById, id ? { id: id as string } : "skip");

  if (!event) {
    return <div>Loading...</div>;
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
