import React from 'react';
import { Card, Flex, Icon, Stack, Box, Grid, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { MdAdminPanelSettings } from "react-icons/md";
import { TbMessageCheck } from "react-icons/tb";
import { SimpleGrid, Image,Button } from '@chakra-ui/react'
import { AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,AlertDialogCloseButton,useDisclosure } from '@chakra-ui/react'
import { useAuthContext } from '@asgardeo/auth-react';
import { useState, useEffect } from 'react';
import api from '../../../api/axiosConfig';
import './houseCard.css';

const HouseCard = ({ houseNo, description, price, address, rooms, bathrooms, houseState, btnVisibility }) => {

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const cancelRef = React.useRef()
  const btnRef = React.useRef()

  const { state, signIn, signOut, getBasicUserInfo, getAccessToken } = useAuthContext();

  const [userRole, setUserRole] = useState('');

  const formattedAddress = address.join(', ');

  const [requestMade, setRequestMade] = useState(false);

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo()
        .then((userInfo) => {
          setUserRole(userInfo.applicationRoles);

        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [state.isAuthenticated, getBasicUserInfo]);

  const handleSuspendHouse = (houseNo) => {
    api.put(`/houses/update/${houseNo}`, { state: 'SUSPENDED' })
      .then(response => {
        console.log('House suspended successfully', response.data);
        onClose1();
      })
      .catch(error => {
        console.error('Error suspending house', error);
      });
  };
  
  const handleResumeHouse = (houseNo) => {
    api.put(`/houses/update/${houseNo}`, { state: 'AVAILABLE' })
      .then(response => {
        console.log('House suspended successfully', response.data);
        onClose1();
      })
      .catch(error => {
        console.error('Error suspending house', error);
      });
  };

  const checkExistingRequests = async () => {
    try {
      const response = await api.get(`/requests/search?username=${state.username}&houseNo=${houseNo}`);
      return response.data ? response.data.length > 0 : false; 
    } catch (error) {
      console.error('Error checking existing requests', error);
      return false;
    }
  };
  
  

  useEffect(() => {
    const fetchExistingRequests = async () => {
      const existingRequest = await checkExistingRequests();
      setRequestMade(existingRequest);
    };
  
    fetchExistingRequests();
  }, [houseNo, state.username]);
  
  

  const handleRentRequest = async (houseNo) => {
    try {

      const requestData = {
        houseNo: houseNo,
        requestedRenter: state.username
      };
  
      const response = await api.post('/requests/create', requestData);
  
      console.log('Rent request created successfully', response.data);
      onClose1();
      setRequestMade(true); 
    } catch (error) {
      console.error('Error creating rent request', error);
    }
  };

  return (
    <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        height={{ base: '200px', md: '280px' }}
        margin='10px'
        className='house-card'
        >
        <Flex direction={{ base: 'column', sm: 'row' }} gap='1rem'>
            <Image
                objectFit='cover'
                boxSize={{ base: '100%', sm: '200px' }}
                minW={{ md: '200px' }}
                boxAspectRatio={1}
                src='src\assets\home5.jpeg'
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
                              {description} 
                            </Text>
                            <ul>
                              <li>Price : Rs.<span>{price}</span></li>
                              <li>Address : <span>{formattedAddress}</span></li>
                              <li>No of rooms : <span>{rooms}</span></li>
                              <li>No of bathrooms : <span>{bathrooms}</span></li>
                            </ul>
                          </Stack>
                        </Box>
                    </Flex>
                    
                    {(userRole === 'Admin' && btnVisibility !==false) && (
                      <Flex justify='flex-start' position='absolute' bottom='15px' w='100%'>
                        <p className={`house-state ${houseState.toLowerCase()}`}>{houseState}</p>
                      </Flex>

                    )}

                    {(userRole === 'Admin' && houseState !== 'SUSPENDED' && houseState !== 'RENTED' && btnVisibility !==false) && (
                      <Flex justify='flex-end' position='absolute' bottom='15px' right='15px' w='100%'>
                          <Button className='suspend-btn' onClick={onOpen1} colorScheme='black' variant='outline' leftIcon={<MdAdminPanelSettings />}>
                              Suspend
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
                                  <AlertDialogHeader>Suspend the house</AlertDialogHeader>
                                  <AlertDialogCloseButton />
                                  <AlertDialogBody>
                                    Are you sure you want to suspend this house?
                                  </AlertDialogBody>
                                  <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose1}>
                                      No
                                    </Button>
                                    <Button colorScheme='red' ml={3} onClick={() => handleSuspendHouse(houseNo)}>
                                      Yes
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                          </AlertDialog>
                      </Flex>
                    )}
                    {(userRole === 'Admin' && houseState === 'SUSPENDED' && btnVisibility !==false) && (
                      <Flex justify='flex-end' position='absolute' bottom='15px' right='15px' w='100%'>
                          <Button className='resume-btn' onClick={onOpen1} colorScheme='green' variant='outline' leftIcon={<MdAdminPanelSettings />}>
                              Resume
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
                                  <AlertDialogHeader>Resume the house</AlertDialogHeader>
                                  <AlertDialogCloseButton />
                                  <AlertDialogBody>
                                    Are you sure you want to remove this house from the suspended state?
                                  </AlertDialogBody>
                                  <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose1}>
                                      No
                                    </Button>
                                    <Button colorScheme='green' ml={3} onClick={() => handleResumeHouse(houseNo)}>
                                      Yes
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                          </AlertDialog>
                      </Flex>
                    )}

                    {(userRole === 'Renter' && btnVisibility !==false) && (
                      <Flex justify='flex-end' position='absolute' bottom='15px' right='15px' w='100%'>
                      <Button className='suspend-btn' onClick={onOpen1} colorScheme='orange' variant='outline' leftIcon={<TbMessageCheck />} isDisabled={requestMade} borderColor={requestMade ? 'white' : 'orange'}>
                          {requestMade ? 'Requested' : 'Request to rent'}
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
                                <Button colorScheme='orange' ml={3} onClick={() => handleRentRequest(houseNo)}>
                                  Yes
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                      </AlertDialog>
                  </Flex>
                    )}

                    
        </Flex>
    </Card>
  );
};

export default HouseCard;
