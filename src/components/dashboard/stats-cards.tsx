'use client';

import { units, bookings } from '@/lib/data';

const StatsCards = () => {
    const activeBookingsCount = bookings.filter(booking => {
        const checkin = new Date(booking.checkinDate);
        const checkout = new Date(booking.checkoutDate);
        const today = new Date();
        return checkin <= today && checkout >= today;
    }).length;

    const monthlyRevenue = bookings.reduce((total, booking) => total + booking.totalAmount, 0);
    const totalUnits = units.length;
    const netProfit = monthlyRevenue - 12500; // Sample expenses

    const stats = [
        { label: "Active Bookings", value: activeBookingsCount, icon: "📅", color: "green" },
        { label: "Monthly Revenue", value: `₱${monthlyRevenue.toLocaleString()}`, icon: "💰", color: "green" },
        { label: "Total Units", value: totalUnits, icon: "🏠", color: "yellow" },
        { label: "Net Profit", value: `₱${netProfit.toLocaleString()}`, icon: "📈", color: "yellow" },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 mb-4">
            {stats.map(stat => (
                <div key={stat.label} className="fb-card">
                    <div className="fb-content">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                <p className={`text-xl font-bold ${stat.label.includes('Revenue') || stat.label.includes('Profit') ? 'text-green-600' : 'text-gray-900'}`}>
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                                <span className={`text-xl`}>{stat.icon}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;
