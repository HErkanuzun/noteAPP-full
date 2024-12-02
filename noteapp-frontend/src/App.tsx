import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import ExamsPage from './pages/ExamsPage';
import ArticlesPage from './pages/ArticlesPage';
import EventsPage from './pages/EventsPage';
import NoteDetail from './pages/NoteDetail';
import ExamDetail from './pages/ExamDetail';
import ArticleDetail from './pages/ArticleDetail';
import EventDetail from './pages/EventDetail';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import OfflineAlert from './components/OfflineAlert';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className={`min-h-screen transition-colors duration-300 ${
            isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
          }`}>
            {/* Conditionally render Header except for auth pages */}
            <Routes>
              <Route path="/login" element={null} />
              <Route path="/register" element={null} />
              <Route path="*" element={
                <div className="relative z-10">
                  <Header isDark={isDark} setIsDark={setIsDark} />
                </div>
              } />
            </Routes>
            
            {/* Main content */}
            <div className="relative z-0">
              <Routes>
                <Route path="/" element={<HomePage isDark={isDark} />} />
                <Route path="/login" element={<LoginPage isDark={isDark} />} />
                <Route path="/register" element={<RegisterPage isDark={isDark} />} />
                <Route path="/notes" element={<NotesPage isDark={isDark} />} />
                <Route path="/notes/:id" element={<NoteDetail isDark={isDark} />} />
                <Route path="/exams" element={<ExamsPage isDark={isDark} />} />
                <Route path="/exams/:id" element={<ExamDetail isDark={isDark} />} />
                <Route path="/articles" element={<ArticlesPage isDark={isDark} />} />
                <Route path="/articles/:id" element={<ArticleDetail isDark={isDark} />} />
                <Route path="/events" element={<EventsPage isDark={isDark} />} />
                <Route path="/events/:id" element={<EventDetail isDark={isDark} />} />
                <Route path="/about" element={<AboutPage isDark={isDark} />} />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <ProfilePage isDark={isDark} />
                  </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            <OfflineAlert />

            {/* Toast Container */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={isDark ? 'dark' : 'light'}
            />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;