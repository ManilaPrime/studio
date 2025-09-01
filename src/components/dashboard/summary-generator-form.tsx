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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  generateBookingSummary,
  type BookingSummaryOutput,
} from "@/ai/flows/booking-summary-and-pricing";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { rentalUnits } from "@/lib/data";
import { Textarea } from "@/components/ui/textarea";

const sampleSearchData = `{
  "${new Date().toISOString().split('T')[0]}": 150,
  "${new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}": 180,
  "${new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]}": 120
}`;


export function SummaryGeneratorForm() {
  const [frequency, setFrequency] = useState("weekly");
  const [unitId, setUnitId] = useState(rentalUnits[0].id);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [searchRateData, setSearchRateData] = useState(sampleSearchData);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BookingSummaryOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
        toast({ title: "Please select a start and end date.", variant: "destructive"});
        return;
    }

    let parsedSearchData;
    try {
        parsedSearchData = JSON.parse(searchRateData);
    } catch {
        toast({ title: "Invalid JSON in Search Rate Data.", variant: "destructive"});
        return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await generateBookingSummary({
        frequency: frequency as "daily" | "weekly" | "monthly",
        unitId,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        searchRateData: parsedSearchData,
      });
      setResult(response);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                <CardTitle className="font-headline">Generate Summary</CardTitle>
                <CardDescription>
                    Create a booking summary with dynamic pricing suggestions.
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="unit">Rental Unit</Label>
                    <Select value={unitId} onValueChange={setUnitId}>
                    <SelectTrigger id="unit">
                        <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {rentalUnits.map(unit => (
                            <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !startDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                     <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="search-rate-data">Search Rate Data (JSON)</Label>
                    <Textarea 
                        id="search-rate-data"
                        value={searchRateData}
                        onChange={(e) => setSearchRateData(e.target.value)}
                        rows={5}
                        className="font-code text-xs"
                    />
                </div>
                </CardContent>
                <CardFooter>
                <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Generate
                </Button>
                </CardFooter>
            </form>
        </Card>
        <div className="lg:col-span-2">
            <Card className="min-h-full">
                <CardHeader>
                    <CardTitle className="font-headline">Generated Summary</CardTitle>
                    <CardDescription>
                        This is the AI-generated booking summary based on your inputs.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    )}
                    {result && !loading && (
                        <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                            <pre className="whitespace-pre-wrap font-body text-sm p-4 bg-muted rounded-md">{result.summary}</pre>
                        </div>
                    )}
                    {!result && !loading && (
                         <div className="flex justify-center items-center h-64 border-2 border-dashed rounded-md">
                            <p className="text-muted-foreground">Your summary will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
