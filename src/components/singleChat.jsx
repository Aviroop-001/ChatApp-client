import { React, useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import MessageRender from "./secondary/messageRender";
import { Avatar, Box, Text, useToast, Progress, FormControl, Input, InputRightElement, Button } from "@chakra-ui/react";
import SendIcon from '@mui/icons-material/Send';
import { getReceiver } from '../logic/logics';
import io from "socket.io-client";
import API from "../api";
import GIF from "../assets/4UxI.gif";

const endPoint = "http://localhost:5000";
var socket, selectedChatComp;

const SingleChat = () => {

  //Context API
  const { user, selectedChat,setselectedChat,allChats,setallChats } = useContext(Context);

  //States
  const [loading, setloading] = useState();
  const [selectedChatMessages, setselectedChatMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [socketConnection, setsocketConnection] = useState(false);

  //Functions
  const fetchAllMessages = async() =>{
    if(!selectedChat) return;
    setloading(true);
    try {
      //! Try to send object as params in a get request
      const { data } = await API.get(`/messages/${selectedChat._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      console.log('All messages fetched');
      setselectedChatMessages(data);
      setloading(false);
      socket.emit('join chat', selectedChat._id);
    } catch (err) {
      toast({
        title:"Messages couldn't be fetched" ,
        status: "error" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
      console.log(err);
      setloading(false);
    }
  }

  const sendNewMessageHandler = async(e) =>{
    if (e.key === 'Enter') {
      if(newMessage){
        const messageDetails= {'chatID': selectedChat._id, 'messageContent': newMessage};
        try {
          const { data } = await API.post('/messages', 
          messageDetails, 
          {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          console.log("message sent");
          socket.emit("new message", data);
          setselectedChatMessages([...selectedChatMessages, data]);
          setnewMessage("");
        } catch (err) {
          toast({
            title:"Something went wrong :(" ,
            status: "error" ,
            duration: 4000 ,
            isClosable: true,
            position: "top",
          });
          console.log(err);
        }
      }
      else{
        toast({
          title:"Message can't be empty!" ,
          status: "error" ,
          duration: 4000 ,
          isClosable: true,
          position: "top",
        });
      }
    }
  }

  useEffect(() => {
    fetchAllMessages();
    setnewMessage("");
    selectedChatComp = selectedChat;
  }, [selectedChat])
  
  useEffect(() => {
    socket = io(endPoint);
    socket.emit("setup", user);
    socket.on("connection", ()=> setsocketConnection(true));
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived)=>{
      if(newMessageReceived.chat._id !== selectedChatComp._id){
        //Notify
      }
      else{
        setselectedChatMessages([...selectedChatMessages, newMessageReceived]);
        
      }
    });
  });
  

  const toast = useToast();

  return (
    <Box display={{ base: selectedChat? "flex" : "none", md: "flex" }} flexDirection='column' alignItems='center' width={{ base: "100%", md: "70%" }} borderRadius='10px'
    color='#1E2022' position='relative' backgroundColor='#0f2021' _hover={{border:'0.5px #EEEDDE solid'}}>
      {selectedChat? <><Box display='flex' backgroundColor='#203239' color='#EEEDDE'
      width='100%' height='4.5rem' padding='0.5rem 1rem'>
        <Avatar
        size="md"
        m='auto 1.5rem'
        cursor="pointer"
        src={getReceiver(user,selectedChat.users).profilepic}
        />
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'
        width='80%' marginLeft='1rem'>
          <Text fontSize='3xl' fontWeight='500'>{JSON.stringify(getReceiver(user,selectedChat.users).username).slice(1, -1) }</Text>
          <Text color='#E0DDAA' fontSize='md' fontWeight='400'>{JSON.stringify(getReceiver(user,selectedChat.users).email).slice(1, -1) }</Text>
        </Box>
      </Box>
      <Box height='85%' width='100%' margin='0.5rem' position='relative'>
        <MessageRender selectedChatMessages={selectedChatMessages}/>
      </Box>
      </>
      : <Box height='60%' width='50%' margin='8rem auto' textAlign='center' display='flex' flexDirection='column' >
        <img src={GIF} alt="" style={{borderRadius:'2rem'}}/>
        <Text fontSize='4xl' fontFamily='Roboto' color='#E0DDAA'>Select a chat</Text>
      </Box>
      }

      {selectedChat ? <FormControl position='absolute' bottom='5px' margin='0px auto' textAlign='center' marginBottom='1rem'>
        <Input variant='outline' colorScheme='teal' size='lg'
         placeholder="Type message here" value={newMessage}
         height='40px' width='90%' border='0.5px solid teal' borderRadius='5px'
         onChange={(e) =>setnewMessage(e.target.value)} onKeyDown={(e) => sendNewMessageHandler(e)}/>
         {/* <Button width='13%' height='40px' bottom='5px' margin='0px auto' borderRadius='0px' 
         textAlign='center' backgroundColor='blackAlpha.300'outline='none' border='none' boxShadow='none' variant='solid'
         onClick={(e) => sendNewMessageHandler(e)}> SEND </Button> */}
      </FormControl>
      : <Box display='none'></Box>}

      { loading ? <Progress size='xs' isIndeterminate width='100%' h='4px' colorScheme='blue' borderRadius='4px' position='absolute' top='4.5rem'></Progress>
      : <Box display='none'></Box> }
    </Box>
  )
}

export default SingleChat