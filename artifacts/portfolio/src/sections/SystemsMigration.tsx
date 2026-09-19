import { useState } from "react";
import {
  ChapterHeader,
  Kicker,
  AccentRule,
  PinAnnotation,
} from "@/components/vellum/VellumComponents";

export default function SystemsMigration() {
  const [mobileTab, setMobileTab] = useState<"after" | "before">("after");

  const metrics = [
    { value: "+30–40%", label: "Operational Efficiency", detail: "Automated GL, journal entries & reporting" },
    { value: "−25–30%", label: "Manual Input Errors", detail: "Multi-layer schema & workflow validation" },
    { value: "0", label: "Production Downtime", detail: "Nginx reverse proxy with zero-downtime deploys" },
  ];

  return (
    <section id="systems" className="vellum-section">
      <ChapterHeader
        number="04"
        title="Systems Migration"
        category="Case Study · Core Engineering"
      />

      <div className="mb-12">
        <Kicker>Dana Pensiun Sekolah Kristen · 2024 — 2025</Kicker>
        <h2
          className="font-display italic text-3xl sm:text-5xl lg:text-6xl mb-6 leading-[1.05]"
          style={{ color: "var(--c-fg)" }}
        >
          Replacing legacy DOS with <em>resilient web architecture</em>.
        </h2>
        <p
          className="font-sans text-base sm:text-lg leading-relaxed max-w-3xl"
          style={{ color: "var(--c-fg-2)" }}
        >
          Sole developer responsible for sunsetting a legacy VDOS/DOS desktop
          accounting platform and deploying an auditable, multi-user web
          system with normalized relational financial schemas and role-based
          access controls.
        </p>
        <AccentRule />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 mb-12 border-y border-[rgba(232,216,92,0.18)]">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col">
            <span
              className="font-display italic text-3xl sm:text-4xl lg:text-5xl mb-2"
              style={{ color: "var(--c-fg)" }}
            >
              {m.value}
            </span>
            <span
              className="font-mono text-xs uppercase tracking-wider mb-1"
              style={{ color: "var(--c-emphasis)" }}
            >
              {m.label}
            </span>
            <span
              className="font-sans text-xs"
              style={{ color: "var(--c-fg-2)" }}
            >
              {m.detail}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile View Toggle */}
      <div className="flex md:hidden items-center border border-[var(--c-border)] mb-4 p-1 bg-[var(--c-bg-deep)] font-mono text-xs">
        <button
          type="button"
          onClick={() => setMobileTab("after")}
          className="flex-1 py-2 text-center transition-colors"
          style={{
            backgroundColor: mobileTab === "after" ? "var(--c-emphasis)" : "transparent",
            color: mobileTab === "after" ? "#1F2858" : "var(--c-fg-2)",
            fontWeight: mobileTab === "after" ? 700 : 400,
          }}
        >
          After: Cloud Architecture
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("before")}
          className="flex-1 py-2 text-center transition-colors"
          style={{
            backgroundColor: mobileTab === "before" ? "var(--c-accent)" : "transparent",
            color: mobileTab === "before" ? "#1F2858" : "var(--c-fg-2)",
            fontWeight: mobileTab === "before" ? 700 : 400,
          }}
        >
          Before: Legacy DOS
        </button>
      </div>

      {/* Vellum Side-by-Side Compare Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[rgba(232,216,92,0.20)] mb-12">
        {/* Left Panel - Deep Navy */}
        <div
          className={`vellum-compare-dark p-6 sm:p-10 border-b md:border-b-0 md:border-r border-[rgba(232,216,92,0.20)] ${
            mobileTab === "before" ? "block" : "hidden md:block"
          }`}
        >
          <span
            className="font-mono text-xs uppercase tracking-widest block mb-3"
            style={{ color: "var(--c-fg-2)" }}
          >
            Before · Legacy State
          </span>
          <h3
            className="font-display italic text-2xl sm:text-3xl mb-4"
            style={{ color: "var(--c-fg)" }}
          >
            On-Premise VDOS Terminal
          </h3>
          <p
            className="font-sans text-sm leading-relaxed mb-6"
            style={{ color: "var(--c-fg-2)" }}
          >
            Financial accounting locked inside physical terminals running
            virtual DOS. No audit logs, zero remote access, and brittle manual
            data integrity checks.
          </p>
          <ul className="space-y-3 font-sans text-xs sm:text-sm">
            <li className="flex items-start gap-2.5" style={{ color: "var(--c-fg-2)" }}>
              <span className="font-mono text-[var(--c-accent)] flex-shrink-0">01.</span>
              <span>Inaccessible outside single on-premise hardware setup.</span>
            </li>
            <li className="flex items-start gap-2.5" style={{ color: "var(--c-fg-2)" }}>
              <span className="font-mono text-[var(--c-accent)] flex-shrink-0">02.</span>
              <span>High error frequency during period-end reconciliation.</span>
            </li>
            <li className="flex items-start gap-2.5" style={{ color: "var(--c-fg-2)" }}>
              <span className="font-mono text-[var(--c-accent)] flex-shrink-0">03.</span>
              <span>No granular permissions or role-based operator boundaries.</span>
            </li>
            <li className="flex items-start gap-2.5" style={{ color: "var(--c-fg-2)" }}>
              <span className="font-mono text-[var(--c-accent)] flex-shrink-0">04.</span>
              <span>Manual journal entries without immutable audit trails.</span>
            </li>
          </ul>
        </div>

        {/* Right Panel - Mid Navy */}
        <div
          className={`vellum-compare-light p-6 sm:p-10 ${
            mobileTab === "after" ? "block" : "hidden md:block"
          }`}
        >
          <span
            className="font-mono text-xs uppercase tracking-widest block mb-3"
            style={{ color: "var(--c-emphasis)" }}
          >
            After · Modern Web Architecture
          </span>
          <h3
            className="font-display italic text-2xl sm:text-3xl mb-4"
            style={{ color: "var(--c-fg)" }}
          >
            Auditable Web Application
          </h3>
          <p
            className="font-sans text-sm leading-relaxed mb-6"
            style={{ color: "var(--c-fg)" }}
          >
            Browser-accessible Laravel & MySQL system deployed on Linux/Nginx.
            Normalized schemas for general ledger, bank balances, and reports.
          </p>
          <ul className="space-y-3 font-sans text-xs sm:text-sm">
            <li className="flex items-start gap-2.5" style={{ color: "var(--c-fg)" }}>
              <span className="font-mono text-[var(--c-emphasis)] flex-shrink-0">01.</span>
              <span>Secure, role-based access for accounting, review, and admin.</span>
            </li>
            <li className="flex items-start gap-2.5" style={{ color: "var(--c-fg)" }}>
              <span className="font-mono text-[var(--c-emphasis)] flex-shrink-0">02.</span>
              <span>Automated period-end balance validation and multi-layer checks.</span>
            </li>
            <li className="flex items-start gap-2.5" style={{ color: "var(--c-fg)" }}>
              <span className="font-mono text-[var(--c-emphasis)] flex-shrink-0">03.</span>
              <span>Immutable audit logs and reproducible ledger export.</span>
            </li>
            <li className="flex items-start gap-2.5" style={{ color: "var(--c-fg)" }}>
              <span className="font-mono text-[var(--c-emphasis)] flex-shrink-0">04.</span>
              <span>Reverse proxy with SSL/TLS and zero-downtime maintenance.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Visual Architecture Blueprint ───────────────────────────────── */}
      <div className="border border-[var(--c-border)] bg-[var(--c-bg-deep)] p-6 sm:p-8 mb-12">
        <div className="flex items-baseline justify-between pb-3 mb-6 border-b border-[var(--c-border)] font-mono text-xs">
          <span style={{ color: "var(--c-emphasis)" }}>SYSTEM TOPOLOGY &amp; DATA FLOW</span>
          <span style={{ color: "var(--c-accent)" }}>[DAPENSE ARCHITECTURE]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-xs">
          {/* Runtime Architecture */}
          <div className="lg:col-span-6 p-4 sm:p-5 border border-[var(--c-border)] bg-[var(--c-bg)]">
            <span className="text-[var(--c-accent)] uppercase block mb-3 font-semibold">
              01 · Multi-Tier Runtime Pipeline
            </span>
            <div className="space-y-2 leading-relaxed text-[var(--c-fg-2)]">
              <div className="p-2 border border-[var(--c-border)] bg-[var(--c-bg-mid)] text-[var(--c-fg)]">
                Authenticated Clients (Web Browser / RBAC Sessions)
              </div>
              <div className="text-center text-[var(--c-accent)] py-0.5">↓ HTTPS / SSL/TLS Reverse Proxy</div>
              <div className="p-2 border border-[var(--c-border)] bg-[var(--c-bg-mid)] text-[var(--c-fg)]">
                Nginx (Rate Limiting · Static Assets · Reverse Proxy)
              </div>
              <div className="text-center text-[var(--c-accent)] py-0.5">↓ FastCGI / PHP 8+ FPM</div>
              <div className="p-2.5 border border-[rgba(232,216,92,0.25)] bg-[var(--c-bg-deep)] text-[var(--c-emphasis)]">
                <div className="font-semibold mb-1">Laravel Core Application</div>
                <div className="text-[11px] text-[var(--c-fg-2)] space-y-0.5">
                  <div>· Multi-module Ledger &amp; Journal Processing</div>
                  <div>· Cash &amp; Bank Transaction Engine</div>
                  <div>· Automated Period-End Balance Validation</div>
                  <div>· Financial Reporting Aggregations</div>
                </div>
              </div>
              <div className="text-center text-[var(--c-accent)] py-0.5">↓ PDO / Transactional Queries</div>
              <div className="p-2 border border-[var(--c-border)] bg-[var(--c-bg-mid)] text-[var(--c-fg)]">
                MySQL (3NF Normalized Schemas · Indexed Foreign Keys · Audit Tables)
              </div>
            </div>
          </div>

          {/* Process Transformation */}
          <div className="lg:col-span-6 p-4 sm:p-5 border border-[var(--c-border)] bg-[var(--c-bg)]">
            <span className="text-[var(--c-accent)] uppercase block mb-3 font-semibold">
              02 · Workflow Process Transformation
            </span>
            <div className="space-y-3 text-[var(--c-fg-2)] text-xs">
              <div className="p-3 border border-[rgba(232,216,92,0.14)] bg-[var(--c-bg-deep)]">
                <div className="text-[var(--c-fg)] font-semibold mb-1">Legacy VDOS Accounting:</div>
                <p className="text-[11px] leading-relaxed">
                  Single-workstation physical access lock → Manual error-prone journal transcription → Paper reconciliation.
                </p>
              </div>
              <div className="text-center text-[var(--c-accent)] py-0.5 font-sans italic text-sm">
                ↓ Architectural Modernization &amp; Process Re-engineering
              </div>
              <div className="p-3 border border-[rgba(114,196,196,0.30)] bg-[var(--c-bg-mid)]">
                <div className="text-[var(--c-emphasis)] font-semibold mb-1">Modernized Web Platform:</div>
                <p className="text-[11px] leading-relaxed text-[var(--c-fg)]">
                  Role-based web access → Automated balance verification &amp; multi-layer validation → Immediate reproducible financial ledger reporting.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-[var(--c-accent)] leading-relaxed">
                Result: Documented operational efficiency improvements across month-end closing, auditable ledgers, and zero loss of legacy records.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
        <PinAnnotation
          counter="DAPENSE / 2025"
          note="Fullstack contract: schema design, backend business logic & server administration"
          secondaryNote="Tech: Laravel · PHP · MySQL · Nginx · Linux · Tailwind"
        />
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href="https://github.com/yesterdaygrace/DAPENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="vellum-btn"
          >
            DAPENSE Repo ↗
          </a>
          <a href="#stack" className="vellum-btn">
            Capabilities Ledger ↓
          </a>
        </div>
      </div>
    </section>
  );
}
