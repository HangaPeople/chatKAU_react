import React from 'react';
import styled from "@emotion/styled";
import Chat from "../src/domain/chat/Chat";


export const Root = styled.section`
  width:100vw;
  height:100vh;
  
`

export const Wrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`

const ChatPage = () => {
    return (
        <Root>
            <Wrppaer>
                <Chat/>
            </Wrppaer>
        </Root>
    );
};

export default ChatPage;
