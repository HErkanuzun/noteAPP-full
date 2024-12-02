import React from 'react';
import { FileText, GraduationCap, BookOpen, Star } from 'lucide-react';

interface EmptyStateProps {
  type: 'notes' | 'exams' | 'articles' | 'favorites';
  isDark: boolean;
}

function EmptyState({ type, isDark }: EmptyStateProps) {
  const config = {
    notes: {
      icon: FileText,
      title: 'Henüz not eklenmemiş',
      description: 'Ders notlarınızı paylaşmaya başlayın ve diğer öğrencilere yardımcı olun.',
      buttonText: 'Not Ekle',
      color: 'blue'
    },
    exams: {
      icon: GraduationCap,
      title: 'Henüz sınav eklenmemiş',
      description: 'Sınav çözümlerinizi paylaşarak diğer öğrencilere destek olun.',
      buttonText: 'Sınav Ekle',
      color: 'purple'
    },
    articles: {
      icon: BookOpen,
      title: 'Henüz makale eklenmemiş',
      description: 'Akademik makalelerinizi paylaşarak bilgi birikiminizi aktarın.',
      buttonText: 'Makale Ekle',
      color: 'green'
    },
    favorites: {
      icon: Star,
      title: 'Henüz favori öğe eklenmemiş',
      description: 'Beğendiğiniz içerikleri favorilere ekleyerek kolayca erişin.',
      buttonText: 'İçerikleri Keşfet',
      color: 'yellow'
    }
  };

  const { icon: Icon, title, description, buttonText, color } = config[type];
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-blue-600',
    purple: 'bg-purple-600 hover:bg-purple-700 text-purple-600',
    green: 'bg-green-600 hover:bg-green-700 text-green-600',
    yellow: 'bg-yellow-600 hover:bg-yellow-700 text-yellow-600'
  };

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <div className={`p-4 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} mb-4`}>
        <Icon size={32} className={colorClasses[color].split(' ').pop()} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      <button className={`px-6 py-2 rounded-lg text-white transition-colors ${
        colorClasses[color].split(' ').slice(0, 2).join(' ')
      }`}>
        {buttonText}
      </button>
    </div>
  );
}

export default EmptyState;