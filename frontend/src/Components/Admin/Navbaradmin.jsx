// src/components/Navbar.js
import React, { useContext } from 'react';
import { Box, Flex, Heading, Text, Spacer } from '@chakra-ui/react';

import { Avatar } from '@chakra-ui/react';
import { AuthContext } from '../../Context/AuthContext';

const Navbaradmin = () => {
    const { user } = useContext(AuthContext);

    return (
        <Box bg="blue.500" px={4} py={3}>
            <Flex alignItems="center">
                <Heading size="md" color="white">
                    Dashboard
                </Heading>
                <Spacer />
                <Avatar size='md' name={user.name} src='https://bit.ly/broken-link' />
            </Flex>
        </Box>
    );
};

export default Navbaradmin;
