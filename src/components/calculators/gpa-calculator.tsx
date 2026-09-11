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
import {
  calculateGPA4,
  FOUR_POINT_SCALE,
  nextId,
  type SubjectRow,
} from "@/lib/calculator-utils";
import { Globe2, Plus, RotateCcw, Trash2 } from "lucide-react";

const CREDIT_OPTIONS = ["1", "2", "3", "4", "5", "6"];

function makeDefaultRows(): SubjectRow[] {
  return [
    { id: nextId(), name: "", credits: 3, gradePoint: 4 },
    { id: nextId(), name: "", credits: 3, gradePoint: 3 },
    { id: nextId(), name: "", credits: 4, gradePoint: 3.3 },
  ];
}

function gpaClass(gpa: number): string {
  if (gpa >= 3.7) return "Summa cum laude equivalent";
  if (gpa >= 3.3) return "Magna cum laude equivalent";
  if (gpa >= 3.0) return "Cum laude equivalent";
  if (gpa >= 2.0) return "Satisfactory";
  return "Needs Improvement";
}

export function GpaCalculator() {
  const [rows, setRows] = useState<SubjectRow[]>(makeDefaultRows);

  const gpa = useMemo(() => calculateGPA4(rows), [rows]);
  const hasData = rows.some((r) => r.credits > 0);

  const updateRow = (id: string, patch: Partial<SubjectRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () =>
    setRows((prev) => [...prev, { id: nextId(), name: "", credits: 3, gradePoint: 4 }]);

  const removeRow = (id: string) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const reset = () => setRows(makeDefaultRows());

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Globe2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            Enter Courses (4.0 Scale)
          </CardTitle>
          <CardDescription>
            Ideal for US-style universities, scholarship applications, and study-abroad
            transcripts. Enter letter grades and credit hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="hidden sm:grid sm:grid-cols-[1fr_110px_160px_40px] gap-3 px-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Course</span>
            <span>Credits</span>
            <span>Letter Grade</span>
            <span className="sr-only">Remove</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
            {rows.map((row, index) => {
              const courseId = `course-${index}`;
              const gpaCreditsId = `gpa-credits-${index}`;
              const gpaGradeId = `gpa-grade-${index}`;
              return (
              <div
                key={row.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_110px_160px_40px] gap-3 items-end"
              >
                <div className="space-y-1.5">
                  <Label htmlFor={courseId} className="sr-only">
                    Course name
                  </Label>
                  <Input
                    id={courseId}
                    placeholder={`Course ${index + 1} (optional)`}
                    value={row.name}
                    onChange={(e) => updateRow(row.id, { name: e.target.value })}
                    aria-label={`Course ${index + 1} name`}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={gpaCreditsId} className="sm:hidden">
                    Credits
                  </Label>
                  <Select
                    value={String(row.credits)}
                    onValueChange={(v) => updateRow(row.id, { credits: Number(v) })}
                  >
                    <SelectTrigger
                      id={gpaCreditsId}
                      aria-label={`Credit hours for course ${index + 1}`}
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
                  <Label htmlFor={gpaGradeId} className="sm:hidden">
                    Letter grade
                  </Label>
                  <Select
                    value={String(row.gradePoint)}
                    onValueChange={(v) => updateRow(row.id, { gradePoint: Number(v) })}
                  >
                    <SelectTrigger
                      id={gpaGradeId}
                      aria-label={`Letter grade for course ${index + 1}`}
                    >
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {FOUR_POINT_SCALE.map((g) => (
                        <SelectItem key={g.grade} value={String(g.points)}>
                          {g.grade} ({g.points.toFixed(1)})
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
                  aria-label={`Remove course ${index + 1}`}
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
              <Plus className="h-4 w-4" /> Add Course
            </Button>
            <Button type="button" onClick={reset} variant="ghost" size="sm" className="gap-1.5">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl">Your GPA Result</CardTitle>
          <CardDescription>Weighted grade point average on the 4.0 scale.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="text-center py-4">
            <p className="text-5xl sm:text-6xl font-bold text-emerald-700 tabular-nums">
              {hasData ? gpa.toFixed(2) : "0.00"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">out of 4.00</p>
            {hasData && <Badge className="mt-3 bg-emerald-600 hover:bg-emerald-700">{gpaClass(gpa)}</Badge>}
          </div>

          <div className="h-px bg-emerald-200/60" role="separator" />

          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-medium text-foreground">10-point equivalent</p>
            <p className="tabular-nums text-lg font-semibold text-emerald-700">
              {hasData ? `${Math.round(gpa * 2.5 * 100) / 100} / 10` : "—"}
            </p>
            <p>Approximate conversion: GPA × 2.5 ≈ 10-point scale. Universities may use their own official conversion.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
