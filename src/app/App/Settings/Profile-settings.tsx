import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Company Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage job card types for vehicle maintenance and repairs.
          </p>
        </div>
      </div>
      <Card>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Avatar className="h-16 w-16 border-1">
              <AvatarImage alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Logo</Button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Company Name</Label>
                <Input id="firstName" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Company Address</Label>
                <Input id="lastName" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Contact Number</Label>
              <Input id="contact" type="text" placeholder="+973 173789" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
