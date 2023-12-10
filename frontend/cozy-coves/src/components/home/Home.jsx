import React from 'react';
import './home.css';
import { useAuthContext } from '@asgardeo/auth-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// import home1 from 'src/assets/home1.jpg';
import home2 from '../../assets/home2.jpg';
// import home3 from 'src/assets/home3.jpg';

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
          <img src="src\assets\home1.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src={home2} alt="Slide 2" />
        </div>
        <div>
          <img src="src\assets\home3.jpg" alt="Slide 3" />
        </div>
        <div>
          <img src="src\assets\home4.jpg" alt="Slide 4" />
        </div>
        <div>
          <img src="src\assets\home5.jpeg" alt="Slide 5" />
        </div>
        <div>
          <img src="src\assets\home6.jpg" alt="Slide 6" />
        </div>
        <div>
          <img src="src\assets\home7.jpg" alt="Slide 7" />
        </div>
        <div>
          <img src="src\assets\home8.jpg" alt="Slide 8" />
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
