import { Card, CardContent } from "@/components/ui/card";
import { CONTACT_EMAIL } from "@/lib/calculator-utils";
import { HeartHandshake, Mail, Target, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24">
      <div className="flex items-center gap-2 text-emerald-700 mb-3">
        <Users className="h-5 w-5" aria-hidden="true" />
        <span className="text-sm font-semibold uppercase tracking-wider">About Us</span>
      </div>
      <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
        About SGPACalculator
      </h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground max-w-4xl">
        <p>
          SGPACalculator started with a simple frustration we all shared as students: every result
          season, someone in the batch would rediscover the SGPA formula, mess up the credit
          weighting, and panic about a number that was never broken in the first place. We built
          this site so no student has to fight a spreadsheet at midnight before a scholarship
          deadline.
        </p>
        <p>
          What began as a single SGPA calculator grew into an{" "}
          <strong className="text-foreground">all-in-one academic toolkit</strong> — CGPA, the
          4.0-scale GPA used abroad, university-specific percentage conversions, and a marks-to-grade
          calculator — because students asked for them, one email at a time. Every formula on this
          page is cross-checked against the official circulars of the universities our users study
          at, and we keep the interface deliberately boring: fast, readable and free of anything
          that gets between you and your result.
        </p>
        <p>
          We are not affiliated with any university or examination board. We are just a small team
          that believes a student tool should load instantly, respect your privacy, and cost
          nothing — now and forever.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 max-w-4xl">
        {[
          {
            icon: Target,
            title: "Our Mission",
            body: "Make every academic grade calculation instant, accurate and free for every student.",
          },
          {
            icon: HeartHandshake,
            title: "Student First",
            body: "Built from real student requests — the tools here exist because someone emailed us asking for them.",
          },
          {
            icon: Mail,
            title: "Always Listening",
            body: `Spotted a wrong formula or need a new converter? Write to ${CONTACT_EMAIL} and we will improve it.`,
          },
        ].map((item) => (
          <Card key={item.title} className="border-emerald-100">
            <CardContent className="p-5 space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
