import React from 'react';
import { ThumbsUp, Download, Share2, Building2, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  isDark: boolean;
}

function NoteCard({ note, isDark }: NoteCardProps) {
  return (
    <Link to={`/notes/${note.id}`}>
      <div 
        className={`group relative overflow-hidden rounded-xl transition-all duration-300 
          transform hover:-translate-y-2 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}
          backdrop-blur-xl border border-opacity-20 ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          } shadow-lg hover:shadow-xl`}
      >
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
            {note.subject && (
              <span className={`px-3 py-1 rounded-full ${
                isDark ? 'bg-blue-900/30' : 'bg-blue-100'
              } text-blue-600`}>
                {note.subject}
              </span>
            )}
            {(note.semester || note.year) && (
              <span className={`px-3 py-1 rounded-full ${
                isDark ? 'bg-purple-900/30' : 'bg-purple-100'
              } text-purple-600`}>
                {[note.semester, note.year].filter(Boolean).join(' ')}
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
            {note.title}
          </h3>
          
          <div className="space-y-2 mb-4">
            {note.university && (
              <div className="flex items-center gap-2 text-sm opacity-75">
                <Building2 size={16} />
                <span>{note.university}</span>
              </div>
            )}
            {note.department && (
              <div className="flex items-center gap-2 text-sm opacity-75">
                <GraduationCap size={16} />
                <span>{note.department}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm opacity-75 mb-4">
            <span>{note.author || 'Anonymous'}</span>
            <span>•</span>
            <span>{new Date(note.created_at).toLocaleDateString('tr-TR')}</span>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1 text-sm">
              <ThumbsUp size={16} />
              <span>{note.likes || 0}</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm">
              <Download size={16} />
              <span>{note.downloads || 0}</span>
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

export default NoteCard;