import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AuthProvider } from '@asgardeo/auth-react';

const authConfig = {
  signInRedirectURL: window.config.redirectUrl,
  signOutRedirectURL: window.config.redirectUrl,
  clientID: window.config.asgardeoClientId,
  baseUrl: window.config.asgardeoBaseUrl,
  scope: ["openid", "profile"],
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config = {authConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);


