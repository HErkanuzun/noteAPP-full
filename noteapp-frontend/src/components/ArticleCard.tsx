import React from 'react';
import { Heart, Download, Share2, Calendar, Tag, Building2, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isDark: boolean;
}

function ArticleCard({ article, isDark }: ArticleCardProps) {
  return (
    <Link to={`/articles/${article.id}`}>
      <div className={`group relative overflow-hidden rounded-xl transition-all duration-300 
        transform hover:-translate-y-2 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}
        backdrop-blur-xl border border-opacity-20 ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } shadow-lg hover:shadow-xl`}
      >
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
            {article.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className={`flex items-center gap-1 px-3 py-1 rounded-full 
                ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} text-blue-600`}>
                <Tag size={14} />
                {tag}
              </span>
            ))}
            {article.tags.length > 2 && (
              <span className={`px-2 py-1 rounded-full text-sm
                ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                +{article.tags.length - 2}
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
            {article.title}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm opacity-75">
              <Building2 size={16} />
              <span>{article.university}</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-75">
              <GraduationCap size={16} />
              <span>{article.department}</span>
            </div>
          </div>
          
          <p className="text-sm opacity-75 mb-4 line-clamp-2">
            {article.abstract}
          </p>
          
          <div className="flex items-center gap-2 text-sm opacity-75 mb-4">
            <Calendar size={16} />
            <span>{new Date(article.date).toLocaleDateString('tr-TR')}</span>
            <span>•</span>
            <span>{article.author}</span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1 text-sm">
              <Heart size={16} />
              <span>{article.likes}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Download size={16} />
              <span>{article.downloads}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Share2 size={16} />
              <span>Paylaş</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;