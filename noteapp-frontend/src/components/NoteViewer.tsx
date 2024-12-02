import React, { useState } from 'react';
import { Bot, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from './LoadingSpinner';
import PDFViewer from './PDFViewer';

interface NoteViewerProps {
  fileUrl: string;
  fileType: 'pdf' | 'markdown';
  isDark: boolean;
}

function NoteViewer({ fileUrl, fileType, isDark }: NoteViewerProps) {
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [error, setError] = useState<string>('');

  const requestAIExplanation = async () => {
    setIsLoadingAI(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockExplanation = `# İçerik Açıklaması

Bu dokümanda önemli noktalar:

1. Temel kavramlar açıklanmış
2. Örneklerle desteklenmiş
3. Pratik uygulamalar gösterilmiş

> Not: Bu açıklama şu an için simüle edilmiştir. Gerçek API entegrasyonu yapıldığında, içerik dinamik olarak üretilecektir.`;
      
      setAiExplanation(mockExplanation);
    } catch (error) {
      setError('Açıklama alınırken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('AI explanation error:', error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {fileType === 'pdf' ? (
          <PDFViewer fileUrl={fileUrl} isDark={isDark} />
        ) : (
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{fileUrl}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* AI Sidebar */}
      <div className={`w-full lg:w-96 p-6 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl`}>
        <div className="flex items-center gap-2 mb-4">
          <Bot size={24} className="text-blue-600" />
          <h3 className="text-lg font-semibold">AI Açıklama</h3>
        </div>

        <button
          onClick={requestAIExplanation}
          disabled={isLoadingAI}
          className="w-full px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
            transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoadingAI ? (
            <>
              <LoadingSpinner size={20} />
              <span>Açıklama Hazırlanıyor...</span>
            </>
          ) : (
            'AI Açıklama İste'
          )}
        </button>

        {error && (
          <div className="p-4 mb-4 rounded-lg bg-red-100/10 border border-red-600 text-red-600 flex items-center gap-2">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {aiExplanation && !error && (
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
            <ReactMarkdown>{aiExplanation}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteViewer;