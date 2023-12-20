import React from 'react';
import './requestCard.css';
import { Card, Flex, Icon, Stack, Box, Grid, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { MdPendingActions } from "react-icons/md";

const RequestCard = ({ address, owner, telephone, status }) => {
  return (
    <Card variant='outline'>
      <Grid templateColumns={{ base: 'auto', sm: '80px auto auto auto' }} gap={4} alignItems="center">
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
                <p className='address'>
                    {address}
                </p>
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
                <Flex direction="row" align="baseline">
                    <p className='telephone'>{telephone}</p>
                </Flex>
            </Flex>
          </CardBody>
        </Box>

        <Box>
          <CardFooter>
            <p className='state-label'>Status: <span className='state-value'>{status}</span></p>
          </CardFooter>
        </Box>
      </Grid>
    </Card>
  );
};

export default RequestCard;
