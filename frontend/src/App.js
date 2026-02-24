import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // API base URL
  const API_URL = process.env.REACT_APP_API_URL || '/api';

  useEffect(() => {
    fetchData();
  }, []);

  // ⭐ Improved API logic
  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      // 1️⃣ Check backend connection
      const response = await axios.get(`${API_URL}/hello`);
      setMessage(response.data.message);

      // 2️⃣ Load users separately (optional)
      try {
        const usersResponse = await axios.get(`${API_URL}/users`);
        setUsers(usersResponse.data);
      } catch (usersErr) {
        console.warn('Users API failed but backend is alive');
      }

    } catch (err) {
      setError('Failed to connect to backend API');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">

        <header className="header">
          <h1>🚀 React + Laravel Docker App</h1>
          <p>Deployed on EC2 with Docker</p>
        </header>

        <div className="content">

          {loading ? (
            <div className="loading">Loading...</div>

          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <button onClick={fetchData} className="btn">Retry</button>
            </div>

          ) : (
            <>
              <div className="card">
                <h2>Backend Response</h2>
                <p className="message">{message}</p>
              </div>

              <div className="card">
                <h2>Sample Users</h2>
                <div className="users-grid">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <div key={user.id} className="user-card">
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                      </div>
                    ))
                  ) : (
                    <p>No users available</p>
                  )}
                </div>
              </div>

              <button onClick={fetchData} className="btn">
                Refresh Data
              </button>
            </>
          )}

        </div>

        <footer className="footer">
          <p>✅ Frontend: React 18 | Backend: Laravel 10 | Server: Nginx</p>
        </footer>

      </div>
    </div>
  );
}

export default App;
