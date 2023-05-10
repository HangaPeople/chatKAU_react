import React from 'react';
import styled from "@emotion/styled";
import Chat from "../domain/chat/Chat";


export const Root = styled.section`
  width:100vw;
  height:100vh;
  
`

export const Wrapper = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:100%;
  
`

const ChatPage = () => {
    return (
        <Root>
            <Wrapper>
                <Chat/>
            </Wrapper>
        </Root>
    );
};

export default ChatPage;
