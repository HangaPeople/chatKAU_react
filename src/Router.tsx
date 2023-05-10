import React from 'react';
import {Route, Routes} from "react-router-dom";

const RouteMapper = {
    chat:{
        path:'/chat',
        element:()=>import('./pages/ChatPages')
    }
}

const Chat = React.lazy(RouteMapper.chat.element)

const Router = () => {
    return (
        <>
         <Routes>
             <Route path={RouteMapper.chat.path} element={<Chat/>}></Route>
         </Routes>
        </>
    );
};

export default Router;
