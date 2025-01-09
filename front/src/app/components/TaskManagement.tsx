// src/app/components/TaskManagement.tsx
import React, { useState } from 'react'
import { Task } from '../hooks/useTasks'
import AddTaskForm from '../components/AddTaskForm'

interface TaskManagementProps {
  tasks: Task[] | undefined
  loading: boolean
  error: Error | null
  refetch: () => void
}

const TaskManagement: React.FC<TaskManagementProps> = ({ tasks, loading, error, refetch }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  if (loading) return <div className="bg-white shadow rounded-lg p-6">Loading tasks...</div>
  if (error) return <div className="bg-white shadow rounded-lg p-6 text-red-500">Error: {error.message}</div>

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Task Management</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>
      {tasks && tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold">{task.name}</h3>
              <p>Status: {task.status}</p>
              <p>Location: {task.location}</p>
              <p>Dimensions: {task.area_dimensions.length}m x {task.area_dimensions.width}m</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No tasks available.</p>
      )}
      <AddTaskForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onTaskAdded={refetch}
      />
    </div>
  )
}

export default TaskManagement