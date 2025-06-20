import { Container, Heading, useColorModeValue, VStack,Box ,Input,Button,useToast} from '@chakra-ui/react'
// import React from 'react'
import { useState } from 'react'
import {useProductStore} from '../store/product.js'


const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })
  
// from store product.js
const {createProduct} = useProductStore();


// toast notif on creation of product
const toast = useToast()

//on clicking add product button
const handleAddProduct = async() =>{
    const {success,message} = await createProduct(newProduct)
console.log("success : ",success);//returned from product.js
console.log("message : ",message); //returned by product.js
console.log("newProduct : ",newProduct);//newly created product on this create page 

if(!success){
 toast({
    title: "Error ",
    description: message,
    status: "error",
    duration: 4000,
    isClosable: true,

  }) 
}
  else 
  {
    toast({
      title: "Success ",
      description: message,
      status: "success",
      duration: 4000,
      isClosable: true,
    })
  }
}



  return (
<Container maxW={"container.sm"} >
<VStack spacing={8}>

<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
    Create New Product
</Heading>

<Box w={"full"} bg={useColorModeValue("white","gray.900")} p={6} rounded={"lg"} shadow={"md"}>
<VStack spacing={4} >
<Input placeholder='Product name'
   name='name' value={newProduct.name}
   onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}></Input>


  <Input placeholder='Product Price'
   name='price' value={newProduct.price}
   onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}></Input>


   <Input placeholder='Product image'
   name='image' value={newProduct.image}
   onChange={(e)=>setNewProduct({...newProduct,image:e.target.value})}></Input>

   <Button onClick={handleAddProduct} w='full' bg={'#FE0089'}>Add Product</Button>
</VStack>
</Box>


</VStack>
    </Container>
  )
}

export default CreatePage