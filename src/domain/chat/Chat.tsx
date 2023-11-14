import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react';
import {
    BodyContainer,
    BodyWrapper,
    BubbleBox,
    BubbleRow,
    ChatIcon,
    MenuIcon,
    SettingButton, SettingsButtonsWrapper, SettingsContainer, CloseButton,
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
import {Bubble} from "../../component/Chat";
import {getGPTResponse} from "../../api/ResponseApi";
import LoginModal from "../../pages/LoginModal";
import DetailModal from "../../pages/DetailModal";
import ReviewButton from "../../component/ReviewButton";
import '../../style/ReviewButton.css'

const Chat = () => {
    const [content, setContent] = useState<Bubble[]>([{"type": "gpt", "text": "안녕하세요, 무엇을 도와드릴까요?"}]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEntered, setIsEntered] = useState(false);
    const [responseType, setResponseType] = useState('simple');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonDisabled, setButtonDisable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const gridMessages = [
        ["학식", "교내 연락처", "학사일정"],
        ["수강지도상담", "졸업", "교양수업"],
        ["휴학", "복학", "등록안내"]
    ];
    const [ isLoginModalOpen, setLoginModalOpen ] = useState(false);
    const [ isHidden, setIsHidden ] = useState(false);
    const [ modalHyperLink, setModalHyperLink ] = useState('');

    const handleGridClick = async (i: number, j: number) => {
        const messageToSend = gridMessages[i][j];
        setContent(prev => [...prev, {type: 'user', text: messageToSend}]);
        const response = await getGPTResponse({messages: [{role: 'system', content: messageToSend}], type: responseType});
        const parsedResponse = JSON.parse(response);
        const parsed: string = JSON.parse(response).choices[0].message.content.replaceAll(`\n`, '<br/>');
        setContent(prev => [...prev, {type: 'gpt', text: parsed, original: parsedResponse.choices[0].message.content_origin, metadata: parsedResponse.choices[0].message.metadata, fromGrid: true}]);
    };

    const openLoginModal = () => {
        setLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };

    const handleSendMessage = async () => {
        if(inputRef.current){
            const currentInput = inputRef.current.value ?? ''
            inputRef.current.value = ''
            setContent(prev => [...prev, {type:'user', text:currentInput}]);
            const response = await getGPTResponse({messages:[{role:'system', content:currentInput}] ,type:responseType})
            const parsedResponse = JSON.parse(response);
            const parsed:string = JSON.parse(response).choices[0].message.content.replaceAll(`\n`, '<br/>')
            setContent(prev => [...prev, {type:'gpt', text: parsed, original: parsedResponse.choices[0].message.content_origin, metadata: parsedResponse.choices[0].message.metadata} ]);
        }
    }

    const openOriginalContentInModal = (content: string, hyperLink: string) => {
        setModalContent(content);
        setModalHyperLink(hyperLink);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
        setIsHidden(false)
    }

    const handleEnterText:KeyboardEventHandler<HTMLFormElement> = async (e) => {
        if(e.key === 'Enter' && !isEntered) {
            e.preventDefault();
            setIsEntered(true);
            await handleSendMessage();
        }
    }

    useEffect(()=>{
        setIsEntered(false);
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [content]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if(currentIndex < content[content.length - 1].text.length) {
                setButtonDisable(true);
                setCurrentIndex(currentIndex + 1);
            }

            if(currentIndex === content[content.length - 1].text.length) {
                setButtonDisable(false);
                clearTimeout(timeoutId);
            }
        }, 10);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentIndex, content[content.length - 1].text]);

    // @ts-ignore
    return (
        <>
            <DetailModal isOpen={isModalOpen} close={closeModal} content={modalContent} hyperLink={modalHyperLink} />
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
                            <MenuIcon onClick={() => setIsSettingsOpen(prev => !prev)}/>
                        </HeaderWrapper>
                    </HeaderContainer>

                    <SettingsContainer isOpen={isSettingsOpen}>
                        <CloseButton onClick={() => setIsSettingsOpen(false)}>&times;</CloseButton>

                        <SettingsButtonsWrapper>
                            <SettingButton onClick={ openLoginModal }>로그인</SettingButton>
                            <LoginModal isOpen={ isLoginModalOpen } close={closeLoginModal} />
                            <SettingButton onClick={() => console.log('종합 정보 시스템')}>종합 정보 시스템</SettingButton>
                            <SettingButton onClick={() => console.log('홈페이지')}>홈페이지</SettingButton>
                        </SettingsButtonsWrapper>
                    </SettingsContainer>
                    <BodyContainer>
                        <BodyWrapper>
                            <ChatContainer>
                                <ChatWrapper>
                                    <BubbleBox>
                                        {content?.map((bubble, index) => {
                                            return (
                                                <React.Fragment key={bubble.text + index}>
                                                    <BubbleRow type={bubble.type}>
                                                        {bubble.type === 'gpt' && (
                                                            <ChatIcon src="항공대캐릭터.png" alt="User Icon" />
                                                        )}
                                                        <div className='BubbleContainer'>
                                                            <div dangerouslySetInnerHTML={{__html: bubble.type === 'gpt' && bubble.original !== 'DB' ? bubble.text.substring(0, currentIndex) : bubble.text}} className='BubbleWrapper'></div>
                                                            {bubble.type === 'gpt' && bubble.original !== 'DB' && bubble.original && !bubble.fromGrid && !isHidden &&
                                                                <>
                                                                    <div className='button-set'>
                                                                        <Button className='detail-button' onClick={() => {
                                                                            if (bubble.original) {
                                                                                openOriginalContentInModal(bubble.original, bubble.metadata ? bubble.metadata.source : '');

                                                                                setIsHidden(true);
                                                                            }
                                                                        }}>
                                                                            자세히 보기
                                                                        </Button>
                                                                        <ReviewButton answer={bubble.text} question={"test"}/>
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                    </BubbleRow>
                                                    {index === 0 && (
                                                        <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                                                            <table style={{borderCollapse: 'separate'}}>
                                                                {gridMessages.map((row, i) => (
                                                                    <tr key={i}>
                                                                        {row.map((cell, j) => (
                                                                            <td
                                                                                key={j}
                                                                                onClick={() => handleGridClick(i, j)}
                                                                                style={{
                                                                                    border: '1px solid #007BFF',
                                                                                    padding: '10px 15px',
                                                                                    cursor: 'pointer',
                                                                                    transition: 'background-color 0.3s',
                                                                                    backgroundColor: '#E5F3FF',
                                                                                    color: '#004080',
                                                                                    textAlign: 'center',
                                                                                    lineHeight: '30px',
                                                                                    width: '200px',
                                                                                    borderRadius: '16px'
                                                                                }}
                                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CCE4FF'}
                                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E5F3FF'}
                                                                            >
                                                                                {cell}
                                                                            </td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </table>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            )
                                        })}
                                        <div ref={bottomRef}></div>
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
        </>
    );
};

export default Chat;
