import React, { useState, useCallback } from 'react';
import DashboardContentHouses from './housesRenter';
import DashboardContentRequests from './requestsRenter';
import NavBar from '../../navBar/navBar';

const DashboardRenter = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleIconClick = useCallback((index) => {
    if (index === 0) {
      setActiveComponent(<DashboardContentHouses />);
    } else if (index === 1) {
      setActiveComponent(<DashboardContentRequests />);
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

export default DashboardRenter;
