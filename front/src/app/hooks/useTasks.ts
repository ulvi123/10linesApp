import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Task {
  id: number;
  name: string;
  status: "idle" | "in_progress" | "completed" | "pending" ;
  location: string;
  area_dimensions: { length: number; width: number };
  quality_requirements: any;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  return { tasks, loading, error, refetch: fetchTasks };
}
