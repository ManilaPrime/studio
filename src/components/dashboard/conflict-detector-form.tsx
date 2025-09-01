"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  detectBookingConflict,
  type DetectBookingConflictOutput,
} from "@/ai/flows/smart-conflict-detection";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { rentalUnits } from "@/lib/data";

const sampleICal1 = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Sample Corp//NONSGML Event Calendar//EN
BEGIN:VEVENT
UID:uid1@example.com
DTSTAMP:20240101T120000Z
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com
DTSTART:20240815T140000Z
DTEND:20240818T110000Z
SUMMARY:Reservation for The Cozy Cabin
END:VEVENT
END:VCALENDAR`;

const sampleICal2 = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Other Platform//NONSGML Event Calendar//EN
BEGIN:VEVENT
UID:uid2@example.com
DTSTAMP:20240102T150000Z
ORGANIZER;CN=Jane Smith:MAILTO:jane.smith@example.com
DTSTART:20240817T160000Z
DTEND:20240820T100000Z
SUMMARY:Booking for Unit 1
END:VEVENT
END:VCALENDAR`;

export function ConflictDetectorForm() {
  const [calendar1, setCalendar1] = useState(sampleICal1);
  const [calendar2, setCalendar2] = useState(sampleICal2);
  const [unitName, setUnitName] = useState(rentalUnits[0].name);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectBookingConflictOutput | null>(
    null
  );
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await detectBookingConflict({
        calendar1Events: calendar1,
        calendar2Events: calendar2,
        unitName: unitName,
      });
      setResult(response);
    } catch (error) {
      console.error("Error detecting conflict:", error);
      toast({
        title: "Error",
        description: "Failed to detect booking conflict. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline">Check for Conflicts</CardTitle>
          <CardDescription>
            Paste iCal data from two different calendars to check for
            overlapping bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calendar1">Calendar 1 (iCal data)</Label>
              <Textarea
                id="calendar1"
                value={calendar1}
                onChange={(e) => setCalendar1(e.target.value)}
                rows={10}
                className="font-code text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendar2">Calendar 2 (iCal data)</Label>
              <Textarea
                id="calendar2"
                value={calendar2}
                onChange={(e) => setCalendar2(e.target.value)}
                rows={10}
                className="font-code text-xs"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="unitName">Rental Unit Name</Label>
            <Input
              id="unitName"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
          </div>
          {result && (
            <Alert variant={result.hasConflict ? "destructive" : "default"} className={!result.hasConflict ? "bg-green-500/10 border-green-500/50" : ""}>
                {result.hasConflict ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4 text-green-600" />}
              <AlertTitle className={!result.hasConflict ? "text-green-700" : ""}>
                {result.hasConflict
                  ? "Conflict Detected"
                  : "No Conflict Found"}
              </AlertTitle>
              <AlertDescription>
                {result.conflictDescription}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/90">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Detect Conflict
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
