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
        <span className="eyebrow">[ 01 ] — About</span>
      </div>

      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Left — display heading + bio */}
        <div>
          <h2
            className="display-heading reveal-item mb-10"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', color: '#efefef' }}
          >
            Based in Indonesia,{' '}
            <em style={{ color: '#2a2a2a', fontStyle: 'italic' }}>building for the web.</em>
          </h2>

          <div className="space-y-5">
            <p className="reveal-item leading-relaxed" style={{ color: '#606060', fontSize: '0.9375rem' }}>
              I'm a Software Engineer based in {profile.location}. My work centers around architecting
              and building practical software systems that solve real-world problems.
            </p>
            <p className="reveal-item leading-relaxed" style={{ color: '#606060', fontSize: '0.9375rem' }}>
              I specialize in both frontend UI engineering and backend infrastructure — constructing
              full-stack applications with a focus on maintainability, performance, and clean code
              principles. From relational database design to polished DOM interactions, I own the
              full lifecycle.
            </p>
            <p className="reveal-item leading-relaxed" style={{ color: '#606060', fontSize: '0.9375rem' }}>
              My current focus is expanding into open-source contribution while delivering production-grade
              systems that stand the test of real operational load.
            </p>
          </div>
        </div>

        {/* Right — fact table */}
        <div className="space-y-0">
          {facts.map(({ label, value }) => (
            <div
              key={label}
              className="reveal-item py-5"
              style={{ borderTop: '1px solid #111' }}
            >
              <span className="eyebrow block mb-2">{label}</span>
              <p style={{ color: '#888', fontSize: '0.875rem' }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
