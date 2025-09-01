export type Platform = 'Airbnb' | 'Booking.com' | 'Direct';

export interface Booking {
  id: string;
  unitId: string;
  platform: Platform;
  startDate: Date;
  endDate: Date;
  guestName: string;
  revenue: number;
}

export interface RentalUnit {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  calendars: {
    airbnb: string;
    bookingcom: string;
    direct: string;
  };
}
