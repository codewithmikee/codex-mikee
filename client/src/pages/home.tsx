import * as React from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { buttonVariants } from "../components/ui/button";
import { cn } from "../lib/utils";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        TypeScript Monorepo for AI Projects
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Apps</CardTitle>
            <CardDescription>
              Frontend applications built with React
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Include your frontend applications in the apps/ directory</p>
          </CardContent>
          <CardFooter>
            <Link href="/apps" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              View Apps
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servers</CardTitle>
            <CardDescription>
              Backend services with Express
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Include your backend services in the servers/ directory</p>
          </CardContent>
          <CardFooter>
            <Link href="/servers" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              View Servers
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Packages</CardTitle>
            <CardDescription>
              Shared libraries and components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Include your shared packages in the packages/ directory</p>
          </CardContent>
          <CardFooter>
            <Link href="/packages" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
              View Packages
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}