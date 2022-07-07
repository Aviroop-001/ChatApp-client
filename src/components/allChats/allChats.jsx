import { React, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import { useToast, Box, Stack, HStack, VStack, StackDivider, Avatar, Text } from "@chakra-ui/react";
import API from "../../api";

import './allChats.scss';

const AllChats = () => {

  //Context API
  const { user,dispatch,selectedChat,setselectedChat,allChats,setallChats } = useContext(Context);

  //States

  //Functions
  const toast = useToast();

  const fetchAllChats = async() =>{
    try {
      const res = await API.get('/chats/', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
      setallChats(res.data);
      console.log('All chats fetched');
    } catch (err) {
      toast({
        title:"Couldn't Fetch Chats :(" ,
        status: "error" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
    }
  }

  useEffect(() => {
    fetchAllChats();
  }, [])
  

  return (
    <Box display={{ base: selectedChat? "none" : "flex", md: "flex" }} flexDirection='column' alignItems='center' 
    width={{ base: "100%", md: "30%" }}
    color='blackAlpha.800'>
        My Chats
        <Box width='90%' h='100%'
        display='flex' flexDirection='column'>
          {allChats ? (<VStack
            overflow='visible' overflowY='scroll'
            divider={<StackDivider borderColor='gray.200' />}
            align='stretch'>
            {
              allChats.map(c =>(
                <Box key={c._id}
                display='flex' minH='3.5rem' margin={{ base: '0.4rem 2rem', md: '0.4rem'}}
                onClick={()=>setselectedChat(c)}
                textAlign='center'
                borderRadius='8px'
                // _active={{background:'teal.100', color:'blackAlpha.800'}}
                 _hover={{background:'blackAlpha.100', color:'teal.800'}}>
                  <Avatar
                  size={{ base: "md", md: "sm" }}
                  m='auto 1.5rem'
                  cursor="pointer"
                  src={c.users[1].profilepic}
                  />
                  <Box display='flex' textAlign='left' flexDirection='column'>
                    <Text fontSize='lg' fontWeight='500'>{JSON.stringify(c.users[1].username).slice(1, -1) }</Text>
                    <Text fontSize='md' fontWeight='400'>Last message here</Text>
                  </Box>
                </Box>
              ))
            }
          </VStack>)
          : (<Text>No Chats exist</Text>)
          }
        </Box>
    </Box>
  )
}

export default AllChats