'use client';

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

  useEffect(() => {
    if (open) {
      const unitSelect = document.getElementById('bookingUnit') as HTMLSelectElement;
      if (unitSelect) {
        unitSelect.innerHTML = '<option value="">Select Unit</option>' + 
            units.map(unit => `<option value="${unit.id}">${unit.name} - ₱${unit.rate}/night</option>`).join('');
      }
      const today = new Date().toISOString().split('T')[0];
      const checkinInput = document.getElementById('checkinDate') as HTMLInputElement;
      const checkoutInput = document.getElementById('checkoutDate') as HTMLInputElement;
      if(checkinInput) checkinInput.min = today;
      if(checkoutInput) checkoutInput.min = today;
    }
  }, [open]);

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
    onOpenChange(false);
  };

  if (!open) {
    return children || null;
  }

  return (
    <>
      {children}
      <div id="addBookingModal" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Add New Booking</h3>
                <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700">
                    <span className="text-2xl">×</span>
                </button>
            </div>
            
            <form id="bookingForm" className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="guestFirstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input name="guestFirstName" type="text" id="guestFirstName" className="prime-input" required />
                    </div>
                    <div>
                        <label htmlFor="guestLastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input name="guestLastName" type="text" id="guestLastName" className="prime-input" required />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="guestPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input name="guestPhone" type="tel" id="guestPhone" className="prime-input" required />
                </div>
                
                <div>
                    <label htmlFor="guestEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input name="guestEmail" type="email" id="guestEmail" className="prime-input" />
                </div>
                
                <div>
                    <label htmlFor="bookingUnit" className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select name="bookingUnit" id="bookingUnit" className="prime-input" required onChange={(e) => setSelectedUnitId(e.target.value)}>
                        <option value="">Select Unit</option>
                    </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="checkinDate" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                        <input name="checkinDate" type="date" id="checkinDate" className="prime-input" required onChange={(e) => setCheckinDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="checkoutDate" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                        <input name="checkoutDate" type="date" id="checkoutDate" className="prime-input" required onChange={(e) => setCheckoutDate(e.target.value)} />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                        <input name="adults" type="number" id="adults" min="1" defaultValue="2" className="prime-input" required />
                    </div>
                    <div>
                        <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">Children</label>
                        <input name="children" type="number" id="children" min="0" defaultValue="0" className="prime-input" />
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="nightlyRate" className="block text-sm font-medium text-gray-700 mb-1">Nightly Rate</label>
                        <input name="nightlyRate" type="number" id="nightlyRate" className="prime-input" value={nightlyRate} readOnly />
                    </div>
                    <div>
                        <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                        <input name="totalAmount" type="number" id="totalAmount" className="prime-input" value={totalAmount} readOnly />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <select name="paymentStatus" id="paymentStatus" className="prime-input" defaultValue="pending">
                        <option value="pending">Pending</option>
                        <option value="partial">Partial</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                    <textarea name="specialRequests" id="specialRequests" rows={3} className="prime-input" placeholder="Any special requests or notes..."></textarea>
                </div>
                
                <div className="flex space-x-3">
                    <button type="button" onClick={() => onOpenChange(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold">
                        Cancel
                    </button>
                    <button type="submit" className="flex-1 prime-button py-3 rounded-lg font-semibold">
                        Add Booking
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
  );
}
