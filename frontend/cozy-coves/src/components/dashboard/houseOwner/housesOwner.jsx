import React from 'react';
import { MdAdminPanelSettings } from "react-icons/md";
import { useAuthContext } from '@asgardeo/auth-react';
import { FaFilter } from "react-icons/fa";
import { TbMessage } from "react-icons/tb";
import { useState, useEffect } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Image, Stack, Heading, Text, Button, Box, Flex } from '@chakra-ui/react'
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

  const initialFormValues = {
    location: '',
    price: '',
    rooms: 0,
    bathrooms: 0,
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
    if (!appliedChanges && formChanges) {
      setAppliedChanges(true);
      setShowTag(true);
    }
    onDrawerClose();
  };

  const handleCloseTag = () => {
    if (appliedChanges) {
      setFormValues({ ...initialFormValues });
      setAppliedChanges(false);
      setShowTag(false);
    }
  };

  const handleResetChanges = () => {
    setFormValues({ ...initialFormValues });
    setAppliedChanges(false);
    setShowTag(false);
  };


  return (
    <div className="dashboard-content-houses">
      <p className='heading'>Properties</p>
      <Tabs variant='enclosed-colored' colorScheme='teal' size='md' align='center' isFitted>
          <TabList>
            <Tab>All Houses</Tab>
            <Tab>My Houses</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
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
                      <form
                        id='my-form'
                        onSubmit={handleFormSubmit}
                      >
                    
                        <FormControl>

                          <FormLabel className='form-label'>Location</FormLabel>
                          <Input
                            type='text'
                            className='inputs'
                            onChange={handleInputChange}
                            value={formValues.location || ''}
                            name="location"
                          />

                          <FormLabel className='form-label'>Price LKR</FormLabel>
                          <Input
                            type='number'
                            className='inputs'
                            onChange={handleInputChange}
                            value={formValues.price || ''}
                            name="price"
                          />

                          <FormLabel className='form-label'>No of rooms</FormLabel>
                          <NumberInput
                            max={20}
                            min={0}
                            className='inputs'
                            onChange={handleNumberInputChange("rooms")}
                            value={formValues.rooms || 0}
                            name="rooms"
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>

                          <FormLabel className='form-label'>No of bathrooms</FormLabel>
                          <NumberInput
                            max={20}
                            min={0}
                            className='inputs'
                            onChange={handleNumberInputChange("bathrooms")}
                            value={formValues.bathrooms || 0}
                            name="bathrooms"
                          >
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
                  <div className='house-section' style={{ overflowY: 'auto' }}>
                    
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
                      <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        height={{ base: '200px', md: '280px' }}
                        margin='10px'
                      >
                        <Flex direction={{ base: 'column', sm: 'row' }} gap='1rem'>
                          <Image
                            objectFit='cover'
                            boxSize={{ base: '100%', sm: '200px' }}
                            minW={{ md: '200px' }}
                            boxAspectRatio={1}
                            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                            alt='Caffe Latte'
                          />
                          <Flex
                            direction='column'
                            flex='1'
                            overflow='hidden'
                            position='relative'
                            height={{ base: 'auto', sm: '200px' }} 
                          >
                            <Box overflowY='auto' flex='1' css={{
                              '&::-webkit-scrollbar': {
                                width: '5px',
                              },
                              '&::-webkit-scrollbar-track': {
                                background: 'rgba(0, 0, 0, 0.1)',
                              },
                              '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                              },
                              '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(0, 0, 0, 0.3)',
                              },
                            }}>
                              <Stack spacing={4} py='2'>
                                <Text align='justify' fontSize='14px' padding='10px 10px 0 10px'>
                                  This spacious property features a modern kitchen, cozy living room with a fireplace,
                                  and a backyard patio perfect for entertaining.  
                                </Text>
                                <ul>
                                  <li>Price : <span>Rs. 20000000</span></li>
                                  <li>Address : <span>No.45, Galle Road, Colombo 6</span></li>
                                  <li>No of rooms : <span>4</span></li>
                                  <li>No of bathrooms : <span>3</span></li>
                                </ul>
                              </Stack>
                            </Box>
                          </Flex>
                          
                          <Flex justify='flex-end' position='absolute' bottom='15px' right='15px' w='100%'>
                              <Button className='suspend-btn' onClick={onOpen1} colorScheme='orange' variant='outline' leftIcon={<TbMessage />}>
                                Request to rent
                              </Button>
                              <AlertDialog
                                  motionPreset='slideInBottom'
                                  leastDestructiveRef={cancelRef}
                                  onClose={onClose1}
                                  isOpen={isOpen1}
                                  isCentered
                                >
                                  <AlertDialogOverlay />

                                  <AlertDialogContent>
                                    <AlertDialogHeader>Request to rent</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                      Are you sure you want to send a rent request for this house?
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                      <Button ref={cancelRef} onClick={onClose1}>
                                        No
                                      </Button>
                                      <Button colorScheme='red' ml={3}>
                                        Yes
                                      </Button>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                          </Flex>
                        </Flex>
                      </Card>
                      <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        height={{ base: '200px', md: '280px' }}
                        margin='10px'
                      >
                        <Flex direction={{ base: 'column', sm: 'row' }} gap='1rem'>
                          <Image
                            objectFit='cover'
                            boxSize={{ base: '100%', sm: '200px' }}
                            minW={{ md: '200px' }}
                            boxAspectRatio={1}
                            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                            alt='Caffe Latte'
                          />
                          <Flex
                            direction='column'
                            flex='1'
                            overflow='hidden'
                            position='relative'
                            height={{ base: 'auto', sm: '200px' }} 
                          >
                            <Box overflowY='auto' flex='1' css={{
                              '&::-webkit-scrollbar': {
                                width: '5px',
                              },
                              '&::-webkit-scrollbar-track': {
                                background: 'rgba(0, 0, 0, 0.1)',
                              },
                              '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                              },
                              '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(0, 0, 0, 0.3)',
                              },
                            }}>
                              <Stack spacing={4} py='2'>
                                <Text align='justify' fontSize='14px' padding='10px 10px 0 10px'>
                                  This spacious property features a modern kitchen, cozy living room with a fireplace,
                                  and a backyard patio perfect for entertaining.  
                                </Text>
                                <ul>
                                  <li>Price : <span>Rs. 20000000</span></li>
                                  <li>Address : <span>No.45, Galle Road, Colombo 6</span></li>
                                  <li>No of rooms : <span>4</span></li>
                                  <li>No of bathrooms : <span>3</span></li>
                                </ul>
                              </Stack>
                            </Box>
                          </Flex>
                          
                          <Flex justify='flex-end' position='absolute' bottom='15px' right='15px' w='100%'>
                              <Button className='suspend-btn' onClick={onOpen1} colorScheme='orange' variant='outline' leftIcon={<TbMessage />}>
                                Request to rent
                              </Button>
                              <AlertDialog
                                  motionPreset='slideInBottom'
                                  leastDestructiveRef={cancelRef}
                                  onClose={onClose1}
                                  isOpen={isOpen1}
                                  isCentered
                                >
                                  <AlertDialogOverlay />

                                  <AlertDialogContent>
                                    <AlertDialogHeader>Request to rent</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                      Are you sure you want to send a rent request for this house?
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                      <Button ref={cancelRef} onClick={onClose1}>
                                        No
                                      </Button>
                                      <Button colorScheme='red' ml={3}>
                                        Yes
                                      </Button>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                          </Flex>
                        </Flex>
                      </Card>
                      <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        height={{ base: '200px', md: '280px' }}
                        margin='10px'
                      >
                        <Flex direction={{ base: 'column', sm: 'row' }} gap='1rem'>
                          <Image
                            objectFit='cover'
                            boxSize={{ base: '100%', sm: '200px' }}
                            minW={{ md: '200px' }}
                            boxAspectRatio={1}
                            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                            alt='Caffe Latte'
                          />
                          <Flex
                            direction='column'
                            flex='1'
                            overflow='hidden'
                            position='relative'
                            height={{ base: 'auto', sm: '200px' }} 
                          >
                            <Box overflowY='auto' flex='1' css={{
                              '&::-webkit-scrollbar': {
                                width: '5px',
                              },
                              '&::-webkit-scrollbar-track': {
                                background: 'rgba(0, 0, 0, 0.1)',
                              },
                              '&::-webkit-scrollbar-thumb': {
                                background: 'rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                              },
                              '&::-webkit-scrollbar-thumb:hover': {
                                background: 'rgba(0, 0, 0, 0.3)',
                              },
                            }}>
                              <Stack spacing={4} py='2'>
                                <Text align='justify' fontSize='14px' padding='10px 10px 0 10px'>
                                  This spacious property features a modern kitchen, cozy living room with a fireplace,
                                  and a backyard patio perfect for entertaining. This spacious property features a modern kitchen, cozy living room with a fireplace,
                                  and a backyard patio perfect for entertaining.
                                </Text>
                                <ul>
                                  <li>Price : <span>Rs. 20000000</span></li>
                                  <li>Address : <span>No.45, Galle Road, Colombo 6</span></li>
                                  <li>No of rooms : <span>4</span></li>
                                  <li>No of bathrooms : <span>3</span></li>
                                </ul>
                              </Stack>
                            </Box>
                          </Flex>
                          
                          <Flex justify='flex-end' position='absolute' bottom='15px' right='15px' w='100%'>
                              <Button className='suspend-btn' onClick={onOpen1} colorScheme='orange' variant='outline' leftIcon={<TbMessage />}>
                                Request to rent
                              </Button>
                              <AlertDialog
                                  motionPreset='slideInBottom'
                                  leastDestructiveRef={cancelRef}
                                  onClose={onClose1}
                                  isOpen={isOpen1}
                                  isCentered
                                >
                                  <AlertDialogOverlay />

                                  <AlertDialogContent>
                                    <AlertDialogHeader>Request to rent</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                      Are you sure you want to send a rent request for this house?
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                      <Button ref={cancelRef} onClick={onClose1}>
                                        No
                                      </Button>
                                      <Button colorScheme='red' ml={3}>
                                        Yes
                                      </Button>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                          </Flex>
                        </Flex>
                      </Card>
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
