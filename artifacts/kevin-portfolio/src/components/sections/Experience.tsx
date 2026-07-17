import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-[100dvh] flex flex-col justify-center py-24 px-6 md:px-12 lg:px-20"
      style={{ maxWidth: '90rem', margin: '0 auto', width: '100%' }}
    >
      {/* Section label */}
      <div className="reveal-item mb-16">
        <span className="eyebrow">[ 02 ] — Experience</span>
      </div>

      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <div
            key={exp.id}
            className="reveal-item"
            style={{ borderTop: '1px solid #111', paddingTop: '3rem', paddingBottom: '3rem' }}
          >
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
              {/* Left — role + details */}
              <div>
                <h3
                  className="display-heading mb-3"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#efefef' }}
                >
                  {exp.role}
                </h3>

                <p className="eyebrow mb-8" style={{ color: '#2e2e2e' }}>
                  {exp.company} &nbsp;·&nbsp; {exp.type} &nbsp;·&nbsp; {exp.period}
                </p>

                <ul className="space-y-2.5 mb-7">
                  {exp.description.map((desc, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 leading-relaxed"
                      style={{ color: '#606060', fontSize: '0.875rem' }}
                    >
                      <span style={{ color: '#242424', marginTop: '0.2rem', flexShrink: 0 }}>—</span>
                      {desc}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="font-sans"
                      style={{
                        fontSize: '0.625rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#333',
                        border: '1px solid #181818',
                        padding: '0.2rem 0.75rem',
                        borderRadius: '999px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — period pill */}
              <span
                className="eyebrow whitespace-nowrap hidden md:block"
                style={{ paddingTop: '0.4rem' }}
              >
                {exp.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
