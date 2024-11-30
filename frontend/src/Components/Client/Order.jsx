// import React, { useState } from 'react';
// import orderService from '../../Services/orderService';
// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     NumberInput,
//     NumberInputField,
//     useToast,
//     Stack,
//     Text,
// } from '@chakra-ui/react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// const Order = ({ productId, productPrice, user }) => {
//     const [quantity, setQuantity] = useState(1);
//     const [shippingAddress1, setShippingAddress1] = useState('');
//     const [shippingAddress2, setShippingAddress2] = useState('');
//     const [city, setCity] = useState('');
//     const [zip, setZip] = useState('');
//     const [country, setCountry] = useState('');
//     const [phone, setPhone] = useState('');
//     const [status, setStatus] = useState('Pending'); 
//     const toast = useToast();
//     const queryClient = useQueryClient();

//     // Mutation for creating an order
//     const createOrderMutation = useMutation({
//         mutationFn: (orderData) => orderService.create(orderData), 
//         onSuccess: () => {
//             toast({
//                 title: 'Order created successfully.',
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//             });
//             // Reset form after successful order creation
//             setQuantity(1);
//             setShippingAddress1('');
//             setShippingAddress2('');
//             setCity('');
//             setZip('');
//             setCountry('');
//             setPhone('');
//             setStatus('Pending');
            
//             queryClient.invalidateQueries(['orders']);
//         },
//         onError: (error) => {
//             toast({
//                 title: 'Error creating order.',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//             });
//             console.error('Error creating order:', error);
//         },
//     });

//     const handleSubmit = () => {
//         const orderData = {
//             orderItems: [{ product: productId, quantity }],
//             shippingAddress1,
//             shippingAddress2,
//             city,
//             zip,
//             country,
//             phone,
//             status,
//             totalPrice: productPrice * quantity,
//             user: user || null, 
//         };

//         createOrderMutation.mutate(orderData);
//     };

//     return (
//         <Box mt={5} p={5} borderWidth="1px" borderRadius="lg">
//             <Text fontSize="lg" fontWeight="bold" mb={3}>Create Order</Text>
//             <Stack spacing={3}>
//                 <FormControl isRequired>
//                     <FormLabel>Quantity</FormLabel>
//                     <NumberInput min={1} value={quantity} onChange={(value) => setQuantity(Number(value))}>
//                         <NumberInputField />
//                     </NumberInput>
//                 </FormControl>
//                 <FormControl isRequired>
//                     <FormLabel>Shipping Address 1</FormLabel>
//                     <Input
//                         placeholder="Enter shipping address"
//                         value={shippingAddress1}
//                         onChange={(e) => setShippingAddress1(e.target.value)}
//                     />
//                 </FormControl>
//                 <FormControl>
//                     <FormLabel>Shipping Address 2</FormLabel>
//                     <Input
//                         placeholder="Enter optional second address line"
//                         value={shippingAddress2}
//                         onChange={(e) => setShippingAddress2(e.target.value)}
//                     />
//                 </FormControl>
//                 <FormControl isRequired>
//                     <FormLabel>City</FormLabel>
//                     <Input
//                         placeholder="Enter city"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                     />
//                 </FormControl>
//                 <FormControl isRequired>
//                     <FormLabel>ZIP Code</FormLabel>
//                     <Input
//                         placeholder="Enter ZIP code"
//                         value={zip}
//                         onChange={(e) => setZip(e.target.value)}
//                     />
//                 </FormControl>
//                 <FormControl isRequired>
//                     <FormLabel>Country</FormLabel>
//                     <Input
//                         placeholder="Enter country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                     />
//                 </FormControl>
//                 <FormControl isRequired>
//                     <FormLabel>Phone Number</FormLabel>
//                     <Input
//                         placeholder="Enter phone number"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                     />
//                 </FormControl>
//                 <FormControl>
//                     <FormLabel>Status</FormLabel>
//                     <Input
//                         placeholder="Order status"
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value)}
//                     />
//                 </FormControl>
//                 <Button
//                     colorScheme="teal"
//                     onClick={handleSubmit}
//                     isLoading={createOrderMutation.isLoading} 
//                 >
//                     Create Order
//                 </Button>
//             </Stack>
//         </Box>
//     );
// };

// export default Order;
