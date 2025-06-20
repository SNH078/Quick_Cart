import { VStack ,SimpleGrid,Container,Text,Image} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product.js';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
// import React from 'react';

const HomePage = () => {
//fetch products from store
const {fetchProducts,products} = useProductStore();

//when page loads fetch products
useEffect(() => {
fetchProducts();
},[fetchProducts]);
console.log("fetched Products : ",products);

    return (
<Container >
<VStack spacing={4}  >

<Text
fontSize={{ base: '22px', sm: '28px' }}
fontWeight='bold'
bgClip='text'
bgGradient='linear(to-l, #DB2191,#3097BF)'
textAlign={'center'}>
Current Products 
</Text>

{/* diplay products --mapping of fetched products */}
<SimpleGrid 
columns={{ base: 1, md:2 ,lg:3}}   //responsive grid -- no. of column as per window size
spacing={8}
w={"max-content"}
>
    {products.map((product) => (
        <ProductCard key={product._id} product={product}/>
    ))}
</SimpleGrid>


{/* condtional rendering in case no product is present */}
{products.length === 0 && (
<Text fontSize={{ base: '18px', sm: '22px' }} fontWeight='bold'
textAlign={'center'} color={'gray.500'}>
No Products Found 😞{" "}
<br/>


<Link to={"/create"}>
<Text as={"span"} color={"#3097BF"} _hover={{color:"blue.500"}} >
<Image src="https://i.pinimg.com/originals/93/d5/79/93d5790a9ed64a9ec17494651ef5e796.gif"   display={"inline-block"}/>

</Text>

</Link>
</Text>
)}



</VStack>
</Container>
    );
};

export default HomePage;