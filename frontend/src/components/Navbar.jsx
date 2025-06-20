// import React from 'react'

import { Button, Container, Flex,Text, HStack,useColorMode, useColorModeValue } from '@chakra-ui/react'

import { FaRegSquarePlus} from "react-icons/fa6";
import { IoMoon} from "react-icons/io5";
import { LuSun } from "react-icons/lu";

import { Link } from 'react-router-dom'


const Navbar = () => {
   //usecolormode - hook in chakra UI to toggle between light and dark mode
  const {colorMode, toggleColorMode} = useColorMode();
  // zustand ...useProductStore is the hook...products is the state



  return (
    <div>
      <Container  maxW={"1140px"} px={6} bg={useColorModeValue('gray.100', 'gray.800')}>
 {/* bg- useColorMode chng container color as per light dark mode ....color of navbar will be slightly diff from rest of the page */}
        <Flex justifyContent={"space-between"} alignItems={"center"} h={16} flexDir={{ base: "column", sm: "row" }} w={"full"}>
          
          {/* gradient text--PRODUCT CART */}
          <Text
            bgGradient='linear(to-l,#FE0089,#3097BF )'
            bgClip='text'
            fontSize={{ base: '22px', sm: '28px' }}
            fontWeight='extrabold'
            textTransform={'uppercase'}
            >
            <Link to={"/"}>Quick_Cart🛒</Link>
          </Text>


{/* two icons : + & theme */}
          <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
              <Button  colorScheme={"gray"} > 
              <FaRegSquarePlus  fontSize={20}/>{/* react-icon */}
              </Button>
            </Link>

              <Button onClick={toggleColorMode} colorScheme={"gray"} >
                {colorMode === "light" ? <IoMoon />: <LuSun size="20"/>}
              </Button>
          </HStack>
          
        </Flex>
      </Container>
    </div>
  )
}

export default Navbar