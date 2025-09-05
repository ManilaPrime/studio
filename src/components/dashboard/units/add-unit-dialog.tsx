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
import { units } from '@/lib/data';

export function AddUnitDialog({
  children,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUnit = {
      id: Math.max(...units.map((u) => u.id), 0) + 1,
      name: formData.get('unitName') as string,
      type: formData.get('unitType') as string,
      rate: parseInt(formData.get('unitRate') as string),
      maxOccupancy: parseInt(formData.get('maxOccupancy') as string),
      description: formData.get('unitDescription') as string,
      status: 'available' as const,
    };
    units.push(newUnit);
    // In a real app, you'd probably call an API and then refetch the data.
    // For now, we'll just close the dialog. A page refresh would show the new unit.
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Unit</DialogTitle>
        </DialogHeader>
        <form id="unitForm" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="unitName" className="mb-1">
              Unit Name
            </Label>
            <Input name="unitName" id="unitName" className="prime-input" required />
          </div>

          <div>
            <Label htmlFor="unitType" className="mb-1">
              Unit Type
            </Label>
            <Select name="unitType" required>
              <SelectTrigger className="prime-input">
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
            <Label htmlFor="unitRate" className="mb-1">
              Nightly Rate (₱)
            </Label>
            <Input
              name="unitRate"
              id="unitRate"
              type="number"
              min="0"
              step="100"
              className="prime-input"
              required
            />
          </div>

          <div>
            <Label htmlFor="maxOccupancy" className="mb-1">
              Maximum Occupancy
            </Label>
            <Input
              name="maxOccupancy"
              id="maxOccupancy"
              type="number"
              min="1"
              defaultValue="4"
              className="prime-input"
              required
            />
          </div>

          <div>
            <Label htmlFor="unitDescription" className="mb-1">
              Description
            </Label>
            <Textarea
              name="unitDescription"
              id="unitDescription"
              rows={3}
              className="prime-input"
              placeholder="Unit features and amenities..."
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
              Add Unit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
