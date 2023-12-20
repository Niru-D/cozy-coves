import React, { useState } from 'react';
import DashboardContentHouses from './housesOwner';
import DashboardContentRequests from './requestsOwner';
import NavBar from '../../navBar/navBar';

const DashboardOwner = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleIconClick = (index) => {
    if (index === 0) {
      setActiveComponent(<DashboardContentHouses />);
    } else if (index === 1) {
      setActiveComponent(<DashboardContentRequests />);
    }
  };

  return (
    <div className="dashboard">
      <NavBar onIconClick={handleIconClick} />
      <div className="dashboard-content">
        {activeComponent}
      </div>
    </div>
  );
};

export default DashboardOwner;


