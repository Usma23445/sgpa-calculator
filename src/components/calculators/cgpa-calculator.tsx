"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  calculateCGPA,
  classificationFromSGPA,
  nextId,
  type SemesterRow,
} from "@/lib/calculator-utils";
import { Layers, Plus, RotateCcw, Trash2 } from "lucide-react";

function makeDefaultRows(): SemesterRow[] {
  return [
    { id: nextId(), label: "Semester 1", sgpa: 8.5, credits: 24 },
    { id: nextId(), label: "Semester 2", sgpa: 8.0, credits: 24 },
    { id: nextId(), label: "Semester 3", sgpa: 9.0, credits: 22 },
  ];
}

export function CGpaCalculator() {
  const [rows, setRows] = useState<SemesterRow[]>(makeDefaultRows);

  const result = useMemo(() => calculateCGPA(rows), [rows]);
  const hasData = result.totalCredits > 0;

  const updateRow = (id: string, patch: Partial<SemesterRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: nextId(), label: `Semester ${prev.length + 1}`, sgpa: 8, credits: 24 },
    ]);
  };

  const removeRow = (id: string) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const reset = () => setRows(makeDefaultRows());

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Layers className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            Enter Your Semester SGPAs
          </CardTitle>
          <CardDescription>
            Add the SGPA and total credits of each completed semester. Your CGPA is the
            credit-weighted average across all semesters.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="hidden sm:grid sm:grid-cols-[1fr_140px_120px_40px] gap-3 px-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Semester</span>
            <span>SGPA</span>
            <span>Credits</span>
            <span className="sr-only">Remove</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
            {rows.map((row, index) => {
              const semId = `sem-${index}`;
              const semSgpaId = `sem-sgpa-${index}`;
              const semCreditsId = `sem-credits-${index}`;
              return (
              <div
                key={row.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_140px_120px_40px] gap-3 items-end"
              >
                <div className="space-y-1.5">
                  <Label htmlFor={semId} className="sr-only">
                    Semester name
                  </Label>
                  <Input
                    id={semId}
                    value={row.label}
                    onChange={(e) => updateRow(row.id, { label: e.target.value })}
                    placeholder={`Semester ${index + 1}`}
                    aria-label={`Semester ${index + 1} name`}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={semSgpaId} className="sm:hidden">
                    SGPA
                  </Label>
                  <Input
                    id={semSgpaId}
                    type="number"
                    min={0}
                    max={10}
                    step={0.01}
                    inputMode="decimal"
                    value={row.sgpa || ""}
                    onChange={(e) =>
                      updateRow(row.id, { sgpa: Math.min(10, Math.max(0, Number(e.target.value))) })
                    }
                    aria-label={`SGPA for ${row.label || `semester ${index + 1}`}`}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={semCreditsId} className="sm:hidden">
                    Credits
                  </Label>
                  <Input
                    id={semCreditsId}
                    type="number"
                    min={1}
                    max={60}
                    step={1}
                    inputMode="numeric"
                    value={row.credits || ""}
                    onChange={(e) =>
                      updateRow(row.id, {
                        credits: Math.min(60, Math.max(0, Number(e.target.value))),
                      })
                    }
                    aria-label={`Credits for ${row.label || `semester ${index + 1}`}`}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRow(row.id)}
                  disabled={rows.length === 1}
                  aria-label={`Remove ${row.label || `semester ${index + 1}`}`}
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
              <Plus className="h-4 w-4" /> Add Semester
            </Button>
            <Button type="button" onClick={reset} variant="ghost" size="sm" className="gap-1.5">
              <RotateCcw className="h-4 w-4" /> Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl">Your CGPA Result</CardTitle>
          <CardDescription>Cumulative performance across every semester entered.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="text-center py-4">
            <p className="text-5xl sm:text-6xl font-bold text-emerald-700 tabular-nums">
              {hasData ? result.cgpa.toFixed(2) : "0.00"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">out of 10.00</p>
            {hasData && (
              <Badge className="mt-3 bg-emerald-600 hover:bg-emerald-700">
                {classificationFromSGPA(result.cgpa)}
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
              <dt className="text-muted-foreground">Total Credit Points</dt>
              <dd className="font-semibold tabular-nums">{hasData ? result.totalPoints : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Approx. Percentage (× 9.5)</dt>
              <dd className="font-semibold tabular-nums">
                {hasData ? `${Math.round(result.cgpa * 9.5 * 100) / 100}%` : "—"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
