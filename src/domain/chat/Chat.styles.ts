import {TextField} from '@mui/material'
import styled from '@emotion/styled'
export const Root = styled.div`
  //margin-top: 64px;
  //max-width: 400px;
  //max-height: 500px;
  width: 100%;
  height: 100%;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  //box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`

export const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  position: fixed;
  top:0;
  left: 0;
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid #cccccc;
  box-sizing:border-box;
  padding:12px;
  width:100%;
  background: #fff;
`

export const NameContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 26px;
  line-height: 30px;
  
  & img{
    width:75px;
    height:75px;
  }
`

export const BodyContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 6rem;
  
`
export const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const BodyAside = styled.div`
  max-width: 384px;
  width: 100%;
  height: 100%;
  border-right: 0.5px solid #cccccc;
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
  padding:1rem;
  box-sizing: border-box;
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
    max-width: 50%;

    .BubbleWrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 14px;
      gap: 8px;
      font-weight: 400;
      font-size: 16px;
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
  padding: 10px;
  box-sizing: border-box;
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
`

export const ChatInput = styled(TextField)`
  border-radius: 8px;
  width: 100%;

  .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    border:none;
  }
`