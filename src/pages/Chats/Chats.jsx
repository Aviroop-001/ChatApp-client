import { React, useContext } from 'react';
import {Context} from '../../context/Context';
import { Box } from '@chakra-ui/react';
import NavBar from '../../components/NavBar';
import AllChats from '../../components/allChats';
import SingleChat from '../../components/singleChat';

const Chats = () => {

  // const {user, dispatch} = useContext(Context);

  return (
    <div className='Chats' color='#EEEDDE'
    height='100vh'
    width='100vw'>
        <NavBar/>
        <Box className='chatBucket' display='flex'
        flexDirection='row'
        justifyContent='center'
        height='91vh'
        padding='0.5rem'
        paddingBottom='1rem'>
            <AllChats />
            <SingleChat />
        </Box>
    </div>
  )
}

export default Chats