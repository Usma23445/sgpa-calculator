"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { convertToPercentage, PERCENTAGE_METHODS } from "@/lib/calculator-utils";
import { Percent, Info } from "lucide-react";

export function PercentageCalculator() {
  const [value, setValue] = useState("8.5");
  const [method, setMethod] = useState("standard");

  const numeric = Number(value);
  const valid = !Number.isNaN(numeric) && numeric > 0 && numeric <= 10;
  const percentage = useMemo(
    () => (valid ? convertToPercentage(numeric, method) : 0),
    [numeric, method, valid]
  );
  const activeMethod = PERCENTAGE_METHODS.find((m) => m.id === method);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Percent className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            SGPA / CGPA → Percentage
          </CardTitle>
          <CardDescription>
            Choose the conversion formula your university follows, then enter your SGPA or CGPA.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="pct-value">SGPA or CGPA (out of 10)</Label>
            <Input
              id="pct-value"
              type="number"
              min={0}
              max={10}
              step={0.01}
              inputMode="decimal"
              placeholder="e.g. 8.50"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              aria-describedby="pct-value-hint"
            />
            <p id="pct-value-hint" className="text-xs text-muted-foreground">
              Enter any value between 0 and 10.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pct-method">Conversion formula</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="pct-method" aria-label="Conversion formula">
                <SelectValue placeholder="Select a formula" />
              </SelectTrigger>
              <SelectContent>
                {PERCENTAGE_METHODS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {activeMethod && (
            <div className="rounded-lg bg-muted p-4 text-sm space-y-1.5" role="note">
              <p className="font-medium">Formula: {activeMethod.formula}</p>
              <p className="text-muted-foreground">{activeMethod.note}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl">Your Percentage</CardTitle>
          <CardDescription>Based on the selected university formula.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="text-center py-4">
            <p className="text-5xl sm:text-6xl font-bold text-emerald-700 tabular-nums">
              {valid ? `${percentage.toFixed(2)}` : "—"}
              {valid && <span className="text-2xl font-semibold">%</span>}
            </p>
            {valid && (
              <Badge className="mt-3 bg-emerald-600 hover:bg-emerald-700">
                {percentage >= 75
                  ? "Distinction range"
                  : percentage >= 60
                    ? "First Class range"
                    : percentage >= 50
                      ? "Second Class range"
                      : percentage >= 40
                        ? "Pass"
                        : "Below pass mark"}
              </Badge>
            )}
          </div>

          <div className="h-px bg-emerald-200/60" role="separator" />

          <div className="flex gap-2 text-xs text-muted-foreground" role="note">
            <Info className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              Always verify with your university&apos;s official circular. Some institutions cap
              percentages at 100 or round differently on transcripts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
