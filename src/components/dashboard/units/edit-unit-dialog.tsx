
'use client';

import type { Unit } from '@/lib/types';
import { useEffect, useState } from 'react';
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

export function EditUnitDialog({
  open,
  onOpenChange,
  unit,
  onUpdateUnit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unit: Unit | null;
  onUpdateUnit: (unit: Unit) => void;
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [rate, setRate] = useState(0);
  const [baseOccupancy, setBaseOccupancy] = useState(0);
  const [maxOccupancy, setMaxOccupancy] = useState(0);
  const [extraGuestFee, setExtraGuestFee] = useState(0);
  const [description, setDescription] = useState('');
  const [airbnbUrl, setAirbnbUrl] = useState('');
  const [bookingcomUrl, setBookingcomUrl] = useState('');
  const [directUrl, setDirectUrl] = useState('');

  useEffect(() => {
    if (unit) {
      setName(unit.name);
      setType(unit.type);
      setRate(unit.rate);
      setBaseOccupancy(unit.baseOccupancy || 2);
      setMaxOccupancy(unit.maxOccupancy);
      setExtraGuestFee(unit.extraGuestFee || 500);
      setDescription(unit.description);
      setAirbnbUrl(unit.calendars.airbnb);
      setBookingcomUrl(unit.calendars.bookingcom);
      setDirectUrl(unit.calendars.direct);
    }
  }, [unit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!unit) return;

    const updatedUnit: Unit = {
      ...unit,
      name,
      type,
      rate,
      baseOccupancy,
      maxOccupancy,
      extraGuestFee,
      description,
      calendars: {
        airbnb: airbnbUrl,
        bookingcom: bookingcomUrl,
        direct: directUrl,
      },
    };
    onUpdateUnit(updatedUnit);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {unit?.name}</DialogTitle>
        </DialogHeader>
        <form
          id="editUnitForm"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Label htmlFor="unitName">Unit Name</Label>
            <Input id="unitName" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="unitType">Unit Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="1BR">1 Bedroom</SelectItem>
                <SelectItem value="2BR">2 Bedroom</SelectItem>
                <SelectItem value="3BR">3 Bedroom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="unitRate">Nightly Rate (₱)</Label>
              <Input id="unitRate" type="number" min="0" step="100" value={rate} onChange={(e) => setRate(parseInt(e.target.value))} required />
            </div>
            <div>
              <Label htmlFor="extraGuestFee">Extra Guest Fee (₱)</Label>
              <Input id="extraGuestFee" type="number" min="0" step="50" value={extraGuestFee} onChange={(e) => setExtraGuestFee(parseInt(e.target.value))} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <Label htmlFor="baseOccupancy">Base Occupancy</Label>
              <Input id="baseOccupancy" type="number" min="1" value={baseOccupancy} onChange={(e) => setBaseOccupancy(parseInt(e.target.value))} required />
            </div>
            <div>
              <Label htmlFor="maxOccupancy">Max Occupancy</Label>
              <Input id="maxOccupancy" type="number" min="1" value={maxOccupancy} onChange={(e) => setMaxOccupancy(parseInt(e.target.value))} required />
            </div>
          </div>
          <div>
            <Label htmlFor="unitDescription">Description</Label>
            <Textarea id="unitDescription" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Unit features and amenities..." />
          </div>
          <div className="border-t pt-4 mt-2">
            <h4 className="font-semibold text-foreground mb-1">
              Calendar iCal Links
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Edit iCal links from other platforms to import their bookings.
            </p>
            <div>
              <Label htmlFor="airbnbUrl">Airbnb URL</Label>
              <Input id="airbnbUrl" type="url" value={airbnbUrl} onChange={(e) => setAirbnbUrl(e.target.value)} placeholder="https://www.airbnb.com/calendar/ical/..."/>
            </div>
            <div className="mt-2">
              <Label htmlFor="bookingcomUrl">Booking.com URL</Label>
              <Input id="bookingcomUrl" type="url" value={bookingcomUrl} onChange={(e) => setBookingcomUrl(e.target.value)} placeholder="https://admin.booking.com/hotel/ical..."/>
            </div>
            <div className="mt-2">
              <Label htmlFor="directUrl">Direct URL</Label>
              <Input id="directUrl" type="url" value={directUrl} onChange={(e) => setDirectUrl(e.target.value)} placeholder="https://example.com/ical/..."/>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
