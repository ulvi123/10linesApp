// src/app/dashboard/components/Overview.tsx
import React from 'react'
import { Task } from '../hooks/useTasks'
import { Robot } from '../hooks/useRobots'


interface OverviewProps {
  tasks?:Task[]
  robots?:Robot[]
  tasksLoading:boolean
  robotsLoading: boolean
}

const Overview:React.FC<OverviewProps> = ({ tasks, robots, tasksLoading, robotsLoading }) => {
  const activeTasks = tasks?.filter((task) => task.status === 'in_progress').length || 0
  const availableRobots = robots?.filter(robot=>robot.status === "idle")?.length || 0
  const completedTasks = tasks?.filter(task=>task.status === "completed")?.length || 0
  const pendingTasks = tasks?.filter(task=>task.status === "pending")?.length || 0


  return(
    <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-2xl font-semibold mb-4">Overview</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Active Tasks</h3>
        <p className="text-3xl font-bold">{tasksLoading ? 'Loading...' : activeTasks}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Available Robots</h3>
        <p className="text-3xl font-bold">{robotsLoading ? 'Loading...' : availableRobots}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Completed Tasks</h3>
        <p className="text-3xl font-bold">{tasksLoading ? 'Loading...' : completedTasks}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Pending Tasks</h3>
        <p className="text-3xl font-bold">{tasksLoading ? 'Loading...' : pendingTasks}</p>
      </div>
    </div>
  </div>
  )
}

export default Overview
