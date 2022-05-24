import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './index.css';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:roomId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
