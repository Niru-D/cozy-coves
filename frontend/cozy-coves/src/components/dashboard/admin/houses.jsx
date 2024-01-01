import React from 'react';
import './houses.css';
import { useAuthContext } from '@asgardeo/auth-react';
import { useState, useEffect } from 'react';
import api from '../../../api/axiosConfig';
import CustomHouseCard from '../common/houseCard';

import { FaFilter } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Image, Stack, Heading, Text, Button, Box, Flex } from '@chakra-ui/react'
import { Stat,StatLabel,StatNumber,StatHelpText} from '@chakra-ui/react'
import { AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,AlertDialogCloseButton,useDisclosure } from '@chakra-ui/react'
import { Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton, Input } from '@chakra-ui/react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Select, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from '@chakra-ui/react'
import { Tag,TagLabel,TagLeftIcon,TagRightIcon,TagCloseButton, HStack} from '@chakra-ui/react'

const DashboardContentHouses = () => {
  const { state } = useAuthContext();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const cancelRef = React.useRef()
  const btnRef = React.useRef()
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()

  const [houses, setHouses] = useState();
  const [tempHouses, setTempHouses] = useState([]);
  const [houseStatistics, setHouseStatistics] = useState({
    total: 0,
    available: 0,
    rented: 0,
  });

  const getHouses = async () =>{
    try{
      const response = await api.get("/houses");
      
      setHouses(response.data);

      const totalHouses = response.data.length || 0;
      const availableHouses = response.data.filter(house => house.state === 'AVAILABLE').length || 0;
      const rentedHouses = response.data.filter(house => house.state === 'RENTED').length || 0;
      
      setHouseStatistics({
        total: totalHouses,
        available: availableHouses,
        rented: rentedHouses,
      });

    }catch(err){
      console.log(err);
    }
  }

  const initialFormValues = {
    state: '',
    location: '',
    price: '',
    rooms: '',
    bathrooms: '',
  };
  const [formValues, setFormValues] = useState({ ...initialFormValues });
  const [appliedChanges, setAppliedChanges] = useState(false);
  const [formChanges, setFormChanges] = useState(false);
  const [showTag, setShowTag] = useState(false);

  useEffect(() => {
    const hasChanged = JSON.stringify(initialFormValues) !== JSON.stringify(formValues);
    setFormChanges(hasChanged);
  }, [formValues, initialFormValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleNumberInputChange = (name) => (valueAsString, valueAsNumber) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: valueAsNumber,
    }));
  };

  const isFormValid = () => {
    return Object.values(formValues).some((value) => typeof value === 'string' && value.trim() !== '');
  };

  const handleCloseTag = () => {
    setFormValues({ ...initialFormValues });
    setAppliedChanges(false);
    setShowTag(false);
    setTempHouses([]); 
  };

  const handleSearchHouses = async () => {
    try {
      const response = await api.get("/houses/search", {
        params: {
          state: formValues.state || undefined,
          location: formValues.location || undefined,
          maxPrice: formValues.price || undefined,
          rooms: formValues.rooms || undefined,
          bathrooms: formValues.bathrooms || undefined,
        },
      });
      console.log(response.data);
      setTempHouses(response.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHouses();

    const interval = setInterval(getHouses, 500);

    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted');
    if (!appliedChanges && formChanges) {
      setAppliedChanges(true);
      setShowTag(true);
      await handleSearchHouses(); 
    } else {
      await getHouses(); 
    }
    onDrawerClose();
  };

  const handleResetChanges = () => {
    setFormValues({ ...initialFormValues });
    setAppliedChanges(false);
    setShowTag(false);
    setTempHouses([]); 
    onDrawerClose();
  };

  useEffect(() => {
    if (appliedChanges && formChanges) {
      handleSearchHouses();
    }
  }, [appliedChanges, formChanges]);


  return (
    <div className="dashboard-content-houses">
      <p className='heading'>Our Properties</p>
      <Tabs variant='enclosed-colored' colorScheme='teal' size='md' align='center' isFitted>
          <TabList>
            <Tab>Statistics</Tab>
            <Tab>All Houses</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div className="stat-section">
              <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                  <Card backgroundColor='#eef4d4'>
                    <CardBody>
                      <Stat>
                        <StatLabel size='lg' color='teal'>All Houses</StatLabel>
                        <StatNumber size="lg">{houseStatistics.total || 0}</StatNumber>
                        <StatHelpText>December 2023</StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>
                  <Card backgroundColor='#eef4d4'>
                    <CardBody>
                      <Stat>
                        <StatLabel color='green'>Available Houses</StatLabel>
                        <StatNumber>{houseStatistics.available || 0}</StatNumber>
                        <StatHelpText>December 2023</StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>
                  <Card backgroundColor='#eef4d4'>
                    <CardBody>
                      <Stat>
                        <StatLabel color='orange'>Rented Houses</StatLabel>
                        <StatNumber>{houseStatistics.rented || 0}</StatNumber>
                        <StatHelpText>December 2023</StatHelpText>
                      </Stat>
                    </CardBody>
                  </Card>
                  
                </SimpleGrid>
              </div>
            </TabPanel>
            <TabPanel >
              <div className="filter-section">
                {appliedChanges && (
                  <Tag
                    size='md'
                    borderRadius='full'
                    variant='solid'
                    cursor='pointer'
                    onClick={handleCloseTag}
                    className='tag'
                  >
                    <TagLabel>Filtered</TagLabel>
                    <TagCloseButton />
                  </Tag>
                )}
                <FaFilter className='filter-icon' onClick={onDrawerOpen} ref={btnRef} />
              </div>
              <Drawer
                isOpen={isDrawerOpen}
                placement='right'
                onClose={onDrawerClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader className='drawer-header'>Filter Houses</DrawerHeader>

                  <DrawerBody className='drawer-body'>
                  <form id='my-form' onSubmit={handleFormSubmit}>
                    <FormControl>
                      <FormLabel htmlFor="state-select" className='form-label'>State</FormLabel>
                      <Select id="state-select" placeholder='Select the state' className='inputs' onChange={handleInputChange} value={formValues.state || ''} name="state">
                        <option>Available</option>
                        <option>Rented</option>
                        <option>Renovating</option>
                        <option>Suspended</option>
                      </Select>

                      <FormLabel htmlFor="location-input" className='form-label'>Location</FormLabel>
                      <Input type='text' id="location-input" className='inputs' onChange={handleInputChange} value={formValues.location || ''} name="location" />

                      <FormLabel htmlFor="price-input" className='form-label'>Maximum Price LKR</FormLabel>
                      <Input type='number' id="price-input" className='inputs' onChange={handleInputChange} value={formValues.price || ''} name="price" />

                      <FormLabel htmlFor="rooms-input" className='form-label'>No of rooms</FormLabel>
                      <NumberInput max={20} min={0} id="rooms-input" className='inputs' onChange={handleNumberInputChange("rooms")} value={formValues.rooms || 0} name="rooms">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <FormLabel htmlFor="bathrooms-input" className='form-label'>No of bathrooms</FormLabel>
                      <NumberInput max={20} min={0} id="bathrooms-input" className='inputs' onChange={handleNumberInputChange("bathrooms")} value={formValues.bathrooms || 0} name="bathrooms">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </form>

                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={handleResetChanges}>
                      Reset Changes
                    </Button>
                    <Button
                      className='apply-btn'
                      disabled={!isFormValid()}
                      onClick={handleFormSubmit}
                    >
                      Apply
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Box
                className='houses-section'
                overflowY='auto'
                maxHeight='430px'
                
                sx={{
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  '-ms-overflow-style': 'none', 
                  'scrollbar-width': 'none', 
                }}
              >
              
                {((appliedChanges && tempHouses.length === 0) || (!appliedChanges && houses && houses.length === 0)) ? (
                  <div className="no-houses">
                    <Image src="src\assets\housesForSale.svg" alt="No Matching Houses Image" className='no-houses-img' />
                    <Text className='no-houses-text'>No houses found.</Text>
                  </div>
                ) : (
                <div className='house-section' style={{ overflowY: 'auto' }}>
                  <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                      {tempHouses.length > 0 ? (
                        tempHouses && tempHouses.map((house, index) => (
                          <CustomHouseCard
                            key={index}
                            houseNo={house.houseNo}
                            description={house.description}
                            price={house.price}
                            address={house.address}
                            rooms={house.no_of_rooms}
                            bathrooms={house.no_of_bathrooms}
                            houseState={house.state}
                            btnVisibility={true}
                          />
                        ))
                      ) : (
                          houses && houses.map((house, index) => (
                            <CustomHouseCard
                              key={index}
                              houseNo={house.houseNo}
                              description={house.description}
                              price={house.price}
                              address={house.address}
                              rooms={house.no_of_rooms}
                              bathrooms={house.no_of_bathrooms}
                              houseState={house.state}
                              btnVisibility={true}
                            />
                          ))
                        )}
                  </SimpleGrid>
                </div>
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      
    </div>
  );
};

export default DashboardContentHouses;
