"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { gradeFromPercentage, nextId } from "@/lib/calculator-utils";
import { ClipboardList, Plus, RotateCcw, Trash2 } from "lucide-react";

interface MarkRow {
  id: string;
  name: string;
  obtained: number;
  total: number;
}

function makeDefaultRows(): MarkRow[] {
  return [
    { id: nextId(), name: "", obtained: 85, total: 100 },
    { id: nextId(), name: "", obtained: 72, total: 100 },
    { id: nextId(), name: "", obtained: 66, total: 100 },
  ];
}

export function GradeCalculator() {
  const [rows, setRows] = useState<MarkRow[]>(makeDefaultRows);

  const stats = useMemo(() => {
    let obtained = 0;
    let total = 0;
    for (const row of rows) {
      if (row.total > 0) {
        obtained += row.obtained;
        total += row.total;
      }
    }
    const pct = total > 0 ? (obtained / total) * 100 : 0;
    return {
      obtained,
      total,
      percentage: Math.round(pct * 100) / 100,
      grade: gradeFromPercentage(pct),
    };
  }, [rows]);

  const hasData = stats.total > 0;

  const updateRow = (id: string, patch: Partial<MarkRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const addRow = () =>
    setRows((prev) => [...prev, { id: nextId(), name: "", obtained: 0, total: 100 }]);

  const removeRow = (id: string) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));

  const reset = () => setRows(makeDefaultRows());

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <ClipboardList className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            Enter Your Marks
          </CardTitle>
          <CardDescription>
            Enter the marks you scored and the maximum marks for each subject to get your overall
            percentage and letter grade.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="hidden sm:grid sm:grid-cols-[1fr_110px_110px_40px] gap-3 px-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Subject</span>
            <span>Obtained</span>
            <span>Total</span>
            <span className="sr-only">Remove</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
            {rows.map((row, index) => {
              const markId = `mark-${index}`;
              const markObtainedId = `mark-obtained-${index}`;
              const markTotalId = `mark-total-${index}`;
              return (
                <div
                  key={row.id}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_110px_110px_40px] gap-3 items-end"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor={markId} className="sr-only">
                      Subject name
                    </Label>
                    <Input
                      id={markId}
                      placeholder={`Subject ${index + 1} (optional)`}
                      value={row.name}
                      onChange={(e) => updateRow(row.id, { name: e.target.value })}
                      aria-label={`Subject ${index + 1} name`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={markObtainedId} className="sm:hidden">
                      Obtained marks
                    </Label>
                    <Input
                      id={markObtainedId}
                      type="number"
                      min={0}
                      step={0.5}
                      inputMode="decimal"
                      value={row.obtained || ""}
                      onChange={(e) =>
                        updateRow(row.id, { obtained: Math.max(0, Number(e.target.value)) })
                      }
                      aria-label={`Marks obtained for subject ${index + 1}`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={markTotalId} className="sm:hidden">
                      Total marks
                    </Label>
                    <Input
                      id={markTotalId}
                      type="number"
                      min={1}
                      step={1}
                      inputMode="numeric"
                      value={row.total || ""}
                      onChange={(e) =>
                        updateRow(row.id, { total: Math.max(0, Number(e.target.value)) })
                      }
                      aria-label={`Total marks for subject ${index + 1}`}
                    />
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
          <CardTitle className="text-lg sm:text-xl">Your Grade Result</CardTitle>
          <CardDescription>Overall percentage mapped to the 10-point grade scale.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="text-center py-4">
            <p className="text-5xl sm:text-6xl font-bold text-emerald-700 tabular-nums">
              {hasData ? `${stats.percentage.toFixed(1)}` : "—"}
              {hasData && <span className="text-2xl font-semibold">%</span>}
            </p>
            {hasData && (
              <Badge className="mt-3 bg-emerald-600 hover:bg-emerald-700">
                Grade {stats.grade.grade} ({stats.grade.points} points)
              </Badge>
            )}
          </div>

          <div className="h-px bg-emerald-200/60" role="separator" />

          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Marks Obtained</dt>
              <dd className="font-semibold tabular-nums">{hasData ? stats.obtained : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Total Marks</dt>
              <dd className="font-semibold tabular-nums">{hasData ? stats.total : "—"}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
