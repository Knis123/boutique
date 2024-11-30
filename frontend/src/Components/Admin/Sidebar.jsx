import { Box, VStack, Link, Text, Icon, HStack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MdSettings, MdCategory, MdLocalOffer, MdExitToApp } from 'react-icons/md'; // Replaced MdOffer with MdLocalOffer

const Sidebar = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.800')}
      w={{ base: 'full', md: '240px' }}
      p={6}
      minH="100vh"
      boxShadow="lg"
    >
      <VStack align="stretch" spacing={6}>
        <Link as={RouterLink} to="/dashboard/create-offer" fontWeight="bold" _hover={{ color: 'teal.500' }}>
          <HStack>
            <Icon as={MdLocalOffer} /> {/* Updated icon */}
            <Text>Create Offer</Text>
          </HStack>
        </Link>

        <Link as={RouterLink} to="/dashboard/clients" fontWeight="bold" _hover={{ color: 'teal.500' }}>
          <HStack>
            <Icon as={MdCategory} />
            <Text>Clients</Text>
          </HStack>
        </Link>

        <Link as={RouterLink} to="/dashboard/parameters" fontWeight="bold" _hover={{ color: 'teal.500' }}>
          <HStack>
            <Icon as={MdSettings} />
            <Text>Parameters</Text>
          </HStack>
        </Link>

        <Link as={RouterLink} to="/logout" fontWeight="bold" _hover={{ color: 'red.500' }}>
          <HStack>
            <Icon as={MdExitToApp} />
            <Text>Logout</Text>
          </HStack>
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
