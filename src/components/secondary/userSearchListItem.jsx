import { Avatar, Box, Text } from '@chakra-ui/react'
import { React, useContext } from 'react';
import { Context } from "../../context/Context";

const userSearchListItem = ( {targetUser, chatAccessHandler} ) => {

    // const { user, dispatch } = useContext(Context);

  return (
    <Box onClick={chatAccessHandler}
    cursor='pointer' bg='teal' _hover={{background:'teal.500', color:'blue'}}
    display="flex" flexDirection='row' justifyContent='space-evenly' textAlign='center'
    color="black"
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
      <Text fontSize="xl" color='crimson'>{targetUser.username}</Text>
      <Text fontSize="md" color='black'>
        <b>Email : </b>
        {targetUser.email}
      </Text>
    </Box>
  </Box>

      // <Text fontSize='md' color='red' >{targetUser.username}</Text>
  )
}

export default userSearchListItem