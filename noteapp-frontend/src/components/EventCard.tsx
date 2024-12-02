import React from 'react';
import { Calendar, MapPin, Clock, User, ExternalLink, Video } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  isDark: boolean;
}

function EventCard({ event, isDark }: EventCardProps) {
  const typeColors = {
    academic: 'blue',
    social: 'purple',
    career: 'green',
    other: 'gray'
  };

  const color = typeColors[event.type];

  return (
    <div className={`group relative overflow-hidden rounded-xl transition-all duration-300 
      transform hover:-translate-y-2 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'}
      backdrop-blur-xl border border-opacity-20 ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      } shadow-lg hover:shadow-xl`}
    >
      {event.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
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
        
        <h3 className="text-xl font-semibold mb-4 line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm opacity-75">
            <Calendar size={16} />
            <span>
              {format(parseISO(event.startDate), 'd MMMM yyyy', { locale: tr })}
              {event.endDate && event.endDate !== event.startDate && (
                <> - {format(parseISO(event.endDate), 'd MMMM yyyy', { locale: tr })}</>
              )}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm opacity-75">
            <Clock size={16} />
            <span>{format(parseISO(event.startDate), 'HH:mm')}</span>
          </div>
          
          {!event.isOnline && (
            <div className="flex items-center gap-2 text-sm opacity-75">
              <MapPin size={16} />
              <span>{event.location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm opacity-75">
            <User size={16} />
            <span>{event.organizer}</span>
          </div>
        </div>
        
        <p className="text-sm opacity-75 mb-4 line-clamp-3">
          {event.description}
        </p>
        
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg
              bg-${color}-600 text-white hover:bg-${color}-700 transition-colors`}
          >
            <ExternalLink size={16} />
            Kayıt Ol
          </a>
        )}
      </div>
    </div>
  );
}

export default EventCard;