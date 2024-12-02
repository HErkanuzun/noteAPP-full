import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, Building2, GraduationCap, ExternalLink, Video } from 'lucide-react';
import { events } from '../data/sampleData';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

interface EventDetailProps {
  isDark: boolean;
}

function EventDetail({ isDark }: EventDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === Number(id));

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Etkinlik bulunamadı</h1>
        <button 
          onClick={() => navigate('/events')}
          className="text-blue-600 hover:underline"
        >
          Etkinliklere geri dön
        </button>
      </div>
    );
  }

  const typeColors = {
    academic: 'blue',
    social: 'purple',
    career: 'green',
    other: 'gray'
  };

  const color = typeColors[event.type];

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/events')}
        className="flex items-center gap-2 mb-6 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={20} />
        Etkinliklere Geri Dön
      </button>

      <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border border-opacity-20 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        {event.imageUrl && (
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-64 object-cover"
          />
        )}
        
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full 
              ${isDark ? `bg-${color}-900/30` : `bg-${color}-100`} text-${color}-600`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </span>
            {event.isOnline && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                <Video size={14} />
                Online
              </span>
            )}
            {event.isFeatured && (
              <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600">
                Öne Çıkan
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-6">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-blue-600" />
                <div>
                  <div className="font-medium">Tarih</div>
                  <div className="text-sm opacity-75">
                    {format(parseISO(event.startDate), 'd MMMM yyyy', { locale: tr })}
                    {event.endDate && event.endDate !== event.startDate && (
                      <> - {format(parseISO(event.endDate), 'd MMMM yyyy', { locale: tr })}</>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={20} className="text-purple-600" />
                <div>
                  <div className="font-medium">Saat</div>
                  <div className="text-sm opacity-75">
                    {format(parseISO(event.startDate), 'HH:mm')} - 
                    {format(parseISO(event.endDate), 'HH:mm')}
                  </div>
                </div>
              </div>

              {!event.isOnline && (
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-red-600" />
                  <div>
                    <div className="font-medium">Konum</div>
                    <div className="text-sm opacity-75">{event.location}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User size={20} className="text-green-600" />
                <div>
                  <div className="font-medium">Organizatör</div>
                  <div className="text-sm opacity-75">{event.organizer}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building2 size={20} className="text-yellow-600" />
                <div>
                  <div className="font-medium">Üniversite</div>
                  <div className="text-sm opacity-75">{event.university}</div>
                </div>
              </div>

              {event.department && (
                <div className="flex items-center gap-3">
                  <GraduationCap size={20} className="text-indigo-600" />
                  <div>
                    <div className="font-medium">Bölüm</div>
                    <div className="text-sm opacity-75">{event.department}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">Etkinlik Detayları</h2>
            <p>{event.description}</p>
          </div>

          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg
                bg-${color}-600 text-white hover:bg-${color}-700 transition-colors`}
            >
              <ExternalLink size={20} />
              Kayıt Ol
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetail;