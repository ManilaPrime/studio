import { SummaryGeneratorForm } from "@/components/dashboard/summary-generator-form";

export default function SummariesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Booking Summaries</h1>
        <p className="text-muted-foreground">
          Generate daily, weekly, or monthly summaries with dynamic pricing recommendations.
        </p>
      </div>
      <SummaryGeneratorForm />
    </div>
  );
}
