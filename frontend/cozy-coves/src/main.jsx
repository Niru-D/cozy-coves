// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { AuthProvider } from "@asgardeo/auth-react";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AuthProvider
//     config={{
//       signInRedirectURL: "http://localhost:3000",
//       signOutRedirectURL: "http://localhost:3000",
//       clientID: "arCa9s8pb1rw6xw54SIst6IiRRUa",
//       baseUrl: "https://api.asgardeo.io/t/cozycoves",
//       scope: ["openid", "profile"],
//     }}
//   >
//     <App />
//   </AuthProvider>
//   </React.StrictMode>,
// )


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AuthProvider } from '@asgardeo/auth-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider
      config={{
        signInRedirectURL: 'http://localhost:3000',
        signOutRedirectURL: 'http://localhost:3000',
        clientID: 'arCa9s8pb1rw6xw54SIst6IiRRUa',
        baseUrl: 'https://api.asgardeo.io/t/cozycoves',
        scope: ['openid', 'profile'],
      }}
    >
      <App />
    </AuthProvider>
  </React.StrictMode>
);




// import React from "react";
// import { createRoot } from "react-dom";
// import { AuthProvider } from "@asgardeo/auth-react";
// import App from "./App";

// const Index = () => (
//   <AuthProvider
//     config={{
//       signInRedirectURL: "http://localhost:3000",
//       signOutRedirectURL: "http://localhost:3000",
//       clientID: "arCa9s8pb1rw6xw54SIst6IiRRUa",
//       baseUrl: "https://api.asgardeo.io/t/cozycoves",
//       scope: ["openid", "profile"],
//     }}
//   >
//     <App />
//   </AuthProvider>
// );

// const root = createRoot(document.getElementById("root"));
// root.render(<Index />);


