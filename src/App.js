
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ArticlesTray from './components/ArticlesTray';
import ArticlePage from './components/ArticlePage';
import UsersPage from './components/Users/UsersPage';
import Footer from './components/Footer';


function App() {
  const [loggedInUser, setLoggedInUser] = useState('');

  return (
    <div className="App">
      <Header setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/articles" element={<ArticlesTray />} />
        <Route path="/articles/:topic" element={<ArticlesTray />} />
        <Route path="/article/:article_id" element={<ArticlePage loggedInUser={loggedInUser} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
