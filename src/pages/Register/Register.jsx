import { React, useState } from 'react'
import './Register.scss';
import { Input,Button, VStack, FormControl, useToast } from '@chakra-ui/react'
import Axios from 'axios';
import API from '../../api';
import { AiFillFileAdd } from "react-icons/ai";

const Register = () => {

  //Functions
  const toast = useToast();

  const submitHandler= async (e) =>{
    e.preventDefault();
    setloading(true);
    if(username && email && password){    //if we get all the fields
      try{
        const registerUser = await API.post('/auth/register', {
          username,
          email,
          password,
          profilepic
        });           //SUCCESS
        registerUser.data && window.location.replace("/login");
        toast({
          title:"User Registered succesfully" ,
          status: "success" ,
          duration: 4000 ,
          isClosable: true,
          position: "top",
        });
        setloading(false);
      } catch (err) {       //FAILURE
        console.log(err);
        toast({
          title:"username/email already in use" ,
          status: "error" ,
          duration: 3000 ,
          isClosable: true,
          position: "top",
        });
        setloading(false);
      }
    }
    else{     //if all fields are not present
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

  //function to upload image to Cloudinary and create a respective URL
  const imageUploadHandler = async (file) =>{
    setloading(true);
    if(file.type === 'image/jpeg' || file.type === "image/png"){
      const data = new FormData();
      data.append("file", file)
      data.append("upload_preset", "chat-app-assets")
      data.append("cloud_name","aviroop")

      Axios.post("https://api.cloudinary.com/v1_1/aviroop/image/upload", data)
      .then( (res) => {
        setprofilepic(res.data.url.toString());
        setloading(false);
        console.log("Image uploaded successfully")
      })
      .catch((err)=>{
        console.log(err);
        setloading(false);
      })
    } 
    else if(file === undefined) {   //if we don't get a file
      toast({
        title:"Select an image" ,
        status: "warning" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
      setloading(false);
    }
    else {
      toast({
        title:"Select a .jpeg/.png file" ,
        status: "warning" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
      setloading(false);
    }
  }

  //States
  const [username, setusername] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [profilepic, setprofilepic] = useState();
  const [loading, setloading] = useState(false);
  const [currentpic, setcurrentpic] = useState();

  //Component
  return (
    <div className="Register">
      REGISTER
      <VStack className='registerCredentials' spacing='1px'>
        {/* USERNAME */}
        <FormControl className='fieldInput' isRequired>
          <Input className='fieldInput' variant='flushed' type='text' size='md'
            placeholder='Username' 
            onChange={(e)=>setusername(e.target.value)} />
        </FormControl>
        {/* E-MAIL */}
        <FormControl className='fieldInput' isRequired>
          <Input className='fieldInput' variant='flushed' type='email' size='md'
            placeholder='e-mail ID' 
            onChange={(e)=>setemail(e.target.value)} />
        </FormControl>
        {/* PASSWORD */}
        <FormControl className='fieldInput' isRequired>
          <Input className='fieldInput' variant='flushed' size='md'
            type= 'password'
            placeholder='Password' 
            onChange={(e)=>setpassword(e.target.value)} />
        </FormControl>
        {/* PROFILE PICTURE */}
        <FormControl className='fieldInput'>
          <label htmlFor="profilepicinput">
            <AiFillFileAdd cursor='pointer' style={{ color:'beige',fontSize:"2.5rem",margin:'0.4rem auto'}} />
          </label>
          {currentpic && <div style={{display:'block', fontSize:'0.8rem'}}>{currentpic.name}</div>}
          <Input className='fieldInput' variant='flushed' type='file' size='md'   accept='/image' id='profilepicinput' display='none'
            placeholder='Upload Profile picture' 
            //Image is uploaded here
            onChange={(e) => imageUploadHandler(e.target.files[0])} />
        </FormControl>

        <Button className='btn' colorScheme='teal' size='md' variant='outline' 
        type='submit'
        isLoading={loading}
        onClick={(e) => submitHandler(e)}> Register </Button>

      </VStack>
    </div>
  )
}

export default Register