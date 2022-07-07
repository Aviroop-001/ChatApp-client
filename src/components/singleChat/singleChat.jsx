import { React, useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { Avatar, Box, Text, useToast } from "@chakra-ui/react";
import API from "../../api";

import './singleChat.scss';

const SingleChat = () => {

  //Context API
  const { user,dispatch,selectedChat,setselectedChat,allChats,setallChats } = useContext(Context);

  //States

  //Functions
  const toast = useToast();

  return (
    <Box display={{ base: selectedChat? "flex" : "none", md: "flex" }} flexDirection='column' alignItems='center' 
    width={{ base: "100%", md: "70%" }}
    border='red 1px dashed' color='blackAlpha.800'>
      {selectedChat? <Box display='flex' backgroundColor='blackAlpha.100'
      width='100%' padding='0.5rem 1rem'>
        <Avatar
        size="md"
        m='auto 1.5rem'
        cursor="pointer"
        src={selectedChat.users[1].profilepic}
        />
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'
        width='80%' marginLeft='1rem'>
          <Text fontSize='3xl' fontWeight='500'>{JSON.stringify(selectedChat.users[1].username).slice(1, -1) }</Text>
          <Text fontSize='md' fontWeight='400'>{JSON.stringify(selectedChat.users[1].email).slice(1, -1) }</Text>
        </Box>
      </Box> 
      : <Text>Select Chat</Text>
      }
    </Box>
  )
}

export default SingleChat