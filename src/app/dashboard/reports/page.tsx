'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookings, expenses } from "@/lib/data";

export default function ReportsPage() {

    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalAmount, 0);
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Reports</h2>
        <p className="text-sm text-gray-500">Financial performance overview</p>
      </div>

      <Card className="prime-card p-4 mb-4">
        <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
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
                    <p className="text-2xl font-bold text-prime-gold">₱{netProfit.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Net Profit</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{profitMargin.toFixed(0)}%</p>
                    <p className="text-sm text-gray-600">Profit Margin</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
