import React from 'react';
// import './dashboardAdmin.css';
import { useAuthContext } from '@asgardeo/auth-react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// import NavBar from '../';

const DashboardContentUsers = () => {
  const { state } = useAuthContext();

  return (
    <div className="dashboard">
      {/* <NavBar/> */}
      <p className='heading'>User Management</p>
      
    </div>
  );
};

export default DashboardContentUsers;
