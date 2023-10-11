import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react';
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
import {Button} from "@mui/material";

import logo from './emblem.png'
import {Bubble, commonQuestions} from "../../atom/Chat";
import {getGPTResponse} from "../../api/ResponseApi";
import SlideMenu from "../../atom/InitialSlideMenu";

const Chat = () => {
    const [content, setContent] = useState<Bubble[]>([{"type": "gpt", "text": "안녕하세요, 무엇을 도와드릴까요?", "content": SlideMenu()}]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEntered, setIsEntered] = useState(false);
    const [responseType, setResponseType] = useState('simple');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonDisabled, setButtonDisable] = useState(false);

    const handleSendMessage = async () => {
        if(inputRef.current){
            const currentInput = inputRef.current.value ?? ''
            inputRef.current.value = ''
            setContent(prev => [...prev, {type:'user', text:currentInput}]);
            const response = await getGPTResponse({messages:[{role:'system', content:currentInput}] ,type:responseType})
            const parsed:string = JSON.parse(response).choices[0].message.content.replaceAll(`\n`, '<br/>')
            setContent(prev => [...prev,{type:'gpt',text:parsed as string} ])
        }
    }

    const handleEnterText:KeyboardEventHandler<HTMLFormElement> = async (e) => {
        if(e.key === 'Enter' && !isEntered) {
            setIsEntered(true);
            await handleSendMessage();
        }
    }

    useEffect(()=>{
        setIsEntered(false);
    })

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if(currentIndex < content[content.length - 1].text.length) {
                setButtonDisable(true);
                setCurrentIndex(currentIndex + 1);
            }
        }, 100);

        if(currentIndex === content[content.length - 1].text.length) {
            setButtonDisable(false);
            clearTimeout(timeoutId);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentIndex, content[content.length - 1].text]);

    // @ts-ignore
    return (
        <Root>
            <Wrapper>
                <HeaderContainer>
                    <HeaderWrapper>
                        <NameContainer>
                            <NameWrapper>
                                <img src={logo} alt="로고"/>
                                KAU-GPT
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
                                                <div dangerouslySetInnerHTML={{__html: bubble.text.substring(0, currentIndex)}} className='BubbleWrapper'></div>
                                                <div>{bubble.content}</div>
                                            </div>
                                        </BubbleRow>
                                    })}
                                </BubbleBox>
                            </ChatWrapper>
                            <ChatInputContainer>
                                <ChatInputWrapper onKeyDown={handleEnterText}>
                                    <ChatInput multiline maxRows={5} inputRef={inputRef} ></ChatInput>
                                    <Button onClick={handleSendMessage} disabled = {buttonDisabled}>
                                        전송
                                    </Button>
                                </ChatInputWrapper>
                            </ChatInputContainer>
                        </ChatContainer>
                    </BodyWrapper>
                </BodyContainer>
            </Wrapper>
        </Root>
    );
};

export default Chat;
