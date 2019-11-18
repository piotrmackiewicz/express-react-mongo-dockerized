import React, { useState, useEffect } from 'react';
import * as PingService from './services/pingService';
import * as UserService from './services/userService';
import logo from './logo.svg';
import './App.css';

function App() {
  const [test, setTest] = useState('');
  const [users, setUsers] = useState([]);

  const addTestUser = () => {
    const testUserData = {
      name: `User #${Math.round(Math.random() * 100000)}`,
      role: 'normal user',
      age: Math.round(Math.random() * 100)
    }

    return UserService.postUser(testUserData);
  }

  const fetchUsers = () => {
    UserService.getUsers()
      .then(res => {
        setUsers(res)
      })
  }

  useEffect(() => {
    (async () => {
      const test = await PingService.getPing()
      setTest(test.data)
      const users = await UserService.getUsers()
      setUsers(users)
    })();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Awesome boilerplate of React App with Express API and Mongo Database!</h1>
      </header>
      <main>
        <p>Response from ping: {test}</p>
        <p>{JSON.stringify(users)}</p>
        <div><button onClick={addTestUser}>Add Test User</button></div>
        <div><button onClick={fetchUsers}>Fetch Users</button></div>
      </main>
    </div>
  );
}

export default App;
