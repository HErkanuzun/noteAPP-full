import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Search, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NoteCard from '../components/NoteCard';
import ExamCard from '../components/ExamCard';
import LoadingCard from '../components/LoadingCard';
import * as NoteService from '../services/api/NoteService';
import * as ExamService from '../services/api/ExamService';
import { Note, Exam } from '../types';

interface HomePageProps {
  isDark: boolean;
}

function HomePage({ isDark }: HomePageProps) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [popularNotes, setPopularNotes] = useState<Note[]>([]);
  const [popularExams, setPopularExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [notes, exams] = await Promise.all([
          NoteService.getNotes({ sort: 'likes', limit: 6 }),
          ExamService.getExams({ sort: 'likes', limit: 6 })
        ]);
        setPopularNotes(notes);
        setPopularExams(exams);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpload = () => {
    if (!isLoggedIn) {
      alert('Lütfen önce giriş yapın!');
      return;
    }
    // Handle upload logic
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section with Animation */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <div className={`backdrop-blur-xl p-8 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} 
          shadow-xl rounded-2xl border border-opacity-20 
          ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 animate-fade-in-left">
              <h1 className="text-4xl font-bold mb-4">
                Üniversite Notlarını Paylaş ve Keşfet
              </h1>
              <p className="text-lg mb-6 opacity-90">
                Arkadaşlarınla ders notlarını paylaş, başkalarının notlarından öğren.
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={handleUpload}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                    text-white rounded-lg transition-all transform hover:scale-105"
                >
                  <Upload size={20} />
                  Not Yükle
                </button>
                <button 
                  onClick={() => navigate('/notes')}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 
                    text-white rounded-lg transition-all transform hover:scale-105"
                >
                  <Search size={20} />
                  Notları Keşfet
                </button>
              </div>
            </div>
            
            <div className="flex-1 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
                alt="Students studying"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Notes Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-blue-600" />
          <h2 className="text-2xl font-bold">En Popüler Notlar</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} isDark={isDark} />
            ))
          ) : (
            popularNotes.map((note) => (
              <NoteCard key={note.id} note={note} isDark={isDark} />
            ))
          )}
        </div>
      </section>

      {/* Popular Exams Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Star className="text-purple-600" />
          <h2 className="text-2xl font-bold">En Çok Beğenilen Sınavlar</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} isDark={isDark} />
            ))
          ) : (
            popularExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} isDark={isDark} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default HomePage;