import type { Unit, Booking, Reminder, Investor, Agent, Expense, ProfitPayment } from './types';

export const units: Unit[] = [
    { 
        id: 1, 
        name: '1839 C2', 
        type: '2BR', 
        rate: 2500, 
        maxOccupancy: 6, 
        status: 'available', 
        description: 'Spacious 2-bedroom condo with city view',
        calendars: {
            airbnb: 'https://example.com/airbnb-cal-1.ics',
            bookingcom: 'https://example.com/bookingcom-cal-1.ics',
            direct: 'https://example.com/direct-cal-1.ics',
        }
    },
    { 
        id: 2, 
        name: '1586 C2', 
        type: '2BR', 
        rate: 2300, 
        maxOccupancy: 6, 
        status: 'available', 
        description: 'Modern 2-bedroom unit with balcony',
        calendars: {
            airbnb: 'https://example.com/airbnb-cal-2.ics',
            bookingcom: 'https://example.com/bookingcom-cal-2.ics',
            direct: 'https://example.com/direct-cal-2.ics',
        }
    },
    { 
        id: 3, 
        name: '1585 C2', 
        type: '2BR', 
        rate: 2400, 
        maxOccupancy: 6, 
        status: 'available', 
        description: 'Fully furnished 2-bedroom condo',
        calendars: {
            airbnb: 'https://example.com/airbnb-cal-3.ics',
            bookingcom: 'https://example.com/bookingcom-cal-3.ics',
            direct: 'https://example.com/direct-cal-3.ics',
        }
    }
];

export const bookings: Booking[] = [
    {
        id: 1,
        guestFirstName: 'Anna',
        guestLastName: 'Rodriguez',
        guestPhone: '+63 919 555 0123',
        guestEmail: 'anna.rodriguez@email.com',
        unitId: 1,
        checkinDate: '2024-12-20',
        checkoutDate: '2024-12-23',
        adults: 2,
        children: 1,
        nightlyRate: 2500,
        totalAmount: 7500,
        paymentStatus: 'paid',
        specialRequests: 'Late check-in requested',
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        guestFirstName: 'Michael',
        guestLastName: 'Chen',
        guestPhone: '+63 920 555 0456',
        guestEmail: 'michael.chen@email.com',
        unitId: 2,
        checkinDate: '2024-12-25',
        checkoutDate: '2024-12-28',
        adults: 4,
        children: 0,
        nightlyRate: 2300,
        totalAmount: 6900,
        paymentStatus: 'partial',
        specialRequests: 'Extra towels needed',
        createdAt: new Date().toISOString()
    }
];

export const reminders: Reminder[] = [
    {
        id: 1,
        title: 'Collect payment from Michael Chen',
        description: 'Remaining balance for booking #2',
        category: 'payment',
        priority: 'high',
        dueDate: '2024-12-20',
        dueTime: '14:00',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: 'Schedule AC maintenance',
        description: 'Quarterly maintenance check for all units',
        category: 'maintenance',
        priority: 'medium',
        dueDate: '2024-12-25',
        dueTime: '10:00',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: 'Monthly Rent Collection - Unit 1839 C2',
        description: 'Collect monthly rent payment for December',
        category: 'payment',
        priority: 'high',
        dueDate: '2024-12-31',
        dueTime: '23:59',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        title: 'Monthly Rent Collection - Unit 1586 C2',
        description: 'Collect monthly rent payment for December',
        category: 'payment',
        priority: 'high',
        dueDate: '2024-12-31',
        dueTime: '23:59',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: 'Monthly Rent Collection - Unit 1585 C2',
        description: 'Collect monthly rent payment for December',
        category: 'payment',
        priority: 'high',
        dueDate: '2024-12-31',
        dueTime: '23:59',
        status: 'pending',
        createdAt: new Date().toISOString()
    }
];

export const investors: Investor[] = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+63 917 555 0001',
        investmentAmount: 500000,
        sharePercentage: 40,
        joinDate: '2024-01-15',
        status: 'active'
    },
    {
        id: 2,
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '+63 918 555 0002',
        investmentAmount: 300000,
        sharePercentage: 25,
        joinDate: '2024-02-20',
        status: 'active'
    }
];

export const agents: Agent[] = [
    {
        id: 1,
        name: 'Carlos Rodriguez',
        email: 'carlos.rodriguez@email.com',
        phone: '+63 919 555 0003',
        commissionRate: 10,
        totalBookings: 15,
        totalCommissions: 22500,
        joinDate: '2024-03-01',
        status: 'active'
    },
    {
        id: 2,
        name: 'Lisa Wong',
        email: 'lisa.wong@email.com',
        phone: '+63 920 555 0004',
        commissionRate: 8,
        totalBookings: 8,
        totalCommissions: 12000,
        joinDate: '2024-04-15',
        status: 'active'
    }
];

export const expenses: Expense[] = [
    {
        id: 1,
        title: 'Electricity Bill - December',
        category: 'utilities',
        amount: 3500,
        date: '2024-12-15',
        unitId: 1,
        description: 'Monthly electricity bill for Unit 1839 C2',
        status: 'paid'
    },
    {
        id: 2,
        title: 'Cleaning Supplies',
        category: 'maintenance',
        amount: 1200,
        date: '2024-12-10',
        unitId: null,
        description: 'Cleaning supplies for all units',
        status: 'paid'
    }
];

export const profitPayments: ProfitPayment[] = [
    {
        id: 1,
        investorId: 1,
        month: '2024-11',
        amount: 13000,
        paymentDate: '2024-12-05',
        paymentMethod: 'bank_transfer',
        notes: 'November profit share payment',
        status: 'paid'
    },
    {
        id: 2,
        investorId: 2,
        month: '2024-11',
        amount: 8125,
        paymentDate: '2024-12-05',
        paymentMethod: 'gcash',
        notes: 'November profit share payment',
        status: 'paid'
    }
];
