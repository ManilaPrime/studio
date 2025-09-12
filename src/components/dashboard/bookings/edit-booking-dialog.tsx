
'use client';

import type { Booking, Unit } from '@/lib/types';
import { useState, useEffect } from 'react';

export function EditBookingDialog({
  open,
  onOpenChange,
  booking,
  onUpdateBooking,
  units
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
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'partial' | 'paid'>('pending');
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

  if (!open) {
    return null;
  }

  return (
      <div id="editBookingModal" className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto z-50 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Edit Booking</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="editBookingForm" className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="guestFirstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input name="guestFirstName" type="text" id="guestFirstName" className="prime-input" required value={guestFirstName} onChange={e => setGuestFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="guestLastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input name="guestLastName" type="text" id="guestLastName" className="prime-input" required value={guestLastName} onChange={e => setGuestLastName(e.target.value)} />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="guestPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input name="guestPhone" type="tel" id="guestPhone" className="prime-input" required value={guestPhone} onChange={e => setGuestPhone(e.target.value)} />
                </div>
                
                <div>
                    <label htmlFor="guestEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="guestEmail" type="email" id="guestEmail" className="prime-input" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} />
                </div>
                
                <div>
                    <label htmlFor="bookingUnit" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select name="bookingUnit" id="bookingUnit" className="prime-input" required value={unitId} onChange={(e) => setUnitId(e.target.value)}>
                        <option value="">Select Unit</option>
                         {units.map(unit => (
                            <option key={unit.id} value={unit.id}>{unit.name} - ₱{unit.rate}/night</option>
                        ))}
                    </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="checkinDate" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>                        <input name="checkinDate" type="date" id="checkinDate" className="prime-input" required value={checkinDate} onChange={(e) => setCheckinDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="checkoutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                        <input name="checkoutDate" type="date" id="checkoutDate" className="prime-input" required value={checkoutDate} onChange={(e) => setCheckoutDate(e.target.value)} />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                        <input name="adults" type="number" id="adults" min="1" className="prime-input" required value={adults} onChange={e => setAdults(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                        <input name="children" type="number" id="children" min="0" className="prime-input" value={children} onChange={e => setChildren(parseInt(e.target.value))} />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="nightlyRate" className="block text-sm font-medium text-gray-700 mb-1">Nightly Rate</label>
                        <input name="nightlyRate" type="text" id="nightlyRate" className="prime-input bg-gray-100" value={`₱${nightlyRate.toLocaleString()}`} readOnly />
                    </div>
                    <div>
                        <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                        <input name="totalAmount" type="text" id="totalAmount" className="prime-input bg-gray-100" value={`₱${totalAmount.toLocaleString()}`} readOnly />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <select name="paymentStatus" id="paymentStatus" className="prime-input" value={paymentStatus} onChange={e => setPaymentStatus(e.target.value as 'pending' | 'partial' | 'paid')}>
                        <option value="pending">Pending</option>
                        <option value="partial">Partial</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                    <textarea name="specialRequests" id="specialRequests" rows={3} className="prime-input" placeholder="Any special requests or notes..." value={specialRequests} onChange={e => setSpecialRequests(e.target.value)}></textarea>
                </div>
                
                <div className="flex space-x-3 pt-2">
                    <button type="button" onClick={() => onOpenChange(false)} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="w-full prime-button py-3">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}
