import React, {useRef, useState} from 'react';
import {
    BodyContainer,
    BodyWrapper,
    BubbleBox,
    BubbleRow,
    ChatContainer,
    ChatInput,
    ChatInputContainer,
    ChatInputWrapper,
    ChatWrapper, HeaderContainer, HeaderWrapper,
    NameContainer, NameWrapper,
    Root,
    Wrapper
} from "./Chat.styles";
import {Box, Button, Icon} from "@mui/material";

import logo from './emblem.png'



const getGPTResponse = async (questionText:string) => {

    const result = await fetch('http://localhost:8080/chat-gpt/question', {
        method: 'POST', // HTTP 요청 메서드 설정
        headers: {
            'Content-Type': 'application/json' // 요청 바디의 데이터 타입 설정
        },
        body:JSON.stringify({
            question:questionText
        }),
    }).then(res => res.json())

    return result;
}

export interface Bubble {
    type: 'user' | 'gpt';
    text:string;
}

const Chat = () => {
    const [content, setContent] = useState<Bubble[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);


    const handleSendMessage = async () => {
        let currentInput:string = inputRef.current ? inputRef.current.value as string : ''
        setContent(prev => [...prev, {type:'user', text:currentInput}]);
        const response = await getGPTResponse(currentInput)
        setContent(prev => [...prev,{type:'gpt',text:response.choices[0].text as string} ])
        currentInput = '';
    }

    return (
        <Root>
            <Wrapper>
                <HeaderContainer>
                    <HeaderWrapper>
                        <NameContainer>
                            <NameWrapper>
                                <img src={logo} alt="로고"/>
                                kau-GPT
                            </NameWrapper>
                        </NameContainer>
                    </HeaderWrapper>
                </HeaderContainer>
                <BodyContainer>
                    <BodyWrapper>
                        <ChatContainer>
                            <ChatWrapper>
                                <BubbleBox>
                                    {content?.map(bubble => {
                                        return <BubbleRow key={bubble.text} type={bubble.type} >
                                            <div className='BubbleContainer'>
                                                <div className='BubbleWrapper'>{bubble.text}</div>
                                            </div>
                                        </BubbleRow>
                                    })}
                                </BubbleBox>
                                <ChatInputContainer>
                                    <ChatInputWrapper>
                                        <ChatInput multiline maxRows={5} inputRef={inputRef} ></ChatInput>
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
