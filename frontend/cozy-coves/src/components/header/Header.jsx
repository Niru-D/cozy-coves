import React, { useState, useEffect } from 'react';
import './header.css';
import { useAuthContext } from '@asgardeo/auth-react';

const Header = () => {
  const { state, signIn, signOut, getBasicUserInfo, getAccessToken } = useAuthContext();
  const [displayName, setUsername] = useState('');

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo()
        .then((userInfo) => {
          setUsername(userInfo.displayName);
          console.error(userInfo);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [state.isAuthenticated, getBasicUserInfo]);

  return (
    <header className="transparent-header">
      <div className="menu">
        {state.isAuthenticated ? (
          
          <div className="logout-btn-section">
            <p>Hello, {displayName}</p>
            <button onClick={() => signOut()} className='logout-btn'>Logout</button>
          </div>
        ) : (<div></div>)}
      </div>
    </header>
  );
};

export default Header;
