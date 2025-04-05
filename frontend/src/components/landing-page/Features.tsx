import { useState } from "react";
import { Leaf, Droplets, Sun, Recycle, TreePine } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Badge variant="outline" className="px-3 py-1">
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            Empowering Sustainable Living
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover powerful tools and insights to reduce your environmental
            impact and contribute to a healthier planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main feature card */}
          <Card className="md:col-span-2 md:row-span-2 overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-emerald-500" />
                <CardTitle>Personal Carbon Tracker</CardTitle>
              </div>
              <CardDescription>
                Monitor and reduce your carbon footprint
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <p className="text-muted-foreground">
                Track your daily activities and see your environmental impact in
                real-time. Get personalized recommendations to reduce your
                carbon footprint and set achievable goals. Our smart analytics
                help you identify the biggest contributors to your carbon
                footprint and suggest actionable steps for improvement.
              </p>
            </CardContent>
            <CardFooter className="pt-4">
              <Badge variant="secondary">Core Feature</Badge>
            </CardFooter>
          </Card>

          {/* Water Conservation */}
          <Card>
            <CardHeader className="pb-1">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Water Conservation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track household water usage and get tips to reduce consumption
                with smart monitoring.
              </p>
            </CardContent>
          </Card>

          {/* Sustainable Energy */}
          <Card>
            <CardHeader className="pb-1">
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-lg">Renewable Energy</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Find renewable energy options in your area and calculate
                potential savings.
              </p>
            </CardContent>
          </Card>

          {/* Waste Management */}
          <Card>
            <CardHeader className="pb-1">
              <div className="flex items-center gap-2">
                <Recycle className="h-5 w-5 text-green-500" />
                <CardTitle className="text-lg">Waste Reduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Scan products for recycling information and find local recycling
                centers.
              </p>
            </CardContent>
          </Card>

          {/* Community Challenges */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-1">
              <div className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-emerald-600" />
                <CardTitle className="text-lg">Community Challenges</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Join community sustainability challenges, earn rewards, and see
                your collective impact on local environmental initiatives.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                >
                  Active Users: 12,532
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                >
                  Challenges: 35
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
