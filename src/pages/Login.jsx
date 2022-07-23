import { React,useState,useContext } from 'react'
import {Context} from "../context/Context";
import { Input,Button, VStack, FormControl, useToast, Box, Text, Link} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import API from '../api';

const Login = () => {

  //states
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);

  //functions
  const toast = useToast();

  const {user, dispatch, isFetching} = useContext(Context);

  const submitHandler =async (e) =>{

    e.preventDefault();
    setloading(true);

    if(username && password){
      try {
        const userData = await API.post('/auth/login',{
          username,
          password
        });
        // localStorage.setItem("ChatCurrentUser", JSON.stringify(userData.data));
        dispatch({type : "LOGIN_SUCCESS", payload: userData.data});
        userData.data && window.location.replace("/chats");
        toast({
          title:"Login succesful" ,
          status: "success" ,
          duration: 4000 ,
          isClosable: true,
          position: "top",
        });
        setloading(false);
      } catch (err) {
        console.log(err);
        dispatch({type : "LOGIN_FAILURE"});
        toast({
          title:"Wrong Credentials" ,
          status: "error" ,
          duration: 3000 ,
          isClosable: true,
          position: "top",
        });
        setloading(false);
      }
    }
    else{
      toast({
        title:"All fields are mandatory" ,
        status: "warning" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
      setloading(false);
    }
  }

  //Component
  return (
    <Box textAlign='center' padding='3rem' fontSize='2.5rem' height='100vh' fontFamily='exo'>
      <Text margin='2rem auto'>LOGIN</Text>
      <VStack className='loginCredentials' spacing='1px'
        padding='auto 2rem'
        margin='2rem auto'
        height='35vh'
        width='50vw'
        display='flex'
        justifyContent='space-evenly'
        borderRadius='10px'>
        {/* USERNAME */}
        <FormControl className='fieldInput' isRequired >
          <Input className='fieldInput' variant='ghost' type='text' size='md'
            placeholder='Username' 
            colorScheme='#141E27'
            backgroundColor='#203239'
            color='EEEDDE'
            fontWeight='bolder'
            width='80%'
            padding='1.5rem'
            onChange={(e)=>setusername(e.target.value)} />
        </FormControl>
        {/* PASSWORD */}
        <FormControl className='fieldInput' isRequired>
          <Input className='fieldInput' variant='ghost' size='md'
            type= 'password'
            placeholder='Password' 
            colorScheme='#141E27'
            backgroundColor='#203239'
            color='EEEDDE'
            fontWeight='bolder'
            width='80%'
            padding='1.5rem'
            onChange={(e)=>setpassword(e.target.value)} />
        </FormControl>

        <Button className='btn' colorScheme='#141E27' size='md' variant='outline' type='submit' isLoading={loading} margin='2rem' height='3rem' width='6rem'
          onClick={(e) => submitHandler(e)}> Login </Button>

      </VStack>
      <Text fontSize='md'>New user? Register <Link as={ RouterLink } to='/register' color='blue.200'>here</Link> </Text>
    </Box>
  )
}

export default Login