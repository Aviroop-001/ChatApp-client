import { Avatar, Box, Text } from '@chakra-ui/react'
import { React, useContext } from 'react';
import { Context } from "../../context/Context";

const userSearchListItem = ( {targetUser, chatAccessHandler} ) => {

    // const { user, dispatch } = useContext(Context);

  return (
    <Box onClick={chatAccessHandler}
    cursor='pointer'
    bg='#EEEDDE' 
    _hover={{background:'#E0DDAA', color:'blue'}}
    display="flex" flexDirection='row' justifyContent='space-evenly' textAlign='center'
    color="#EEEDDE"
    width='50%' m='0.1rem auto'
    borderRadius='5px'>

    <Avatar
      size="md"
      m='auto 1.5rem'
      cursor="pointer"
      name={targetUser.username}
      src={targetUser.profilepic}
      />

    <Box display='flex' flexDirection='column' margin='5px auto' w='70%' textAlign='left'>
      <Text fontSize="xl" color='#141E27' fontWeight='bold'>{targetUser.username}</Text>
      <Text fontSize="md" color='#203239' fontStyle='italic'>
        <b style={{color:'#203239', fontWeight:'light'}}>e-mail : </b>
        {targetUser.email}
      </Text>
    </Box>
  </Box>

      // <Text fontSize='md' color='red' >{targetUser.username}</Text>
  )
}

export default userSearchListItem