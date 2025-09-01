import { ConflictDetectorForm } from "@/components/dashboard/conflict-detector-form";

export default function ConflictDetectorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Smart Conflict Detection</h1>
        <p className="text-muted-foreground">
          Let AI help you find and resolve booking conflicts before they become a problem.
        </p>
      </div>
      <ConflictDetectorForm />
    </div>
  );
}
