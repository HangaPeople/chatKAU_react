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
    ModalContainer, ModalContent,
    TableContainer, StyledTable, StyledTableRow, StyledTableCell,
    Root,
    LoadingIndicator,
    Wrapper, CancelGenerateResponse, CancelButtonWrapper,
} from "./Chat.styles";
import {Button} from "@mui/material";

import logo from './emblem.png'
import {Bubble} from "../../atom/Chat";
import {getGPTResponse} from "../../api/ResponseApi";
import SlideMenu from "../../atom/InitialSlideMenu";
import LoginModal from "../../pages/LoginModal";

const Chat = () => {
    const [content, setContent] = useState<Bubble[]>([{"type": "gpt", "text": "안녕하세요, 무엇을 도와드릴까요?", "content": SlideMenu()}]);
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
    const [ isLoading, setIsLoading ] = useState(false);

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
        setLoginModalOpen(false)
    };

    const handleSendMessage = async () => {
        setIsLoading(true);
        if(inputRef.current){
            const currentInput = inputRef.current.value ?? ''
            inputRef.current.value = ''
            setContent(prev => [...prev, {type:'user', text:currentInput}]);
            const response = await getGPTResponse({messages:[{role:'system', content:currentInput}] ,type:responseType})
            const parsedResponse = JSON.parse(response);
            const parsed:string = JSON.parse(response).choices[0].message.content.replaceAll(`\n`, '<br/>')
            setContent(prev => [...prev, {type:'gpt', text: parsed, original: parsedResponse.choices[0].message.content_origin} ]);
        }
         setIsLoading(false);
    }

    const openOriginalContentInModal = (content: string) => {
        setModalContent(content);
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
            {isModalOpen && (
                <ModalContainer>
                    <ModalContent>
                        <button onClick={closeModal} style={{ float: 'right' }}>&times;</button>
                        <div>{modalContent}</div>
                    </ModalContent>
                </ModalContainer>
            )}
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
                            {/*<button onClick={ openLoginModal }>로그인</button>*/}
                            {/*<LoginModal isOpen={ isLoginModalOpen } close={closeLoginModal} />*/}
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
                                                            <div>
                                                                {bubble.content}
                                                            </div>
                                                            {bubble.type === 'gpt' && bubble.original !== 'DB' && bubble.original && !bubble.fromGrid && !isHidden &&
                                                                <Button onClick={() => {
                                                                    if (bubble.original) {
                                                                        openOriginalContentInModal(bubble.original);

                                                                        setIsHidden(true);
                                                                    }
                                                                    console.log(isHidden)
                                                                }} >
                                                                    자세히 보기
                                                                </Button>
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
                                <CancelButtonWrapper>
                                    <CancelGenerateResponse>Stop Generating</CancelGenerateResponse>
                                </CancelButtonWrapper>
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
