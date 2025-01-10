import React, { useState } from 'react'
import axios from 'axios'

interface AddRobotModalProps {
  isOpen: boolean
  onClose: () => void
  onRobotAdded: () => void
}

const AddRobotForm: React.FC<AddRobotModalProps> = ({ isOpen, onClose, onRobotAdded }) => {
  const [robotId, setRobotId] = useState('')
  const [area, setArea] = useState('')
  const [batteryLevel, setBatteryLevel] = useState('')
  const [paintLevel, setPaintLevel] = useState('')
  const [coordinates, setCoordinates] = useState({ x: '0', y: '0' })
  const [lineSpecs, setLineSpecs] = useState({
    line_width_mm: '',
    paint_color: '',
    pattern_type: '',
    spacing_mm: '',
    angle_degrees: ''
  })
  const [error, setError] = useState<string | null>(null)

  const validateInputs = () => {
    // Robot ID validation (RB followed by 3 digits)
    if (!/^RB\d{3}$/.test(robotId)) return 'Robot ID must be in format RB followed by 3 digits (e.g., RB001)'
    if (!area.trim()) return 'Area is required'
    
    // Battery and paint level validation (0-100)
    const battery = Number(batteryLevel)
    const paint = Number(paintLevel)
    if (isNaN(battery) || battery < 0 || battery > 100) return 'Battery level must be between 0 and 100'
    if (isNaN(paint) || paint < 0 || paint > 100) return 'Paint level must be between 0 and 100'
    
    // Line specifications validation
    if (!lineSpecs.line_width_mm || isNaN(Number(lineSpecs.line_width_mm))) return 'Line width must be a valid number'
    if (!lineSpecs.paint_color.trim()) return 'Paint color is required'
    if (!lineSpecs.pattern_type.trim()) return 'Pattern type is required'
    if (!lineSpecs.spacing_mm || isNaN(Number(lineSpecs.spacing_mm))) return 'Line spacing must be a valid number'
    if (!lineSpecs.angle_degrees || isNaN(Number(lineSpecs.angle_degrees))) return 'Angle must be a valid number'

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
      robot_id: robotId,
      area: area.trim(),
      status: "pending",
      battery_level: Number(batteryLevel),
      paint_level: Number(paintLevel),
      current_coordinates: {
        x: Number(coordinates.x),
        y: Number(coordinates.y)
      },
      line_specifications: {
        line_width_mm: Number(lineSpecs.line_width_mm),
        paint_color: lineSpecs.paint_color,
        pattern_type: lineSpecs.pattern_type,
        spacing_mm: Number(lineSpecs.spacing_mm),
        angle_degrees: Number(lineSpecs.angle_degrees)
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/robots', payload)
      console.log('Response:', response.data)
      onRobotAdded()
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response:', error.response?.data)
        setError(error.response?.data?.detail || 'Failed to create robot')
      } else {
        console.error('Error:', error)
        setError('An unexpected error occurred')
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-[32rem] max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Robot</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Robot ID (e.g., RB001)</label>
            <input
              type="text"
              value={robotId}
              onChange={(e) => setRobotId(e.target.value)}
              className="w-full p-2 border rounded"
              pattern="^RB\d{3}$"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Area</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">Battery Level (%)</label>
              <input
                type="number"
                value={batteryLevel}
                onChange={(e) => setBatteryLevel(e.target.value)}
                className="w-full p-2 border rounded"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Paint Level (%)</label>
              <input
                type="number"
                value={paintLevel}
                onChange={(e) => setPaintLevel(e.target.value)}
                className="w-full p-2 border rounded"
                min="0"
                max="100"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">X Coordinate</label>
              <input
                type="number"
                value={coordinates.x}
                onChange={(e) => setCoordinates({ ...coordinates, x: e.target.value })}
                className="w-full p-2 border rounded"
                step="0.1"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">Y Coordinate</label>
              <input
                type="number"
                value={coordinates.y}
                onChange={(e) => setCoordinates({ ...coordinates, y: e.target.value })}
                className="w-full p-2 border rounded"
                step="0.1"
              />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Line Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Line Width (mm)</label>
                <input
                  type="number"
                  value={lineSpecs.line_width_mm}
                  onChange={(e) => setLineSpecs({ ...lineSpecs, line_width_mm: e.target.value })}
                  className="w-full p-2 border rounded"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Paint Color</label>
                <input
                  type="text"
                  value={lineSpecs.paint_color}
                  onChange={(e) => setLineSpecs({ ...lineSpecs, paint_color: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Pattern Type</label>
                <input
                  type="text"
                  value={lineSpecs.pattern_type}
                  onChange={(e) => setLineSpecs({ ...lineSpecs, pattern_type: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Line Spacing (mm)</label>
                <input
                  type="number"
                  value={lineSpecs.spacing_mm}
                  onChange={(e) => setLineSpecs({ ...lineSpecs, spacing_mm: e.target.value })}
                  className="w-full p-2 border rounded"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Angle (degrees)</label>
                <input
                  type="number"
                  value={lineSpecs.angle_degrees}
                  onChange={(e) => setLineSpecs({ ...lineSpecs, angle_degrees: e.target.value })}
                  className="w-full p-2 border rounded"
                  min="0"
                  max="360"
                  step="0.1"
                  required
                />
              </div>
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
              Add Robot
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddRobotForm