import React from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Spinner,
  useToast,
  Center,
  useColorModeValue,
  Stack,
  Flex,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import productService from '../../Services/productService';
import NavigateProduct from './NavigateProduct';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { StarIcon, InfoIcon } from '@chakra-ui/icons'; 

const FeaturedProduct = () => {
  const toast = useToast();

  const { data: count, isLoading: isLoadingCount, isError: isErrorCount } = useQuery({
    queryKey: ['count'],
    queryFn: productService.getCount,
    onError: (error) => {
      toast({
        title: 'Error fetching product count',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const { data: featuredProducts = [], isLoading, isError } = useQuery({
    queryKey: ['featuredProducts', count],
    queryFn: () => productService.getFeatured(count),
    enabled: !!count,
    onError: (error) => {
      toast({
        title: 'Error fetching featured products',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  if (isLoadingCount || isLoading) return <Spinner size="xl" color="orange.500" />;
  if (isErrorCount) return <Text color="red.500">Error loading product count</Text>;
  if (isError) return <Text color="red.500">Error loading featured products</Text>;

  // Carousel settings: 3 products visible by default, responsive
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Heading
        mb={6}
        textAlign="center"
        color={useColorModeValue('orange.600', 'orange.300')} 
        fontWeight="bold"
        fontSize="3xl"
        fontFamily="'Poppins', sans-serif" 
      >
        Nos Produits
      </Heading>

      {/* Slider (Carousel) Component */}
      <Slider {...settings}>
        {featuredProducts.map((product) => (
          <Center py={10} key={product._id}>
            <Box
              role="group"
              p={6}
              maxW={'340px'}
              w={'full'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              rounded={'lg'}
              pos={'relative'}
              zIndex={1}
              overflow="hidden"
              transition="transform 0.3s ease, box-shadow 0.3s ease" 
              _hover={{
                transform: 'scale(1.03)',
                boxShadow: '3xl',
              }}
            >
              <NavigateProduct productId={product._id}>
                <Image
                  rounded={'lg'}
                  height={250}
                  width={282}
                  objectFit={'cover'}
                  src={product.image}
                  alt={product.name}
                  transition="all 0.3s"
                  _groupHover={{ filter: 'brightness(0.85)', transform: 'scale(1.02)' }}
                />
              </NavigateProduct>

              <Stack pt={6} align={'center'}>
                <Text color={'gray.500'} fontSize={'xs'} textTransform={'uppercase'}>
                  {product.brand || 'Organic'}
                </Text>
                <Heading
                  fontSize={'lg'}
                  fontFamily={'body'}
                  fontWeight={600}
                  textAlign="center"
                  color="gray.700"
                >
                  {product.name}
                </Heading>
                <Stack direction={'row'} align={'center'}>
                  <Text fontWeight={800} fontSize={'xl'} color="orange.600">
                    {product.price.toFixed(2)} DA
                  </Text>
                  {product.oldPrice && (
                    <Text textDecoration={'line-through'} color={'gray.400'}>
                      {product.oldPrice} DA
                    </Text>
                  )}
                </Stack>
               
               
              </Stack>

              <Flex justify="space-between" mt={4}>
                <IconButton
                  aria-label="More Info"
                  icon={<InfoIcon />}
                  variant="solid"
                  colorScheme="orange" 
                  size="sm"
                  onClick={() => toast({
                    title: product.name,
                    description: product.description,
                    status: 'info',
                    duration: 4000,
                    isClosable: true,
                  })}
                />
                <Badge colorScheme="yellow" fontSize="0.8em"> 
                  New
                </Badge>
              </Flex>
            </Box>
          </Center>
        ))}
      </Slider>
    </Box>
  );
};

export default FeaturedProduct;
