import React, {ChangeEventHandler, KeyboardEventHandler, useEffect, useRef, useState} from 'react';
import {
    BodyContainer,
    BodyWrapper,
    BubbleBox,
    BubbleRow,
    ChatContainer,
    ChatInput,
    ChatInputContainer,
    ChatInputWrapper,
    ChatWrapper, FloatFormControl, HeaderContainer, HeaderWrapper,
    NameContainer, NameWrapper,
    Root,
    Wrapper
} from "./Chat.styles";
import {Box, Button, FormControl, FormControlLabel, FormLabel, Icon, Radio, RadioGroup} from "@mui/material";

import logo from './emblem.png'


const getGPTResponse = async (body:{
    type:string;
    messages:[{role:string,content:string}]
}) => {
    const result = await fetch('http://localhost:8000/langchainTest', {
        method: 'POST', // HTTP 요청 메서드 설정
        headers: {
            'Content-Type': 'application/json' // 요청 바디의 데이터 타입 설정
        },
        body:JSON.stringify(body),
    }).then(res =>{
        if(!res.ok){
            throw new Error('에러')
        }
        return res.json()
    })
    const parsed = JSON.stringify(result)
    return parsed;
}

export interface Bubble {
    type: 'user' | 'gpt';
    text:string;
}

const Chat = () => {
    const [content, setContent] = useState<Bubble[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEntered, setIsEntered] = useState(false);
    const [responseType, setResponseType] = useState('simple');

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setResponseType(event.target.value);
    };

    const handleSendMessage = async () => {
        if(inputRef.current){
            const currentInput = inputRef.current.value ?? ''
            setContent(prev => [...prev, {type:'user', text:currentInput}]);
            const response = await getGPTResponse({messages:[{role:'system', content:currentInput}] ,type:responseType})
            const parsed:string = JSON.parse(response).choices[0].message.content.replaceAll(`\n`, '<br/>')
            setContent(prev => [...prev,{type:'gpt',text:parsed as string} ])
            inputRef.current.value = ''
        }
    }

    const handleEnterText:KeyboardEventHandler<HTMLFormElement> = async (e) => {

        if(e.key === 'Enter' && !isEntered) {
            setIsEntered(true);
            await handleSendMessage();
            if(inputRef.current){
                inputRef.current.value = ''
            }
        }

    }

    useEffect(()=>{
        setIsEntered(false);
    })

    // @ts-ignore
    return (
        <Root>
            <Wrapper>
                <HeaderContainer>
                    <FloatFormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue="simple"
                        >
                                <FormControlLabel value="detail" control={<Radio size={'small'} onChange={handleChangeRadio} />} label="자세히" />
                                <FormControlLabel value="simple" control={<Radio size={'small'} onChange={handleChangeRadio}  />} label="간단히" />
                        </RadioGroup>
                    </FloatFormControl>
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
                                                <div dangerouslySetInnerHTML={{__html: bubble.text}} className='BubbleWrapper'></div>
                                            </div>
                                        </BubbleRow>
                                    })}
                                </BubbleBox>
                            </ChatWrapper>
                            <ChatInputContainer>
                                <ChatInputWrapper onKeyDown={handleEnterText}>
                                    <ChatInput multiline maxRows={5} inputRef={inputRef} ></ChatInput>
                                    <Button onClick={handleSendMessage}>
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
