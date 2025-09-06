import React, { useState } from 'react';

// Main App component containing the entire dashboard
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPath, setCurrentPath] = useState(['Projects', 'RD Sales']);

  // Sample data for tasks
  const tasks = [
    {
      id: 1,
      title: 'Opt-in/out Website Controls',
      image: 'https://placehold.co/400x200/5A26A2/FFFFFF?text=Task+Image',
      labels: ['Featured', 'Feedback'],
      date: '21/03/22',
      featured: true,
      tooltip: 'Acclaimed Mandrill',
      userAvatar: 'https://placehold.co/40x40/5A26A2/FFFFFF?text=U1',
    },
    {
      id: 2,
      title: 'Remove Sales App',
      image: 'https://placehold.co/400x200/5A26A2/FFFFFF?text=Task+Image',
      labels: ['Feedback', 'UI/UX'],
      date: '21/03/22',
      featured: false,
      tooltip: 'Acclaimed Mandrill',
      userAvatar: 'https://placehold.co/40x40/5A26A2/FFFFFF?text=U2',
    },
    {
      id: 3,
      title: 'Payments Integration',
      image: 'https://placehold.co/400x200/5A26A2/FFFFFF?text=Task+Image',
      labels: ['Backend', 'Payment Provider'],
      date: '21/03/22',
      featured: false,
      tooltip: 'Acclaimed Mandrill',
      userAvatar: 'https://placehold.co/40x40/5A26A2/FFFFFF?text=U3',
    },
  ];

  const handleBreadcrumbClick = (index) => {
    // Navigate to the clicked breadcrumb link by slicing the array
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
  };

  return (
    <div className={`h-screen w-screen flex font-sans ${isDarkMode ? 'bg-[#1e1e2d] text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Sidebar */}
      <div className={`w-64 p-6 flex flex-col justify-between ${isDarkMode ? 'bg-[#29293e]' : 'bg-gray-200'} rounded-tr-lg rounded-br-lg`}>
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gray-600"></div>
            <span className="text-lg font-bold">Company</span>
          </div>
          <nav className="space-y-4">
            <a href="#" className="flex items-center p-3 rounded-lg bg-gray-700 text-white font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7z" />
                <path fillRule="evenodd" d="M3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Projects
            </a>
            <a href="#" className="flex items-center p-3 rounded-lg text-gray-400 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v6H5a1 1 0 100 2h3v6a1 1 0 102 0v-6h3a1 1 0 100-2h-3V3a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              My Tasks
            </a>
          </nav>
        </div>
        
        {/* Theme and User Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-700 p-2 rounded-full">
            <button onClick={() => setIsDarkMode(true)} className={`p-2 rounded-full ${isDarkMode ? 'bg-white text-gray-800' : 'text-gray-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.903a8.001 8.001 0 01-11.232-11.232 8.001 8.001 0 1011.232 11.232z" />
              </svg>
            </button>
            <button onClick={() => setIsDarkMode(false)} className={`p-2 rounded-full ${!isDarkMode ? 'bg-white text-gray-800' : 'text-gray-400'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 2a1 1 0 011 1v1a1 1 0 11-2 0V5a1 1 0 011-1zm-8 0a1 1 0 011 1v1a1 1 0 11-2 0V5a1 1 0 011-1zm-4 4a1 1 0 011 1v1a1 1 0 11-2 0V9a1 1 0 011-1zm0 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm4 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm4 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm4 0a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <img src="https://placehold.co/40x40/5A26A2/FFFFFF?text=TU" alt="User Avatar" className="w-10 h-10 rounded-full" />
            <div className="text-sm">
              <p className="font-semibold">Test User</p>
              <p className="text-gray-400">user@mail</p>
            </div>
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            {currentPath.map((path, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span 
                  className={index === currentPath.length - 1 ? "text-white font-semibold" : "cursor-pointer hover:text-white"}
                  onClick={() => handleBreadcrumbClick(index)}
                >
                  {path}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input type="text" placeholder="Search..." className={`w-64 py-2 pl-10 pr-4 rounded-full ${isDarkMode ? 'bg-[#29293e]' : 'bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`} />
            </div>
            <button className="bg-[#4a4a68] p-2 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            <button className="bg-[#595982] flex items-center space-x-2 py-2 px-4 rounded-full text-white font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className={`p-4 rounded-2xl relative ${isDarkMode ? 'bg-[#29293e]' : 'bg-white'} overflow-hidden`}>
              {task.featured && (
                <div className="absolute top-0 left-0 bg-purple-500 text-white text-xs px-2 py-1 rounded-br-lg z-10">
                  Featured
                </div>
              )}
              <div className="flex space-x-2 absolute top-4 right-4 z-10">
                {task.labels.map((label, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-600 text-xs text-white rounded-full">{label}</span>
                ))}
              </div>
              <img src={task.image} alt="Task" className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{task.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="relative group">
                    <img src={task.userAvatar} alt="User" className="w-8 h-8 rounded-full border-2 border-white" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 text-xs bg-gray-800 text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {task.tooltip}
                    </div>
                  </div>
                  <button className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
