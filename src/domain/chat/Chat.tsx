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



const getGPTResponse = async (questionText:string) => {

    const result = await fetch('https://localhost:8080/chat-gpt/question', {
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

const Chat = () => {
    const [content, setContent] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);


    const handleSendMessage = async () => {
        let currentInput:string = inputRef.current ? inputRef.current.value as string : ''
        setContent(prev => [...prev, currentInput]);
        const response = await getGPTResponse(currentInput)
        setContent(prev => [...prev, response.data.choices.text as string])
        currentInput = '';
    }

    return (
        <Root>
            <Wrapper>
                <HeaderContainer>
                    <HeaderWrapper>
                        <NameContainer>
                            <NameWrapper>
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
                                    {content?.map(text => {
                                        return <BubbleRow key={text} >
                                            <div className='BubbleContainer'>
                                                <div className='BubbleWrapper'>{text}</div>
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
