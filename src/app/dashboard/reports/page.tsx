'use client';

import { useEffect, useState } from "react";
import type { Booking, Expense } from "@/lib/types";
import { getBookings } from "@/services/bookings";
import { getExpenses } from "@/services/expenses";


export default function ReportsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const bookingsData = await getBookings();
            const expensesData = await getExpenses();
            setBookings(bookingsData);
            setExpenses(expensesData);
            setLoading(false);
        }
        fetchData();
    }, []);

    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalAmount, 0);
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    if (loading) {
      return <div className="p-4 text-center">Loading reports...</div>
    }

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Reports</h2>
        <p className="text-sm text-gray-500">Financial performance overview</p>
      </div>

      <div className="prime-card p-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Overview</h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
                <p className="text-2xl font-bold text-green-600">₱{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-bold text-red-600">₱{totalExpenses.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Expenses</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">₱{netProfit.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Net Profit</p>
            </div>
            <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{profitMargin.toFixed(0)}%</p>
                <p className="text-sm text-gray-600">Profit Margin</p>
            </div>
        </div>
      </div>
    </div>
  );
}
