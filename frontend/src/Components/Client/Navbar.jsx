import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import Logo from "../../assets/logo2.jpg"


const Links = [
  { name: 'ACCUEIL', path: '/' },

];

const NavLink = ({ path, children }) => (
  <Box
    as={RouterLink}
    to={path}
    px={3}
    py={2}
    rounded={'md'}
    fontWeight="bold"
    textTransform="uppercase"
    transition="all 0.2s ease-in-out"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
      transform: 'translateY(-2px)',
    }}
  >
    {children}
  </Box>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // For the mobile menu
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure(); // For the cart modal

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={6} boxShadow="md">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Toggle Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
        />

        <HStack spacing={8} alignItems={'center'}>
          {/* Logo Section */}
          <Box >
            <img src={Logo} alt="logo" style={{ height: '60px' }} />
          </Box>

          {/* Desktop Navigation Links */}
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {Links.map((link) => (
              <NavLink key={link.name} path={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>

      </Flex>

      {/* Mobile Menu */}
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} path={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}

     
    </Box>
  );
};

export default Navbar;
