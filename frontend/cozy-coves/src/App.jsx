import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import Home from './components/home/home.jsx';
import DashboardAdmin from './components/dashboard/admin/dashboardAdmin.jsx';
import DashboardRenter from './components/dashboard/renter/dashboardRenter.jsx';
import DashboardHouseOwner from './components/dashboard/houseOwner/dashboardHouseOwner.jsx';
import { useAuthContext } from '@asgardeo/auth-react';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  
  const { state, signIn, signOut, getBasicUserInfo, getAccessToken } = useAuthContext();

  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo()
        .then((userInfo) => {
          setUserRole(userInfo.applicationRoles);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [state.isAuthenticated, getBasicUserInfo]);

  return (
    <ChakraProvider>
      <div className="App">
      <Header />
      {state.isAuthenticated ? (
        userRole === "Admin" ? (
          <DashboardAdmin />
        ) : userRole === "Renter" ? (
          <DashboardRenter />
        ) : userRole === "HouseOwner" ? (
          <DashboardHouseOwner />
        ) : (
          <Home />
        )
      ) : (
        <Home />
      )}
      </div>
    </ChakraProvider>
  );
}

export default App;
