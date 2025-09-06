import React from 'react'

const Card = () => {
  return (
    <div className="card">
        <div>
            <div className="tags"></div>
            if(role === "admin") {
                <div className="edit">
                    <button></button>
                </div>
            }
        </div>
        <div className="poster"></div>
        <div className="content">
            <div className="deadline"></div>
            <div className="title"></div>
            <div className="manager-icon"></div>
            if (role === "admin") {
                <div className="assgined"></div>
            }
            <div className="taskcount"></div>
        </div>
    </div>
  )
}

export default Card