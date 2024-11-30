import React, { useState } from 'react';
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Select,
  useToast, Spinner, Flex, Image, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalBody, ModalFooter, FormControl, FormLabel
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import productService from '../../Services/productService';

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [updatedProductData, setUpdatedProductData] = useState({}); 
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
    onError: (error) => {
      toast({
        title: 'Error fetching products',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product deleted',
        description: 'The product was successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error deleting product',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, updatedData }) => productService.update(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: 'Product updated',
        description: 'The product was successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsModalOpen(false); 
    },
    onError: (error) => {
      toast({
        title: 'Error updating product',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); 
    setUpdatedProductData(product); 
    setIsModalOpen(true); 
  };

  const handleUpdate = () => {
    updateProductMutation.mutate({ id: selectedProduct._id, updatedData: updatedProductData });
  };

  if (isLoading) return <Spinner size="xl" color="teal.500" />;
  if (isError) return <p>Error loading products</p>;

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Heading mb={6} textAlign="center" color="teal.600">
        Product Inventory
      </Heading>

      <TableContainer>
        <Table variant="simple" bg="gray.50" borderRadius="md">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Brand</Th>
              <Th>Name</Th>
            
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map(product => (
              <Tr key={product._id}>
                <Td>
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  )}
                </Td>
                <Td>{product.brand}</Td>
                <Td>{product.name}</Td>
               
                <Td>{product.price.toFixed(2)} DA</Td>
                <Td>{product.countInStock}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit product"
                    icon={<EditIcon />}
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleEdit(product)}
                  />
                  <IconButton
                    aria-label="Delete product"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(product._id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Modal for editing product */}
      {selectedProduct && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={updatedProductData.name}
                  onChange={(e) =>
                    setUpdatedProductData({ ...updatedProductData, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={updatedProductData.price}
                  onChange={(e) =>
                    setUpdatedProductData({ ...updatedProductData, price: parseFloat(e.target.value) })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Stock</FormLabel>
                <Input
                  type="number"
                  value={updatedProductData.countInStock}
                  onChange={(e) =>
                    setUpdatedProductData({ ...updatedProductData, countInStock: parseInt(e.target.value) })
                  }
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleUpdate}>
                Update
              </Button>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ProductList;
