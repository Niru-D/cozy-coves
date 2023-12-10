import React from 'react';
import './home.css';
import { useAuthContext } from '@asgardeo/auth-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import home1 from '../../assets/home1.jpg';
import home2 from '../../assets/home2.jpg';
import home3 from '../../assets/home3.jpg';
import home4 from '../../assets/home4.jpg';
import home5 from '../../assets/home5.jpg';
import home6 from '../../assets/home6.jpg';
import home7 from '../../assets/home7.jpg';
import home8 from '../../assets/home8.jpg';

const Home = () => {
  const { state, signIn, signOut } = useAuthContext();

  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home">
      <Slider {...settings}>
        <div>
          <img src={home1} alt="Slide 1" />
        </div>
        <div>
          <img src={home2} alt="Slide 2" />
        </div>
        <div>
          <img src={home3} alt="Slide 3" />
        </div>
        <div>
          <img src={home4} alt="Slide 4" />
        </div>
        <div>
          <img src={home5} alt="Slide 5" />
        </div>
        <div>
          <img src={home6} alt="Slide 6" />
        </div>
        <div>
          <img src={home7} alt="Slide 7" />
        </div>
        <div>
          <img src={home8} alt="Slide 8" />
        </div>
        
      </Slider>
      <div className="login-section">
        <p className='main-text'>Home&nbsp;is&nbsp;where&nbsp;your&nbsp;story&nbsp;begins. </p>
        <p className='sub-text'>Start yours with us.</p>
        {state.isAuthenticated ? (
          <div className="logout-btn">
            <ul>
              <li>{state.username}</li>
            </ul>
            <button onClick={() => signOut()}>Logout</button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => signIn()}>
            Login
          </button>
        )}
        
      </div>
    </div>
  );
};

export default Home;
