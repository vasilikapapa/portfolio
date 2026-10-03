/**
 * Roadmap backend base URL
 *
 * Loaded from Vite environment variables.
 */
const API_BASE = import.meta.env.VITE_ROADMAP_API_BASE as string;

/**
 * Task status values.
 */
export type TaskStatus = "BACKLOG" | "IN_PROGRESS" | "DONE";

export type TaskType = "FEATURE" | "BUG" | "REFACTOR";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

/**
 * Task returned from backend.
 */
export type TaskDto = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  type: TaskType;
  priority: TaskPriority;
  targetVersion: string | null;
  updatedAt: string;
};

/**
 * Update entry returned from backend.
 */
export type UpdateDto = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

/**
 * Full project details payload.
 */
export type ProjectDetailsDto = {
  project: {
    id: string;
    slug: string;
    name: string;
    summary: string | null;
    description: string | null;
    repoUrl: string | null;
    liveUrl: string | null;
  };
  tasks: TaskDto[];
  updates: UpdateDto[];
};

/**
 * Helper for API requests.
 */
async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

/**
 * API functions used by the portfolio frontend.
 */
export const api = {
  getProjectDetailsBySlug(slug: string) {
    return request<ProjectDetailsDto>(`/projects/${encodeURIComponent(slug)}`);
  },
};