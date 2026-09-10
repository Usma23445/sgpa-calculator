import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  BadgeCheck,
  BookOpen,
  Calculator,
  ChartLine,
  Lightbulb,
  ListChecks,
  Lock,
  Percent,
  ShieldCheck,
  Smartphone,
  Table2,
} from "lucide-react";
import { TEN_POINT_SCALE } from "@/lib/calculator-utils";

export const FAQ_ITEMS = [
  {
    question: "What is SGPA and how is it different from CGPA?",
    answer:
      "SGPA (Semester Grade Point Average) measures how well you performed in a single semester, while CGPA (Cumulative Grade Point Average) measures your overall performance across all completed semesters. Think of SGPA as one match score and CGPA as the average of the whole tournament — both use the same credit-weighted method, but CGPA carries the full history of your degree.",
  },
  {
    question: "How is SGPA calculated with the credit system?",
    answer:
      "Multiply the grade point of each subject by its credits to get the credit points, add all the credit points together, and divide that total by the total number of credits in the semester. For example, four subjects with 4, 3, 3 and 2 credits and grade points of 9, 8, 7 and 10 give (4×9 + 3×8 + 3×7 + 2×10) ÷ 12 = 8.42 SGPA.",
  },
  {
    question: "Is 8.0 SGPA good?",
    answer:
      "Yes — an SGPA of 8.0 and above generally falls in the first-class-with-distinction band at most Indian universities and translates to roughly 76–80% using the common ×9.5 conversion. An SGPA above 9.0 is considered outstanding and puts you in a strong position for placements, internships and higher-study shortlists.",
  },
  {
    question: "How do I convert SGPA to percentage?",
    answer:
      "It depends on your university. The three most common formulas are: percentage = SGPA × 10 (simple standard), percentage = SGPA × 9.5 (CBSE and Delhi University pattern), and percentage = (SGPA − 0.75) × 10 (SPPU and VTU). Our SGPA to Percentage tab lets you pick the exact formula your institution follows so you never have to guess.",
  },
  {
    question: "What is the difference between a 10-point GPA and a 4.0 GPA?",
    answer:
      "Indian universities typically grade on a 10-point scale, while American universities use a 4.0 scale. A rough rule of thumb for applications abroad is GPA(4.0) ≈ SGPA(10-point) ÷ 2.5, so an 8.5 SGPA is approximately a 3.4 GPA. Always use the official conversion method requested by the university or employer you are applying to.",
  },
  {
    question: "Can I calculate SGPA without knowing my subject names?",
    answer:
      "Absolutely. Subject names are optional in our calculator — only the credits and the grade points affect the result, so you can leave the name fields empty and still get an accurate SGPA.",
  },
  {
    question: "Do all universities use the same grading scale?",
    answer:
      "No. While most follow a similar 10-point structure (O, A+, A, B+, B, C, P, F), the marks ranges and grade points vary between institutions such as SPPU, VTU, AKTU, GTU, Anna University and JNTU. Check your university's academic regulations page and map your grades accordingly — our calculator covers the most common pattern.",
  },
  {
    question: "Is this SGPA calculator free to use?",
    answer:
      "Yes, every tool on this site — SGPA, CGPA, 4.0-scale GPA, SGPA-to-percentage and the marks grade calculator — is 100% free, requires no registration, and works on mobile and desktop. All calculations run directly in your browser, so nothing you type is stored on our servers.",
  },
];

