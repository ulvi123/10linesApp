import React, { useState } from 'react'
import axios from 'axios'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onTaskAdded: () => void
}

const AddTaskForm: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onTaskAdded }) => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [error, setError] = useState<string | null>(null)

  const validateInputs = () => {
    if (!name.trim()) return 'Task name is required'
    if (!location.trim()) return 'Location is required'
    if (!length || !width) return 'Length and width are required'
    if (isNaN(Number(length)) || isNaN(Number(width))) return 'Length and width must be valid numbers'
    if (Number(length) <= 0 || Number(width) <= 0) return 'Length and width must be positive numbers'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateInputs()
    if (validationError) {
      setError(validationError)
      return
    }

    const payload = {
      name: name.trim(),
      location: location.trim(),
      status: "pending",
      area_dimensions: {
        length: Number(length),
        width: Number(width)
      },
      quality_requirements: {
        line_straightness: 95.0,
        paint_thickness: 90.0
      }
    }

    console.log('Sending payload:', payload) // Debug log

    try {
      const response = await axios.post('http://localhost:8000/tasks', payload)
      console.log('Response:', response.data) 
      onTaskAdded()
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Full error response:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers
        })
      }
      console.error('Error details:', error)
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
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
              required
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
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Width (m)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
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

export default AddTaskForm
