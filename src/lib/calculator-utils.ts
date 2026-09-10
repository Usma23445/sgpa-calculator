/**
 * Shared logic for the SGPA Calculator suite.
 * All formulas follow the common 10-point grading system used by
 * most Indian universities (SPPU, VTU, AKTU, GTU, JNTU, Anna, Mumbai) plus a
 * 4.0 scale for US-style GPA conversion.
 */

export interface SubjectRow {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
}

export interface SemesterRow {
  id: string;
  label: string;
  sgpa: number;
  credits: number;
}

export interface CalculationResult {
  sgpa: number;
  totalCredits: number;
  totalPoints: number;
}

export interface CGPAResult {
  cgpa: number;
  totalCredits: number;
  totalPoints: number;
}

export interface GradeOption {
  grade: string;
  label: string;
  points: number;
  marks: string;
}

/** 10-point grading scale (typical Indian university pattern). */
export const TEN_POINT_SCALE: GradeOption[] = [
  { grade: "O", label: "O — Outstanding (10)", points: 10, marks: "90 – 100" },
  { grade: "A+", label: "A+ — Excellent (9)", points: 9, marks: "80 – 89" },
  { grade: "A", label: "A — Very Good (8)", points: 8, marks: "70 – 79" },
  { grade: "B+", label: "B+ — Good (7)", points: 7, marks: "60 – 69" },
  { grade: "B", label: "B — Above Average (6)", points: 6, marks: "55 – 59" },
  { grade: "C", label: "C — Average (5)", points: 5, marks: "50 – 54" },
  { grade: "P", label: "P — Pass (4)", points: 4, marks: "40 – 49" },
  { grade: "F", label: "F — Fail (0)", points: 0, marks: "Below 40" },
];

/** US-style 4.0 scale. */
export const FOUR_POINT_SCALE: { grade: string; points: number }[] = [
  { grade: "A", points: 4.0 },
  { grade: "A-", points: 3.7 },
  { grade: "B+", points: 3.3 },
  { grade: "B", points: 3.0 },
  { grade: "B-", points: 2.7 },
  { grade: "C+", points: 2.3 },
  { grade: "C", points: 2.0 },
  { grade: "C-", points: 1.7 },
  { grade: "D", points: 1.0 },
  { grade: "F", points: 0.0 },
];

export interface PercentageMethod {
  id: string;
  name: string;
  formula: string;
  note: string;
}

/** Popular SGPA/CGPA → percentage conversion formulas. */
export const PERCENTAGE_METHODS: PercentageMethod[] = [
  {
    id: "standard",
    name: "Standard / AKTU (×10)",
    formula: "Percentage = SGPA × 10",
    note: "The most widely used simple multiplier, followed by AKTU and many state universities.",
  },
  {
    id: "cbse",
    name: "CBSE / DU (×9.5)",
    formula: "Percentage = SGPA × 9.5",
    note: "Used by CBSE and Delhi University where the 9.5 multiplier is the official norm.",
  },
  {
    id: "sppu",
    name: "SPPU / VTU ((X − 0.75) × 10)",
    formula: "Percentage = (SGPA − 0.75) × 10",
    note: "Official formula published by Savitribai Phule Pune University and VTU for their CGPA scheme.",
  },
  {
    id: "gtu",
    name: "GTU ((X − 0.5) × 10)",
    formula: "Percentage = (SGPA − 0.5) × 10",
    note: "Gujarat Technological University's conversion formula for SPI/CPI.",
  },
  {
    id: "mumbai",
    name: "Mumbai University (7.25X + 11)",
    formula: "Percentage = 7.25 × SGPA + 11",
    note: "Mumbai University's linear conversion used for its 10-point CBS scheme.",
  },
];

let idCounter = 0;
export function nextId(): string {
  idCounter += 1;
  return `row-${idCounter}`;
}

/** SGPA = Σ(Credits × GradePoint) / ΣCredits */
export function calculateSGPA(rows: SubjectRow[]): CalculationResult {
  let totalCredits = 0;
  let totalPoints = 0;
  for (const row of rows) {
    if (row.credits > 0 && row.gradePoint >= 0) {
      totalCredits += row.credits;
      totalPoints += row.credits * row.gradePoint;
    }
  }
  const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  return {
    sgpa: Math.round(sgpa * 100) / 100,
    totalCredits: Math.round(totalCredits * 100) / 100,
    totalPoints: Math.round(totalPoints * 100) / 100,
  };
}

/** CGPA = Σ(SGPA × SemesterCredits) / ΣCredits */
export function calculateCGPA(rows: SemesterRow[]): CGPAResult {
  let totalCredits = 0;
  let totalPoints = 0;
  for (const row of rows) {
    if (row.credits > 0 && row.sgpa > 0) {
      totalCredits += row.credits;
      totalPoints += row.sgpa * row.credits;
    }
  }
  const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  return {
    cgpa: Math.round(cgpa * 100) / 100,
    totalCredits: Math.round(totalCredits * 100) / 100,
    totalPoints: Math.round(totalPoints * 100) / 100,
  };
}

/** 4.0 scale GPA. */
export function calculateGPA4(rows: SubjectRow[]): number {
  let totalCredits = 0;
  let totalPoints = 0;
  for (const row of rows) {
    if (row.credits > 0 && row.gradePoint >= 0) {
      totalCredits += row.credits;
      totalPoints += row.credits * row.gradePoint;
    }
  }
  return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
}

export function convertToPercentage(value: number, methodId: string): number {
  let pct: number;
  switch (methodId) {
    case "cbse":
      pct = value * 9.5;
      break;
    case "sppu":
      pct = (value - 0.75) * 10;
      break;
    case "gtu":
      pct = (value - 0.5) * 10;
      break;
    case "mumbai":
      pct = 7.25 * value + 11;
      break;
    default:
      pct = value * 10;
  }
  return Math.round(pct * 100) / 100;
}

/** Percentage → 10-point letter grade (typical pattern). */
export function gradeFromPercentage(pct: number): { grade: string; points: number } {
  if (pct >= 90) return { grade: "O", points: 10 };
  if (pct >= 80) return { grade: "A+", points: 9 };
  if (pct >= 70) return { grade: "A", points: 8 };
  if (pct >= 60) return { grade: "B+", points: 7 };
  if (pct >= 55) return { grade: "B", points: 6 };
  if (pct >= 50) return { grade: "C", points: 5 };
  if (pct >= 40) return { grade: "P", points: 4 };
  return { grade: "F", points: 0 };
}

export function classificationFromSGPA(sgpa: number): string {
  if (sgpa >= 9) return "Outstanding";
  if (sgpa >= 8) return "Excellent";
  if (sgpa >= 7) return "Very Good";
  if (sgpa >= 6) return "Good";
  if (sgpa >= 5) return "Average";
  if (sgpa >= 4) return "Pass";
  return "Needs Improvement";
}

export const CONTACT_EMAIL = "techsuli415502@gmail.com";
