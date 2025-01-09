// src/lib/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          name: string
          status: 'Pending' | 'In Progress' | 'Completed'
          location: string
          area_dimensions: { length: number; width: number }
          quality_requirements: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          status?: 'Pending' | 'In Progress' | 'Completed'
          location: string
          area_dimensions: { length: number; width: number }
          quality_requirements?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          status?: 'Pending' | 'In Progress' | 'Completed'
          location?: string
          area_dimensions?: { length: number; width: number }
          quality_requirements?: Json
          created_at?: string
          updated_at?: string
        }
      }
      robots: {
        Row: {
          id: string
          robot_id: string
          area: string
          status: 'Available' | 'Busy' | 'Charging' | 'Maintenance'
          battery_level: number
          paint_level: number
          current_coordinates: { x: number; y: number }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          robot_id: string
          area: string
          status?: 'Available' | 'Busy' | 'Charging' | 'Maintenance'
          battery_level: number
          paint_level: number
          current_coordinates: { x: number; y: number }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          robot_id?: string
          area?: string
          status?: 'Available' | 'Busy' | 'Charging' | 'Maintenance'
          battery_level?: number
          paint_level?: number
          current_coordinates?: { x: number; y: number }
          created_at?: string
          updated_at?: string
        }
      }
      robot_commands: {
        Row: {
          id: string
          robot_id: string
          command: 'start' | 'stop' | 'park' | 'charge' | 'move' | 'calibrate'
          parameters: Json
          status: 'pending' | 'in_progress' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          robot_id: string
          command: 'start' | 'stop' | 'park' | 'charge' | 'move' | 'calibrate'
          parameters?: Json
          status?: 'pending' | 'in_progress' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          robot_id?: string
          command?: 'start' | 'stop' | 'park' | 'charge' | 'move' | 'calibrate'
          parameters?: Json
          status?: 'pending' | 'in_progress' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}