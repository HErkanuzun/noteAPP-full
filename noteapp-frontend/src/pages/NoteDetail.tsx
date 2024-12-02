import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, Download, Share2, Eye } from 'lucide-react';
import { popularNotes } from '../data/sampleData';
import NoteViewer from '../components/NoteViewer';

interface NoteDetailProps {
  isDark: boolean;
}

function NoteDetail({ isDark }: NoteDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = popularNotes.find(n => n.id === Number(id));
  const [showViewer, setShowViewer] = useState(false);

  if (!note) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Not bulunamadı</h1>
        <button 
          onClick={() => navigate('/notes')}
          className="text-blue-600 hover:underline"
        >
          Notlara geri dön
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/notes')}
        className="flex items-center gap-2 mb-6 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={20} />
        Notlara Geri Dön
      </button>

      <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border border-opacity-20 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <img 
          src={note.imageUrl} 
          alt={note.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
            <span className={`px-3 py-1 rounded-full ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
              {note.subject}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{note.title}</h1>

          <div className="flex items-center gap-2 text-sm opacity-75 mb-6">
            <span>{note.author}</span>
            <span>•</span>
            <span>{new Date(note.date).toLocaleDateString('tr-TR')}</span>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <Download size={20} />
              İndir
            </button>
            <button 
              onClick={() => setShowViewer(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <Eye size={20} />
              Görüntüle
            </button>
            <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ThumbsUp size={20} />
              <span>{note.likes}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Share2 size={20} />
              Paylaş
            </button>
          </div>

          {showViewer && (
            <NoteViewer
              fileUrl={note.fileUrl || note.content || ''}
              fileType={note.fileUrl?.endsWith('.pdf') ? 'pdf' : 'markdown'}
              isDark={isDark}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteDetail;