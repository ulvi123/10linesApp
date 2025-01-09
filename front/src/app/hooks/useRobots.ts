import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Robot {
  id: number;
  robot_id: string;
  line_specifications: string;
  area: string;
  status: string;
  battery_level: number;
  paint_level: number;
  current_coordinates: { x: number; y: number };
}

export function useRobots() {
  const [robots, setRobots] = useState<Robot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchRobots();
  }, []);

  async function fetchRobots() {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("robots").select("*");
      if (error) throw error;
      setRobots(data || []);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
      console.error("Could not fetch the robots");
    } finally {
      setLoading(false);
    }
  }

  return {robots,loading,error,refetch:fetchRobots}
}
