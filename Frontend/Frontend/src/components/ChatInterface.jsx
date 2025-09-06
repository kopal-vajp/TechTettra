import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, setLogLevel } from 'firebase/firestore';

// Global variables for Firebase configuration and authentication token.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase with the provided configuration.
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
setLogLevel('Debug');

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Effect for Firebase authentication and user state management.
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        if (initialAuthToken) {
          try {
            await signInWithCustomToken(auth, initialAuthToken);
          } catch (error) {
            console.error("Error signing in with custom token:", error);
            await signInAnonymously(auth);
          }
        } else {
          await signInAnonymously(auth);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Effect for real-time Firestore message updates.
  useEffect(() => {
    if (!userId) return;

    const chatPath = `/artifacts/${appId}/public/data/chat`;
    const q = query(collection(db, chatPath), orderBy("timestamp"));

    const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push(doc.data());
      });
      setMessages(fetchedMessages);
    }, (error) => {
      console.error("Error fetching messages:", error);
    });

    return () => unsubscribeSnapshot();
  }, [userId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !db || !userId) {
      return;
    }
    try {
      const chatPath = `/artifacts/${appId}/public/data/chat`;
      await addDoc(collection(db, chatPath), {
        text: newMessage,
        userId: userId,
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSummarize = async () => {
    if (messages.length === 0 || isSummarizing) {
      return;
    }

    setIsSummarizing(true);
    setSummary('');

    try {
      const chatHistory = messages
        .map(m => `${m.userId.substring(0, 8)}: ${m.text}`)
        .join('\n');

      const systemPrompt = "You are a professional chat summarizer. Your task is to provide a concise, single-paragraph summary of the key points and topics discussed in the chat conversation. Use clear and neutral language. Do not invent any information.";
      const userQuery = `Summarize the following chat conversation:\n\n${chatHistory}`;

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const generatedText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (generatedText) {
        setSummary(generatedText);
      } else {
        setSummary('Failed to generate a summary. Please try again.');
      }
    } catch (error) {
      console.error("Error summarizing chat:", error);
      setSummary('An error occurred while generating the summary.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-inter">
      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">Team Collaboration</h1>
        <p className="mt-4 text-gray-600">This is the main content area of your application. Click the chat icon to open the chat sidebar.</p>
        <p className="mt-2 text-sm text-gray-500">
          Your User ID (for collaboration):{' '}
          <span className="font-mono text-gray-700 font-semibold">{userId || 'Loading...'}</span>
        </p>
      </div>

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-gray-100 flex flex-col transition-transform duration-300 ease-in-out ${isChatOpen ? 'translate-x-0' : 'translate-x-full'} shadow-lg`}
      >
        {/* Chat Header */}
        <div className="flex-shrink-0 p-4 bg-indigo-600 text-white flex items-center justify-between shadow-md">
          <h2 className="text-xl font-bold">Project Chat</h2>
          <button
            onClick={handleSummarize}
            className="p-2 text-sm bg-indigo-700 hover:bg-indigo-800 rounded-lg transition-colors duration-200"
            disabled={isSummarizing || messages.length === 0}
          >
            {isSummarizing ? 'Summarizing...' : 'Summarize'}
          </button>
          <button
            onClick={toggleChat}
            className="p-1 rounded-full hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {/* Chat Summary Section - now at the top of the message list */}
          {summary && (
            <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Chat Summary</h3>
              <p className="text-gray-700">{summary}</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-bubble p-3 rounded-lg ${
                message.userId === userId ? 'bg-indigo-500 text-white ml-auto' : 'bg-gray-300 text-gray-800'
              }`}
            >
              {message.userId !== userId && (
                <p className="font-bold text-sm mb-1">{message.userId.substring(0, 8)}...</p>
              )}
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex-shrink-0 p-4 bg-white border-t border-gray-300">
          <form onSubmit={sendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
