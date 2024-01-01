import React from 'react';
import './requestCard.css';
import { Card, Flex, Icon, Stack, Box, Grid, CardBody, CardFooter, Heading, Text, IconButton, Button } from '@chakra-ui/react';
import { AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,AlertDialogCloseButton,useDisclosure } from '@chakra-ui/react'
import { MdPendingActions, MdDeleteOutline } from "react-icons/md";
import api from '../../../api/axiosConfig';

const RequestCard = ({ requestNo, address, owner, status }) => {

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const cancelRef = React.useRef();
  const btnRef = React.useRef();

  const handleDelete = async () => {
    try {
      if (status === 'PENDING') {
        const response = await api.delete(`/requests/delete/${requestNo}`);

        if (response.ok) {
          console.log("Deleted successfully");
        } else {
          console.log("Something went wrong")
        }
      } 
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <Card variant='outline' className='request-card'>
      <Grid templateColumns="80px auto auto auto auto" gap={4} alignItems="center">
        <Flex align="center" justify="center">
          <Icon as={MdPendingActions} w={12} h={12} color='teal' className='request-icon' />
        </Flex>

        <Box>
          <CardBody>
            <Flex direction="column">
              <Flex direction="row" align="baseline">
                <Heading className='request-heading' size='sm' color='teal'>Request for rent</Heading>
              </Flex>
              <Flex direction="row" align="baseline">
                <p className='address'>{address}</p>
              </Flex>
            </Flex>
          </CardBody>
        </Box>

        <Box>
          <CardBody>
            <Flex direction="column">
              <Flex direction="row" align="baseline">
                <p className='owner-name'>Owner: {owner}</p>
              </Flex>
              {/* <Flex direction="row" align="baseline">
                <p className='telephone'>{telephone}</p>
              </Flex> */}
            </Flex>
          </CardBody>
        </Box>

        <Box>
          <CardBody>
            <p className='state-label'><span className={`state-value ${status}`}>{status}</span></p>
          </CardBody>
        </Box>

        <Box>
          <CardBody>
            <Flex direction="row" align="baseline">
            <IconButton
              icon={<MdDeleteOutline />}
              aria-label="Delete"
              onClick={onOpen1}
              isDisabled={status !== 'PENDING'}
              colorScheme={status === 'PENDING' ? 'red' : 'gray'}
              size="md"
            />
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose1}
                isOpen={isOpen1}
                isCentered
            >
              <AlertDialogOverlay />

                <AlertDialogContent>
                  <AlertDialogHeader>Delete the request</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                      Are you sure you want to delete this request?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose1}>
                                      No
                      </Button>
                      <Button colorScheme='red' ml={3} onClick={() => handleDelete()}>
                                      Yes
                      </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            </Flex>
          </CardBody>
        </Box>
      </Grid>
    </Card>
  );
};

export default RequestCard;
