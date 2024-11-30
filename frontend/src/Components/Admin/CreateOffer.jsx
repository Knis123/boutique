import {
  Box, Button, FormControl, FormLabel, Input, Textarea, Select, Checkbox,
  FormErrorMessage, VStack, SimpleGrid, Heading, useToast, Divider, useColorModeValue, Flex
} from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation,  useQueryClient } from '@tanstack/react-query';

import productService from '../../Services/productService';

const CreateOffer = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

 

  // Create product mutation using React Query v5
  const createProductMutation = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      toast({
        title: 'Product created successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      toast({
        title: 'Error creating product.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error creating product:', error);
    },
  });

  const initialValues = {
    brand: '',
    name: '',
    description: '',
    price: '',
   
    countInStock: '',
    image: null,
    isFeatured: false,
  };

  const validationSchema = Yup.object({
    brand: Yup.string().required('Name is required'),
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
   
    countInStock: Yup.number().required('Stock count is required').min(0, 'Cannot be negative'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === 'image' && values.image) {
        formData.append('image', values.image);
      } else {
        formData.append(key, values[key]);
      }
    });

    createProductMutation.mutate(formData);
    setSubmitting(false);
    resetForm();
  };

 

  return (
    <Box
      p={8}
     
      boxShadow="lg"
      borderRadius="lg"
      maxW="xl"
      mx="auto"
    >
      <Heading mb={6} textAlign="center" size="lg" color="orange.300">
        Create New Product
      </Heading>

      <Divider mb={6} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <VStack spacing={6} align="stretch">
              
              {/* Product Name and Price */}
              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
              <FormControl isInvalid={!!ErrorMessage.brand} flex="1">
                  <FormLabel fontWeight="bold" fontSize="md">Brand</FormLabel>
                  <Field name="brand" as={Input} placeholder="Enter Brand" size="md" focusBorderColor="teal.400" />
                  <ErrorMessage name="brand" component={FormErrorMessage} />
                </FormControl>
                <FormControl isInvalid={!!ErrorMessage.name} flex="1">
                  <FormLabel fontWeight="bold" fontSize="md">Product Name</FormLabel>
                  <Field name="name" as={Input} placeholder="Enter product name" size="md" focusBorderColor="teal.400" />
                  <ErrorMessage name="name" component={FormErrorMessage} />
                </FormControl>

                <FormControl isInvalid={!!ErrorMessage.price} flex="1">
                  <FormLabel fontWeight="bold" fontSize="md">Price </FormLabel>
                  <Field name="price" as={Input} type="number" placeholder="Enter product price" size="md" focusBorderColor="teal.400" />
                  <ErrorMessage name="price" component={FormErrorMessage} />
                </FormControl>
              </Flex>

              {/* Description */}
              <FormControl isInvalid={!!ErrorMessage.description}>
                <FormLabel fontWeight="bold" fontSize="md">Description</FormLabel>
                <Field name="description" as={Textarea} placeholder="Enter product description" size="md" resize="vertical" focusBorderColor="teal.400" />
                <ErrorMessage name="description" component={FormErrorMessage} />
              </FormControl>

              {/* Category and Stock Count */}
              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
               

                <FormControl isInvalid={!!ErrorMessage.countInStock} flex="1">
                  <FormLabel fontWeight="bold" fontSize="md">Stock Count</FormLabel>
                  <Field name="countInStock" as={Input} type="number" placeholder="Enter stock count" size="md" focusBorderColor="teal.400" />
                  <ErrorMessage name="countInStock" component={FormErrorMessage} />
                </FormControl>
              </Flex>

              {/* Image Upload */}
              <FormControl>
                <FormLabel fontWeight="bold" fontSize="md">Product Image</FormLabel>
                <Input
                  type="file"
                  name="image"
                  onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                  accept="image/*"
                  size="md"
                  focusBorderColor="teal.400"
                />
              </FormControl>

              {/* Is Featured */}
              <FormControl>
                <FormLabel fontWeight="bold" fontSize="md">Feature Product</FormLabel>
                <Field name="isFeatured">
                  {({ field }) => <Checkbox {...field}>Mark as Featured</Checkbox>}
                </Field>
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                bg="second"
                isLoading={isSubmitting}
                size="lg"
                width="full"
                _hover={{ bg: 'orange.200' }}
                transition="background-color 0.3s ease"
              >
                Create Product
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateOffer;
