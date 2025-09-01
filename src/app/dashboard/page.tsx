import { MasterCalendar } from "@/components/dashboard/master-calendar";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a unified view of your bookings.
        </p>
      </div>
      <MasterCalendar />
    </div>
  );
}
