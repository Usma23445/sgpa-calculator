import { CONTACT_EMAIL } from "@/lib/calculator-utils";
import { Calculator, Mail } from "lucide-react";

const TOOL_LINKS = [
  { href: "#calculators", label: "SGPA Calculator" },
  { href: "#calculators", label: "CGPA Calculator" },
  { href: "#calculators", label: "GPA Calculator (4.0)" },
  { href: "#calculators", label: "SGPA to Percentage" },
  { href: "#calculators", label: "Grade Calculator" },
];

const PAGE_LINKS = [
  { href: "#guide", label: "How to Calculate SGPA" },
  { href: "#grading-scale", label: "Grading Scale" },
  { href: "#faq", label: "FAQ" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact Us" },
  { href: "#privacy", label: "Privacy Policy" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <a href="#top" className="flex items-center gap-2 font-bold text-lg text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Calculator className="h-5 w-5" aria-hidden="true" />
              </span>
              SGPACalculator
            </a>
            <p className="text-sm leading-relaxed text-slate-400">
              Free, accurate and student-friendly GPA tools. Calculate SGPA, CGPA, percentage and
              grades in seconds — no sign-up, no limits.
            </p>
          </div>

          <nav aria-label="Footer tools">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Tools</h2>
            <ul className="mt-4 space-y-2.5">
              {TOOL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer pages">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Resources</h2>
            <ul className="mt-4 space-y-2.5">
              {PAGE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors break-all"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
            <p className="text-sm text-slate-400">
              We usually reply within 24–48 hours on working days.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SGPACalculator. All rights reserved.</p>
          <p>Made with care for students everywhere. Results are indicative — always confirm with your institution.</p>
        </div>
      </div>
    </footer>
  );
}
