import type { RentalUnit, Booking } from './types';

export const rentalUnits: RentalUnit[] = [
  {
    id: 'unit-1',
    name: 'The Cozy Cabin',
    description: 'A beautiful cabin in the woods, perfect for a weekend getaway.',
    imageUrl: 'https://picsum.photos/600/400',
    imageHint: 'cozy cabin',
    calendars: {
      airbnb: 'https://www.airbnb.com/calendar/ical/123.ics',
      bookingcom: 'https://www.booking.com/calendar/ical/456.ics',
      direct: 'https://www.mysite.com/calendar/ical/789.ics',
    },
  },
  {
    id: 'unit-2',
    name: 'The Beach House',
    description: 'A stunning house with an ocean view, right on the beach.',
    imageUrl: 'https://picsum.photos/600/401',
    imageHint: 'beach house',
    calendars: {
      airbnb: 'https://www.airbnb.com/calendar/ical/321.ics',
      bookingcom: 'https://www.booking.com/calendar/ical/654.ics',
      direct: 'https://www.mysite.com/calendar/ical/987.ics',
    },
  },
  {
    id: 'unit-3',
    name: 'The City Loft',
    description: 'A modern loft in the heart of the city.',
    imageUrl: 'https://picsum.photos/600/402',
    imageHint: 'city loft',
    calendars: {
      airbnb: 'https://www.airbnb.com/calendar/ical/111.ics',
      bookingcom: 'https://www.booking.com/calendar/ical/222.ics',
      direct: 'https://www.mysite.com/calendar/ical/333.ics',
    },
  },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const twoWeeks = new Date(today);
twoWeeks.setDate(twoWeeks.getDate() + 14);

export const bookings: Booking[] = [
    {
      id: 'booking-1',
      unitId: 'unit-1',
      platform: 'Airbnb',
      startDate: today,
      endDate: new Date(new Date().setDate(today.getDate() + 3)),
      guestName: 'John Doe',
      revenue: 450,
    },
    {
      id: 'booking-2',
      unitId: 'unit-2',
      platform: 'Booking.com',
      startDate: new Date(new Date().setDate(today.getDate() + 2)),
      endDate: new Date(new Date().setDate(today.getDate() + 5)),
      guestName: 'Jane Smith',
      revenue: 820,
    },
    {
      id: 'booking-3',
      unitId: 'unit-1',
      platform: 'Direct',
      startDate: new Date(new Date().setDate(today.getDate() + 7)),
      endDate: new Date(new Date().setDate(today.getDate() + 10)),
      guestName: 'Peter Jones',
      revenue: 500,
    },
     {
      id: 'booking-4',
      unitId: 'unit-3',
      platform: 'Airbnb',
      startDate: new Date(new Date().setDate(today.getDate() + 1)),
      endDate: new Date(new Date().setDate(today.getDate() + 4)),
      guestName: 'Susan Williams',
      revenue: 950,
    },
];
