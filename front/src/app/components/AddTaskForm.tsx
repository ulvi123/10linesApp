import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { v4 as uuidv4 } from 'uuid'
interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onTaskAdded: () => void
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onTaskAdded }) => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name || !location || !length || !width) {
      setError('All fields are required')
      return
    }

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          id:uuidv4(),
          name,
          location,
          area_dimensions: { length: parseFloat(length), width: parseFloat(width) },
          status: 'pending',
          quality_requirements:{}
        })

      if (error) throw error

      onTaskAdded()
      onClose()
    } catch (error) {
      setError('Failed to add task. Please try again.')

      const errorMessage =
        error instanceof Error ? error.message :
          typeof error === 'object' && error && 'message' in error ? (error as { message: string }).message :
            'Unknown error occurred';

      console.error('Error adding task:', errorMessage)

    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Task Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">Length (m)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Width (m)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal