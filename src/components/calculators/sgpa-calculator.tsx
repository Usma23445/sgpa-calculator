"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import {
  calculateSGPA,
  classificationFromSGPA,
  nextId,
  TEN_POINT_SCALE,
  type SubjectRow,
} from "@/lib/calculator-utils";
import { GraduationCap, Plus, RotateCcw, Trash2 } from "lucide-react";

const CREDIT_OPTIONS = ["1", "1.5", "2", "3", "4", "5", "6", "8", "10"];

function makeDefaultRows(): SubjectRow[] {
  return [
    { id: nextId(), name: "", credits: 4, gradePoint: 10 },
    { id: nextId(), name: "", credits: 3, gradePoint: 9 },
    { id: nextId(), name: "", credits: 3, gradePoint: 8 },
  ];
}

export function SGpaCalculator() {
  const [rows, setRows] = useState<SubjectRow[]>(makeDefaultRows);

  const result = useMemo(() => calculateSGPA(rows), [rows]);
  const hasData = result.totalCredits > 0;
  const percentage = hasData ? Math.round(result.sgpa * 9.5 * 100) / 100 : 0;

  const updateRow = (id: string, patch: Partial<SubjectRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () =>
    setRows((prev) => [...prev, { id: nextId(), name: "", credits: 3, gradePoint: 8 }]);

  const removeRow = (id: string) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const reset = () => setRows(makeDefaultRows());

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <GraduationCap className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            Enter Your Subjects
          </CardTitle>
          <CardDescription>
            Add every course from your semester along with its credits and the grade point you
            scored. Subject names are optional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="hidden sm:grid sm:grid-cols-[1fr_120px_200px_40px] gap-3 px-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Subject</span>
            <span>Credits</span>
            <span>Grade</span>
            <span className="sr-only">Remove</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
            {rows.map((row, index) => {
              const subjectId = `subject-${index}`;
              const creditsId = `credits-${index}`;
              const gradeId = `grade-${index}`;
              return (
              <div
                key={row.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_120px_200px_40px] gap-3 items-end"
              >
                <div className="space-y-1.5">
                  <Label htmlFor={subjectId} className="sm:hidden">
                    Subject {index + 1}
                  </Label>
                  <Input
                    id={subjectId}
                    placeholder={`Subject ${index + 1} (optional)`}
                    value={row.name}
                    onChange={(e) => updateRow(row.id, { name: e.target.value })}
                    aria-label={`Subject ${index + 1} name`}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={creditsId} className="sm:hidden">
                    Credits
                  </Label>
                  <Select
                    value={String(row.credits)}
                    onValueChange={(v) => updateRow(row.id, { credits: Number(v) })}
                  >
                    <SelectTrigger
                      id={creditsId}
                      aria-label={`Credits for subject ${index + 1}`}
                    >
                      <SelectValue placeholder="Credits" />
                    </SelectTrigger>
                    <SelectContent>
                      {CREDIT_OPTIONS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={gradeId} className="sm:hidden">
                    Grade
                  </Label>
                  <Select
                    value={String(row.gradePoint)}
                    onValueChange={(v) => updateRow(row.id, { gradePoint: Number(v) })}
                  >
                    <SelectTrigger
                      id={gradeId}
                      aria-label={`Grade for subject ${index + 1}`}
                    >
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEN_POINT_SCALE.map((g) => (
                        <SelectItem key={g.grade} value={String(g.points)}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length === 1}
                  aria-label={`Remove subject ${index + 1}`}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              );
            })}
          </div>

          <div className="h-px bg-border my-2" role="separator" />
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={addRow} variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" /> Add Subject
            </Button>
            <Button type="button" onClick={reset} variant="ghost" size="sm" className="gap-1.5">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl">Your SGPA Result</CardTitle>
          <CardDescription>Calculated instantly using the credit-weighted formula.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="text-center py-4">
            <p className="text-5xl sm:text-6xl font-bold text-emerald-700 tabular-nums">
              {hasData ? result.sgpa.toFixed(2) : "0.00"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">out of 10.00</p>
            {hasData && (
              <Badge className="mt-3 bg-emerald-600 hover:bg-emerald-700">
                {classificationFromSGPA(result.sgpa)}
              </Badge>
            )}
          </div>

          <div className="h-px bg-emerald-200/60" role="separator" />

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Total Credits</dt>
              <dd className="font-semibold tabular-nums">{hasData ? result.totalCredits : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Total Grade Points</dt>
              <dd className="font-semibold tabular-nums">{hasData ? result.totalPoints : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Approx. Percentage (× 9.5)</dt>
              <dd className="font-semibold tabular-nums">{hasData ? `${percentage}%` : "—"}</dd>
            </div>
          </dl>

          {!hasData && (
            <p className="text-xs text-muted-foreground text-center">
              Enter credits and grades for at least one subject to see your result.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
