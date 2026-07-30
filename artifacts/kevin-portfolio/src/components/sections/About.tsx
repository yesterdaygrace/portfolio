import { profile } from "@/data/profile";

export default function About() {
  const facts = [
    { label: "Role",     value: profile.role },
    { label: "Focus",    value: "Full-Stack Web Applications" },
    { label: "Status",   value: profile.availability },
    { label: "Location", value: profile.location },
  ];

  return (
    <section
      id="about"
      className="min-h-[100dvh] flex flex-col justify-center py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: '90rem', margin: '0 auto', width: '100%' }}
    >
      {/* Section label */}
      <div className="reveal-item mb-16">
        <span className="font-sans text-[11px] uppercase tracking-[0.16em] block mb-4" style={{ color: '#606060' }}>[01] — About</span>
        <div className="w-full" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />
      </div>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Left — display heading + bio */}
        <div>
          <h2
            className="font-display leading-none tracking-tight reveal-item mb-10"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: '#F5F5F5' }}
          >
            Based in Indonesia,{' '}
            <em style={{ color: '#404040', fontStyle: 'italic', fontWeight: 300 }}>building for the web.</em>
          </h2>
          <div className="space-y-5">
            <p className="reveal-item leading-relaxed" style={{ color: '#C8C8C8', fontSize: '0.9375rem', lineHeight: '1.8', maxWidth: '38rem' }}>
             Informatics Engineering graduate from Universitas Kristen Satya Wacana
             with 1 year and 5 months of internship experience as a Full Stack Web Developer
            </p>
            <p className="reveal-item leading-relaxed" style={{ color: '#C8C8C8', fontSize: '0.9375rem', lineHeight: '1.8', maxWidth: '38rem' }}>
              Experienced in developing and maintaining DAPENSE (Pension Fund Information System), working on modules such as General Ledger, Journal Processing, Cash & Bank Transactions, Financial Reporting, and Balance Reconciliation. Gained hands-on experience with Laravel, PHP, JavaScript, MySQL, RESTful APIs, database design, RBAC, Linux, Git, and system testing through real-world project development.
            </p>
            <p className="reveal-item leading-relaxed" style={{ color: '#C8C8C8', fontSize: '0.9375rem', lineHeight: '1.8', maxWidth: '38rem' }}>
            Passionate about building scalable and maintainable web applications, solving technical problems, and continuously learning new technologies.
            </p>
          </div>
        </div>

        {/* Right — fact table */}
        <div className="space-y-0">
          {facts.map(({ label, value }) => (
            <div
              key={label}
              className="reveal-item py-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.16em] block mb-2" style={{ color: '#606060' }}>{label}</span>
              <p style={{ color: '#C8C8C8', fontSize: '0.9375rem', lineHeight: '1.6' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
