// app/events/[id]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '../../../../convex/_generated/api';
import CoupleHomeScreen from '@/components/home/couple-home-screen';

const EventPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  const event = useQuery(api.events.getEventById, id ? { id } : "skip");

  if (!event) {
    return <div className='px-6 py-10'>Loading...</div>;
  }

  if (!event) {
    return <div className='px-6 py-10'>Event not found</div>;
  }

  return (
    <div className="container mx-auto">
      <CoupleHomeScreen eventID={id || ""} event={event}/>
    </div>
  );
};

export default EventPage;
