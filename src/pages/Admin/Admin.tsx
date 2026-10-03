import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { ArrowDown, ArrowUp, ExternalLink, LogOut, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import "./Admin.css";
import { configProblem, supabase } from "../../lib/supabase";
import { loadResume, saveResume } from "../../lib/resumeStore";
import { useResume } from "../../context/ResumeContext";
import type { Education, Experience, ResumeData, ResumeProject, SkillGroup, Training } from "../../types/Resume";

/* =========================================================
   Admin page
   - Sign in with Supabase email + password
   - Edit every part of the resume in forms
   - Save writes to the database; the public site updates immediately
   ========================================================= */

export default function AdminPage(): React.ReactElement {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  let content: ReactNode;
  if (!supabase) content = <SetupNotice />;
  else if (checking) content = <p className="admin-muted admin-center">Loading…</p>;
  else if (!session) content = <LoginForm />;
  else content = <Editor email={session.user.email ?? ""} />;

  return (
      <div className="admin">
        <header className="admin-topbar">
          <Link to="/" className="admin-brand">
            ← Back to site
          </Link>
          <span className="admin-title">Resume editor</span>
        </header>
        <main className="admin-body">{content}</main>
      </div>
  );
}

/* =========================
   Not configured yet
   ========================= */
function SetupNotice(): React.ReactElement {
  return (
      <div className="admin-card admin-narrow">
        <h1>Connect Supabase to start editing</h1>
        {configProblem && (
            <p className="admin-error" role="alert">
              {configProblem}
            </p>
        )}
        <p className="admin-muted">
          The editor needs a Supabase project to store your resume. Add these two variables to a{" "}
          <code>.env</code> file locally and to your Vercel project settings, then restart or redeploy:
        </p>
        <pre className="admin-code">
        VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co{"\n"}VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
      </pre>
        <p className="admin-muted">Full steps are in SETUP-ADMIN.md in the project folder.</p>
      </div>
  );
}

/* =========================
   Sign in
   ========================= */
function LoginForm(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message === "Invalid login credentials" ? "Wrong email or password." : error.message);
  }

  return (
      <form className="admin-card admin-login" onSubmit={onSubmit}>
        <h1>Sign in</h1>
        <p className="admin-muted">Sign in to edit your resume.</p>

        <label className="field">
          <span>Email</span>
          <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="field">
          <span>Password</span>
          <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
        )}

        <button className="admin-btn primary wide" type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
  );
}

/* =========================
   Editor
   ========================= */
type Tab = "profile" | "skills" | "experience" | "projects" | "education" | "training";

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "training", label: "Training" },
];

