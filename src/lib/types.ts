
export type Unit = {
  id?: string;
  name: string;
  type: string;
  rate: number;
  maxOccupancy: number;
  status: 'available' | 'occupied' | 'maintenance';
  description: string;
  calendars: {
    airbnb: string;
    bookingcom: string;
    direct: string;
  };
};

export type Booking = {
  id?: string;
  guestFirstName: string;
  guestLastName: string;
  guestPhone: string;
  guestEmail: string;
  unitId: string;
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  nightlyRate: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  specialRequests: string;
  createdAt: string;
};

export type Reminder = {
  id?: string;
  title: string;
  description: string;
  category: 'payment' | 'maintenance' | 'cleaning' | 'booking' | 'inspection' | 'meeting' | 'other';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  dueTime?: string;
  status: 'pending' | 'completed';
  createdAt: string;
};

export type Investor = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    investmentAmount: number;
    sharePercentage: number;
    joinDate: string;
    status: 'active' | 'inactive';
    unitId?: string;
};

export type Agent = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    commissionRate: number;
    totalBookings: number;
    totalCommissions: number;
    joinDate: string;
    status: 'active' | 'inactive';
};

export type Expense = {
    id?: string;
    title: string;
    category: 'utilities' | 'maintenance' | 'cleaning' | 'supplies' | 'insurance' | 'other';
    amount: number;
    date: string;
    unitId: string | null;
    description: string;
    status: 'paid' | 'unpaid';
};

export type ProfitPayment = {
    id?: string;
    investorId: string;
    month: string;
    amount: number;
    paymentDate: string;
    paymentMethod: 'bank_transfer' | 'gcash' | 'cash' | 'check';
    notes: string;
    status: 'paid';
};

export type Platform = 'Airbnb' | 'Booking.com' | 'Direct';

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

export type SyncedEvent = {
  uid: string;
  summary: string;
  start: string;
  end: string;
  platform: Platform;
};
