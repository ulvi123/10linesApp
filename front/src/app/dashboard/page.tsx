// "use client"

// import React from "react"
// import Header from "../components/Header"
// import Sidebar from "../components/Sidebar"
// import Overview from "../components/Overview"
// import TaskManagement from "../components/TaskManagement"
// import RobotManagement from "../components/RobotManagement"
// import LiveMap from "../components/LiveMap"
// import ControlPanel from "../components/ControlPanel"
// import AlertBar from "../components/AlertBar"
// import { useRobots } from "../hooks/useRobots"
// import { useTasks } from "../hooks/useTasks"


// const Dashboard = () => {
//   const { tasks, loading: tasksLoading, error: tasksError, refetch: refetchTasks } = useTasks()
//   const { robots, loading: robotsLoading, error: robotsError, refetch: refetchRobots } = useRobots()

//   if (tasksError || robotsError) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <div className="flex flex-1">
//           <Sidebar />
//           <main className="flex-1 p-6">
//           <p className="text-red-600 text-center mt-12">{(tasksError || robotsError)?.message}</p>
//           </main>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <div className="flex flex-1">
//         <Sidebar />
//         <main className="flex-1 p-6">
//           <Overview tasks={tasks} robots={robots} tasksLoading={tasksLoading} robotsLoading={robotsLoading} />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <TaskManagement tasks={tasks} loading={tasksLoading} error={tasksError} refetch={refetchTasks} />
//             <RobotManagement robots={robots} loading={robotsLoading} error = {robotsError} refetch={refetchRobots} />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <LiveMap robots={robots} />
//             <ControlPanel robots={robots} refetchRobots={refetchRobots} />
//           </div>
//         </main>
//       </div>
//       <AlertBar />
//     </div>
//   )
// }

// export default Dashboard



"use client"

import React from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import Overview from "../components/Overview"
import TaskManagement from "../components/TaskManagement"
import RobotManagement from "../components/RobotManagement"
import LiveMap from "../components/LiveMap"
import ControlPanel from "../components/ControlPanel"
import AlertBar from "../components/AlertBar"
import { useRobots } from "../hooks/useRobots"
import { useTasks } from "../hooks/useTasks"

const Dashboard = () => {
  const { tasks, loading: tasksLoading, error: tasksError, refetch: refetchTasks } = useTasks()
  const { robots, loading: robotsLoading, error: robotsError, refetch: refetchRobots } = useRobots()

  if (tasksError || robotsError) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-8">
            <div className="bg-white shadow-md rounded-lg p-6 border border-red-200">
              <p className="text-red-600 text-center text-xl font-semibold">
                {(tasksError || robotsError)?.message}
              </p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <Overview 
              tasks={tasks} 
              robots={robots} 
              tasksLoading={tasksLoading} 
              robotsLoading={robotsLoading} 
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Task Management</h2>
              <TaskManagement 
                tasks={tasks} 
                loading={tasksLoading} 
                error={tasksError} 
                refetch={refetchTasks} 
              />
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Robot Management</h2>
              <RobotManagement 
                robots={robots} 
                loading={robotsLoading} 
                error={robotsError} 
                refetch={refetchRobots} 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Live Map</h2>
              <LiveMap robots={robots} />
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Control Panel</h2>
              <ControlPanel robots={robots} refetchRobots={refetchRobots} />
            </div>
          </div>
        </main>
      </div>
      <AlertBar />
    </div>
  )
}

export default Dashboard