import { UnitCard } from "@/components/dashboard/unit-card";
import { rentalUnits } from "@/lib/data";

export default function UnitsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Manage Your Units</h1>
        <p className="text-muted-foreground">
          View and edit calendar sync settings for each of your properties.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {rentalUnits.map(unit => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
}
