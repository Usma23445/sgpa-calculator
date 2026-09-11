import { Card, CardContent } from "@/components/ui/card";
import { CONTACT_EMAIL } from "@/lib/calculator-utils";
import { FileText, Lock, ShieldCheck } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Information We Do Not Collect",
    body: "SGPACalculator is designed to work entirely in your browser. The marks, credits, grades and results you enter into any calculator are processed on your device and are never transmitted to, stored on, or visible to our servers. We do not require an account, and we do not ask for your name, email address, phone number or student ID to use any tool.",
  },
  {
    title: "2. Automatically Collected Technical Data",
    body: "Like virtually all websites, our hosting provider may automatically log standard technical information when you visit, such as your IP address, browser type, device type, the pages you viewed and the time of your visit. This data exists purely for security, uptime monitoring and anonymous traffic analytics, and it cannot be used to identify you personally or to reconstruct the calculations you performed.",
  },
  {
    title: "3. Cookies and Local Storage",
    body: "We use minimal browser storage (cookies or local storage) only to remember non-personal preferences that improve your experience — for example, which calculator tab you last used. We do not use tracking pixels, fingerprinting, or cross-site advertising cookies. You can clear or block storage in your browser settings at any time without breaking any calculator.",
  },
  {
    title: "4. Third-Party Services",
    body: "This site is hosted on a professional hosting platform (such as Vercel) which may process technical request data under its own privacy policy. If we enable an anonymised analytics service in future, it will be documented here. We never sell, rent, trade or share your data with advertisers, data brokers or universities.",
  },
  {
    title: "5. Children's Privacy",
    body: "Our tools are safe for users of all ages, including school students. Because we do not collect personal information, no data from children under 13 is knowingly gathered. If you believe a child has contacted us directly by email, we will delete that correspondence on request.",
  },
  {
    title: "6. Data Security",
    body: "The site is served over HTTPS, so everything between your browser and our servers is encrypted. Since your calculation inputs never leave your device, there is no server-side database of student records to breach in the first place — the most effective form of data protection.",
  },
  {
    title: "7. Your Rights",
    body: "Regardless of where you live, you may contact us to ask whether any personal data associated with you exists (in normal operation it does not), request its deletion, or ask questions about this policy. Because we hold no personal profiles, most requests can be confirmed as 'nothing to delete' — and we will still confirm that in writing.",
  },
  {
    title: "8. Changes to This Policy",
    body: "If we ever add features that change how data is handled (for example, optional cloud saving of semester records), we will update this page with a new revision date and describe the change in plain language before it takes effect.",
  },
  {
    title: "9. Contact About Privacy",
    body: `Questions, concerns or requests about privacy can be sent to ${CONTACT_EMAIL}. We aim to respond to all privacy enquiries within 48 hours.`,
  },
];

export function PrivacySection() {
  return (
    <section id="privacy" aria-labelledby="privacy-heading" className="scroll-mt-24">
      <div className="flex items-center gap-2 text-emerald-700 mb-3">
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        <span className="text-sm font-semibold uppercase tracking-wider">Legal</span>
      </div>
      <h2 id="privacy-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
        Privacy Policy
      </h2>
      <p className="mt-3 max-w-4xl text-sm text-muted-foreground">
        Last updated: January 2025 · Applies to all calculators and pages on this website.
      </p>

      <Card className="mt-5 max-w-4xl border-emerald-200 bg-emerald-50/60">
        <CardContent className="p-5 flex gap-3">
          <Lock className="h-5 w-5 shrink-0 mt-0.5 text-emerald-700" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-emerald-900">
            <strong>The short version:</strong> every calculation you make here happens inside your
            own browser. We never see your marks, never build a profile of you, and never sell
            anything. This page explains the few technical details that remain.
          </p>
        </CardContent>
      </Card>

      <div className="mt-6 max-w-4xl space-y-5">
        {SECTIONS.map((section) => (
          <article key={section.title} className="space-y-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <FileText className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
              {section.title}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
