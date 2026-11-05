import {
  profile,
  experience,
  skills,
  languages,
  education,
  projects,
  outsideWork,
} from "@/content/resume";
import { SmartLink } from "@/components/SmartLink";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const pdfName = "jakub-slatinsky-resume.pdf";

export default function ResumePage() {
  return (
    <main className="page">
      <header className="hero">
        <img className="photo" src={`${basePath}/jakub.jpg`} alt={profile.name} width={144} height={144} />
        <div>
          <h1>{profile.name}</h1>
          <p className="headline">
            {profile.headline} <span className="muted">({profile.headlineNote})</span>
          </p>
          <ul className="tags">
            {profile.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </header>

      <ul className="contact">
        <li>{profile.location}</li>
        <li>{profile.workPreference}</li>
        <li>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
        </li>
        <li>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        <li>
          <a href={`https://github.com/${profile.github}`}>github.com/{profile.github}</a>
        </li>
        <li className="print-only">{profile.website}</li>
        <li className="screen-only">
          <a href={`${basePath}/${pdfName}`} download>
            Download PDF
          </a>
        </li>
      </ul>

      <section>
        <p className="summary">{profile.summary}</p>
      </section>

      <section>
        <h2>Experience</h2>
        <ol className="roles">
          {experience.map((r) => (
            <li key={`${r.company}-${r.start}`} className="role">
              <div className="role-head">
                <h3>
                  {r.title} <span className="at">·</span> {r.company}
                  {r.companyNote && <span className="muted"> ({r.companyNote})</span>}
                </h3>
                <span className="dates">
                  {r.start} – {r.end}
                </span>
              </div>
              <p>{r.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="columns">
        <section>
          <h2>Skills</h2>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.area}>
                <dt>{s.area}</dt>
                <dd>{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2>Languages</h2>
          <ul className="plain">
            {languages.map((l) => (
              <li key={l.name}>
                <strong>{l.name}</strong> <span className="muted">· {l.level}</span>
              </li>
            ))}
          </ul>

          <h2>Education</h2>
          <ul className="plain">
            {education.map((e) => (
              <li key={e.school}>
                <strong>{e.school}</strong>
                <br />
                <span className="muted">
                  {e.detail} · {e.years}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h2>Projects</h2>
        <ul className="projects">
          {projects.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong> — {p.description}
              {p.href && (
                <>
                  {" "}
                  <span className="screen-only">
                    <SmartLink href={p.href}>{p.linkLabel ?? "Link"} →</SmartLink>
                  </span>
                  {p.printLink && <span className="print-only muted">({p.printLink})</span>}
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Outside work</h2>
        <p>{outsideWork}</p>
      </section>
    </main>
  );
}
