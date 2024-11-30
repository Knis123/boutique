import React, { useContext } from 'react';
import productService from '../Services/productService';
import {
    Box, Heading, Image, Text, Spinner, useToast, Center, Stack, Button, Flex, Divider
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';


const Product = () => {
    const { productId } = useParams(); 
    const toast = useToast();
    
    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => productService.getById(productId),
        onError: (error) => {
            toast({
                title: 'Failed to fetch product',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            console.error('Error fetching product:', error);
        },
    });

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (isError) {
        return (
            <Center h="100vh">
                <Text color="red.500">Failed to load product</Text>
            </Center>
        );
    }

    return (
        <Box maxW="7xl" mx="auto" p={6} py={10}>
            <Flex
                direction={['column', 'column', 'row']}
                gap={10}
                alignItems="flex-start"
            >
                {/* Product Image Section */}
                <Box flex="1" mb={[5, 5, 0]}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        borderRadius="md"
                        w="100%"
                        h={['300px', '400px', '500px']}
                        objectFit="cover"
                        transition="transform 0.3s ease"
                        _hover={{ transform: 'scale(1.05)' }} 
                        boxShadow="lg"
                    />
                </Box>

                {/* Product Details Section */}
                <Box flex="1">
                    <Heading as="h1" fontSize={['2xl', '3xl', '4xl']} mb={4}>
                        {product.name}
                    </Heading>

                    <Text 
                        fontSize="lg" 
                        color="gray.500" 
                        mb={5}
                        noOfLines={[2, 3, 4]} 
                        overflow="hidden" 
                        textOverflow="ellipsis" 
                    >
                        {product.description}
                    </Text>

                    <Divider mb={5} />

                    <Text fontWeight="bold" fontSize="3xl" color="green.500" mb={5}>
                    €{product.price.toFixed(2)}
                    </Text>

                   
                </Box>
            </Flex>
        </Box>
    );
};

export default Product;
