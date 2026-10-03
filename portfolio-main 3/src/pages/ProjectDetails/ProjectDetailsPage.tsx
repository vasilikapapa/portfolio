import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  api,
  type ProjectDetailsDto,
  type TaskDto,
  type TaskStatus,
} from "../../lib/api";
import "./projectDetails.css";

/**
 * Group tasks into columns by status.
 *
 * Purpose:
 * - Converts a flat task array into the 3 board columns
 * - Makes rendering the Kanban board easier
 */
function groupByStatus(tasks: TaskDto[]) {
  const map: Record<TaskStatus, TaskDto[]> = {
    BACKLOG: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  for (const task of tasks) {
    map[task.status].push(task);
  }

  return map;
}

/**
 * Format ISO date into readable local date/time.
 */
function fmt(iso: string) {
  return new Date(iso).toLocaleString();
}

/**
 * Friendly label for each task status column.
 */
function ColumnLabel({ status }: { status: TaskStatus }) {
  return (
    <>
      {status === "BACKLOG"
        ? "Backlog"
        : status === "IN_PROGRESS"
        ? "In Progress"
        : "Done"}
    </>
  );
}

/**
 * ProjectDetailsPage
 *
 * Purpose:
 * - Stays inside the portfolio app
 * - Loads roadmap data from the roadmap backend
 * - Shows a read-only details page for one project
 *
 * UX notes:
 * - First load can be slow if the backend is waking up from Render sleep
 * - This page shows a clearer loading message after a few seconds
 * - Skeleton placeholders help the page feel responsive while waiting
 */
export default function ProjectDetailsPage(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();

  /**
   * Loaded payload from backend:
   * - project info
   * - tasks
   * - updates
   */
  const [data, setData] = useState<ProjectDetailsDto | null>(null);

  /**
   * Page state:
   * - loading -> initial/refresh state
   * - error   -> request error shown to user
   */
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * If the backend takes longer than expected to respond,
   * show an extra message explaining that it may still be waking up.
   */
  const [loadingTooLong, setLoadingTooLong] = useState(false);

  /**
   * Load one project by slug from the roadmap backend.
   *
   * mounted guard avoids setting state after unmount.
   */
  useEffect(() => {
    let mounted = true;

    async function load() {
      if (!slug) {
        if (mounted) {
          setError("Project slug is missing.");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const details = await api.getProjectDetailsBySlug(slug);

        if (mounted) {
          setData(details);
        }
      } catch (e: any) {
        if (mounted) {
          setError(String(e?.message ?? e));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [slug]);

  /**
   * Detect if loading is taking longer than normal.
   *
   * This is useful for Render cold starts, where the backend
   * may need extra time to wake up after inactivity.
   */
  useEffect(() => {
    if (!loading) {
      setLoadingTooLong(false);
      return;
    }

    const t = setTimeout(() => setLoadingTooLong(true), 4000);
    return () => clearTimeout(t);
  }, [loading]);

  /**
   * Group tasks into Kanban columns.
   */
  const grouped = useMemo(() => groupByStatus(data?.tasks ?? []), [data]);

  /**
   * Sort updates newest first.
   */
  const updatesSorted = useMemo(() => {
    const items = [...(data?.updates ?? [])];
    items.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return items;
  }, [data]);

  return (
    <main className="container projectDetailsPage">
      {/* Back navigation */}
      <Link className="backLink" to="/projects">
        ← Back
      </Link>

      {/* Loading state */}
      {loading && (
        <>
          <p className="muted">
            Loading project details...
            {loadingTooLong &&
              " Backend is waking up, this may take a little longer on first visit."}
          </p>

          {/* =========================
              Skeleton hero
             ========================= */}
          <section className="detailsHero">
            <div className="detailsHeroContent">
              <div
                style={{
                  height: 14,
                  width: 150,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  height: 54,
                  width: "min(560px, 100%)",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.12)",
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  height: 18,
                  width: "min(420px, 100%)",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.08)",
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  height: 16,
                  width: "100%",
                  maxWidth: 760,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.07)",
                  marginBottom: 10,
                }}
              />
              <div
                style={{
                  height: 16,
                  width: "85%",
                  maxWidth: 620,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.07)",
                }}
              />
            </div>

            <div className="detailsLinks">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: 42,
                    width: 92,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
          </section>

          <div className="spacer" />

          {/* =========================
              Skeleton board
             ========================= */}
          <section>
            <h2 className="h2">Roadmap Tasks</h2>

            <div className="board">
              {Array.from({ length: 3 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="card column"
                  style={{ opacity: 0.75, pointerEvents: "none" }}
                >
                  <div className="columnHeader">
                    <div
                      style={{
                        height: 20,
                        width: 120,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.10)",
                      }}
                    />
                    <div
                      style={{
                        height: 28,
                        width: 30,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.08)",
                      }}
                    />
                  </div>

                  <div className="taskList">
                    <div className="card-soft taskCard">
                      <div
                        style={{
                          height: 20,
                          width: "75%",
                          borderRadius: 10,
                          background: "rgba(255,255,255,0.10)",
                          marginBottom: 12,
                        }}
                      />
                      <div
                        style={{
                          height: 14,
                          width: "100%",
                          borderRadius: 10,
                          background: "rgba(255,255,255,0.07)",
                          marginBottom: 8,
                        }}
                      />
                      <div
                        style={{
                          height: 14,
                          width: "82%",
                          borderRadius: 10,
                          background: "rgba(255,255,255,0.07)",
                          marginBottom: 14,
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          flexWrap: "wrap",
                          marginBottom: 12,
                        }}
                      >
                        {Array.from({ length: 4 }).map((__, pillIndex) => (
                          <div
                            key={pillIndex}
                            style={{
                              height: 26,
                              width: 62,
                              borderRadius: 999,
                              background: "rgba(255,255,255,0.08)",
                            }}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          height: 14,
                          width: "55%",
                          borderRadius: 10,
                          background: "rgba(255,255,255,0.06)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="spacer" />

          {/* =========================
              Skeleton updates
             ========================= */}
          <section>
            <h2 className="h2">Updates</h2>

            <div className="updates">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="card updateCard"
                  style={{ opacity: 0.75, pointerEvents: "none" }}
                >
                  <div className="updateHeader">
                    <div
                      style={{
                        height: 20,
                        width: "35%",
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.10)",
                      }}
                    />
                    <div
                      style={{
                        height: 14,
                        width: 140,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.06)",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      height: 14,
                      width: "100%",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.07)",
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{
                      height: 14,
                      width: "88%",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.07)",
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Error state */}
      {error && !loading && <p style={{ color: "salmon" }}>{error}</p>}

      {/* Main content */}
      {data && !loading && (
        <>
          {/* =========================
              Project hero / header
             ========================= */}
          <section className="detailsHero">
            <div className="detailsHeroContent">
              <p className="detailsKicker">PROJECT ROADMAP</p>

              <h1 className="detailsTitle">{data.project.name}</h1>

              {data.project.summary ? (
                <p className="detailsSummary">{data.project.summary}</p>
              ) : null}

              {data.project.description ? (
                <p className="detailsDescription">{data.project.description}</p>
              ) : null}
            </div>

            {/* Project action links */}
            <div className="detailsLinks">
              {data.project.repoUrl && (
                <a
                  className="detailsLinkBtn"
                  href={data.project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Repo
                </a>
              )}

              {data.project.liveUrl && (
                <a
                  className="detailsLinkBtn"
                  href={data.project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live
                </a>
              )}
            </div>
          </section>

          <div className="spacer" />

          {/* =========================
              Roadmap tasks board
             ========================= */}
          <section>
            <h2 className="h2">Roadmap Tasks</h2>

            <div className="board">
              {(["BACKLOG", "IN_PROGRESS", "DONE"] as const).map((status) => (
                <div key={status} className="card column">
                  <div className="columnHeader">
                    <strong>
                      <ColumnLabel status={status} />
                    </strong>
                    <span className="pill">{grouped[status].length}</span>
                  </div>

                  <div className="taskList">
                    {grouped[status].map((task) => (
                      <div key={task.id} className="card-soft taskCard">
                        <p className="taskTitle">{task.title}</p>

                        {task.description ? (
                          <div className="taskDesc">{task.description}</div>
                        ) : null}

                        <div className="taskMeta">
                          <span className="pill">{task.type}</span>
                          <span className="pill">{task.priority}</span>

                          {task.targetVersion ? (
                            <span className="pill">{task.targetVersion}</span>
                          ) : null}

                          <span className="pill">{task.status}</span>
                        </div>

                        <div className="taskFooter">
                          Updated {fmt(task.updatedAt)}
                        </div>
                      </div>
                    ))}

                    {grouped[status].length === 0 ? (
                      <div className="muted2 emptyColumnText">
                        No tasks here yet.
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="spacer" />

          {/* =========================
              Updates timeline
             ========================= */}
          <section>
            <h2 className="h2">Updates</h2>

            <div className="updates">
              {updatesSorted.map((update) => (
                <div key={update.id} className="card updateCard">
                  <div className="updateHeader">
                    <div className="updateTitle">{update.title}</div>
                    <div className="updateTime">{fmt(update.createdAt)}</div>
                  </div>

                  <div className="updateBody">{update.body}</div>
                </div>
              ))}

              {updatesSorted.length === 0 ? (
                <p className="muted">No updates yet.</p>
              ) : null}
            </div>
          </section>
        </>
      )}
    </main>
  );
}