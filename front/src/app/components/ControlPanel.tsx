// src/app/dashboard/components/ControlPanel.tsx
import React, { useState } from 'react'
import { Robot } from '../hooks/useRobots'
import axios from 'axios'

interface ControlPanelProps {
  robots: Robot[] | undefined
  refetchRobots: () => void
}

const ControlPanel: React.FC<ControlPanelProps> = ({ robots, refetchRobots }) => {
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null)
  const [command, setCommand] = useState('')
  const [parameters, setParameters] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')




  const handleSendCommand = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRobot) return
    setStatus('sending')

    const commandLower = command.toLowerCase()
    const validCommands = ['start', 'stop', 'park', 'charge', 'move', 'calibrate']

    if (!validCommands.includes(commandLower)) {
      console.error('Invalid command:', command)
      setStatus('error')
      return
    }


    try {
      const response = await axios.post(`http://localhost:8000/robots/${selectedRobot.id}/control`, {
        priority: 1,
        command: commandLower,
      })
      if (!response.data) throw new Error(" The response data is not returned for some reason")
      setStatus('success')
      setCommand('')
      setParameters('')
      refetchRobots() // the purpose here is to Refresh the robot list to show updated status
    } catch (error) {
      console.error('Error sending command:', error)
      setStatus('error')
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Control Panel</h2>
      <div className="mb-4">
        <label className="block mb-2">Select Robot:</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedRobot?.id || ''}
          onChange={(e) => setSelectedRobot(robots?.find(r => r.id.toString() === e.target.value) || null)}
        >
          <option value="">Select a robot</option>
          {robots?.map((robot) => (
            <option key={robot.id} value={robot.id}>
              {robot.robot_id} - {robot.status}
            </option>
          ))}
        </select>
      </div>

      {selectedRobot && (
        <form onSubmit={handleSendCommand}>
          <div className="mb-4">
            <label className="block mb-2">Command:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Parameters (JSON):</label>
            <textarea
              className="w-full p-2 border rounded"
              value={parameters}
              onChange={(e) => setParameters(e.target.value)}
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Command'}
          </button>
        </form>
      )}

      {status === 'success' && (
        <p className="mt-4 text-green-600">Command sent successfully!</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-600">Error sending command. Please try again.</p>
      )}
    </div>
  )
}

export default ControlPanel
