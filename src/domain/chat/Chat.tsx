import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react';
import {
    BodyContainer,
    BodyWrapper,
    BubbleBox,
    BubbleRow,
    ChatContainer,
    ChatIcon,
    ChatInput,
    ChatInputContainer,
    ChatInputWrapper,
    ChatWrapper,
    CloseButton,
    HeaderContainer,
    HeaderWrapper,
    MenuIcon,
    NameContainer,
    NameWrapper,
    Root,
    SettingButton,
    SettingsButtonsWrapper,
    SettingsContainer,
    StyledTable,
    StyledTableCell,
    StyledTableRow,
    TableContainer,
    Wrapper
} from "./Chat.styles";
import {Button} from "@mui/material";

import {Bubble} from "../../component/Chat";
import {getGPTResponse} from "../../api/ResponseApi";
import LoginModal from "../../pages/LoginModal";
import DetailModal from "../../pages/DetailModal";
import ReviewButton from "../../component/ReviewButton";
import '../../style/ReviewButton.css'
import UserStatus from "../../component/UserStatus";

const Chat = () => {
    const [content, setContent] = useState<Bubble[]>([{"type": "gpt", "text": "안녕하세요, 무엇을 도와드릴까요?", "original": "init"}]);
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
        ["학식", "학교 뉴스", "학사일정"],
        ["수강지도상담", "졸업", "교내 연락처"],
        ["휴학", "복학", "등록안내"]
    ];
    const [ isLoginModalOpen, setLoginModalOpen ] = useState(false);
    const [ isHidden, setIsHidden ] = useState(false);
    const [ modalHyperLink, setModalHyperLink ] = useState('');
    const [ isLogin, setIsLogin ] = useState(false);

    const handleGridClick = async (i: number, j: number) => {
        const messageToSend = gridMessages[i][j];
        setContent(prev => [...prev, {type: 'user', text: messageToSend}]);
        const response = await getGPTResponse({messages: [{role: 'system', content: messageToSend}], type: responseType});
        const parsedResponse = JSON.parse(response);
        const parsed: string = JSON.parse(response).choices[0].message.content.replaceAll(`\n`, '<br/>');
        setContent(prev => [...prev, {type: 'gpt', text: parsed, original: parsedResponse.choices[0].message.content_origin, metadata: parsedResponse.choices[0].message.metadata, fromGrid: true}]);
    };

    const openLoginModal = () => {
        setIsSettingsOpen(false);
        setLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setLoginModalOpen(false);
    };

    const handleSendMessage = async () => {
        if (inputRef.current) {
            const currentInput = inputRef.current.value ?? '';
            inputRef.current.value = '';
            setContent(prev => [...prev, { type: 'user', text: currentInput }]);

            const query = new URLSearchParams({ question: currentInput }).toString();
            const url = `http://ec2-13-209-97-116.ap-northeast-2.compute.amazonaws.com:8080/langchain?${query}`;

            const eventSource = new EventSource(url);

            eventSource.onmessage = function (event) {
                try {
                    const parsedData = JSON.parse(event.data);

                    if (parsedData.choices) {
                        const gptResponse = parsedData.choices[0].message.content;
                        const contentOrigin = parsedData.choices[0].message.content_origin;
                        const metadata = parsedData.choices[0].message.metadata.source;

                        setContent(prev => {
                            if (prev.length > 0 && prev[prev.length - 1].type === 'gpt') {
                                let newMessages = [...prev];
                                if(gptResponse.includes("\n")) {
                                    const replaced = gptResponse.replaceAll("\n", "<br/>");
                                    console.log(replaced);
                                    newMessages[newMessages.length - 1] = {
                                        ...newMessages[newMessages.length - 1],
                                        text: newMessages[newMessages.length - 1].text + replaced,
                                        original: contentOrigin,
                                        metadata: metadata
                                    };
                                } else {
                                    newMessages[newMessages.length - 1] = {
                                        ...newMessages[newMessages.length - 1],
                                        text: newMessages[newMessages.length - 1].text + gptResponse,
                                        original: contentOrigin,
                                        metadata: metadata
                                    };
                                }

                                return newMessages;
                            } else {
                                return [...prev, { "type": 'gpt', "text": gptResponse, "metadata": metadata }];
                            }
                        });
                    }
                } catch (error) {
                    console.error("Error parsing event data:", error);
                }
            };

            eventSource.onerror = function (error) {
                eventSource.close();
            };
        }
    };

    const openOriginalContentInModal = (content: string, metadata: any) => {
        setModalContent(content);
        setModalHyperLink(metadata);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
        setIsHidden(false);
    }

    const handleEnterText:KeyboardEventHandler<HTMLFormElement> = async (e) => {
        if(e.key === 'Enter' && !isEntered) {
            e.preventDefault();
            setIsEntered(true);
            await handleSendMessage();
        }
    }

    const handleLoginState = (state: boolean) => {
        setIsLogin(state);
    };

    useEffect(()=>{
        setIsEntered(false);
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [content]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if(currentIndex < content[0].text.length) {
                setCurrentIndex(currentIndex + 1);
            }

            if(currentIndex === content[0].text.length) {
                clearTimeout(timeoutId);
            }
        }, 10);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentIndex, content[0].text]);

    // @ts-ignore
    return (
        <>
            <Root>
                <Wrapper>
                    <HeaderContainer>
                        <HeaderWrapper>
                            <NameContainer>
                                <NameWrapper>
                                    <img src={`${process.env.PUBLIC_URL}/emblem.png`} alt="로고"/>
                                    KAU-GPT
                                </NameWrapper>
                            </NameContainer>
                            {
                                isLogin ? <UserStatus isLogin={isLogin} /> : <MenuIcon onClick={() => setIsSettingsOpen(prev => !prev)}/>
                            }
                        </HeaderWrapper>
                    </HeaderContainer>
                    <SettingsContainer isOpen={isSettingsOpen}>
                        <CloseButton onClick={() => setIsSettingsOpen(false)}>&times;</CloseButton>
                        <SettingsButtonsWrapper>
                            <SettingButton onClick={ openLoginModal }>로그인</SettingButton>
                            <SettingButton onClick={() => console.log('종합 정보 시스템')}>종합 정보 시스템</SettingButton>
                            <SettingButton onClick={() => console.log('홈페이지')}>홈페이지</SettingButton>
                        </SettingsButtonsWrapper>
                    </SettingsContainer>
                    <BodyContainer>
                        <BodyWrapper>
                            <ChatContainer>
                                <ChatWrapper>
                                    <LoginModal isOpen={ isLoginModalOpen } close={closeLoginModal} handleLogin={handleLoginState} />
                                    <DetailModal isOpen={isModalOpen} close={closeModal} content={modalContent} hyperLink={modalHyperLink} />
                                    <BubbleBox>
                                        {content?.map((bubble, index) => {
                                            return (
                                                <React.Fragment key={bubble.text + index}>
                                                    <BubbleRow type={bubble.type}>
                                                        {bubble.type === 'gpt' && (
                                                            <ChatIcon src="항공대캐릭터.png" alt="User Icon" />
                                                        )}
                                                        <div className='BubbleContainer'>
                                                            <div dangerouslySetInnerHTML={{__html: bubble.original === 'init' ? bubble.text.substring(0, currentIndex) : bubble.text}} className='BubbleWrapper'></div>
                                                            {bubble.type === 'gpt' && bubble.original !== 'DB' && bubble.original !== 'init' && bubble.original && !bubble.fromGrid && !isHidden &&
                                                                <><div className='button-set'>
                                                                    <Button className='detail-button' onClick={() => {
                                                                    if (bubble.original) {
                                                                        console.log(content);
                                                                        openOriginalContentInModal(bubble.original, bubble.metadata);
                                                                        setIsHidden(true);
                                                                    }
                                                                    }}>
                                                                        자세히 보기
                                                                    </Button>
                                                                    <ReviewButton question={content[index - 1].text} answer={bubble.text}/>
                                                            </div></>
                                                            }
                                                        </div>
                                                    </BubbleRow>
                                                    {index === 0 && (
                                                        <TableContainer>
                                                            <StyledTable>
                                                                {gridMessages.map((row, i) => (
                                                                    <StyledTableRow key={i}>
                                                                        {row.map((cell, j) => (
                                                                            <StyledTableCell key={j} onClick={() => handleGridClick(i, j)}>
                                                                                {cell}
                                                                            </StyledTableCell>
                                                                        ))}
                                                                    </StyledTableRow>
                                                                ))}
                                                            </StyledTable>
                                                        </TableContainer>
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
