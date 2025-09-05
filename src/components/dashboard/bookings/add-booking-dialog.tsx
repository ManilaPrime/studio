'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { units, bookings } from '@/lib/data';
import { useState, useEffect } from 'react';

export function AddBookingDialog({
  children,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
      const unit = units.find((u) => u.id === parseInt(selectedUnitId));
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
  }, [selectedUnitId, checkinDate, checkoutDate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBooking = {
      id: Math.max(...bookings.map((b) => b.id), 0) + 1,
      guestFirstName: formData.get('guestFirstName') as string,
      guestLastName: formData.get('guestLastName') as string,
      guestPhone: formData.get('guestPhone') as string,
      guestEmail: formData.get('guestEmail') as string,
      unitId: parseInt(formData.get('bookingUnit') as string),
      checkinDate: formData.get('checkinDate') as string,
      checkoutDate: formData.get('checkoutDate') as string,
      adults: parseInt(formData.get('adults') as string),
      children: parseInt(formData.get('children') as string),
      nightlyRate: parseFloat(formData.get('nightlyRate') as string),
      totalAmount: parseFloat(formData.get('totalAmount') as string),
      paymentStatus: formData.get('paymentStatus') as 'pending' | 'partial' | 'paid',
      specialRequests: formData.get('specialRequests') as string,
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    // In a real app, you'd probably call an API and then refetch the data.
    // For now, we'll just close the dialog. A page refresh would show the new booking.
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
        </DialogHeader>
        <form id="bookingForm" className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guestFirstName" className="mb-1">
                First Name
              </Label>
              <Input
                name="guestFirstName"
                id="guestFirstName"
                className="prime-input"
                required
              />
            </div>
            <div>
              <Label htmlFor="guestLastName" className="mb-1">
                Last Name
              </Label>
              <Input
                name="guestLastName"
                id="guestLastName"
                className="prime-input"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="guestPhone" className="mb-1">
              Phone Number
            </Label>
            <Input name="guestPhone" id="guestPhone" className="prime-input" required />
          </div>

          <div>
            <Label htmlFor="guestEmail" className="mb-1">
              Email
            </Label>
            <Input name="guestEmail" id="guestEmail" type="email" className="prime-input" />
          </div>

          <div>
            <Label htmlFor="bookingUnit" className="mb-1">
              Unit
            </Label>
            <Select
              name="bookingUnit"
              required
              onValueChange={setSelectedUnitId}
            >
              <SelectTrigger className="prime-input">
                <SelectValue placeholder="Select Unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit.id} value={String(unit.id)}>
                    {unit.name} - ₱{unit.rate}/night
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkinDate" className="mb-1">
                Check-in Date
              </Label>
              <Input
                name="checkinDate"
                id="checkinDate"
                type="date"
                className="prime-input"
                required
                onChange={(e) => setCheckinDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="checkoutDate" className="mb-1">
                Check-out Date
              </Label>
              <Input
                name="checkoutDate"
                id="checkoutDate"
                type="date"
                className="prime-input"
                required
                onChange={(e) => setCheckoutDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adults" className="mb-1">
                Adults
              </Label>
              <Input
                name="adults"
                id="adults"
                type="number"
                min="1"
                defaultValue="2"
                className="prime-input"
                required
              />
            </div>
            <div>
              <Label htmlFor="children" className="mb-1">
                Children
              </Label>
              <Input
                name="children"
                id="children"
                type="number"
                min="0"
                defaultValue="0"
                className="prime-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nightlyRate" className="mb-1">
                Nightly Rate
              </Label>
              <Input
                name="nightlyRate"
                id="nightlyRate"
                type="number"
                className="prime-input"
                value={nightlyRate}
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="totalAmount" className="mb-1">
                Total Amount
              </Label>
              <Input
                name="totalAmount"
                id="totalAmount"
                type="number"
                className="prime-input"
                value={totalAmount}
                readOnly
              />
            </div>
          </div>

          <div>
            <Label htmlFor="paymentStatus" className="mb-1">
              Payment Status
            </Label>
            <Select name="paymentStatus" defaultValue="pending">
              <SelectTrigger className="prime-input">
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
            <Label htmlFor="specialRequests" className="mb-1">
              Special Requests
            </Label>
            <Textarea
              name="specialRequests"
              id="specialRequests"
              rows={3}
              className="prime-input"
              placeholder="Any special requests or notes..."
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="prime-button">
              Add Booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
