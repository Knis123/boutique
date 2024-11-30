import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import background from '../../assets/banner.jpg'

const Hero = () => {
  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={`url(${background})`}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      
    </Flex>
  )
}

export default Hero
