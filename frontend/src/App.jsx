// import { Box,Button, useColorMode, useColorModeValue , useToast } from '@chakra-ui/react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import Navbar from './components/Navbar.jsx'
function App() {
  
   return (
    <div>
      <Box minH={"100vh"} bg={useColorModeValue('gray.100', 'gray.900')}>
       
        <Navbar/>   {/* kept here (outside routes) so that which ever route u visit ,navbar is always there at top */}
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
        </Routes>
      </Box>
     
    </div>
  )
}
export default App
