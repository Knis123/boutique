import React, { useContext, useState } from 'react';
import {
  Button,
  FormControl,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  VStack,
  Checkbox,
  useToast,
  Link,
  Icon,
  Flex,
  Box,
  Heading,
  Stack,
  Image,
} from '@chakra-ui/react';
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlineMarkEmailUnread, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { NavLink as RouterLink , useNavigate} from 'react-router-dom'; 
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import authService from '../Services/authService';




const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  

  const initialValues = {
    name: '',
    email: '',
    password: '',
    phone:'',
    isAdmin:true
    
  };
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      phone: Yup.string()
      .min(6, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required'),
   
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

 

  const onSubmit = async (values, { setSubmitting }) => {
    try {
    await authService.register(values);  // Pass values directly
      toast({
        title: "Account created.",
        description: "You can now log in.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to create account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="rgba(255, 255, 255, 0.2)"
      sx={{
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)'
      }}
    >
      <Flex
        width={{ base: '90%', md: '800px' }}
        height={{ base: 'auto', md: '500px' }}
        borderRadius="20px"
        sx={{
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          boxShadow: '21px 17px 32px 0px rgba(0,0,0,0.75)',
          WebkitBoxShadow: '21px 17px 32px 0px rgba(0,0,0,0.75)',
          MozBoxShadow: '21px 17px 32px 0px rgba(0,0,0,0.75)'
        }}
        overflow="hidden"
        bg="white"
      >
       
        <Box
          width={{ base: '100%', md: '50%' }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="2rem"
          bg="rgba(255, 255, 255, 0.8)"
        >
          <VStack
            spacing={6}
            width="100%"
          >
            <Text fontSize="3xl" fontWeight="bold" color="black" textAlign="center">Register</Text>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
              {formik => (
                <Form style={{ width: '100%' }}>
                  <VStack spacing={4} align="flex-start" width="100%">
                    <FormControl isInvalid={formik.errors.name && formik.touched.name}>
                      <InputGroup>
                        <Field
                          as={Input}
                          id="name"
                          name="name"
                          type="text"
                          variant="outline"
                          placeholder="Username"
                          bg="whiteAlpha.900"
                          _placeholder={{ color: 'gray.500' }}
                          borderRadius="md"
                          boxShadow="sm"
                        />
                        <InputRightElement pointerEvents="none" h="full" alignItems="center" pr="2">
                          <Icon as={LiaUserEditSolid} color="gray.500" />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                      <InputGroup>
                        <Field
                          as={Input}
                          id="email"
                          name="email"
                          type="email"
                          variant="outline"
                          placeholder="Email"
                          bg="whiteAlpha.900"
                          _placeholder={{ color: 'gray.500' }}
                          borderRadius="md"
                          boxShadow="sm"
                        />
                        <InputRightElement pointerEvents="none" h="full" alignItems="center" pr="2">
                          <Icon as={MdOutlineMarkEmailUnread} color="gray.500" />
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                      <InputGroup>
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          variant="outline"
                          placeholder="Password"
                          bg="whiteAlpha.900"
                          _placeholder={{ color: 'gray.500' }}
                          borderRadius="md"
                          boxShadow="sm"
                        />
                        <InputRightElement h="full" alignItems="center" pr="2">
                          <Button onClick={toggleShowPassword} variant="ghost" _hover="none" size="1px">
                            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.phone && formik.touched.confirm_password}>
                      <InputGroup>
                        <Field
                          as={Input}
                          id="phone"
                          name="phone"
                          type="text"
                          variant="outline"
                          placeholder="phone"
                          bg="whiteAlpha.900"
                          _placeholder={{ color: 'gray.500' }}
                          borderRadius="md"
                          boxShadow="sm"
                        />
                        <InputRightElement h="full" alignItems="center" pr="2">
                          
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
          <Field
            as={Checkbox}
            id="isAdmin"
            name="isAdmin"
            colorScheme="green"
          >
            Register as Admin
          </Field>
        </FormControl>

                    

                    <VStack width="100%" align="center">
                      <Button 
                        type="submit" 
                        bgColor="black"
                        color="white" 
                        width="65%" 
                        isLoading={formik.isSubmitting}
                        disabled={!formik.isValid || formik.isSubmitting}
                        _hover={{ bgColor: "gray.700" }}
                      >
                        Sign Up
                      </Button>
                      <Text color="black">
                        Don't have an account? <Link as={RouterLink} to='/login' color="second" fontWeight="bold">login</Link>
                      </Text>
                    </VStack>
                  </VStack>
                </Form>
              )}
            </Formik>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Register;