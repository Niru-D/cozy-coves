import React, { useState, useCallback } from 'react';
import './dashboardAdmin.css';
import DashboardContentHouses from './houses';
import DashboardContentUsers from './users';
import NavBar from '../../navBar/navBar';

const DashboardAdmin = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleIconClick = useCallback((index) => {
    if (index === 0) {
      setActiveComponent(<DashboardContentHouses />);
    } else if (index === 1) {
      setActiveComponent(<DashboardContentUsers />);
    }
  }, []);

  return (
    <div className="dashboard">
      <NavBar onIconClick={handleIconClick} />
      <div className="dashboard-content">
        {activeComponent}
      </div>
    </div>
  );
};

export default DashboardAdmin;
