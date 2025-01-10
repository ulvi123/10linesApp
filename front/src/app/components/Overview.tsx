// src/app/dashboard/components/Overview.tsx
import React from 'react'
import { Task } from '../hooks/useTasks'
import { Robot } from '../hooks/useRobots'
import {useMemo} from 'react'


interface OverviewProps {
  tasks?:Task[]
  robots?:Robot[]
  tasksLoading:boolean
  robotsLoading: boolean
}

const Overview:React.FC<OverviewProps> = ({ tasks, robots, tasksLoading, robotsLoading }) => {
  const stats = useMemo(()=>{
    return {
      activeTasks:tasks?.filter((task) => task.status === 'in_progress').length || 0,
      availableRobots: robots?.filter(robot=>robot.status === "in_progress")?.length || 0,
      completedTasks: tasks?.filter(task=>task.status === "completed")?.length || 0,
      pendingTasks: tasks?.filter(task=>task.status === "pending")?.length || 0,
      pendingRobots:robots?.filter(robot=>robot.status === "pending")?.length || 0,
      totalRobots: robots?.length || 0,
      totalTasks: tasks?.length || 0,
    }
  },[tasks,robots])



  return(
    <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Overview</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Active Tasks</h3>
        <p className="text-3xl font-bold">{tasksLoading ? 'Loading...' : stats.activeTasks}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Available Robots</h3>
        <p className="text-3xl font-bold">{robotsLoading ? 'Loading...' : stats.availableRobots}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Completed Tasks</h3>
        <p className="text-3xl font-bold">{tasksLoading ? 'Loading...' : stats.completedTasks}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Pending Tasks</h3>
        <p className="text-3xl font-bold">{tasksLoading ? 'Loading...' : stats.pendingTasks}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Pending Robots</h3>
        <p className="text-3xl font-bold">{robotsLoading ? 'Loading...' : stats.pendingRobots}</p>
      </div>
    </div>
  </div>
  )
}

export default Overview
