
'use client';

import type { Booking, Unit } from '@/lib/types';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function EditBookingDialog({
  open,
  onOpenChange,
  booking,
  onUpdateBooking,
  units,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
  onUpdateBooking: (booking: Booking) => void;
  units: Unit[];
}) {
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [unitId, setUnitId] = useState('');
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [nightlyRate, setNightlyRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<
    'pending' | 'partial' | 'paid'
  >('pending');
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    if (booking) {
      setGuestFirstName(booking.guestFirstName);
      setGuestLastName(booking.guestLastName);
      setGuestPhone(booking.guestPhone);
      setGuestEmail(booking.guestEmail);
      setUnitId(booking.unitId);
      setCheckinDate(booking.checkinDate);
      setCheckoutDate(booking.checkoutDate);
      setAdults(booking.adults);
      setChildren(booking.children);
      setNightlyRate(booking.nightlyRate);
      setTotalAmount(booking.totalAmount);
      setPaymentStatus(booking.paymentStatus);
      setSpecialRequests(booking.specialRequests);
    }
  }, [booking]);

  useEffect(() => {
    if (unitId && checkinDate && checkoutDate) {
      const unit = units.find((u) => u.id === unitId);
      if (unit) {
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const nights = Math.ceil(
          (checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (nights > 0) {
          setNightlyRate(unit.rate);
          setTotalAmount(unit.rate * nights);
        } else {
          setNightlyRate(0);
          setTotalAmount(0);
        }
      }
    }
  }, [unitId, checkinDate, checkoutDate, units]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!booking) return;

    const updatedBooking = {
      ...booking,
      guestFirstName,
      guestLastName,
      guestPhone,
      guestEmail,
      unitId,
      checkinDate,
      checkoutDate,
      adults,
      children,
      nightlyRate,
      totalAmount,
      paymentStatus,
      specialRequests,
    };
    onUpdateBooking(updatedBooking);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>
        <form
          id="editBookingForm"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guestFirstName">First Name</Label>
              <Input
                id="guestFirstName"
                value={guestFirstName}
                onChange={(e) => setGuestFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="guestLastName">Last Name</Label>
              <Input
                id="guestLastName"
                value={guestLastName}
                onChange={(e) => setGuestLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="guestPhone">Phone</Label>
            <Input
              id="guestPhone"
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="guestEmail">Email</Label>
            <Input
              id="guestEmail"
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="bookingUnit">Unit</Label>
            <Select required value={unitId} onValueChange={setUnitId}>
              <SelectTrigger id="bookingUnit">
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id!}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkinDate">Check-in</Label>
              <Input
                id="checkinDate"
                type="date"
                value={checkinDate}
                onChange={(e) => setCheckinDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="checkoutDate">Check-out</Label>
              <Input
                id="checkoutDate"
                type="date"
                value={checkoutDate}
                onChange={(e) => setCheckoutDate(e.target.value)}
                required
                min={checkinDate}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adults">Adults</Label>
              <Input
                id="adults"
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="children">Children</Label>
              <Input
                id="children"
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nightlyRate">Nightly Rate</Label>
              <Input
                id="nightlyRate"
                value={`₱${nightlyRate.toLocaleString()}`}
                readOnly
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input
                id="totalAmount"
                value={`₱${totalAmount.toLocaleString()}`}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select
              value={paymentStatus}
              onValueChange={(v) =>
                setPaymentStatus(v as 'pending' | 'partial' | 'paid')
              }
            >
              <SelectTrigger id="paymentStatus">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="specialRequests">Special Requests</Label>
            <Textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests or notes..."
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
