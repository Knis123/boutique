import { Box, Flex, Tabs, TabList, Tab, TabPanels, TabPanel, useColorModeValue } from '@chakra-ui/react';
import Navbaradmin from '../Components/Admin/Navbaradmin';
import Sidebar from '../Components/Admin/Sidebar';
import ProductList from '../Components/Admin/ProductList';

import CreateOffer from '../Components/Admin/CreateOffer';


const Dashboard = () => {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const tabBg = useColorModeValue('white', 'gray.700');
  const panelBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Flex direction="column" minH="100vh" bg={bg}>
      <Navbaradmin />

      <Flex flex="1" direction={{ base: 'column', md: 'row' }}>
        {/* Sidebar */}
        <Box
          as="aside"
          width={{ base: 'full', md: '240px' }}
          bg={useColorModeValue('gray.50', 'gray.800')}
          borderRightWidth="1px"
          borderColor={borderColor}
          py={4}
          px={2}
        >
          <Sidebar />
        </Box>

        {/* Main Content */}
        <Box flex="1" px={8} py={6} bg={bg}>
          <Tabs variant="soft-rounded" colorScheme='orange.50' isFitted>
            <TabList
              bg={tabBg}
              borderRadius="lg"
              boxShadow="sm"
              p={4}
              mb={4}
              transition="box-shadow 0.2s ease"
              _hover={{ boxShadow: 'lg' }}
            >
              <Tab
                fontWeight="600"
                _selected={{ color: 'white', bg: 'orange.600' }}
                _hover={{ bg: 'orange.300' }}
              >
                Stock
              </Tab>
              <Tab
                fontWeight="600"
                _selected={{ color: 'white', bg: 'orange.600' }}
                _hover={{ bg: 'orange.300' }}
              >
                create product
              </Tab>
             
            </TabList>

            <TabPanels bg={panelBg} borderRadius="lg" boxShadow="xl" p={6}>
              <TabPanel>
                <ProductList />
              </TabPanel>
              <TabPanel>
                <CreateOffer />
              </TabPanel>
             
             
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
