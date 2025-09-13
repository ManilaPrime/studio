
'use client';

import type { Booking, Unit } from '@/lib/types';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export function AddBookingDialog({
  children,
  open,
  onOpenChange,
  onAddBooking,
  units,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  units: Unit[];
}) {
  const [nightlyRate, setNightlyRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedUnitId, setSelectedUnitId] = useState<string | undefined>(
    undefined
  );
  const [checkinDate, setCheckinDate] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');

  useEffect(() => {
    if (selectedUnitId && checkinDate && checkoutDate) {
      const unit = units.find((u) => u.id === selectedUnitId);
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
    } else {
      setNightlyRate(0);
      setTotalAmount(0);
    }
  }, [selectedUnitId, checkinDate, checkoutDate, units]);

  useEffect(() => {
    if (open) {
      // Reset form state when dialog opens
      setNightlyRate(0);
      setTotalAmount(0);
      setSelectedUnitId(undefined);
      const today = new Date().toISOString().split('T')[0];
      setCheckinDate(today);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      setCheckoutDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [open]);

  useEffect(() => {
    if (checkinDate) {
      const checkoutInput = document.getElementById(
        'checkoutDate'
      ) as HTMLInputElement;
      if (checkoutInput) checkoutInput.min = checkinDate;
    }
  }, [checkinDate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBooking = {
      guestFirstName: formData.get('guestFirstName') as string,
      guestLastName: formData.get('guestLastName') as string,
      guestPhone: formData.get('guestPhone') as string,
      guestEmail: formData.get('guestEmail') as string,
      unitId: formData.get('bookingUnit') as string,
      checkinDate: formData.get('checkinDate') as string,
      checkoutDate: formData.get('checkoutDate') as string,
      adults: parseInt(formData.get('adults') as string),
      children: parseInt(formData.get('children') as string),
      nightlyRate: nightlyRate,
      totalAmount: totalAmount,
      paymentStatus: formData.get('paymentStatus') as
        | 'pending'
        | 'partial'
        | 'paid',
      specialRequests: formData.get('specialRequests') as string,
    };
    onAddBooking(newBooking);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
        </DialogHeader>
        <form id="bookingForm" className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guestFirstName">First Name</Label>
              <Input name="guestFirstName" id="guestFirstName" required />
            </div>
            <div>
              <Label htmlFor="guestLastName">Last Name</Label>
              <Input name="guestLastName" id="guestLastName" required />
            </div>
          </div>
          <div>
            <Label htmlFor="guestPhone">Phone Number</Label>
            <Input name="guestPhone" type="tel" id="guestPhone" required />
          </div>
          <div>
            <Label htmlFor="guestEmail">Email</Label>
            <Input name="guestEmail" type="email" id="guestEmail" />
          </div>
          <div>
            <Label htmlFor="bookingUnit">Unit</Label>
            <Select
              name="bookingUnit"
              required
              value={selectedUnitId}
              onValueChange={setSelectedUnitId}
            >
              <SelectTrigger id="bookingUnit">
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id!}>
                    {unit.name} - ₱{unit.rate}/night
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkinDate">Check-in</Label>
              <Input
                name="checkinDate"
                type="date"
                id="checkinDate"
                required
                value={checkinDate}
                onChange={(e) => setCheckinDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="checkoutDate">Check-out</Label>
              <Input
                name="checkoutDate"
                type="date"
                id="checkoutDate"
                required
                value={checkoutDate}
                onChange={(e) => setCheckoutDate(e.target.value)}
                min={checkinDate}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adults">Adults</Label>
              <Input
                name="adults"
                type="number"
                id="adults"
                min="1"
                defaultValue="2"
                required
              />
            </div>
            <div>
              <Label htmlFor="children">Children</Label>
              <Input
                name="children"
                type="number"
                id="children"
                min="0"
                defaultValue="0"
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
            <Select name="paymentStatus" defaultValue="pending">
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
              name="specialRequests"
              id="specialRequests"
              placeholder="Any special requests or notes..."
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
