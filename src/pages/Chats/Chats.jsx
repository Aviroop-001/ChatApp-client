import { React, useContext } from 'react';
import {Context} from '../../context/Context';
import { Box } from '@chakra-ui/react';
import NavBar from '../../components/NavBar/NavBar';
import AllChats from '../../components/allChats/allChats';
import SingleChat from '../../components/singleChat/singleChat';
import './Chats.scss';

const Chats = () => {

  // const {user, dispatch} = useContext(Context);

  return (
    <div className='Chats'>
        <NavBar/>
        <Box className='chatBucket'>
            <AllChats />
            <SingleChat />
        </Box>
    </div>
  )
}

export default Chats