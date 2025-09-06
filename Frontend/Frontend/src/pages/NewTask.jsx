import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// This is a single-file React application. All components, hooks, logic, and styling are in this one file.
// The main component is named App and is the default export.
// This design keeps the app self-contained within a single file.

const Breadcrumbs = ({ path }) => (
  <div className="flex items-center text-gray-400 text-sm font-medium">
    {path.map((item, index) => (
      <React.Fragment key={index}>
        <span className={index === path.length - 1 ? "text-gray-200" : "hover:text-white transition-colors cursor-pointer"}>{item}</span>
        {index < path.length - 1 && <span className="mx-2">&gt;</span>}
      </React.Fragment>
    ))}
  </div>
);

const UserProfile = ({ user }) => (
  <div className="flex flex-col items-center justify-center space-y-2 p-4 mt-auto">
    <div className="rounded-full border-2 border-gray-600 w-16 h-16 flex items-center justify-center">
      <span className="text-xl text-white">{user.name.charAt(0)}</span>
    </div>
    <span className="text-sm text-gray-400">{user.email}</span>
  </div>
);

const Sidebar = ({ theme, toggleTheme }) => (
  <aside className={`w-64 p-4 space-y-4 flex flex-col ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
    <div className="flex items-center space-x-2">
      <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-600 focus:ring-blue-500" />
      <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Company</span>
    </div>
    <nav className="space-y-2 font-medium text-lg">
      <a href="#" className={`block p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'} transition-colors`}>Projects</a>
      <a href="#" className={`block p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'} transition-colors`}>My Tasks</a>
    </nav>
    <div className={`mt-8 flex items-center justify-between p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'}`}>
      <button onClick={toggleTheme} className={`flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'} shadow-md hover:opacity-80 transition-opacity`}>
        {theme === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        )}
      </button>
    </div>
    <UserProfile user={{ name: 'Test User', email: 'user@mail' }} />
  </aside>
);

const TagInput = ({ theme }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const inputClasses = `flex-grow bg-transparent border-none focus:outline-none ${
    theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
  }`;

  return (
    <div className={`flex flex-wrap items-center w-full px-4 py-2 rounded-lg ${
      theme === 'dark' ? 'bg-gray-700 text-white border border-gray-600 focus-within:border-blue-500' : 'bg-gray-200 text-gray-800 border border-gray-300 focus-within:border-blue-500'
    }`}>
      {tags.map((tag, index) => (
        <span key={index} className={`flex items-center rounded-full px-3 py-1 mr-2 my-1 text-sm ${
          theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'
        }`}>
          {tag}
          <button
            onClick={() => removeTag(tag)}
            className={`ml-2 hover:opacity-80 transition-opacity ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags..."
        className={inputClasses}
      />
    </div>
  );
};

const Modal = ({ children, onClose, theme }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  const modalClasses = `bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full ${
    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
  }`;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className={modalClasses}>
        <div className="flex justify-end">
          <button onClick={onClose} className={`hover:opacity-80 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>&times;</button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

const NewTask = ({ project = "Diligent Porcupine" }) => {
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [assignees, setAssignees] = useState([
    'Diligent Porcupine',
    'Curious Shark',
    'Happy Bee',
    'Smart Owl',
  ]);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleDiscard = () => {
    // Logic to handle discarding changes
    console.log("Discarding changes...");
    setIsDiscardModalOpen(false);
  };

  const handleSave = () => {
    // Logic to handle saving changes
    console.log("Saving task...");
    setIsSaveModalOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const mainClasses = `flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen font-sans`;

  return (
    <div className={mainClasses}>
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center w-full">
            <h1 className="text-3xl font-bold">Task Create/Edit View</h1>
          </div>
          <div className="flex space-x-4 ml-4">
            <button
              onClick={() => setIsDiscardModalOpen(true)}
              className="px-6 py-2 rounded-lg border-2 border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-colors"
            >
              Discard
            </button>
            <button
              onClick={() => setIsSaveModalOpen(true)}
              className="px-6 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
            >
              Save
            </button>
          </div>
        </header>

        <section className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div className="mb-6">
            <Breadcrumbs path={['Projects', project, 'New Task']} />
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${
                    theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'
                  }`}
                  placeholder="Task Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Assignee</label>
                <select
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${
                    theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'
                  }`}
                >
                  <option value="">Select Assignee</option>
                  {assignees.map((assignee, index) => (
                    <option key={index} value={assignee}>{assignee}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Project</label>
                <input
                  type="text"
                  value={project}
                  readOnly
                  className={`w-full px-4 py-2 rounded-lg border focus:outline-none cursor-not-allowed ${
                    theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Tags</label>
                <TagInput theme={theme} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Deadline</label>
              <input
                type="date"
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${
                  theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'
                }`}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <label htmlFor="file-upload" className={`cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg border hover:opacity-80 transition-opacity ${
                theme === 'dark' ? 'bg-gray-700 text-gray-400 border-gray-600' : 'bg-gray-100 text-gray-600 border-gray-300'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span>Upload Image</span>
              </label>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
              {uploadedFileName && <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{uploadedFileName}</span>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                className={`w-full h-40 px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${
                  theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'
                }`}
                placeholder="Task description..."
              ></textarea>
            </div>
          </div>
        </section>
      </main>
      
      {isDiscardModalOpen && (
        <Modal onClose={() => setIsDiscardModalOpen(false)} theme={theme}>
          <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Discard Changes?</h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Are you sure you want to discard your changes? This action cannot be undone.</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsDiscardModalOpen(false)}
              className={`px-4 py-2 rounded-lg border hover:opacity-80 transition-opacity ${
                theme === 'dark' ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleDiscard}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Discard
            </button>
          </div>
        </Modal>
      )}

      {isSaveModalOpen && (
        <Modal onClose={() => setIsSaveModalOpen(false)} theme={theme}>
          <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Save Task?</h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Your task will be saved with the current details.</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsSaveModalOpen(false)}
              className={`px-4 py-2 rounded-lg border hover:opacity-80 transition-opacity ${
                theme === 'dark' ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-600 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewTask;