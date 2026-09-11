import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { CalculatorSuite } from "@/components/calculators/calculator-suite";
import { SeoContent } from "@/components/site/seo-content";
import { AboutSection } from "@/components/site/about-section";
import { ContactSection } from "@/components/site/contact-section";
import { PrivacySection } from "@/components/site/privacy-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FAQ_ITEMS } from "@/components/site/seo-content";
import { CONTACT_EMAIL } from "@/lib/calculator-utils";
import {
  ArrowDown,
  BadgeCheck,
  Lock,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section
          aria-labelledby="hero-heading"
          className="border-b bg-gradient-to-b from-emerald-50/80 via-teal-50/40 to-background"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="outline" className="mb-4 gap-1.5 border-emerald-200 bg-white/70 text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Free · No Sign-up · Works Offline in Your Browser
              </Badge>
              <h1
                id="hero-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance"
              >
                SGPA Calculator — Free All-in-One GPA Tool Suite for Students
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
                Calculate your <strong className="text-foreground">Semester Grade Point Average</strong>{" "}
                in seconds, then convert it to CGPA, percentage or a 4.0-scale GPA with the same
                credit-weighted formulas your university uses. Five accurate calculators, one
                clean page, zero sign-ups.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                  <a href="#calculators">
                    Start Calculating
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a href="#formula">How SGPA Works</a>
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Instant live results
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-emerald-600" aria-hidden="true" /> 100% private, in-browser
                </li>
                <li className="flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Mobile friendly
                </li>
                <li className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Verified formulas
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Calculator suite */}
        <section id="calculators" aria-labelledby="calculators-heading" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <div className="mb-8 max-w-3xl">
              <h2 id="calculators-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
                All-in-One Grade Calculators
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Pick the tool you need. Every calculator uses the standard credit-weighted formula
                and updates your result the moment you type — nothing to submit, nothing to wait for.
              </p>
            </div>
            <CalculatorSuite />
          </div>
        </section>

        {/* SEO content */}
        <section
          id="guide"
          aria-label="SGPA guides and explanations"
          className="border-t bg-muted/30"
        >
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <SeoContent />
          </div>
        </section>

        {/* About / Contact / Privacy */}
        <section aria-label="About, contact and privacy information">
          <div className="mx-auto max-w-6xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
            <AboutSection />
            <ContactSection />
            <PrivacySection />
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                name: "SGPA Calculator — All-in-One GPA Tool Suite",
                applicationCategory: "EducationalApplication",
                operatingSystem: "Any (Web Browser)",
                url: "https://sgpacalculators.vercel.app/",
                description:
                  "Free online SGPA calculator with CGPA, 4.0-scale GPA, SGPA-to-percentage conversion and marks-to-grade tools for students.",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              },
              {
                "@type": "FAQPage",
                mainEntity: FAQ_ITEMS.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
              },
              {
                "@type": "Organization",
                name: "SGPACalculator",
                email: CONTACT_EMAIL,
                url: "https://sgpacalculators.vercel.app/",
              },
            ],
          }),
        }}
      />
    </div>
  );
}
