import { border, Box, Text } from "@chakra-ui/react";
import { React, useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import ScrollableFeed from "react-scrollable-feed";

const MessageRender = ({ selectedChatMessages }) => {
  const { user, selectedChat, setselectedChat, allChats, setallChats } =
    useContext(Context);

  return (
    <ScrollableFeed forceScroll={true}>
      {selectedChatMessages?.map((m) => (
        <Box display='flex' flexDirection='column'>
          <Text
            key={m._id}
            backgroundColor={
              user._id === m.sender._id ? "blue.300" : "green.400"
            }
            display="block"
            margin="0.3rem 1rem"
            width="fit-content"
            maxWidth="75%"
            alignSelf={user._id === m.sender._id ? "flex-end" : "flex start"}
            padding="0.3rem 1rem"
            borderRadius="15px"
            textAlign="left"
          >
            {m.content}
          </Text>
        </Box>
      ))}
    </ScrollableFeed>
  );
};

export default MessageRender;
