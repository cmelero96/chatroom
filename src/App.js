import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './components/pages/Home';
import ChatRoom from './components/pages/ChatRoom';
import './index.css';

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
