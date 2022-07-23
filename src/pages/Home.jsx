import React from 'react'
import Typed from 'react-typed';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Box, Text, CircularProgress} from '@chakra-ui/react'

const Home = () => {

  const strings = ['Elegance', 'Texting', 'connecting']

  return (
    <Box height='100vh' padding={{base:'2rem',md:'4rem'}}>
      <Box display='flex' alignItems='center' justifyContent='center'  paddingTop={{base:'3rem',md:'5rem'}}>
        <Text fontSize={{base:'6xl',md:'8xl'}} textAlign='center' fontFamily='Poppins'  marginBottom='0.5rem' width='-webkit-fit-content' color='wheat' textShadow='3px 3px 2px grey'>RADIUS</Text>
        {/* <CircularProgress 
        thickness='5px' size='5rem' isIndeterminate color='#141E27' margin='1rem'
        outline='none' border='none'/> */}
      </Box>
      <Text fontSize={{base:'xl',md:'2xl'}} textAlign='center' fontFamily='exo' fontWeight='light'> 
        <Typed
        strings={strings}
        typeSpeed={50}
        startDelay={30}
        backSpeed={70}
        backDelay={1000}
        showCursor={false}
        loop={true}/> 
         &nbsp;redefined
      </Text>
      <Box marginTop='6rem' display='flex' justifyContent='center'>
        <Button className='btn' colorScheme='#141E27' size='md' variant='outline' margin='1rem' height='3rem' width='6rem' 
        as={RouterLink} to='/login'  > Login </Button>
        <Button className='btn' colorScheme='#141E27' size='md' variant='outline' margin='1rem' height='3rem' width='6rem'  
        as={ RouterLink } to='/register'> Register </Button>
      </Box>
    </Box>
  )
}

export default Home