import {Button, FormControl, TextField} from '@mui/material'
import styled from '@emotion/styled'
import styles, { keyframes } from 'styled-components';

// @ts-ignore
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

type SettingsContainerProps = {
    isOpen: boolean;
};

export const Root = styled.div`
  width: 100%;
  height: 100%;
  // overflow: hidden;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
`

export const HeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  z-index: 100;
  top:0;
  left: 0;
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 12px;
  width: 100%;
  height: 100%;
  background: rgba(240, 240, 255, 1);
  backdrop-filter: blur(15px);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  
`

export const MenuIcon = styled.div`
  width: 30px;
  height: 30px;
  background: url(/menuIcon.png) no-repeat center;
  background-size: cover;
  cursor: pointer;
  margin-right: 20px;
`;

export const NameContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 26px;
  font-weight: bold;
  font-family: -apple-system, sans-serif;
  line-height: 30px;
  
  & img{
    width:50px;
    height:50px;
    margin-right: 1px;
  }
`

export const BodyContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 6rem;
  background: rgba(255, 255, 255, 1);
`
export const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // overflow-y: scroll;
`

export const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const ChatWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 30rem;
  margin-top: -1rem;
  box-sizing: border-box;

  @media (max-width: 768px) { 
    margin-top: -1rem; 
    padding-left: 1rem;
  }
`

export const BubbleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 7rem;
`

export const ChatIcon = styled.img`
  align-self: flex-start;
  display: flex;
  margin-right: 1rem;
  margin-left: -1rem;
  width: 40px;
  height: 50px;
`;

export const BubbleRow = styled.div<{type:'user'|'gpt'}>`
  display: flex;
  align-items: center;
  width: 95%;
  height: auto;
  padding: 10px 5px 10px 5px;

  justify-content: ${({type}) => {
    if (type === 'gpt') {
      return 'flex-start'
    }
    return 'flex-end'
  }};
  
  .BubbleContainer {
    width: auto;
    height: auto;
    max-width: 70%;

    .BubbleWrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 14px;
      gap: 8px;
      font-size: 15px;
      line-height: 24px;
      box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
      color:#fff;
      border-radius: 12px;
      background-color: ${({type}) => {
        if (type === 'gpt') {
          return '#234346'
        }
        return '#0A1660'
      }};
    }
  }
`

export const ChatInputContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 5px;
  //box-sizing: border-box;
  border-top: 0.5px solid #cccccc;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: #fff;
`

export const ChatInputWrapper = styled.form`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const ChatInput = styled(TextField)`
  border-radius: 8px;
  width: 100%;

  .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    border:none;
  }
  
  .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root { // 채팅창 크기
    margin-left: 0.5vw;
    padding: 10px 10px;
  }
`

export const CancelButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
`

export const CancelGenerateResponse = styled(Button)`
  border-radius: 8px;
  font-size: 13px;
  font-color: #fff;
  padding: 5px;
  background: rgba(0, 0, 0, 0.3);
`

export const FloatFormControl = styled(FormControl)`
  z-index: 999;
  position: absolute;
  top:25%;
  right: 0%;
  background: #fff;
  border-radius: 10px;
  //box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding:0.3rem;
  box-sizing: border-box;
  
  .MuiFormLabel-root{
    font-size: 1px;
  }
  .MuiFormGroup-root{
    height:auto;
  }
  .css-ahj2mt-MuiTypography-root{
    font-size: 15px;
    font-weight: 600;
    text-align: end;
    width:100%;
  }
`

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledTable = styled.table`
  border-collapse: separate;
  width: 50%; 
  table-layout: fixed;
  border-spacing: 5px;

  @media (max-width: 768px) {
    width: 80%; 
  }
`;

export const StyledTableRow = styled.tr``;

export const StyledTableCell = styled.td`
  border: 1px solid #007BFF;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #E5F3FF;
  color: #004080;
  text-align: center;
  line-height: 30px;
  width: 20%;
  max-width: 200px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: nowrap;

  &:hover {
    background-color: #CCE4FF;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const SettingsContainer = styled.div<SettingsContainerProps>`
  position: fixed;
  z-index: 101;
  top: 0;
  right: 0;
  width: 250px;
  height: 100vh;
  background: rgba(255, 255, 255, 1);
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

export const SettingsButtonsWrapper = styled.div`
  padding-top: 40px;
`;

export const SettingButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  border: none;
  background: rgba(100, 100, 255, 1); 
  color: white;  
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s;  

  &:hover {
    background: rgba(225, 225, 255, 1);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: red;  
  }
`;

export const LoadingIndicator = styles.div`
  border: 5px solid #f3f3f3; 
  border-top: 5px solid #3498db; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;