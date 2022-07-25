import { React, useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { useToast, Box, VStack, StackDivider, Avatar, Text, Progress } from "@chakra-ui/react";
import { getReceiver } from '../logic/logics';
import API from "../api";

const AllChats = () => {

  //Context API
  const { user,selectedChat,setselectedChat,allChats,setallChats,notifications,setnotifications } = useContext(Context);
  const [loading, setloading] = useState()

  //States

  //Functions

  const toast = useToast();

  const fetchAllChats = async() =>{
    setloading(true);
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      };
      const { data } = await API.get('/chats/', config);
      console.log('All chats fetched');
      setallChats(data);
      console.log('data', allChats);
      setloading(false);
    } catch (err) {
      toast({
        title:"Couldn't Fetch Chats :(" ,
        status: "error" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
      console.log(err);
      setloading(false);
    }
  }

  useEffect(() => {
    fetchAllChats();
  }, []);
  return (
    <Box display={{ base: selectedChat? "none" : "flex", md: "flex" }} flexDirection='column' alignItems='center' 
    width={{ base: "100%", md: "30%" }}>
        <Box width='96%' h='100%' backgroundColor='#141E27' padding='0.5rem 0px'
        display='flex' flexDirection='column'>
          {loading===false ?(<VStack padding='0.5rem 0px'
            overflow='visible' overflowY='scroll' height='100%' scrollBehavior='smooth'
            >
            {
              allChats.map(c =>(
                <Box key={c._id} display='flex' minH='3.5rem'  width='90%'
                onClick={()=>setselectedChat(c)} textAlign='center' borderRadius='4px' backgroundColor='#203239' _active={{background:'#141E27'}}
                _hover={{boxShadow:'1px 1px 2px #E0DDAA', width:'93%'}}
                position='relative'>
                  <Avatar
                  size={{ base: "md", md: "sm" }}
                  m='auto 1.5rem'
                  cursor="pointer"
                  src={getReceiver(user,c.users).profilepic}
                  />
                  <Box display='flex' textAlign='left' flexDirection='column'>
                    <Text fontSize='lg' fontWeight='500' color='#EEEDDE'>
                      {JSON.stringify(getReceiver(user,c.users).username).slice(1, -1)}
                    </Text>
                    <Text fontSize='md' fontWeight='400' color='#EEEDDE'>Last message</Text>
                  </Box>
                  {/* FIXME: Display a red dot if notification is there for a particular chat */}
                  { (notifications.includes(c._id))? (
                    <Box height='8px' width='8px' backgroundColor='lime'
                    borderRadius='10px' 
                    position='absolute'
                    right='10px'
                    top='10px'
                    ></Box>
                    ) : (
                      <Box display='none'></Box>
                    )
                  }
                </Box>
              ))
            }
          </VStack>):(<Progress size='xs' colorScheme="blue" w='100%' m='1rem auto' isIndeterminate borderRadius='4px' />)
          }
        </Box>
    </Box>
  )
}

export default AllChats