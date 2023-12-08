import React from 'react';
import './App.css';
import { useAuthContext } from '@asgardeo/auth-react';

function App() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <div className="App">
      <p>Hello Fellow User</p>
      {state.isAuthenticated ? (
        <div>
          <ul>
            <li>{state.username}</li>
          </ul>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </div>
  );
}

export default App;
