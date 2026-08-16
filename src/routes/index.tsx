import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SCHEMES, INDUSTRIES, type Scheme } from "@/data/schemes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Udyog Sahay — Govt Scheme Directory for MSMEs & Industry" },
      {
        name: "description",
        content:
          "A searchable directory of 35 Central and Gujarat government schemes, subsidies, guarantees and incentives for MSMEs — compiled by a practising Chartered Accountant.",
      },
      { property: "og:title", content: "Udyog Sahay — Govt Scheme Directory for MSMEs & Industry" },
      {
        property: "og:description",
        content:
          "A searchable directory of 35 Central and Gujarat government schemes, subsidies, guarantees and incentives for MSMEs — compiled by a practising Chartered Accountant.",
      },
    ],
  }),
  component: Index,
});

const EMAIL = "capratikmehta2017@gmail.com";

function Seal() {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-gold text-gold">
      <div className="flex size-11 flex-col items-center justify-center rounded-full border border-gold/60 font-mono text-[9px] leading-none tracking-[0.12em]">
        <span>ઉદ્યોગ</span>
        <span className="mt-0.5 text-[8px] opacity-80">SAHAY</span>
      </div>
    </div>
  );
}

function LevelBadge({ level }: { level: Scheme["level"] }) {
  const isCentral = level === "Central";
  return (
    <span
      className="eyebrow inline-flex items-center rounded-full px-2.5 py-1 font-medium text-paper"
      style={{ backgroundColor: isCentral ? "var(--green-ok)" : "var(--gujarat)" }}
    >
      {isCentral ? "Central Govt" : "Gujarat Govt"}
    </span>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<"All" | "Central" | "Gujarat">("All");
  const [industry, setIndustry] = useState<string | null>(null);
  const [active, setActive] = useState<Scheme | null>(null);

  const sectorCount = useMemo(
    () => new Set(SCHEMES.flatMap((s) => s.industries)).size,
    [],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCHEMES.filter((s) => {
      if (level !== "All" && s.level !== level) return false;
      if (industry && !s.industries.includes(industry)) return false;
      if (!q) return true;
      return [s.name, s.desc, s.agency, s.benefit, s.industries.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, level, industry]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Scheme enquiry — ${get("name")}${get("company") ? ` (${get("company")})` : ""}`,
          name: get("name"),
          email: get("email"),
          company: get("company"),
          industry: get("industry"),
          message: get("query"),
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };


  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Masthead */}
      <header className="bg-navy text-paper">
        <div className="mx-auto max-w-6xl px-5 pt-6 pb-10">
          <div className="flex flex-wrap items-start justify-between gap-6 border-b border-gold/40 pb-5">
            <div className="flex items-center gap-4">
              <Seal />
              <div>
                <div className="font-serif text-2xl font-bold tracking-tight">Udyog Sahay</div>
                <div className="eyebrow mt-1 text-gold">
                  Government Scheme Directory · MSME &amp; Industry
                </div>
              </div>
            </div>
            <div className="max-w-[16rem] text-right">
              <div className="eyebrow text-gold">Compiled by</div>
              <p className="mt-1 text-sm text-paper/75">
                A practising Chartered Accountant, as a reference tool for business owners and their
                advisors.
              </p>
            </div>
          </div>
          <div className="rule-double mb-8" />

          <h1 className="max-w-3xl font-serif text-3xl leading-tight font-bold sm:text-5xl">
            Every subsidy, guarantee and incentive your industry qualifies for
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/70 sm:text-base">
            A consolidated, searchable record of Central and Gujarat State schemes for
            manufacturing, services, exports, startups and traditional industry — with eligibility,
            benefit and the official portal for each.
          </p>

          <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-px overflow-hidden border border-gold/30 bg-gold/30 sm:grid-cols-3">
            {[
              ["Schemes Listed", String(SCHEMES.length)],
              ["Sectors Covered", String(sectorCount)],
              ["Jurisdictions", "2"],
            ].map(([label, value]) => (
              <div key={label} className="bg-navy px-5 py-4">
                <dt className="eyebrow text-gold">{label}</dt>
                <dd className="mt-1 font-serif text-3xl font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Search + filters */}
      <div className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search schemes, agencies, benefits…"
              aria-label="Search schemes"
              className="w-full flex-1 border border-line bg-card px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/25"
            />
            <div className="flex shrink-0 border border-line bg-card">
              {(["All", "Central", "Gujarat"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`eyebrow px-4 py-2.5 transition-colors ${
                    level === l ? "bg-navy text-paper" : "text-ink/60 hover:bg-paper-2"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {INDUSTRIES.map((ind) => {
              const on = industry === ind;
              return (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setIndustry(on ? null : ind)}
                  className={`eyebrow rounded-full border px-3 py-1.5 transition-colors ${
                    on
                      ? "border-navy bg-navy text-paper"
                      : "border-line bg-paper-2 text-ink/70 hover:border-gold hover:text-navy"
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>

          <div className="eyebrow mt-3 text-ink/50">
            {results.length} of {SCHEMES.length} schemes
            {industry ? ` · ${industry}` : ""}
          </div>
        </div>
      </div>

      {/* Cards */}
      <main className="mx-auto max-w-6xl px-5 py-10">
        {results.length === 0 ? (
          <div className="border border-dashed border-line bg-card px-6 py-20 text-center">
            <p className="font-serif text-xl font-bold text-navy">No schemes match that filter</p>
            <p className="mt-2 text-sm text-ink/60">
              Try clearing the industry chip or widening the jurisdiction toggle.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5">
            {results.map((s) => (
              <article
                key={s.code}
                role="button"
                tabIndex={0}
                onClick={() => setActive(s)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(s);
                  }
                }}
                className="flex cursor-pointer flex-col border border-line bg-card p-5 transition-shadow hover:border-gold hover:shadow-[0_6px_0_-2px_var(--gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="flex items-start justify-between gap-3">
                  <LevelBadge level={s.level} />
                  <span className="eyebrow text-ink/40">{s.code}</span>
                </div>
                <h3 className="mt-3 font-serif text-lg leading-snug font-bold text-navy">
                  {s.name}
                </h3>
                <p className="eyebrow mt-1.5 text-ink/45 normal-case">{s.agency}</p>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/70">{s.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.industries.slice(0, 3).map((i) => (
                    <span
                      key={i}
                      className="eyebrow rounded-sm bg-paper-2 px-2 py-1 text-ink/55"
                    >
                      {i}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-line pt-3 pt-4">
                  <span className="text-sm font-semibold text-navy">{s.benefit}</span>
                  <span className="eyebrow shrink-0 text-gold-deep">View details →</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Contact */}
      <section className="border-t-[3px] border-double border-gold bg-navy text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2">
          <div>
            <div className="eyebrow text-gold">Enquiries</div>
            <h2 className="mt-2 font-serif text-3xl font-bold">
              Not sure which schemes your unit qualifies for?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70">
              Send the details of your business and the support you're looking for. You'll get a
              considered reply on the schemes worth pursuing, the documentation involved, and the
              realistic timelines — from a practising Chartered Accountant.
            </p>
            <p className="eyebrow mt-6 text-paper/50">{EMAIL}</p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-3">
            {[
              { name: "name", label: "Name", type: "text", required: true },
              { name: "company", label: "Company", type: "text", required: false },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "industry", label: "Industry", type: "text", required: false },
            ].map((f) => (
              <label key={f.name} className="block">
                <span className="eyebrow text-gold">{f.label}</span>
                <input
                  name={f.name}
                  type={f.type}
                  required={f.required}
                  className="mt-1 w-full border border-paper/20 bg-navy-deep px-3 py-2.5 text-sm text-paper outline-none focus:border-gold"
                />
              </label>
            ))}
            <label className="block">
              <span className="eyebrow text-gold">Query</span>
              <textarea
                name="query"
                rows={4}
                required
                className="mt-1 w-full border border-paper/20 bg-navy-deep px-3 py-2.5 text-sm text-paper outline-none focus:border-gold"
              />
            </label>
            <button
              type="submit"
              className="eyebrow mt-1 justify-self-start bg-gold px-6 py-3 font-medium text-navy-deep transition-colors hover:bg-gold-deep hover:text-paper"
            >
              Send enquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep text-paper/60">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="eyebrow text-gold">Disclaimer</div>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed">
            <strong className="text-paper">Udyog Sahay</strong> is an independent reference compiled
            for informational purposes only. Scheme names, subsidy rates, ceilings and eligibility
            norms are revised by government notification from time to time — always verify current
            terms on the issuing department's official portal or with a professional advisor before
            applying or relying on any figure shown here. This is not an official government website
            and does not process applications.
          </p>
          <p className="eyebrow mt-6 border-t border-paper/10 pt-5 text-paper/45">
            Compiled by a practising Chartered Accountant
          </p>
        </div>
      </footer>

      {active && <SchemeModal scheme={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function SchemeModal({ scheme, onClose }: { scheme: Scheme; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-deep/70 p-4 py-10 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={scheme.name}
    >
      <div
        className="w-full max-w-2xl border border-line bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b-[3px] border-double border-gold bg-paper px-6 py-5">
          <div>
            <div className="flex items-center gap-3">
              <LevelBadge level={scheme.level} />
              <span className="eyebrow text-ink/40">{scheme.code}</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl leading-snug font-bold text-navy">
              {scheme.name}
            </h2>
            <p className="eyebrow mt-1.5 text-ink/45 normal-case">{scheme.agency}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 border border-line px-2.5 py-1 font-mono text-sm text-ink/50 hover:border-gold hover:text-navy"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div className="flex flex-wrap gap-1.5">
            {scheme.industries.map((i) => (
              <span key={i} className="eyebrow rounded-sm bg-paper-2 px-2 py-1 text-ink/55">
                {i}
              </span>
            ))}
          </div>

          <div className="border-l-2 border-gold bg-paper-2/60 px-4 py-3">
            <div className="eyebrow text-gold-deep">Headline benefit</div>
            <p className="mt-1 font-semibold text-navy">{scheme.benefit}</p>
          </div>

          {[
            ["Overview", scheme.desc],
            ["Eligibility", scheme.eligibility],
            ["How to apply", scheme.apply],
          ].map(([label, text]) => (
            <div key={label}>
              <div className="eyebrow text-ink/40">{label}</div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/80">{text}</p>
            </div>
          ))}

          <a
            href={scheme.link}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow inline-block bg-navy px-5 py-3 font-medium text-paper transition-colors hover:bg-navy-deep"
          >
            Official portal →
          </a>

          <p className="border-t border-dashed border-line pt-4 text-xs leading-relaxed text-ink/50">
            Figures and eligibility conditions are indicative and subject to periodic government
            revision. Verify current terms on the official portal or with your Chartered Accountant
            before relying on this for a business decision.
          </p>
        </div>
      </div>
    </div>
  );
}
