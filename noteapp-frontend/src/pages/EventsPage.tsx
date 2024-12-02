import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import EventCard from '../components/EventCard';
import FilterPanel from '../components/FilterPanel';
import LoadingCard from '../components/LoadingCard';
import * as EventService from '../services/api/EventService';
import { FilterOptions, Event } from '../types';

interface EventsPageProps {
  isDark: boolean;
}

function EventsPage({ isDark }: EventsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastEventElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  const fetchEvents = async (pageNum: number) => {
    try {
      setIsLoadingMore(pageNum > 1);
      const response = await EventService.getAllEvents({ page: pageNum });
      
      if (pageNum === 1) {
        setEvents(response.data.events);
      } else {
        setEvents(prev => [...prev, ...response.data.events]);
      }
      
      setHasMore(response.data.pagination.has_more);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    fetchEvents(1);
  }, [filterOptions]);

  useEffect(() => {
    if (page > 1) {
      fetchEvents(page);
    }
  }, [page]);

  const filteredEvents = events.filter(event => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      event.title?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.university?.toLowerCase().includes(query) ||
      event.department?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterPanel
            isDark={isDark}
            options={filterOptions}
            onFilterChange={setFilterOptions}
            universities={[...new Set(events.map(event => event.university).filter(Boolean))]}
            departments={[...new Set(events.map(event => event.department).filter(Boolean))]}
            years={[...new Set(events.map(event => event.year).filter(Boolean))]}
            semesters={[...new Set(events.map(event => event.semester).filter(Boolean))]}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-2/3">
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Etkinliklerde ara..." 
                isDark={isDark}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border 
                border-gray-200 dark:border-gray-700 hover:bg-gray-100 
                dark:hover:bg-gray-800 transition-colors"
            >
              <Filter size={20} />
              Filtrele
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <LoadingCard key={index} isDark={isDark} />
              ))
            ) : (
              <>
                {filteredEvents.map((event, index) => {
                  if (filteredEvents.length === index + 1) {
                    return (
                      <div ref={lastEventElementRef} key={event.id}>
                        <EventCard 
                          event={{
                            ...event,
                            imageUrl: event.storage_link || 'https://via.placeholder.com/400x300',
                            subject: event.subject || 'Genel'
                          }} 
                          isDark={isDark} 
                        />
                      </div>
                    );
                  } else {
                    return (
                      <EventCard 
                        key={event.id} 
                        event={{
                          ...event,
                          imageUrl: event.storage_link || 'https://via.placeholder.com/400x300',
                          subject: event.subject || 'Genel'
                        }} 
                        isDark={isDark} 
                      />
                    );
                  }
                })}
              </>
            )}
          </div>

          {isLoadingMore && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <LoadingCard key={`loading-more-${index}`} isDark={isDark} />
              ))}
            </div>
          )}

          {!isLoading && filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg opacity-75">Aramanızla eşleşen etkinlik bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsPage;