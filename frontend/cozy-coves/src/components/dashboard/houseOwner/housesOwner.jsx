import React from 'react';
import '../admin/houses.css';
import { useAuthContext } from '@asgardeo/auth-react';
import { useState, useEffect } from 'react';
import api from '../../../api/axiosConfig';
import CustomHouseCard from '../common/houseCard';

import { FaFilter } from "react-icons/fa";
import { MdAddHome } from "react-icons/md";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {SimpleGrid, Image,Text, Button, Box } from '@chakra-ui/react'
import { AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,AlertDialogCloseButton,useDisclosure } from '@chakra-ui/react'
import { Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton, Input } from '@chakra-ui/react'
import { FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberIncrementStepper } from '@chakra-ui/react'
import { Tag,TagLabel, TagCloseButton} from '@chakra-ui/react'

const DashboardContentHouses = () => {
  const { state } = useAuthContext();
  const cancelRef = React.useRef()
  const btnRef = React.useRef()
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()
  const { isOpen: isDrawerOpen2, onOpen: onDrawerOpen2, onClose: onDrawerClose2 } = useDisclosure()

  const [houses, setHouses] = useState();
  const [tempHouses, setTempHouses] = useState([]);
  const [myhouses, setMyHouses] = useState();

  const getHouses = async () => {
    try {
      const response = await api.get("/houses/search", {
        params: {
          state: "AVAILABLE"
        }
      });
      setHouses(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const getMyHouses = async () => {
    try {
      const response = await api.get("/houses/search", {
        params: {
          ownerUsername: state.username
        }
      });
      setMyHouses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

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
    getMyHouses();

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

  const initialAddFormValues = {
    addPrice: '',
    description: '',
    address1: '',
    address2: '',
    address3: '',
    addRooms: 0,
    addBathrooms: 0,
  };
  
  const [addFormValues, setAddFormValues] = useState({ ...initialAddFormValues });
  const [isAddFormChanged, setIsAddFormChanged] = useState(false);
  
  useEffect(() => {
    const hasChanged = JSON.stringify(initialAddFormValues) !== JSON.stringify(addFormValues);
    setIsAddFormChanged(hasChanged);
  }, [addFormValues, initialAddFormValues]);
  
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormValues({
      ...addFormValues,
      [name]: value,
    });
  };
  
  const handleAddNumberInputChange = (name) => (valueAsString, valueAsNumber) => {
    setAddFormValues((prevValues) => ({
      ...prevValues,
      [name]: valueAsNumber,
    }));
  };
  
  const isAddFormValid = () => {
    return Object.values(addFormValues).every((value) => {
      if (typeof value === 'string') {
        return value.trim() !== '';
      } else if (typeof value === 'number') {
        return !isNaN(value);
      } else {
        return false;
      }
    });
  };
  
  const handleAddHouseFormSubmit = async (e) => {
    if (e) e.preventDefault();
    console.log(isAddFormChanged);
    console.log(isAddFormValid());
  
    if (isAddFormChanged && isAddFormValid()) {
      setIsAddFormChanged(true);
          const houseData = {
        price: addFormValues.addPrice || 0,
        description: addFormValues.description || '',
        state: 'AVAILABLE', 
        no_of_rooms: addFormValues.addRooms || 0,
        no_of_bathrooms: addFormValues.addBathrooms || 0,
        address: [
          addFormValues.address1 || '',
          addFormValues.address2 || '',
          addFormValues.address3 || '',
        ]
      };
    
      try {
        const response = await api.post(`/houses/create?username=${state.username}`, houseData);
        console.log('House created:', response.data);
        await getMyHouses();
      } catch (error) {
        console.error('Error creating house:', error);
      }
    
      onDrawerClose2();
    } else {
      console.log('No changes made in the form');
    }
  };
  
  const resetAddFormValues = () => {
    setAddFormValues({ ...initialAddFormValues });
    setIsAddFormChanged(false);
  };
  
  useEffect(() => {
    resetAddFormValues();
  }, [isDrawerOpen2]);
  
  const handleAddResetChanges = () => {
    setAddFormValues({ ...initialAddFormValues });
  };


  return (
    <div className="dashboard-content-houses">
      <p className='heading'>Our Properties</p>
      <Tabs variant='enclosed-colored' colorScheme='teal' size='md' align='center' isFitted>
          <TabList>
            <Tab>All Available Houses</Tab>
            <Tab>My Houses</Tab>
          </TabList>

          <TabPanels>
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
                            btnVisibility={false}
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
                              btnVisibility={false}
                            />
                          ))
                        )}
                  </SimpleGrid>
                </div>
                )}
              </Box>
            </TabPanel>
            <TabPanel>
              <div className="filter-section">
              <MdAddHome className='add-icon' onClick={onDrawerOpen2} ref={btnRef}/>
              </div>
              <Drawer
                isOpen={isDrawerOpen2}
                placement='right'
                onClose={onDrawerClose2}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader className='drawer-header'>Add a house</DrawerHeader>

                  <DrawerBody className='drawer-body'>
                  <form id='my-form' onSubmit={handleAddHouseFormSubmit}>
                    <FormControl isRequired>
                      <FormLabel htmlFor="add-description-input" className='form-label'>Description</FormLabel>
                      <Input type='text' id="add-description-input" className='inputs' onChange={handleAddInputChange} value={addFormValues.description || ''} name="description" />

                      <FormLabel htmlFor="add-address1-input" className='form-label'>Address Line 01</FormLabel>
                      <Input type='text' id="add-address1-input" className='inputs' onChange={handleAddInputChange} value={addFormValues.address1 || ''} name="address1" />

                      <FormLabel htmlFor="add-address2-input" className='form-label'>Address Line 02</FormLabel>
                      <Input type='text' id="add-address2-input" className='inputs' onChange={handleAddInputChange} value={addFormValues.address2 || ''} name="address2" />

                      <FormLabel htmlFor="add-address3-input" className='form-label'>Address Line 03</FormLabel>
                      <Input type='text' id="add-address3-input" className='inputs' onChange={handleAddInputChange} value={addFormValues.address3 || ''} name="address3" />

                      <FormLabel htmlFor="add-rooms-input" className='form-label'>No of rooms</FormLabel>
                      <NumberInput max={20} min={0} id="add-rooms-input" className='inputs' onChange={handleAddNumberInputChange("addRooms")} value={addFormValues.addRooms || 0} name="addRooms">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <FormLabel htmlFor="add-bathrooms-input" className='form-label'>No of bathrooms</FormLabel>
                      <NumberInput max={20} min={0} id="add-bathrooms-input" className='inputs' onChange={handleAddNumberInputChange("addBathrooms")} value={addFormValues.addBathrooms || 0} name="addBathrooms">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <FormLabel htmlFor="add-price-input" className='form-label'>Price LKR</FormLabel>
                      <Input type='number' id="add-price-input" className='inputs' onChange={handleAddInputChange} value={addFormValues.addPrice || ''} name="addPrice" />
                    </FormControl>
                  </form>


                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={handleAddResetChanges}>
                      Reset
                    </Button>
                    <Button
                      className='apply-btn'
                      onClick={handleAddHouseFormSubmit}
                    >
                      Add
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
                  <div className='house-section' style={{ overflowY: 'auto' }}>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                        {
                            myhouses && myhouses.map((house, index) => (
                              <CustomHouseCard
                                key={index}
                                houseNo={house.houseNo}
                                description={house.description}
                                price={house.price}
                                address={house.address}
                                rooms={house.no_of_rooms}
                                bathrooms={house.no_of_bathrooms}
                                houseState={house.state}
                                btnVisibility={false}
                              />
                            ))
                      }
                    </SimpleGrid>
                  </div>
                  
                </Box>
            </TabPanel>
            
          </TabPanels>
        </Tabs>
      
    </div>
  );
};

export default DashboardContentHouses;
