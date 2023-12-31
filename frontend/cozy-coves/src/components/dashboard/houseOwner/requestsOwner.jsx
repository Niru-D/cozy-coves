import React from 'react';
// import './requestsRenter.css';
import { MdPendingActions } from "react-icons/md";
import { useAuthContext } from '@asgardeo/auth-react';
import { SimpleGrid, Box, Image, Text } from '@chakra-ui/react'
import CustomCard from './houseRequestsCard';
import { useState, useEffect } from 'react';
import './houseRequestsCard.css';
import api from '../../../api/axiosConfig';

const DashboardContentRequests = () => {
  const { state } = useAuthContext();

  const [myhouses, setMyHouses] = useState();

  const getMyHouses = async () => {
    try {
      const response = await api.get("/houses/search", {
        params: {
          ownerUsername: state.username,
          houseState: "AVAILABLE",
        }
      });
      const housesWithRequests = response.data.filter(house => 'requests' in house && house.requests && house.requests.length > 0);
      setMyHouses(housesWithRequests);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getMyHouses();

    const interval = setInterval(getMyHouses, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="owner-dashboard">
      <p className='heading-requests'>House Requests</p>
      {myhouses && myhouses.length > 0 ? (
        <Box className='house-section' overflowY='auto' maxHeight='430px'
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none', 
            'scrollbar-width': 'none', 
          }}
        >
          <div style={{ overflowY: 'auto' }}>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(650px, 1fr))'>
              {myhouses.map((house, index) => (
                <CustomCard
                  key={index}
                  houseNo={house.houseNo}
                  description={house.description}
                  price={house.price}
                  address={house.address}
                  rooms={house.no_of_rooms}
                  bathrooms={house.no_of_bathrooms} 
                />
              ))}
            </SimpleGrid>
          </div>
        </Box>
      ) : (
        <div className="no-houses">
          <Image src="src\assets\housesForSale.svg" alt="No Matching Houses Image" className='no-houses-img' />
          <Text className='no-houses-text'>No rent requests found.</Text>
        </div>
      )}
    </div>
  );
  
};

export default DashboardContentRequests;
