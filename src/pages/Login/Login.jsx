import { React,useState,useContext } from 'react'
import {Context} from "../../context/Context";
import './Login.scss';
import { Input,Button, VStack, FormControl, useToast} from '@chakra-ui/react'
import API from '../../api';

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
    <div className='Login'>
      LOGIN
      <VStack className='loginCredentials' spacing='1px'>
        {/* USERNAME */}
        <FormControl className='fieldInput' isRequired>
          <Input className='fieldInput' variant='flushed' type='text' size='md'
            placeholder='Username' 
            onChange={(e)=>setusername(e.target.value)} />
        </FormControl>
        {/* PASSWORD */}
        <FormControl className='fieldInput' isRequired>
          <Input className='fieldInput' variant='flushed' size='md'
            type= 'password'
            placeholder='Password' 
            onChange={(e)=>setpassword(e.target.value)} />
        </FormControl>

        <Button className='btn' colorScheme='teal' size='md' variant='outline'
          type='submit'   isLoading={loading}
          onClick={(e) => submitHandler(e)}> Login </Button>

      </VStack>
    </div>
  )
}

export default Login