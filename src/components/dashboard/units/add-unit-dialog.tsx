
'use client';

import type { Unit } from '@/lib/types';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
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

export function AddUnitDialog({
  children,
  open,
  onOpenChange,
  onAddUnit,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUnit: (unit: Omit<Unit, 'id' | 'status'>) => void;
}) {
    const [unitType, setUnitType] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUnit = {
      name: formData.get('unitName') as string,
      type: unitType,
      rate: parseInt(formData.get('unitRate') as string),
      maxOccupancy: parseInt(formData.get('maxOccupancy') as string),
      description: formData.get('unitDescription') as string,
      calendars: {
        airbnb: formData.get('airbnbUrl') as string,
        bookingcom: formData.get('bookingcomUrl') as string,
        direct: formData.get('directUrl') as string,
      },
    };
    onAddUnit(newUnit);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Unit</DialogTitle>
        </DialogHeader>
        <form
          id="unitForm"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div>
            <Label htmlFor="unitName">Unit Name</Label>
            <Input id="unitName" name="unitName" required />
          </div>
          <div>
            <Label htmlFor="unitType">Unit Type</Label>
            <Select name="unitType" required onValueChange={setUnitType}>
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
          <div>
            <Label htmlFor="unitRate">Nightly Rate (₱)</Label>
            <Input
              id="unitRate"
              name="unitRate"
              type="number"
              min="0"
              step="100"
              required
            />
          </div>
          <div>
            <Label htmlFor="maxOccupancy">Maximum Occupancy</Label>
            <Input
              id="maxOccupancy"
              name="maxOccupancy"
              type="number"
              min="1"
              defaultValue="4"
              required
            />
          </div>
          <div>
            <Label htmlFor="unitDescription">Description</Label>
            <Textarea
              id="unitDescription"
              name="unitDescription"
              placeholder="Unit features and amenities..."
            />
          </div>
          <div className="border-t pt-4 mt-2">
            <h4 className="font-semibold text-foreground mb-1">Calendar iCal Links</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Add iCal links from other platforms to import their bookings.
            </p>
            <div>
              <Label htmlFor="airbnbUrl">Airbnb URL</Label>
              <Input
                id="airbnbUrl"
                name="airbnbUrl"
                type="url"
                placeholder="https://www.airbnb.com/calendar/ical/..."
              />
            </div>
            <div className='mt-2'>
              <Label htmlFor="bookingcomUrl">Booking.com URL</Label>
              <Input
                id="bookingcomUrl"
                name="bookingcomUrl"
                type="url"
                placeholder="https://admin.booking.com/hotel/ical..."
              />
            </div>
            <div className='mt-2'>
              <Label htmlFor="directUrl">Direct URL</Label>
              <Input
                id="directUrl"
                name="directUrl"
                type="url"
                placeholder="https://example.com/ical/..."
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Add Unit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