function Editor({ email }: { email: string }): React.ReactElement {
  const { setResume: publish } = useResume();
  const [saved, setSaved] = useState<ResumeData | null>(null);
  const [draft, setDraft] = useState<ResumeData | null>(null);
  const [tab, setTab] = useState<Tab>("profile");
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  // Load the latest saved version straight from the database
  useEffect(() => {
    loadResume()
        .then((r) => {
          setSaved(r);
          setDraft(r);
        })
        .catch((err: Error) => setStatus({ kind: "error", text: `Could not load resume: ${err.message}` }));
  }, []);

  const dirty = useMemo(() => JSON.stringify(saved) !== JSON.stringify(draft), [saved, draft]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  if (!draft) {
    return <p className="admin-muted admin-center">{status?.text ?? "Loading your resume…"}</p>;
  }

  const update = (patch: Partial<ResumeData>) => {
    setDraft({ ...draft, ...patch });
    setStatus(null);
  };

  async function onSave() {
    if (!draft) return;
    setSaving(true);
    setStatus(null);
    try {
      await saveResume(draft);
      setSaved(draft);
      publish(draft);
      setStatus({ kind: "ok", text: "Saved. Your resume is live." });
    } catch (err) {
      const e = err as { code?: string; message?: string };
      const text =
          e.code === "42501"
              ? `This account (${email}) isn't allowed to edit. The admin email in supabase/schema.sql must match it.`
              : `Save failed: ${e.message ?? "unknown error"}`;
      setStatus({ kind: "error", text });
    } finally {
      setSaving(false);
    }
  }

  async function onSignOut() {
    if (dirty && !window.confirm("You have unsaved changes. Sign out anyway?")) return;
    await supabase?.auth.signOut();
  }

  return (
      <div className="editor">
        {/* Sticky action bar */}
        <div className="editor-bar">
          <div className="editor-who">
            <span className="admin-muted">Signed in as</span> <strong>{email}</strong>
          </div>
          <div className="editor-actions">
            {status && (
                <span className={`editor-status ${status.kind}`} role="status">
              {status.text}
            </span>
            )}
            {!status && dirty && <span className="editor-status">Unsaved changes</span>}
            <a className="admin-btn" href="/about" target="_blank" rel="noreferrer">
              <ExternalLink size={16} /> View
            </a>
            <button className="admin-btn" type="button" onClick={() => saved && setDraft(saved)} disabled={!dirty}>
              <RotateCcw size={16} /> Undo changes
            </button>
            <button className="admin-btn primary" type="button" onClick={onSave} disabled={!dirty || saving}>
              <Save size={16} /> {saving ? "Saving…" : "Save"}
            </button>
            <button className="admin-btn ghost" type="button" onClick={onSignOut} aria-label="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <nav className="editor-tabs" aria-label="Resume sections">
          {TABS.map((t) => (
              <button
                  key={t.id}
                  type="button"
                  className={tab === t.id ? "active" : ""}
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id}
              >
                {t.label}
              </button>
          ))}
        </nav>

        <div className="admin-card">
          {tab === "profile" && <ProfileSection draft={draft} update={update} />}

          {tab === "skills" && (
              <ItemList<SkillGroup>
                  items={draft.skills}
                  onChange={(skills) => update({ skills })}
                  empty={{ title: "", items: [] }}
                  addLabel="Add skill group"
                  itemTitle={(s) => s.title || "New skill group"}
                  render={(s, set) => (
                      <>
                        <TextField label="Group name" value={s.title} onChange={(title) => set({ ...s, title })} />
                        <ListField
                            label="Skills"
                            hint="Separate with commas"
                            separator=","
                            value={s.items}
                            onChange={(items) => set({ ...s, items })}
                        />
                      </>
                  )}
              />
          )}

          {tab === "experience" && (
              <ItemList<Experience>
                  items={draft.experience}
                  onChange={(experience) => update({ experience })}
                  empty={{ title: "", company: "", location: "", dates: "", bullets: [] }}
                  addLabel="Add job"
                  itemTitle={(j) => [j.title, j.company].filter(Boolean).join(" · ") || "New job"}
                  render={(j, set) => (
                      <>
                        <div className="field-row">
                          <TextField label="Job title" value={j.title} onChange={(title) => set({ ...j, title })} />
                          <TextField label="Company" value={j.company} onChange={(company) => set({ ...j, company })} />
                        </div>
                        <div className="field-row">
                          <TextField label="Location" value={j.location} onChange={(location) => set({ ...j, location })} />
                          <TextField
                              label="Dates"
                              placeholder="Mar 2024 – Oct 2024"
                              value={j.dates}
                              onChange={(dates) => set({ ...j, dates })}
                          />
                        </div>
                        <ListField
                            label="Achievements"
                            hint="One per line"
                            separator={"\n"}
                            value={j.bullets}
                            onChange={(bullets) => set({ ...j, bullets })}
                        />
                      </>
                  )}
              />
          )}

          {tab === "projects" && (
              <ItemList<ResumeProject>
                  items={draft.projects}
                  onChange={(projects) => update({ projects })}
                  empty={{ name: "", kind: "", tech: [], repoUrl: "", liveUrl: "", bullets: [] }}
                  addLabel="Add project"
                  itemTitle={(p) => p.name || "New project"}
                  render={(p, set) => (
                      <>
                        <div className="field-row">
                          <TextField label="Project name" value={p.name} onChange={(name) => set({ ...p, name })} />
                          <TextField
                              label="Type"
                              placeholder="Full Stack Application"
                              value={p.kind}
                              onChange={(kind) => set({ ...p, kind })}
                          />
                        </div>
                        <div className="field-row">
                          <TextField label="Code link" value={p.repoUrl} onChange={(repoUrl) => set({ ...p, repoUrl })} />
                          <TextField label="Live demo link" value={p.liveUrl} onChange={(liveUrl) => set({ ...p, liveUrl })} />
                        </div>
                        <ListField
                            label="Technologies"
                            hint="Separate with commas"
                            separator=","
                            value={p.tech}
                            onChange={(tech) => set({ ...p, tech })}
                        />
                        <ListField
                            label="Highlights"
                            hint="One per line"
                            separator={"\n"}
                            value={p.bullets}
                            onChange={(bullets) => set({ ...p, bullets })}
                        />
                      </>
                  )}
              />
          )}

          {tab === "education" && (
              <ItemList<Education>
                  items={draft.education}
                  onChange={(education) => update({ education })}
                  empty={{ degree: "", school: "", dates: "" }}
                  addLabel="Add education"
                  itemTitle={(e) => e.degree || "New education"}
                  render={(e, set) => (
                      <>
                        <TextField label="Degree" value={e.degree} onChange={(degree) => set({ ...e, degree })} />
                        <div className="field-row">
                          <TextField label="School" value={e.school} onChange={(school) => set({ ...e, school })} />
                          <TextField label="Dates" value={e.dates} onChange={(dates) => set({ ...e, dates })} />
                        </div>
                      </>
                  )}
              />
          )}

          {tab === "training" && (
              <ItemList<Training>
                  items={draft.training}
                  onChange={(training) => update({ training })}
                  empty={{ title: "", org: "", dates: "", details: "" }}
                  addLabel="Add training or certificate"
                  itemTitle={(t) => t.title || "New training"}
                  render={(t, set) => (
                      <>
                        <div className="field-row">
                          <TextField label="Title" value={t.title} onChange={(title) => set({ ...t, title })} />
                          <TextField label="Organization" value={t.org} onChange={(org) => set({ ...t, org })} />
                        </div>
                        <div className="field-row">
                          <TextField label="Dates" value={t.dates} onChange={(dates) => set({ ...t, dates })} />
                          <TextField label="Details" value={t.details} onChange={(details) => set({ ...t, details })} />
                        </div>
                      </>
                  )}
              />
          )}
        </div>
      </div>
  );
}

