import React from 'react';
import {
  Box, Heading, VStack, HStack, Input, Textarea, Button, FormControl, FormLabel, useColorModeValue, useToast, Text, Icon, SimpleGrid, Image, Grid, GridItem
} from '@chakra-ui/react';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import contact from '../../assets/contact2.jpg'; 

const Contact = () => {
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast({
      title: "Message Sent.",
      description: "We've received your message and will get back to you shortly.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      bg={useColorModeValue('orange.50', 'gray.900')} 
      p={8}
      borderRadius="lg"
      boxShadow="2xl"
      maxW="1000px"
      mx="auto"
      my={10}
    >
      {/* Image and Form Side by Side */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* Contact Image */}
        <Box>
          <Image
            src={contact}
            alt="Contact Us"
            borderRadius="lg"
            objectFit="cover"
            boxShadow="2xl"
            height={{ base: "250px", md: "full" }}
            border="4px solid"
            borderColor={useColorModeValue('orange.200', 'orange.600')}
          />
        </Box>

        {/* Form Section */}
        <Box>
          <Heading
            mb={4}
            textAlign="center"
            color={useColorModeValue('orange.600', 'orange.300')} 
            fontWeight="bold"
            fontSize={{ base: '2xl', md: '3xl' }}
          >
           Contactez-nous
          </Heading>

          <Text fontSize="lg" mb={8} textAlign="center" color={useColorModeValue('gray.600', 'gray.400')}>
          Vous avez des questions ou des commentaires ? Nous serions ravis de vous entendre !
          </Text>

          {/* Form */}
          <Box as="form" onSubmit={handleSubmit}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" color={useColorModeValue('orange.700', 'orange.300')}>Votre Nom</FormLabel>
                  <Input
                    placeholder="Saisissez votre nom"
                    bg={useColorModeValue('white', 'gray.700')}
                    _hover={{ borderColor: useColorModeValue('orange.500', 'orange.300') }}
                    size="md"
                    borderRadius="md"
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" color={useColorModeValue('orange.700', 'orange.300')}>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Saisissez votre adresse email"
                    bg={useColorModeValue('white', 'gray.700')}
                    _hover={{ borderColor: useColorModeValue('orange.500', 'orange.300') }}
                    size="md"
                    borderRadius="md"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" color={useColorModeValue('orange.700', 'orange.300')}>Message</FormLabel>
                  <Textarea
                    placeholder="Saisissez votre message"
                    rows={5}
                    resize="none"
                    bg={useColorModeValue('white', 'gray.700')}
                    _hover={{ borderColor: useColorModeValue('orange.500', 'orange.300') }}
                    size="md"
                    borderRadius="md"
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <Button
              type="submit"
              size="lg"
              bg="orange.500"
              color="white"
              _hover={{ bg: 'orange.400' }}
              _active={{ bg: 'orange.600' }}
              w="full"
              mt={6}
              borderRadius="full"
            >
              Envoyer
            </Button>
          </Box>

          {/* Contact Info */}
          <Box mt={10}>
            <VStack spacing={4}>
              <HStack spacing={2}>
                <Icon as={MdEmail} w={6} h={6} color="orange.500" />
                <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.400')}>
                  support@.com
                </Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={MdPhone} w={6} h={6} color="orange.500" />
                <Text fontSize="md" color={useColorModeValue('gray.700', 'gray.400')}>
                  +123 456 7890
                </Text>
              </HStack>
            </VStack>
          </Box>

          {/* Social Media Links */}
          <HStack spacing={6} justify="center" mt={8}>
            <Icon as={FaFacebook} w={7} h={7} color="orange.500" cursor="pointer" _hover={{ color: 'orange.400' }} />
            <Icon as={FaTwitter} w={7} h={7} color="orange.500" cursor="pointer" _hover={{ color: 'orange.400' }} />
            <Icon as={FaInstagram} w={7} h={7} color="orange.500" cursor="pointer" _hover={{ color: 'orange.400' }} />
          </HStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Contact;
