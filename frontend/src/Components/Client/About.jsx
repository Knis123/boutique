import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { IoAnalyticsSharp, IoLogoBitcoin, IoSearchSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import about from '../../assets/banner2.jpg';

const MotionBox = motion(Box);

const Feature = ({ text, icon, iconBg }) => {
  return (
    <MotionBox
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      as={Stack}
      direction={'row'}
      align={'center'}
      p={4}
      rounded={'md'}
      shadow="md"
      _hover={{
        transform: 'translateY(-4px)',
        transition: 'all 0.3s ease-in-out',
      }}
      bg={useColorModeValue('white', 'gray.700')}
    >
      <Flex
        w={12}
        h={12}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
        shadow="md"
      >
        {icon}
      </Flex>
      <Text fontWeight={600} fontSize={'lg'} color={useColorModeValue('gray.800', 'white')}>
        {text}
      </Text>
    </MotionBox>
  );
};

const About = () => {
  return (
    <Container maxW={'6xl'} py={16} px={8}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
        {/* Text and Features Section */}
        <Stack spacing={8}>
          <Text
            textTransform={'uppercase'}
            color={'blue.500'}
            fontWeight={700}
            fontSize={'sm'}
            bg={useColorModeValue('blue.100', 'blue.800')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}
          >
            a propos de nous
          </Text>

        

          <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.300')}>
          Bienvenue chez nous votre destination mode dédiée aux femmes modernes et élégantes. Nous croyons que chaque femme mérite de se sentir belle et confiante, c'est pourquoi nous proposons une sélection soigneusement choisie de vêtements alliant style, confort et qualité. Inspirés par les dernières tendances et conçus pour s'adapter à tous les moments de la vie, nos collections célèbrent la diversité et l'individualité de chaque femme
          </Text>

          
        </Stack>

        {/* Image Section with Hover Effect */}
        <Flex justify="center" align="center">
          <MotionBox
            rounded={'lg'}
            overflow={'hidden'}
            boxShadow="2xl"
            whileHover={{ scale: 1.05 }}
            transition="all 0.4s ease"
          >
            <Image
              rounded={'lg'}
              alt={'About Image'}
              src={about}
              objectFit={'cover'}
              maxH="450px"
            />
          </MotionBox>
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default About;
