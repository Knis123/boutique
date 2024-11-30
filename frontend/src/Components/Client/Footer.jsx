import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
    IconButton,
    HStack,
  } from '@chakra-ui/react';
  import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
  
  const ListHeader = ({ children }) => {
    return (
      <Text
        fontWeight="bold"
        fontSize="lg"
        mb={4}
        color={useColorModeValue('orange.600', 'orange.300')}
      >
        {children}
      </Text>
    );
  };
  
  const Footer = () => {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        py={10}
        mt={10}
      >
        <Container as={Stack} maxW="6xl">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack spacing={6}>
              <Box>
               
                <Text fontSize="xl" fontWeight="bold" color="orange.500">
                  Boutique
                </Text>
              </Box>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                
              </Text>
            </Stack>
  
            <Stack align="flex-start">
              <ListHeader>Information</ListHeader>
              <Link href="#">ACCUEIL</Link>
              <Link href="#">Explore</Link>
              <Link href="#">Contact</Link>
             
            </Stack>
  
            <Stack align="flex-start">
              <ListHeader>Links</ListHeader>
              <Link href="#">Support</Link>
              <Link href="#">Terms & Conditions</Link>
              <Link href="#">Privacy</Link>
              <Link href="#">Blog</Link>
            </Stack>
  
            <Stack align="flex-start">
              <ListHeader>Contact</ListHeader>
              <Link href="tel:+213676438918">+213 676 438 918</Link>
              <Link href="mailtoboutiquee@support.com">@support.com</Link>
              <Link href="#">Legal</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Status</Link>
            </Stack>
          </SimpleGrid>
  
          <Box
            mt={10}
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              © 2024 . All rights reserved.
            </Text>
            <HStack spacing={6}>
              <IconButton
                as="a"
                href="#"
                aria-label="Facebook"
                icon={<FaFacebook />}
                variant="ghost"
                colorScheme="orange"
                _hover={{ bg: 'orange.500', color: 'white' }}
              />
              <IconButton
                as="a"
                href="#"
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                colorScheme="orange"
                _hover={{ bg: 'orange.500', color: 'white' }}
              />
              <IconButton
                as="a"
                href="#"
                aria-label="Instagram"
                icon={<FaInstagram />}
                variant="ghost"
                colorScheme="orange"
                _hover={{ bg: 'orange.500', color: 'white' }}
              />
            </HStack>
          </Box>
        </Container>
      </Box>
    );
  };
  
  export default Footer;
  