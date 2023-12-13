import React from 'react';
import './header.css';
import { useAuthContext } from '@asgardeo/auth-react';

const Header = () => {
  const { state, signIn, signOut } = useAuthContext();
  return (
    <header className="transparent-header">
      <div className="menu">
        <ul>
          <li>Contact Us</li>
          
            {state.isAuthenticated ? (
              <div className="logout-btn-section">
                <button onClick={() => signOut()} className='logout-btn'>Logout</button>
              </div>
            ):(<div></div>)}
          
        </ul>
      </div>
    </header>
  );
};

export default Header;
