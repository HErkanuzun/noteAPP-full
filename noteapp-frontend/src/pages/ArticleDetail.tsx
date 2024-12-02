import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, Download, Share2, Calendar, Building2, GraduationCap, Tag } from 'lucide-react';
import { popularArticles } from '../data/sampleData';
import ReactMarkdown from 'react-markdown';

interface ArticleDetailProps {
  isDark: boolean;
}

function ArticleDetail({ isDark }: ArticleDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = popularArticles.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Makale bulunamadı</h1>
        <button 
          onClick={() => navigate('/articles')}
          className="text-blue-600 hover:underline"
        >
          Makalelere geri dön
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/articles')}
        className="flex items-center gap-2 mb-6 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={20} />
        Makalelere Geri Dön
      </button>

      <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border border-opacity-20 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <img 
          src={article.imageUrl} 
          alt={article.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {article.tags.map((tag, index) => (
              <span key={index} className={`flex items-center gap-1 px-3 py-1 rounded-full 
                ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} text-blue-600`}>
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm opacity-75">
              <Building2 size={16} />
              <span>{article.university}</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-75">
              <GraduationCap size={16} />
              <span>{article.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-75">
              <Calendar size={16} />
              <span>{new Date(article.date).toLocaleDateString('tr-TR')}</span>
              <span>•</span>
              <span>{article.author}</span>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <Download size={20} />
              İndir
            </button>
            <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ThumbsUp size={20} />
              <span>{article.likes}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Share2 size={20} />
              Paylaş
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold mb-4">Özet</h2>
            <p className="mb-6">{article.abstract}</p>
            
            <h2 className="text-xl font-semibold mb-4">İçerik</h2>
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;