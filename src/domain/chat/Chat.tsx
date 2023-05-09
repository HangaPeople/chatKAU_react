import React from 'react';
import {
    BodyAside,
    BodyContainer,
    BodyWrapper, BubbleBox, BubbleRow, ChatContainer, ChatInput, ChatInputContainer, ChatInputWrapper, ChatWrapper,
    HeaderContainer,
    HeaderWrapper,
    NameContainer,
    NameWrapper,
    Root,
    Wrapper
} from "./Chat.styles";
import {Box, Button, Icon} from "@mui/material";

const Chat = () => {
    return (
        <Root>
            <Wrapper>
                <BodyContainer>
                    <BodyWrapper>
                        <ChatContainer>
                            <ChatWrapper>
                                <BubbleBox>
                                    {query.status === 'error' ? (
                                        <div>메세지 페칭 에러 발생</div>
                                    ) : query.status === 'loading' ? (
                                        <div>로딩중..</div>
                                    ) : (
                                        query.data.pages.map(page => {
                                            return page.result.map(data => {
                                                return (
                                                    <BubbleRow key={data.chatId} loginId={data.loginId}>
                                                        <div className='BubbleContainer'>
                                                            <div className='BubbleWrapper'>{data.content}</div>
                                                        </div>
                                                    </BubbleRow>
                                                )
                                            })
                                        })
                                    )}
                                    <div ref={targetElement}>
                                        {query.isFetchingNextPage && query.hasNextPage ? 'Loading...' : 'No search left'}
                                    </div>
                                </BubbleBox>
                                <ChatInputContainer>
                                    <ChatInputWrapper>
                                        <ChatInput multiline maxRows={5} onChange={e => setContent(e.target.value)}></ChatInput>
                                        <Button onClick={handleSendMessage}>
                                            전송
                                        </Button>
                                    </ChatInputWrapper>
                                </ChatInputContainer>
                            </ChatWrapper>
                        </ChatContainer>
                    </BodyWrapper>
                </BodyContainer>
            </Wrapper>
        </Root>
    );
};

export default Chat;
