import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer,
            ChatContainer, 
            MessageList, 
            Message, 
            MessageInput,
            ConversationHeader,
            TypingIndicator,
            ConversationList,
            Conversation,
            Sidebar,
} from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';

import  { Container,  Avatar, Text} from "@chakra-ui/react"
import {  RiMessageFill } from "react-icons/ri"

const chatData = [
    {  user:"jame", status:"online", you:"hello dear", messages:["how was your day", "how was your day","how was your day",  ], send:"incoming", unreadDot:true, unreadCnt: 1,},
    {  user:"doe", status:"ofline", you:"hello dear", messages:["how was your day",  ], send:"incoming", unreadDot:false, unreadCnt: null,  },
    {  user:"john", status:"online", you:"hello dear", messages:["how was your day", "how was your day",  ], send:"incoming", unreadDot:false, unreadCnt: null, },
    {  user:"peace", status:"ofline", you:"hello dear", messages:["how was your day",  ], send:"incoming", unreadDot:true, unreadCnt: 2, },
    {  user:"philips", status:"ofline", you:"hello dear", messages:["how was your day","how was your day","how was your day","how was your day",  ], send:"incoming", unreadDot:false, unreadCnt: 3, },
]

const Chat = () =>{
    const [messageInputValue, setMessageInputValue] = useState("");
    return(
             <div style={{
              height: "600px",
              position: "relative"
            }}>
                      <MainContainer responsive>                
                        <Sidebar position="left" scrollable={false}>
                        <Container height="74px" 
                        display="flex" 
                        justifyContent="space-between" 
                        alignItems="center"
                        borderBottom="1px solid gray.50"
                        bgColor="blue.50">
                            <Text> Message </Text>
                            <RiMessageFill />
                        </Container>
                          <ConversationList>
                            {chatData.map((data)=>(                                                     
                            <Conversation name={data.user} lastSenderName={data.user} info={data.chat1}
                            unreadDot={data.unreadDot} unreadCnt={data.unreadCnt} >
                              <Avatar src={"lillyIco"} name={data.name} status={data.status} />
                            </Conversation>
                            ))}                                 
                          </ConversationList>
                        </Sidebar>
                        
                        <ChatContainer style={{border:"none"}}>
                          <ConversationHeader>
                            <ConversationHeader.Back />
                            <Avatar src={"zoeIco"} name="Zoe" />
                            <ConversationHeader.Content userName="Zoe" info="Active 10 mins ago" />       
                          </ConversationHeader>
                    <MessageList typingIndicator={<TypingIndicator content="Zoe is typing" />}>
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Zoe",
                      direction: "incoming",
                      position: "single"
                    }}>
                              <Avatar src={"zoeIco"} name="Zoe" />
                            </Message>
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Patrik",
                      direction: "outgoing",
                      position: "single"
                    }} avatarSpacer />
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Zoe",
                      direction: "incoming",
                      position: "first"
                    }} avatarSpacer />
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Zoe",
                      direction: "incoming",
                      position: "normal"
                    }} avatarSpacer />
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Zoe",
                      direction: "incoming",
                      position: "normal"
                    }} avatarSpacer />
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Zoe",
                      direction: "incoming",
                      position: "last"
                    }}>
                              <Avatar src={"zoeIco"} name="Zoe" />
                            </Message>
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Patrik",
                      direction: "outgoing",
                      position: "first"
                    }} />
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Patrik",
                      direction: "outgoing",
                      position: "normal"
                    }} />
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Patrik",
                      direction: "outgoing",
                      position: "normal"
                    }} />
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Patrik",
                      direction: "outgoing",
                      position: "last"
                    }} />
                            
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Zoe",
                      direction: "incoming",
                      position: "first"
                    }} avatarSpacer />
                            <Message model={{
                      message: "Hello my friend",
                      sentTime: "15 mins ago",
                      sender: "Zoe",
                      direction: "incoming",
                      position: "last"
                    }}>
                              <Avatar src={"zoeIco"} name="Zoe" />
                            </Message>
                          </MessageList>
                          <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} />
                        </ChatContainer>                         
                      </MainContainer>
                    </div>
    )
}

export default Chat;