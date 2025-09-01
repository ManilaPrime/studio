import Image from "next/image";
import type { RentalUnit } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface UnitCardProps {
  unit: RentalUnit;
}

const AirbnbIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><title>Airbnb</title><path d="M12 3.25a4.3 4.3 0 0 1 4.2 3.5h.1c3.04 0 5.45 2.5 5.45 5.55 0 2.9-2.2 5.3-5.05 5.5v.1h-1.1v-1.1h-1.1v-1.1h-1.1v-1.1h-1.1v-1.1H12v-1.1H9.9v1.1H8.8v1.1H7.7v1.1H6.6v1.1H5.5v1.1H4.4v-1.1c-2.85-.2-5.05-2.6-5.05-5.5C-.75 9.25 1.66 6.75 4.7 6.75h.1A4.3 4.3 0 0 1 9.05 4.4a4.31 4.31 0 0 1 2.95-1.15zM12 4.35A3.2 3.2 0 0 0 9.05 5.5a3.2 3.2 0 0 0-3.1 3.1H5.8c-2.36 0-4.25 2-4.25 4.45 0 2.45 1.9 4.45 4.25 4.45h.1v-1.1h1.1v-1.1h1.1v-1.1h1.1v-1.1h1.1v-1.1h1.1v1.1h1.1v1.1h1.1v1.1h1.1v1.1h.1c2.35 0 4.25-2 4.25-4.45 0-2.45-1.9-4.45-4.25-4.45h-1.1a3.2 3.2 0 0 0-3.1-3.1 3.2 3.2 0 0 0-2.85-1.15z"></path></svg>
);
const BookingcomIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current"><title>Booking.com</title><path d="M18.15 4.394C10.02 4.38 5.096 9.873 5.096 12c0 2.127 4.924 7.62 13.054 7.606 5.862-.009 8.24-4.85 8.24-7.606 0-2.756-2.379-7.606-8.24-7.606zm-1.11 11.892h-1.2v-1.27h1.2c.49 0 .82-.28.82-.777 0-.49-.33-.77-.82-.77h-1.2v-1.28h1.2c.49 0 .82-.27.82-.77 0-.5-.33-.78-.82-.78h-1.2v-1.28h1.2c.49 0 .82-.27.82-.77s-.33-.77-.82-.77h-1.9v8.25h1.9c.49 0 .82-.27.82-.77 0-.497-.33-.762-.82-.762zm-3.32-3.83h-1.13v2.55h1.13c1.37 0 2.22-1.02 2.22-2.55 0-.9-.37-2.55-2.22-2.55zm-1.98-.78h1.98c1.31 0 3.07.64 3.07 3.33s-1.76 3.32-3.07 3.32h-1.98zm-4.14 4.61h-1.2v-1.28h1.2c.49 0 .82-.27.82-.77s-.33-.77-.82-.77h-1.2v-1.28h1.2c.49 0 .82-.27.82-.77s-.33-.78-.82-.78h-1.2v-1.28h1.2c.49 0 .82-.27.82-.77 0-.5-.33-.77-.82-.77h-1.9v8.25h1.9c.49 0 .82-.27.82-.77s-.33-.77-.82-.77zM2.843 12c0-5.83 4.24-7.606 7.42-7.606h.74v15.21h-.74c-3.18 0-7.42-1.77-7.42-7.606z"></path></svg>
);

export function UnitCard({ unit }: UnitCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={unit.imageUrl} alt={unit.name} layout="fill" objectFit="cover" data-ai-hint={unit.imageHint}/>
      </div>
      <CardHeader>
        <CardTitle className="font-headline">{unit.name}</CardTitle>
        <CardDescription>{unit.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`airbnb-${unit.id}`} className="flex items-center gap-2 mb-2">
            <AirbnbIcon />
            Airbnb Calendar URL
          </Label>
          <div className="flex items-center gap-2">
            <Input id={`airbnb-${unit.id}`} defaultValue={unit.calendars.airbnb} readOnly />
            <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
          </div>
        </div>
         <div>
          <Label htmlFor={`bookingcom-${unit.id}`} className="flex items-center gap-2 mb-2">
            <BookingcomIcon />
            Booking.com Calendar URL
          </Label>
          <div className="flex items-center gap-2">
            <Input id={`bookingcom-${unit.id}`} defaultValue={unit.calendars.bookingcom} readOnly />
            <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
          </div>
        </div>
        <div>
          <Label htmlFor={`direct-${unit.id}`} className="mb-2">Direct Calendar URL</Label>
          <div className="flex items-center gap-2">
            <Input id={`direct-${unit.id}`} defaultValue={unit.calendars.direct} readOnly />
            <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