/* =========================
   Profile section
   ========================= */
function ProfileSection({
                          draft,
                          update,
                        }: {
  draft: ResumeData;
  update: (patch: Partial<ResumeData>) => void;
}): React.ReactElement {
  return (
      <div className="fields">
        <fieldset className="design-pick">
          <legend>Page design</legend>
          {(
              [
                { id: "journey", name: "Journey", note: "Big name, a timeline of your path, text-only sections" },
                { id: "cards", name: "Cards", note: "Header panel, project cards, skills sidebar" },
              ] as const
          ).map((d) => (
              <label key={d.id} className={draft.layout === d.id ? "picked" : ""}>
                <input
                    type="radio"
                    name="layout"
                    value={d.id}
                    checked={draft.layout === d.id}
                    onChange={() => update({ layout: d.id })}
                />
                <strong>{d.name}</strong>
                <span>{d.note}</span>
              </label>
          ))}
        </fieldset>
        <div className="field-row">
          <TextField label="Full name" value={draft.name} onChange={(name) => update({ name })} />
          <TextField label="Job title" value={draft.role} onChange={(role) => update({ role })} />
        </div>
        <div className="field-row">
          <TextField label="Location" value={draft.location} onChange={(location) => update({ location })} />
          <TextField label="Email" type="email" value={draft.email} onChange={(email) => update({ email })} />
        </div>
        <div className="field-row">
          <TextField label="GitHub link" value={draft.github} onChange={(github) => update({ github })} />
          <TextField label="LinkedIn link" value={draft.linkedin} onChange={(linkedin) => update({ linkedin })} />
        </div>
        <TextField
            label="Resume PDF link"
            hint="Leave empty to hide the Download PDF button"
            value={draft.resumeUrl}
            onChange={(resumeUrl) => update({ resumeUrl })}
        />
        <TextArea label="Summary" rows={5} value={draft.summary} onChange={(summary) => update({ summary })} />
      </div>
  );
}

