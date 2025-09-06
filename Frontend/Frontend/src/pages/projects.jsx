import React from 'react'
import SideBar from '../components/SideBar'

const projects = () => {
  return (
    <div>
      <Navbar/>
      if(role == "admin"){
        <div>
          <TaskMakeBar/>
        </div>
      }
      <div className="projects ">
        <SideBar/>
        <KanbanView/>
      </div>
    </div>
    
  )
}

export default projects