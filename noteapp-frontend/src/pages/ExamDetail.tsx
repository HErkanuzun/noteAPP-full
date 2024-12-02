import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, Download, Share2, Calendar, Play } from 'lucide-react';
import { popularExams } from '../data/sampleData';
import ExamSolver from '../components/ExamSolver';

interface ExamDetailProps {
  isDark: boolean;
}

function ExamDetail({ isDark }: ExamDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = popularExams.find(e => e.id === Number(id));
  const [showSolver, setShowSolver] = useState(false);

  if (!exam) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Sınav bulunamadı</h1>
        <button 
          onClick={() => navigate('/exams')}
          className="text-blue-600 hover:underline"
        >
          Sınavlara geri dön
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/exams')}
        className="flex items-center gap-2 mb-6 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={20} />
        Sınavlara Geri Dön
      </button>

      <div className={`rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border border-opacity-20 ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
        <div className="flex items-center gap-2 text-sm text-purple-600 mb-2">
          <span className={`px-3 py-1 rounded-full ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            {exam.subject}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {exam.year}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{exam.title}</h1>

        <div className="flex items-center gap-2 text-sm opacity-75 mb-6">
          <span>{exam.professor}</span>
          <span>•</span>
          <span>{exam.term}</span>
        </div>

        <div className="flex items-center gap-6 mb-8">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
            <Download size={20} />
            İndir
          </button>
          <button
            onClick={() => setShowSolver(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            <Play size={20} />
            Sınavı Çöz
          </button>
          <button className="flex items-center gap-2 hover:text-purple-600 transition-colors">
            <ThumbsUp size={20} />
            <span>{exam.likes}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-purple-600 transition-colors">
            <Share2 size={20} />
            Paylaş
          </button>
        </div>

        {showSolver && exam.questions && (
          <ExamSolver questions={exam.questions} isDark={isDark} />
        )}
      </div>
    </div>
  );
}

export default ExamDetail;