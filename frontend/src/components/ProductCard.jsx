import {Box, Image,Heading, HStack,IconButton,Text,useToast,useColorModeValue,Modal, ModalHeader, ModalCloseButton,ModalContent,ModalBody,ModalOverlay, VStack,Input, ModalFooter, Button} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useProductStore } from '../store/product.js';
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

const ProductCard = ({product}) => {

  const {updateProduct,deleteProduct} = useProductStore();
  //card color based on color mode---------------------
  const textColor = useColorModeValue("gray.600","gray.200");
  const bg=useColorModeValue("white","gray.800");

// edit ---modal------------------------------
const { isOpen, onOpen, onClose } = useDisclosure()

const [updatedProduct, setUpdateProduct] = useState(product)
const handleUpdateProduct = async(pId,updatedProduct)=>{
 const {success,message} = await updateProduct(pId,updatedProduct);
  onClose();
  if(!success){
    toast({
        title:"Error",
        description:message,
        status:"error",
        duration:3000,
        isClosable:true
    });
  }
    else {
        toast({
            title:"Success",
            description:message,
            status:"success",
            duration:3000,
            isClosable:true
    });
  }
}
// delete product from store--------------------------
  const toast = useToast();

  const handleDeleteProduct = async(pId)=>{
    const {success,message}=await deleteProduct(pId);
    if(!success){
   toast({
        title:"Error",
        description:message,
        status:"error",
        duration:3000,
        isClosable:true
    });
  }
    else {
        toast({
            title:"Success",
            description:message,
            status:"success",
            duration:3000,
            isClosable:true
    });
  } 
}
  //----------------------------------------------------
    return (
   <Box 
   shadow='lg'
   rounded='lg'
   overflow='hidden'
   transition='all 0.3s'
   _hover={{transform:"translateY(-5px)",shadow:"xl"}}
   bg={bg}
   >
{/* ---------------------------------------------------- */}
<Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover"/>

<Box p={4}>
    <Heading as="h3" size="md" mb={2}>{product.name}</Heading>
    
    <Text fontWeight='bold' fontSize='xl' color ={textColor} mb={4}>Rs.{product.price}</Text>
   
    <HStack spacing={2}>
        <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue' />
        <IconButton icon={<DeleteIcon/>} onClick={()=>handleDeleteProduct(product._id)} colorScheme='red' />
    </HStack>
</Box> 

{/* Edit --Modal--------------------------------------- */}
    <Modal isOpen={isOpen} onClose={onClose}>
     <ModalOverlay /> 

<ModalContent>
<ModalHeader>Update Product</ModalHeader>
<ModalCloseButton/>
<ModalBody> 
<VStack spacing={4}>
<Input placeholder='Product name' name='name' value={updatedProduct.name} onChange={(e)=>setUpdateProduct({...updatedProduct,name:e.target.value})}/>

<Input placeholder='Product Price' name='price' type='number' value={updatedProduct.price} onChange={(e)=>setUpdateProduct({...updatedProduct,price:e.target.value})}/>

<Input placeholder='Image URL'name='image'  value={updatedProduct.image} onChange={(e)=>setUpdateProduct({...updatedProduct,image:e.target.value})}/>
</VStack>

</ModalBody>

<ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={()=>handleUpdateProduct(product._id,updatedProduct)} >
              Update
            </Button>

          </ModalFooter>
     </ModalContent>
      </Modal> 

   </Box>
  )
}

export default ProductCard