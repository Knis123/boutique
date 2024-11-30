import React, { useContext } from 'react';
import {
  Button,
  FormControl,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  VStack,
  Link,
  Icon,
  Checkbox,
  Flex,
  Spacer,
  useToast,
  Box,
} from '@chakra-ui/react';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { LuKeyRound } from 'react-icons/lu';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
  const toast = useToast();
  const { login } = useContext(AuthContext);

  const initialValues = {
    email: '',
    password: ''
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await login(values);
      toast({
        title: 'Login successful.',
        description: 'You have logged in successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard');
    } catch (error) {
      setErrors({ email: error.message });
      toast({
        title: 'Login failed.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      bg="gray.100"
      p={4}
    >
      <Box
        w={{ base: '100%', md: '400px' }}
        p={{ base: '6', md: '8' }}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={8}>
          Welcome Back
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => (
            <Form>
              <VStack spacing={5}>
                {/* Email Input */}
                <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                  <InputGroup>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      bg="gray.50"
                      borderRadius="md"
                      size="lg"
                      _focus={{ borderColor: 'blue.500' }}
                    />
                    <InputRightElement pointerEvents="none">
                      <Icon as={MdOutlineMarkEmailUnread} color="gray.400" />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>

                {/* Password Input */}
                <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                  <InputGroup>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      bg="gray.50"
                      borderRadius="md"
                      size="lg"
                      _focus={{ borderColor: 'blue.500' }}
                    />
                    <InputRightElement pointerEvents="none">
                      <Icon as={LuKeyRound} color="gray.400" />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>

                {/* Remember Me & Forgot Password */}
                <Flex justify="space-between" width="100%">
                  <Checkbox colorScheme="blue" size="md">Remember me</Checkbox>
                  <Link as={RouterLink} to="/forgot-password" color="blue.500" fontSize="sm">
                    Forgot password?
                  </Link>
                </Flex>

                {/* Submit Button */}
                <Button
                  type="submit"
                  colorScheme="blue"
                  width="100%"
                  size="lg"
                  isLoading={formik.isSubmitting}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Login
                </Button>

                {/* Register Link */}
                <Text fontSize="sm" color="gray.600">
                  Don't have an account?{' '}
                  <Link as={RouterLink} to="/clientregister" color="blue.500" fontWeight="bold">
                    Sign up
                  </Link>
                </Text>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Login;
