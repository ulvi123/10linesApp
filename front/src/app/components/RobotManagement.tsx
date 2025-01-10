// src/app/dashboard/components/RobotManagement.tsx
import React ,{useState} from 'react'
import { Robot } from '../hooks/useRobots'
import AddRobotForm from './AddRobotForm'

interface RobotManagementProps {
  robots: Robot[] | undefined
  loading: boolean
  error: string | null
  refetch: () => void
}

const RobotManagement: React.FC<RobotManagementProps> = ({ robots, loading, error, refetch }) => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  if (loading) return <div className="bg-white shadow rounded-lg p-6">Loading robots...</div>
  if (error) return <div className="bg-white shadow rounded-lg p-6 text-red-500">Error: {error}</div>

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-200 text-green-800'
      case 'charging':
        return 'bg-yellow-200 text-yellow-800'
      case 'maintenance':
        return 'bg-red-200 text-red-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-semibold">Robot Management</h2>
        <button className="ml-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setIsModalOpen(true)} >Add Robot</button>
      </div>

      {robots && robots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {robots.map((robot) => (
            <div key={robot.id} className="border rounded-lg p-4 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{robot.robot_id}</h3>
                <span className={`px-2 py-1 rounded text-sm ${getStatusColor(robot.status)}`}>
                  {robot.status}
                </span>
              </div>
              <p>Area: {robot.area}</p>
              <p>Battery: {robot.battery_level}%</p>
              <p>Paint: {robot.paint_level}%</p>
              <p className="mb-2">
                Position: ({robot.current_coordinates.x}, {robot.current_coordinates.y})
              </p>
              
            </div>
          ))}
        </div>
      ) : (
        <p>No robots available.</p>
      )}
      <AddRobotForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRobotAdded={refetch}
      />
    </div>
  )
}

export default RobotManagement