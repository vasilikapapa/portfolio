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
 * UI notes:
 * - Uses a hero/header section for title + summary + links
 * - Shows roadmap tasks in 3 status columns
 * - Shows updates in reverse chronological order
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
      {loading && <p className="muted">Loading project details...</p>}

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