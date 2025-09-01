'use client';

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import type { Booking } from '@/lib/types';
import { bookings } from '@/lib/data';
import { rentalUnits } from '@/lib/data';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const platformColors: { [key: string]: string } = {
  'Airbnb': 'bg-red-500/80',
  'Booking.com': 'bg-blue-600/80',
  'Direct': 'bg-green-500/80',
};

export function MasterCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const upcomingBookings = bookings
    .filter(b => b.startDate >= new Date())
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 5);

  const getUnitName = (unitId: string) => {
    return rentalUnits.find(u => u.id === unitId)?.name || 'Unknown Unit';
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Master View</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
                booked: bookings.map(b => ({from: b.startDate, to: b.endDate})).flat()
            }}
            modifiersStyles={{
                booked: {
                  backgroundColor: 'hsl(var(--primary) / 0.2)',
                  color: 'hsl(var(--primary-foreground))'
                },
                selected: {
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))'
                }
            }}

          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingBookings.length > 0 ? upcomingBookings.map(booking => (
              <div key={booking.id} className="flex items-start gap-4">
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-muted rounded-md h-12 w-12">
                  <span className="text-sm font-bold">{format(booking.startDate, 'MMM')}</span>
                  <span className="text-lg font-bold">{format(booking.startDate, 'd')}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{getUnitName(booking.unitId)}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(booking.startDate, 'LLL dd')} - {format(booking.endDate, 'LLL dd, y')}
                  </p>
                </div>
                 <Badge variant="secondary" className={cn("text-white", platformColors[booking.platform])}>
                    {booking.platform}
                </Badge>
              </div>
            )) : (
              <p className="text-muted-foreground text-center">No upcoming bookings.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
