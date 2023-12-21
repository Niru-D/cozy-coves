import React from 'react';
import './requestsRenter.css';
import { MdPendingActions } from "react-icons/md";
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
  }, []);

  return (
    <div className="dashboard">
      <p className='heading-requests'>My Requests</p>
      
        
            {requests.map((request, index) => (
              <CustomCard
                key={index}
                address={request.house.address.join(', ')}
                owner={request.house.owner.username}
                telephone={request.telephone}
                status={request.status}
              />
            ))}
    </div>
  );
};

export default DashboardContentRequests;
