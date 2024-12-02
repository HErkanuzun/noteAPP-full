import React from 'react';
import { Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Exam } from '../types';

interface ExamCardProps {
  exam: Exam;
  isDark: boolean;
}

function ExamCard({ exam, isDark }: ExamCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return isDark ? 'bg-green-900/30 text-green-500' : 'bg-green-100 text-green-600';
      case 'completed':
        return isDark ? 'bg-blue-900/30 text-blue-500' : 'bg-blue-100 text-blue-600';
      default:
        return isDark ? 'bg-yellow-900/30 text-yellow-500' : 'bg-yellow-100 text-yellow-600';
    }
  };

  return (
    <Link to={`/exams/${exam.id}`}>
      <div className={`group relative overflow-hidden rounded-xl transition-all duration-300 
        transform hover:-translate-y-2 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}
        backdrop-blur-xl border border-opacity-20 
        ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg hover:shadow-xl`}
      >
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
            <span className={`px-3 py-1 rounded-full ${getStatusColor(exam.status || '')}`}>
              {exam.status ? exam.status.charAt(0).toUpperCase() + exam.status.slice(1) : ''}
            </span>
          </div>
          
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
            {exam.name || exam.title}
          </h3>
          
          {exam.description && (
            <p className="text-sm opacity-75 mb-4 line-clamp-2">
              {exam.description}
            </p>
          )}

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm opacity-75">
              <Clock size={16} />
              <span>{exam.duration ? `${exam.duration} minutes` : 'Duration not set'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-75">
              <Award size={16} />
              <span>{exam.total_marks ? `${exam.total_marks} points` : 'Points not set'}</span>
            </div>
          </div>

          {(exam.university || exam.department) && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {exam.university && (
                <div className="text-sm opacity-75">
                  University: {exam.university}
                </div>
              )}
              {exam.department && (
                <div className="text-sm opacity-75">
                  Department: {exam.department}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ExamCard;