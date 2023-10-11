import React from 'react';
import Router from "./Router";
import {BrowserRouter} from "react-router-dom";
import ChatPage from "./pages/ChatPages";

function App() {
  return (
    <div className="App">
        <BrowserRouter><Router/></BrowserRouter>
        <ChatPage/>
    </div>
  );
}

export default App;
