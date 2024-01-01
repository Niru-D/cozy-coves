import React from 'react';
import { Card, Flex, Icon, Stack, Box, Grid, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { MdAdminPanelSettings } from "react-icons/md";
import { TbMessageCheck } from "react-icons/tb";
import { SimpleGrid, Image,Button, ButtonGroup } from '@chakra-ui/react'
import { AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,AlertDialogCloseButton,useDisclosure } from '@chakra-ui/react'
import { useAuthContext } from '@asgardeo/auth-react';
import { useState, useEffect } from 'react';
import api from '../../../api/axiosConfig';
import './houseRequestsCard.css';

const HouseRequestsCard = ({ houseNo, description, price, address, rooms, bathrooms }) => {

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const cancelRef = React.useRef()
  const btnRef = React.useRef()

  const formattedAddress = address.join(', ');
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests/search', {
        params: {
          houseNo: houseNo, 
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


    const handleAccept = (requestNo) => {
        api.put(`/requests/update/${requestNo}`, null, {
            params: {
                status: 'ACCEPTED'
            }
        })
        .then(response => {
            console.log('Request got accepted successfully', response.data);
            onClose1();
        })
        .catch(error => {
            console.error('Error accepting the request', error);
        });
    };


    const handleReject = (requestNo) => {
        api.put(`/requests/update/${requestNo}`, null, {
            params: {
                status: 'REJECTED'
            }
        })
        .then(response => {
            console.log('Request got rejected successfully', response.data);
            onClose1();
        })
        .catch(error => {
            console.error('Error rejecting the request', error);
        });
    };
  

  return (
    <Card
        direction={{ base: 'column', sm: 'column' }}
        overflow='hidden'
        variant='outline'
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
                    
                    

                    
        </Flex>
        <Flex justify='flex-start'  bottom='15px' left='15px' w='100%' direction={{ base: 'column', sm: 'column' }} className='requests-section'>
            <p className='pending-requests-title'>Pending Requests</p>
            {requests && requests.map((request, index) => {
            if(request.status === "PENDING") {
                return (
                    <Box key={index} borderBottom='1px solid #a4a4a4' p={4} className='request-box'>
                        <Flex align='center' justify='space-between' >
                            <Text>{request.requestedRenter.username}</Text>
                            <ButtonGroup variant="outline" spacing="6">
                                <Button colorScheme="green" onClick={onOpen1}>Accept</Button>
                                <AlertDialog
                                    motionPreset='slideInBottom'
                                    leastDestructiveRef={cancelRef}
                                    onClose={onClose1}
                                    isOpen={isOpen1}
                                    isCentered
                                >
                                    <AlertDialogOverlay />

                                    <AlertDialogContent>
                                    <AlertDialogHeader>Accept the request</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                        Are you sure you want to accept this request? If you accept this, all other requests for this house will automatically get rejected.
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose1}>
                                        No
                                        </Button>
                                        <Button colorScheme='green' ml={3} onClick={() => handleAccept(request.requestNo)}>
                                        Yes
                                        </Button>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <Button colorScheme="red" onClick={onOpen2}>Reject</Button>
                                <AlertDialog
                                    motionPreset='slideInBottom'
                                    leastDestructiveRef={cancelRef}
                                    onClose={onClose2}
                                    isOpen={isOpen2}
                                    isCentered
                                >
                                    <AlertDialogOverlay />

                                    <AlertDialogContent>
                                    <AlertDialogHeader>Reject the request</AlertDialogHeader>
                                    <AlertDialogCloseButton />
                                    <AlertDialogBody>
                                        Are you sure you want to reject this request? 
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose2}>
                                        No
                                        </Button>
                                        <Button colorScheme='red' ml={3} onClick={() => handleReject(request.requestNo)}>
                                        Yes
                                        </Button>
                                    </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </ButtonGroup>
                        </Flex>
                    </Box>
                )
            }
            })}

        </Flex>
    </Card>
  );
};

export default HouseRequestsCard;
