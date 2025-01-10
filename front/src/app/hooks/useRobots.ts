import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import axios from "axios";

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
      const response = await axios.get<Robot[]>("http://localhost:8000/robots");
      setRobots(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      } else {
        console.error("Error fetching robots:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  return { robots, loading, error, refetch: fetchRobots };
}
