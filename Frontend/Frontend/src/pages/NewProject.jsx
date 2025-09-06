import React, { useState } from 'react';

const NewProject = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    tags: [],
    projectManager: '',
    deadline: '',
    priority: 'medium',
    image: null,
    description: '',
  });

  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const [isProjectManagerDropdownOpen, setIsProjectManagerDropdownOpen] = useState(false);

  const availableTags = ['UI/UX', 'Backend', 'Frontend', 'Database', 'Mobile', 'DevOps'];
  const projectManagers = ['John Doe', 'Jane Smith', 'Peter Jones', 'Mary Williams'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'radio' ? value : value,
    }));
  };

  const handleTagChange = (tag) => {
    setFormData((prevData) => {
      const currentTags = prevData.tags;
      const updatedTags = currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : [...currentTags, tag];
      return { ...prevData, tags: updatedTags };
    });
  };

  const handleProjectManagerChange = (manager) => {
    setFormData((prevData) => ({
      ...prevData,
      projectManager: manager,
    }));
    setIsProjectManagerDropdownOpen(false);
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderPriorityRadio = (priorityValue, label) => (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={`priority-${priorityValue}`}
        name="priority"
        value={priorityValue}
        checked={formData.priority === priorityValue}
        onChange={handleInputChange}
        className="form-radio text-purple-600 focus:ring-purple-500 rounded-full"
      />
      <label htmlFor={`priority-${priorityValue}`} className="text-sm font-medium text-gray-400">{label}</label>
    </div>
  );

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-800'}`}>
      {/* Sidebar */}
      <div className={`w-64 p-6 flex flex-col justify-between ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <span className="text-xl font-semibold">Company</span>
          </div>
          <nav className="space-y-4">
            <a href="#" className={`block p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200'}`}>Projects</a>
            <a href="#" className={`block p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>My Tasks</a>
          </nav>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2 rounded-full border border-gray-600">
            <button
              onClick={toggleDarkMode}
              className={`p-1 rounded-full transition-colors ${isDarkMode ? 'bg-white' : 'bg-gray-700'}`}
            >
              {isDarkMode ? '☀' : '🌙'}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <div>
              <div className="font-semibold">Test User</div>
              <div className="text-xs text-gray-400">user@email.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full p-2 pl-10 rounded-full ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100'}`}
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        
        {/* Form Container */}
        <div className={`p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex items-center justify-between border-b pb-4 mb-6 border-gray-600">
            <h2 className="text-xl font-semibold">Projects &gt; New Project</h2>
            <div className="space-x-4">
              <button className="px-4 py-2 rounded-full border border-gray-400 text-gray-400">Discard</button>
              <button className="px-4 py-2 rounded-full bg-blue-600 text-white">Save</button>
            </div>
          </div>
          
          <form className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200'}`}
              />
            </div>
            
            {/* Tags - Multi-selection Dropdown */}
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">Tags</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsTagsDropdownOpen(!isTagsDropdownOpen)}
                  className={`w-full text-left p-2 rounded-md flex justify-between items-center ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200'}`}
                >
                  <span className="truncate">
                    {formData.tags.length > 0 ? formData.tags.join(', ') : 'Select Tags'}
                  </span>
                  <svg className={`w-4 h-4 transition-transform ${isTagsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {isTagsDropdownOpen && (
                  <div className={`absolute z-10 mt-1 w-full p-2 rounded-md shadow-lg max-h-60 overflow-y-auto ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white'}`}>
                    {availableTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2 py-1">
                        <input
                          type="checkbox"
                          id={`tag-${tag}`}
                          checked={formData.tags.includes(tag)}
                          onChange={() => handleTagChange(tag)}
                          className="form-checkbox text-blue-600 rounded"
                        />
                        <label htmlFor={`tag-${tag}`} className="text-sm">{tag}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Project Manager - Single-selection Dropdown */}
            <div className="space-y-2">
              <label htmlFor="projectManager" className="text-sm font-medium">Project Manager</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProjectManagerDropdownOpen(!isProjectManagerDropdownOpen)}
                  className={`w-full text-left p-2 rounded-md flex justify-between items-center ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200'}`}
                >
                  <span>
                    {formData.projectManager || 'Select Project Manager'}
                  </span>
                  <svg className={`w-4 h-4 transition-transform ${isProjectManagerDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {isProjectManagerDropdownOpen && (
                  <div className={`absolute z-10 mt-1 w-full p-2 rounded-md shadow-lg max-h-60 overflow-y-auto ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white'}`}>
                    {projectManagers.map((manager) => (
                      <div
                        key={manager}
                        onClick={() => handleProjectManagerChange(manager)}
                        className={`p-2 rounded-md cursor-pointer ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        {manager}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Deadline */}
            <div className="space-y-2">
              <label htmlFor="deadline" className="text-sm font-medium">Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200'}`}
              />
            </div>
            
            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <div className="flex items-center space-x-6">
                {renderPriorityRadio('low', 'Low')}
                {renderPriorityRadio('medium', 'Medium')}
                {renderPriorityRadio('high', 'High')}
              </div>
            </div>
            
            {/* Image */}
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Image</label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="image" className={`px-4 py-2 rounded-full cursor-pointer ${isDarkMode ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-gray-200'}`}>
                  Upload Image
                </label>
                {formData.image && <span className="text-sm text-gray-400">{formData.image.name}</span>}
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200'}`}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;