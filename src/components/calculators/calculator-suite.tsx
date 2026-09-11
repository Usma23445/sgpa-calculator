"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SGpaCalculator } from "@/components/calculators/sgpa-calculator";
import { CGpaCalculator } from "@/components/calculators/cgpa-calculator";
import { GpaCalculator } from "@/components/calculators/gpa-calculator";
import { PercentageCalculator } from "@/components/calculators/percentage-calculator";
import { GradeCalculator } from "@/components/calculators/grade-calculator";

export function CalculatorSuite() {
  return (
    <Tabs defaultValue="sgpa" className="w-full">
      <TabsList
        aria-label="Calculator tools"
        className="w-full h-auto flex flex-wrap justify-start gap-1 bg-muted/60 p-1.5 rounded-xl"
      >
        <TabsTrigger value="sgpa" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
          SGPA Calculator
        </TabsTrigger>
        <TabsTrigger value="cgpa" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
          CGPA Calculator
        </TabsTrigger>
        <TabsTrigger value="gpa" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
          GPA (4.0 Scale)
        </TabsTrigger>
        <TabsTrigger value="percentage" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
          SGPA to %
        </TabsTrigger>
        <TabsTrigger value="grade" className="rounded-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
          Grade Calculator
        </TabsTrigger>
      </TabsList>

      <TabsContent value="sgpa" className="mt-6">
        <SGpaCalculator />
      </TabsContent>
      <TabsContent value="cgpa" className="mt-6">
        <CGpaCalculator />
      </TabsContent>
      <TabsContent value="gpa" className="mt-6">
        <GpaCalculator />
      </TabsContent>
      <TabsContent value="percentage" className="mt-6">
        <PercentageCalculator />
      </TabsContent>
      <TabsContent value="grade" className="mt-6">
        <GradeCalculator />
      </TabsContent>
    </Tabs>
  );
}
