import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useAuthContext } from '@asgardeo/auth-react';
import { BsHouses } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { TbMessageQuestion } from "react-icons/tb";

const NavBar = ({ onIconClick }) => {
  const { state, signIn, signOut, getBasicUserInfo, getAccessToken } = useAuthContext();
  const [userRole, setUserRole] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(0); 

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

  useEffect(() => {
    onIconClick(selectedIcon);
  }, [selectedIcon, onIconClick]);

  const handleIconClick = (index) => {
    setSelectedIcon(index);
    onIconClick(index);
  };

  return (
    <div className="nav-bar">
      {userRole === 'Admin' && (
        <ul className="icon-list">
          <li onClick={() => handleIconClick(0)} className={selectedIcon === 0 ? 'selected' : ''}>
            <BsHouses className="nav-icon" />
          </li>
          <li onClick={() => handleIconClick(1)} className={selectedIcon === 1 ? 'selected' : ''}>
            <FiUsers className="nav-icon" />
          </li>
        </ul>
      )}
      {(userRole === 'Renter' || userRole === 'HouseOwner') && (
        <ul className="icon-list">
          <li onClick={() => handleIconClick(0)} className={selectedIcon === 0 ? 'selected' : ''}>
            <BsHouses className="nav-icon" />
          </li>
          <li onClick={() => handleIconClick(1)} className={selectedIcon === 1 ? 'selected' : ''}>
            <TbMessageQuestion className="nav-icon" />
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
