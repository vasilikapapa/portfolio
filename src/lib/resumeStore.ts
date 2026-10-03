import { supabase } from "./supabase";
import { defaultResume } from "../data/defaultResume";
import type { ResumeData } from "../types/Resume";

/** Table and row that hold the resume JSON (see supabase/schema.sql). */
const TABLE = "site_content";
const ROW_ID = "resume";

/**
 * Fills in any fields missing from saved data with defaults, so older saved
 * versions keep working if new fields are added to ResumeData later.
 */
export function normalizeResume(data: Partial<ResumeData> | null | undefined): ResumeData {
  return { ...defaultResume, ...(data ?? {}) };
}

/**
 * Loads the saved resume. Returns the default resume when Supabase is not
 * configured or nothing has been saved yet.
 */
export async function loadResume(): Promise<ResumeData> {
  if (!supabase) return defaultResume;

  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .eq("id", ROW_ID)
    .maybeSingle();

  if (error) throw error;
  return normalizeResume(data?.data as Partial<ResumeData> | undefined);
}

/**
 * Saves the resume. Only succeeds for a signed-in admin; the database
 * rejects everyone else.
 */
export async function saveResume(resume: ResumeData): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: resume, updated_at: new Date().toISOString() });

  if (error) throw error;
}
