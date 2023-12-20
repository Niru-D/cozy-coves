import React from 'react';
// import './requestsRenter.css';
import { MdPendingActions } from "react-icons/md";
import { useAuthContext } from '@asgardeo/auth-react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CustomCard from '../common/requestCard';

const DashboardContentRequests = () => {
  const { state } = useAuthContext();

  const cardValues = {
    address: 'No.34, Sri Soratha Mawatha, Nugegoda.',
    owner: 'Charith Basnayake',
    telephone: '+94716623567',
    status: 'Pending'
  };

  return (
    <div className="dashboard">
      <p className='heading'>My Requests</p>
      <Tabs variant='enclosed-colored' colorScheme='teal' size='md' align='center' isFitted className='tabs-section'>
        <TabList>
          <Tab>All</Tab>
          <Tab>Pending</Tab>
          <Tab>Responded</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <CustomCard {...cardValues} />
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default DashboardContentRequests;
