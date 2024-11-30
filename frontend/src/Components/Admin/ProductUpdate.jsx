import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, Button,
  FormControl, FormLabel, Input, useDisclosure
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import productService from '../../Services/productService'; 

const ProductUpdate = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

 
  const initialValues = {
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    
  });

  const handleSubmit = async (values, actions) => {
    try {
      if (product && product._id) {
        await productService.update(product._id, values); 
       
        onClose();
      } else {
        console.error('Product ID is missing.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Update Product</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody>
                  <FormControl>
                    <FormLabel>Product Name</FormLabel>
                    <Field as={Input} name="name" />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Price</FormLabel>
                    <Field as={Input} name="price" type="number" />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Field as={Input} name="description" />
                  </FormControl>
                 
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} type="submit" isLoading={isSubmitting}>
                    Update
                  </Button>
                  <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductUpdate;
