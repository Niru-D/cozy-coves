import React from 'react';
import './requestsRenter.css';
import { useAuthContext } from '@asgardeo/auth-react';
import { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CustomCard from '../common/requestCard';
import api from '../../../api/axiosConfig';

const DashboardContentRequests = () => {
  const { state } = useAuthContext();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests/search', {
        params: {
          username: state.username, 
        },
      });

      setRequests(response.data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();

    const interval = setInterval(fetchRequests, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <p className='heading-requests'>My Requests</p>
      
        
            {requests.map((request, index) => (
              <CustomCard
                key={index}
                requestNo={request.requestNo}
                address={request.house.address.join(', ')}
                owner={request.house.owner.username}
                status={request.status}
              />
            ))}
    </div>
  );
};

export default DashboardContentRequests;