export function SeoContent() {
  return (
    <div className="space-y-16">
      {/* What is SGPA */}
      <section id="what-is-sgpa" aria-labelledby="what-is-sgpa-heading" className="scroll-mt-24">
        <div className="flex items-center gap-2 text-emerald-700 mb-3">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider">Basics</span>
        </div>
        <h2 id="what-is-sgpa-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          What is SGPA? (Semester Grade Point Average)
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground max-w-4xl">
          <p>
            <strong className="text-foreground">SGPA stands for Semester Grade Point Average</strong>{" "}
            — a single number that summarises how you performed across every subject in one
            semester. Instead of staring at eight different marksheets, universities condense your
            entire semester into one score on a 10-point scale, where 10 is the best you can achieve
            and 4 is usually the minimum passing benchmark.
          </p>
          <p>
            The idea behind SGPA is fairness through weighting. A six-credit engineering
            mathematics paper influences your result three times more than a two-credit seminar, and
            SGPA respects that difference by using the credit system. This is exactly how most
            Indian universities — including SPPU, VTU, AKTU, GTU, Anna University, JNTU and Mumbai
            University — report semester results, and it is the same principle Western
            universities apply on their 4.0 GPA scale.
          </p>
          <p>
            Your SGPA matters more than most students realise. Companies shortlisting for
            placements, universities screening for master&apos;s programmes, and scholarship
            committees all look at semester-wise performance trends. A healthy SGPA in your early
            semesters gives you a comfortable cushion to experiment, intern and still graduate with
            a strong CGPA.
          </p>
        </div>
      </section>

      {/* Formula */}
      <section id="formula" aria-labelledby="formula-heading" className="scroll-mt-24">
        <div className="flex items-center gap-2 text-emerald-700 mb-3">
          <Calculator className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider">The Math</span>
        </div>
        <h2 id="formula-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          SGPA Formula Explained (With a Real Example)
        </h2>
        <Card className="mt-4 max-w-4xl border-emerald-200 bg-emerald-50/60">
          <CardContent className="py-5">
            <p className="text-center text-lg sm:text-xl font-semibold text-emerald-800">
              SGPA = Σ (Credit × Grade Point) ÷ Σ (Credits)
            </p>
          </CardContent>
        </Card>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground max-w-4xl">
          <p>
            The formula looks intimidating in textbook form, but it breaks down into two simple
            ideas. First, each subject earns <strong className="text-foreground">credit points</strong>{" "}
            — the number of credits multiplied by the grade point you scored. Second, SGPA is
            simply the total of those credit points divided by the total credits of the semester.
          </p>
          <p>Here is a worked example for a typical semester with four subjects:</p>
        </div>
        <div className="mt-4 max-w-4xl overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <caption className="sr-only">Example SGPA calculation for four subjects</caption>
            <thead className="bg-muted/70">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Subject</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Credits</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Grade Point</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Credit Points</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2.5">Engineering Mathematics</td>
                <td className="px-4 py-2.5 tabular-nums">4</td>
                <td className="px-4 py-2.5 tabular-nums">9</td>
                <td className="px-4 py-2.5 tabular-nums">36</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">Data Structures</td>
                <td className="px-4 py-2.5 tabular-nums">3</td>
                <td className="px-4 py-2.5 tabular-nums">8</td>
                <td className="px-4 py-2.5 tabular-nums">24</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">Digital Electronics</td>
                <td className="px-4 py-2.5 tabular-nums">3</td>
                <td className="px-4 py-2.5 tabular-nums">7</td>
                <td className="px-4 py-2.5 tabular-nums">21</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">Technical Communication</td>
                <td className="px-4 py-2.5 tabular-nums">2</td>
                <td className="px-4 py-2.5 tabular-nums">10</td>
                <td className="px-4 py-2.5 tabular-nums">20</td>
              </tr>
              <tr className="bg-emerald-50 font-semibold">
                <td className="px-4 py-2.5">Total</td>
                <td className="px-4 py-2.5 tabular-nums">12</td>
                <td className="px-4 py-2.5">—</td>
                <td className="px-4 py-2.5 tabular-nums">101</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-4xl">
          <strong className="text-foreground">SGPA = 101 ÷ 12 = 8.42.</strong> That is it — one
          clear number your university can print on the marksheet. Our calculator does this
          arithmetic for you instantly as you type, and it also shows the total credits and total
          grade points so you can cross-verify against your marksheet.
        </p>
      </section>

      {/* Step by step */}
      <section id="how-to" aria-labelledby="how-to-heading" className="scroll-mt-24">
        <div className="flex items-center gap-2 text-emerald-700 mb-3">
          <ListChecks className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider">Step by Step</span>
        </div>
        <h2 id="how-to-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          How to Calculate SGPA in 5 Easy Steps
        </h2>
        <ol className="mt-5 space-y-4 max-w-4xl">
          {[
            {
              title: "Collect your marksheet details",
              body: "Note down every subject from your semester result along with the credits assigned to it. Credits are printed next to each subject on your marksheet or in the syllabus structure.",
            },
            {
              title: "Find the grade point for each subject",
              body: "Use your university's grading table (see the scale below) to convert marks into grade points. For example, 85 marks usually map to grade point 9 (A+).",
            },
            {
              title: "Multiply credits by grade points",
              body: "For each subject, credit points = credits × grade point. A 4-credit subject with grade point 9 gives 36 credit points.",
            },
            {
              title: "Add everything up",
              body: "Sum all the credit points, then separately sum all the credits. Keep fail-grade subjects in the totals if your university counts them — most do.",
            },
            {
              title: "Divide and round",
              body: "Divide total credit points by total credits and round to two decimals. That final number is your SGPA for the semester.",
            },
          ].map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Grading scale */}
      <section id="grading-scale" aria-labelledby="grading-scale-heading" className="scroll-mt-24">
        <div className="flex items-center gap-2 text-emerald-700 mb-3">
          <Table2 className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider">Reference</span>
        </div>
        <h2 id="grading-scale-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          10-Point Grading System in India (Marks to Grade Point)
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground max-w-4xl">
          <p>
            Most Indian universities follow a close variant of this 10-point scale, where letter
            grades from O (Outstanding) down to F (Fail) correspond to fixed grade points. The marks
            ranges below are the most commonly published pattern — always confirm the exact bands in
            your own university&apos;s academic regulations, because a few institutions shift the
            boundaries slightly.
          </p>
        </div>
        <div className="mt-4 max-w-4xl overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <caption className="sr-only">Marks range to letter grade and grade point mapping</caption>
            <thead className="bg-muted/70">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Marks Range (%)</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Letter Grade</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Description</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {TEN_POINT_SCALE.map((g) => (
                <tr key={g.grade}>
                  <td className="px-4 py-2.5 tabular-nums">{g.marks}</td>
                  <td className="px-4 py-2.5 font-semibold">{g.grade}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{g.label.split("— ")[1]}</td>
                  <td className="px-4 py-2.5 tabular-nums font-semibold text-emerald-700">{g.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Conversion */}
      <section id="conversion" aria-labelledby="conversion-heading" className="scroll-mt-24">
        <div className="flex items-center gap-2 text-emerald-700 mb-3">
          <Percent className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider">Conversion</span>
        </div>
        <h2 id="conversion-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          SGPA to Percentage: Which Formula Should You Use?
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground max-w-4xl">
          <p>
            There is no single universal formula for converting SGPA into a percentage — each
            university publishes its own conversion rule, and using the wrong one can cost you a
            job offer or an admission seat. These are the official formulas students ask about
            most:
          </p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 max-w-4xl">
          {[
            {
              name: "Standard / AKTU",
              formula: "Percentage = SGPA × 10",
              body: "The simplest multiplier. A 8.50 SGPA becomes 85%.",
            },
            {
              name: "CBSE / Delhi University",
              formula: "Percentage = SGPA × 9.5",
              body: "CBSE introduced the 9.5 factor after analysing years of board results; DU follows the same practice.",
            },
            {
              name: "SPPU / VTU",
              formula: "Percentage = (SGPA − 0.75) × 10",
              body: "Both Pune and Belagavi universities subtract 0.75 before scaling, so an 8.50 SGPA converts to 77.5%.",
            },
            {
              name: "GTU",
              formula: "Percentage = (SGPA − 0.5) × 10",
              body: "Gujarat Technological University uses a 0.5 deduction on the SPI/CPI value.",
            },
            {
              name: "Mumbai University",
              formula: "Percentage = 7.25 × SGPA + 11",
              body: "A linear formula specific to Mumbai University's CBS scheme — 8.50 SGPA becomes 72.63%.",
            },
            {
              name: "Simple rule of thumb",
              formula: "When unsure, use SGPA × 10",
              body: "It is the most widely accepted approximation for forms that only ask for an approximate percentage.",
            },
          ].map((item) => (
            <Card key={item.name} className="border-emerald-100">
              <CardContent className="p-5 space-y-2">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm font-medium text-emerald-700">{item.formula}</p>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground max-w-4xl">
          Our <a href="#calculators" className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800">SGPA to Percentage tab</a>{" "}
          includes all of these formulas — pick your university&apos;s method and the conversion
          happens automatically.
        </p>
      </section>

      {/* Why use */}
      <section id="why-us" aria-labelledby="why-us-heading" className="scroll-mt-24">
        <div className="flex items-center gap-2 text-emerald-700 mb-3">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider">Why This Tool</span>
        </div>
        <h2 id="why-us-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          Why Students Use Our All-in-One SGPA Calculator
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {[
            {
              icon: Calculator,
              title: "Five tools in one place",
              body: "SGPA, CGPA, 4.0-scale GPA, percentage conversion and marks-to-grade — switch tabs instead of hunting for five different websites.",
            },
            {
              icon: ChartLine,
              title: "Live, accurate results",
              body: "Results update the moment you change a credit or grade, using the same credit-weighted formula your university uses.",
            },
            {
              icon: Lock,
              title: "Private by design",
              body: "Every calculation runs locally in your browser. No marks, no emails, no sign-up — your academic data never leaves your device.",
            },
            {
              icon: Smartphone,
              title: "Works on any device",
              body: "A mobile-first layout that fits comfortably next to your marksheet, whether you are on a phone, tablet or laptop.",
            },
            {
              icon: BookOpen,
              title: "Built around real syllabi",
              body: "Defaults follow the 10-point scale used by major Indian universities, with a separate 4.0 mode for international applications.",
            },
            {
              icon: BadgeCheck,
              title: "Free forever",
              body: "No premium tiers, no ads covering the answers, no watermarks. Student tools should be free — this one always will be.",
            },
          ].map((f) => (
            <Card key={f.title} className="border-emerald-100 hover:border-emerald-300 transition-colors">
              <CardContent className="p-5 space-y-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <f.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section id="tips" aria-labelledby="tips-heading" className="scroll-mt-24">
        <div className="flex items-center gap-2 text-emerald-700 mb-3">
          <Lightbulb className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider">Pro Tips</span>
        </div>
        <h2 id="tips-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          Practical Tips to Improve Your SGPA Next Semester
        </h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground max-w-4xl">
          <ul className="space-y-3 list-disc pl-5 marker:text-emerald-600">
            <li>
              <strong className="text-foreground">Prioritise high-credit subjects first.</strong>{" "}
              Because SGPA is credit-weighted, moving a 4-credit paper from grade 7 to 9 lifts your
              SGPA twice as much as doing the same for a 2-credit subject.
            </li>
            <li>
              <strong className="text-foreground">Never ignore internal assessments.</strong>{" "}
              Assignments, lab records and mid-terms typically contribute 25–40 marks per subject —
              the cheapest grade points you will ever earn.
            </li>
            <li>
              <strong className="text-foreground">Track your CGPA trajectory early.</strong> A weak
              first semester forces later semesters to be near-perfect to recover. Use the CGPA tab
              after every result to see where you stand.
            </li>
            <li>
              <strong className="text-foreground">Recheck failed or withheld results.</strong> Many
              universities allow revaluation for a small fee; a single upgraded subject can jump an
              entire grade band.
            </li>
            <li>
              <strong className="text-foreground">Keep a running record.</strong> Screenshot or note
              your SGPA each semester — placement season arrives faster than you think, and
              recruiters often ask for semester-wise scores.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
        <div className="flex items-center gap-2 text-emerald-700 mb-3">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          <span className="text-sm font-semibold uppercase tracking-wider">FAQ</span>
        </div>
        <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
          Frequently Asked Questions About SGPA
        </h2>
        <Accordion type="single" collapsible className="mt-5 max-w-4xl">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium hover:text-emerald-700 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
