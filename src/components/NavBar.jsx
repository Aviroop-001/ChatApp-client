import {
  Box,Button,Tooltip,Menu,MenuButton,MenuItem,MenuList,Avatar,MenuDivider,Text,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,Input, useDisclosure, useToast, Progress } from "@chakra-ui/react";
import { React, useContext, useState, useEffect } from "react";
import { Context } from "../context/Context";
import UserSearchListItem from "./secondary/userSearchListItem";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from "@mui/icons-material/Logout";
// import "./styles/NavBar.scss";
import API from "../api";
import { bgcolor } from "@mui/system";

const NavBar = () => {

  //Context API
  const { user,dispatch,selectedChat,setselectedChat,allChats,setallChats } = useContext(Context);

  //For Chakra UI Interactive components
  const { isOpen, onOpen, onClose } = useDisclosure(); //For Modal
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();    //Renaming variables for Drawer

  //States
  const [searchResults, setsearchResults] = useState();
  const [loading, setloading] = useState();
  const [chatLoading, setchatLoading] = useState()

  //Functions
  const toast = useToast();

  const logoutHandler = () => {
    try {
      console.log("logout Tried");
      dispatch({type : "LOGOUT"});
      localStorage.removeItem("ChatCurrentUser");
      toast({
        title:"Logout successful :)" ,
        status: "success" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
      // window.location.replace("/login");
    } catch (err) {
      toast({
        title:"Something went wrong :(" ,
        status: "error" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
    }
  };

  const userSearchHandler =async(searchedUser) => {
    setloading(true);
    if(searchedUser){
      console.log(searchedUser);
      try {
        const resultMatch= await API.get(`/users?username=${searchedUser}`,{
            headers: {
              'Authorization': `Bearer ${user.token}`,
            }
          }
        );
        setsearchResults(resultMatch.data);
        setloading(false);
      } catch (error) {
        toast({
          title:"User not Found!!" ,
          status: "error" ,
          duration: 4000 ,
          isClosable: true,
          position: "top",
        });
        setloading(false);
      }
    }
    else{
      console.log("empty");
      toast({
        title:"Input Field can't be empty" ,
        status: "error" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
    }
  };

  const chatAccessHandler = async(id) =>{
    setchatLoading(true);
    try {
      const { data } = await API.post('/chats/',{ id }, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
      setselectedChat(data);
      setloading(false);
      onCloseDrawer();
    } catch (err) {
      toast({
        title:"Chat not found :(" ,
        status: "error" ,
        duration: 4000 ,
        isClosable: true,
        position: "top",
      });
      console.log(err);
      setloading(false);
    }
  }

  //Component
  return (
    <Box color='black' padding='auto 1rem'>
      <Box height='9vh' width='100vw' display='flex' flexDirection='row'
      justifyContent='space-between'
      alignItems='center'>
        <Avatar size="md" src={user.profilepic} backgroundColor='#203239' margin='auto 1rem' onClick={onOpen} cursor='pointer'/>
        <Box width='100px'
        height='100%'
        marginRight='2rem'
        display='flex'
        justifyContent='space-evenly'
        flexDirection='row'
        alignItems='center'>
          <Tooltip hasArrow label="Search Users" bg="#203239">
          <Button
            variant="ghost"
            colorScheme="#EEEDDE"
            size="md"
            width="2rem"
            fontSize="1.3rem"
            onClick={onOpenDrawer}
            backgroundColor='#141E27' _hover={{backgroundColor:'#203239'}}
          >
            <SearchIcon style={{ fill: '#EEEDDE' }} />
          </Button>
        </Tooltip>
        <Menu>
          <MenuButton as={Button} _hover={{backgroundColor:'#203239'}} _active={{backgroundColor:'#203239'}} backgroundColor='#141E27' width='2rem' padding='0' >
            <MoreVertIcon style={{ fill: ' #EEEDDE' }} />
          </MenuButton>
          <MenuList backgroundColor=' #203239'>
            <MenuItem icon={<PersonIcon style={{ fill: ' #EEEDDE' }} />} onClick={onOpen} backgroundColor=' #203239' _hover={{backgroundColor:'#141E27'}}>
              <Text color=' #EEEDDE'>My Profile</Text>
            </MenuItem >
            {/* POP-UP Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader
                  fontSize="4xl"
                  fontFamily="Poppins"
                  textAlign="center"
                  m="2rem"
                  color='#141E27'
                >
                  {user.username}
                </ModalHeader>
                <ModalBody
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-evenly"
                >
                  <Avatar size="xl" src={user.profilepic} backgroundColor='#203239' />
                  <Text fontSize="2xl" margin="auto 1px" color='#141E27'>
                    {user.email}
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {/* POP-UP Modal ends */}
            <MenuDivider />
            <MenuItem icon={<LogoutIcon style={{ fill:  '#EEEDDE' }} />} onClick={logoutHandler} backgroundColor=' #203239' _hover={{backgroundColor:'#141E27'}}>
              <Text color=' #EEEDDE'>Logout</Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<AlternateEmailIcon style={{ fill: ' #EEEDDE' }} />} backgroundColor=' #203239' _hover={{backgroundColor:'#141E27'}}>
            <Text color=' #EEEDDE'>Contact Developer</Text>
            </MenuItem>
          </MenuList>
        </Menu>
        </Box>
      </Box>
      <div className="searchBar">
        <Drawer 
          isOpen={isOpenDrawer}
          placement="top"
          onClose={onCloseDrawer}>
          <DrawerOverlay/>
          <DrawerContent backgroundColor='#141E27' w='60vw' textAlign='center' m='0rem auto' borderRadius='0rem 0rem 1rem 1rem'>
            <DrawerCloseButton />
            <DrawerHeader fontSize='2xl' color='#EEEDDE'>Search User</DrawerHeader>

            <DrawerBody mb='1rem'>
              <Input placeholder="Search by username..." w='70%' autoFocus={true}
                onChange={(e) => userSearchHandler(e.target.value)} />
            </DrawerBody>
            {loading ? (
                <Progress size='xs' colorScheme="blue" w='70%' m='1rem auto' isIndeterminate borderRadius='5px' />) :  
                (searchResults?.map(targetUser =>(
                  <UserSearchListItem key={targetUser._id} targetUser={targetUser} chatAccessHandler={()=>chatAccessHandler(targetUser._id)} />
                )))
            }
            <DrawerFooter>
              {/* <Button colorScheme="green" mr={2} variant="outline" onClick={userSearchHandler}>Search</Button> */}
              <Button color='#EEEDDE' backgroundColor='crimson' variant="outline" mr={3} onClick={onCloseDrawer} _active={{backgroundColor:'maroon'}} _hover={{backgroundColor:'maroon'}}> Close </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </Box>
  );
};

export default NavBar;
