"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT_EMAIL } from "@/lib/calculator-utils";
import { Clock, Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TOPICS = [
  { value: "bug", label: "Report a bug or wrong result" },
  { value: "feature", label: "Request a new calculator or feature" },
  { value: "formula", label: "Ask about a university formula" },
  { value: "feedback", label: "General feedback" },
  { value: "other", label: "Something else" },
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("feedback");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Please complete the form",
        description: "Your name and a short message are required.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(`[SGPACalculator] ${TOPICS.find((t) => t.value === topic)?.label ?? "Enquiry"} — ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim() || "Not provided"}\nTopic: ${
        TOPICS.find((t) => t.value === topic)?.label ?? "General"
      }\n\n${message.trim()}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast({
      title: "Opening your email app…",
      description: `Your message is pre-addressed to ${CONTACT_EMAIL}. We reply within 24–48 hours.`,
    });
    setTimeout(() => setSending(false), 800);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24">
      <div className="flex items-center gap-2 text-emerald-700 mb-3">
        <MessageSquare className="h-5 w-5" aria-hidden="true" />
        <span className="text-sm font-semibold uppercase tracking-wider">Contact Us</span>
      </div>
      <h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold tracking-tight">
        Contact Us — We Reply Within 24–48 Hours
      </h2>
      <div className="mt-4 max-w-4xl space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          Found a formula that does not match your university? Want a new calculator added? Or just
          want to say it helped? We genuinely read every email. Reach us directly at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-medium text-emerald-700 underline underline-offset-2 break-all hover:text-emerald-800"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          or use the form below — it opens your email app with everything pre-filled.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3 max-w-4xl">
        <Card className="border-emerald-100 lg:col-span-2">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Your name *</Label>
                  <Input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Your email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-topic">What is this about?</Label>
                <Select value={topic} onValueChange={setTopic}>
                  <SelectTrigger id="contact-topic" aria-label="Contact topic">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {TOPICS.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need — include your university name if you are asking about a formula."
                  rows={5}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {sending ? "Opening email…" : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-emerald-100">
            <CardContent className="p-5 space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold">Email us directly</h3>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-medium text-emerald-700 underline underline-offset-2 break-all"
              >
                {CONTACT_EMAIL}
              </a>
              <p className="text-sm text-muted-foreground">
                The fastest way to reach us. Attach your marksheet if you are reporting a
                calculation question — it helps us spot the exact formula difference.
              </p>
            </CardContent>
          </Card>
          <Card className="border-emerald-100">
            <CardContent className="p-5 space-y-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold">Response time</h3>
              <p className="text-sm text-muted-foreground">
                We usually reply within <strong className="text-foreground">24–48 hours</strong> on
                working days. Feature requests take a little longer, but every one of them gets a
                response.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
