import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// import views
import BookView from './views/BookView';
import TokenView from './views/TokenView';
import ErrorView from './views/ErrorView'


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<BookView />} />
        <Route path='/token/:token' element={<TokenView />} />
        <Route path='*' element={<ErrorView />}/>
      
      </Routes>
    </Router>
  );
}

export default App;
