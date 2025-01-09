// src/app/dashboard/components/LiveMap.tsx
import React from 'react'
import { Robot } from '../hooks/useRobots'

interface LiveMapProps {
  robots: Robot[] | undefined
}

const LiveMap: React.FC<LiveMapProps> = ({ robots }) => {
  const gridSize = 20 // 20x20 grid
  const cellSize = 25 // 25px per cell

  const getPositionStyle = (x: number, y: number) => ({
    position: 'absolute' as 'absolute',
    left: `${x * cellSize}px`,
    top: `${y * cellSize}px`,
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    borderRadius: '50%',
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '10px',
  })

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Live Map</h2>
      <div 
        style={{
          position: 'relative',
          width: `${gridSize * cellSize}px`,
          height: `${gridSize * cellSize}px`,
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
        }}
      >
        {/* Grid lines */}
        {Array.from({ length: gridSize }).map((_, index) => (
          <React.Fragment key={index}>
            <div 
              style={{
                position: 'absolute',
                left: 0,
                top: `${index * cellSize}px`,
                width: '100%',
                height: '1px',
                backgroundColor: '#ddd',
              }}
            />
            <div 
              style={{
                position: 'absolute',
                left: `${index * cellSize}px`,
                top: 0,
                width: '1px',
                height: '100%',
                backgroundColor: '#ddd',
              }}
            />
          </React.Fragment>
        ))}
        
        {/* Robots */}
        {robots?.map((robot) => (
          <div 
            key={robot.id}
            style={getPositionStyle(robot.current_coordinates.x, robot.current_coordinates.y)}
            title={`${robot.robot_id} - ${robot.status}`}
          >
            {robot.robot_id.slice(-2)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LiveMap