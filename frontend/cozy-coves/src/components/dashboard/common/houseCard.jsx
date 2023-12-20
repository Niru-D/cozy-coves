import React from 'react';
import { Card, Flex, Icon, Stack, Box, Grid, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { MdAdminPanelSettings } from "react-icons/md";
import { SimpleGrid, Image,Button } from '@chakra-ui/react'
import { AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,AlertDialogCloseButton,useDisclosure } from '@chakra-ui/react'


const HouseCard = ({ description, price, address, rooms, bathrooms, state }) => {

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
  const cancelRef = React.useRef()
  const btnRef = React.useRef()

  const formattedAddress = address.join(', ');

  return (
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
                    <Flex justify='flex-start' position='absolute' bottom='15px' w='100%'>
                        <p className='house-state'>{state}</p>
                          {/* change color accordingly */}
                    </Flex>
                    <Flex justify='flex-end' position='absolute' bottom='15px' right='15px' w='100%'>
                        <Button className='suspend-btn' onClick={onOpen1} colorScheme='orange' variant='outline' leftIcon={<MdAdminPanelSettings />}>
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
                                  <Button colorScheme='red' ml={3}>
                                    Yes
                                  </Button>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                        </AlertDialog>
                    </Flex>
        </Flex>
    </Card>
  );
};

export default HouseCard;