/* =========================
   Reusable list editor
   (add / remove / reorder / collapse)
   ========================= */
function ItemList<T>({
                       items,
                       onChange,
                       empty,
                       addLabel,
                       itemTitle,
                       render,
                     }: {
  items: T[];
  onChange: (items: T[]) => void;
  empty: T;
  addLabel: string;
  itemTitle: (item: T) => string;
  render: (item: T, set: (item: T) => void) => ReactNode;
}): React.ReactElement {
  const [open, setOpen] = useState<number | null>(items.length ? 0 : null);

  const setAt = (i: number, item: T) => onChange(items.map((x, j) => (j === i ? item : x)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(j);
  };
  const remove = (i: number) => {
    if (!window.confirm(`Delete "${itemTitle(items[i])}"?`)) return;
    onChange(items.filter((_, j) => j !== i));
    setOpen(null);
  };
  const add = () => {
    onChange([...items, structuredClone(empty)]);
    setOpen(items.length);
  };

  return (
      <div className="item-list">
        {items.length === 0 && <p className="admin-muted">Nothing here yet. This section is hidden on your resume.</p>}

        {items.map((item, i) => (
            <div className={`item ${open === i ? "open" : ""}`} key={i}>
              <div className="item-head">
                <button type="button" className="item-toggle" onClick={() => setOpen(open === i ? null : i)}>
              <span className="item-caret" aria-hidden>
                ▸
              </span>
                  {itemTitle(item)}
                </button>
                <div className="item-tools">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                    <ArrowUp size={15} />
                  </button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">
                    <ArrowDown size={15} />
                  </button>
                  <button type="button" className="danger" onClick={() => remove(i)} aria-label="Delete">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              {open === i && <div className="item-body fields">{render(item, (next) => setAt(i, next))}</div>}
            </div>
        ))}

        <button type="button" className="admin-btn add" onClick={add}>
          <Plus size={16} /> {addLabel}
        </button>
      </div>
  );
}

/* =========================
   Form fields
   ========================= */
function TextField({
                     label,
                     value,
                     onChange,
                     hint,
                     placeholder,
                     type = "text",
                   }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  placeholder?: string;
  type?: string;
}): React.ReactElement {
  return (
      <label className="field">
      <span>
        {label} {hint && <em>{hint}</em>}
      </span>
        <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      </label>
  );
}

function TextArea({
                    label,
                    value,
                    onChange,
                    rows = 4,
                  }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}): React.ReactElement {
  return (
      <label className="field">
        <span>{label}</span>
        <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
  );
}

/**
 * Edits a string[] as text: comma-separated (single line) or one per line.
 * Keeps the raw text locally so typing a trailing comma or blank line works.
 */
function ListField({
                     label,
                     value,
                     onChange,
                     separator,
                     hint,
                   }: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  separator: "," | "\n";
  hint?: string;
}): React.ReactElement {
  const joiner = separator === "," ? ", " : "\n";
  const parse = (text: string) =>
      text
          .split(separator)
          .map((s) => s.trim())
          .filter(Boolean);

  const [text, setText] = useState(value.join(joiner));

  // Sync when the value changes from outside (e.g. "Undo changes")
  useEffect(() => {
    if (JSON.stringify(parse(text)) !== JSON.stringify(value)) setText(value.join(joiner));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handle = (t: string) => {
    setText(t);
    onChange(parse(t));
  };

  return (
      <label className="field">
      <span>
        {label} {hint && <em>{hint}</em>}
      </span>
        {separator === "\n" ? (
            <textarea rows={Math.max(3, value.length + 1)} value={text} onChange={(e) => handle(e.target.value)} />
        ) : (
            <input value={text} onChange={(e) => handle(e.target.value)} />
        )}
      </label>
  );
}