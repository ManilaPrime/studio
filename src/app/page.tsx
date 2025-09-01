import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tent } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex items-center gap-3">
          <Tent className="h-12 w-12 text-primary" />
          <h1 className="text-5xl font-headline font-bold text-primary">
            Unified Booker
          </h1>
        </div>
        <p className="max-w-md text-lg text-muted-foreground">
          Your all-in-one solution for managing rental unit bookings across multiple platforms.
        </p>
      </div>

      <Card className="w-full max-w-sm mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
