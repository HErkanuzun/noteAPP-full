import { useState, useEffect, useRef, useCallback } from 'react';
import { Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';
import FilterPanel from '../components/FilterPanel';
import LoadingCard from '../components/LoadingCard';
import * as NoteService from '../services/api/NoteService';
import { FilterOptions, Note } from '../types';

interface NotesPageProps {
  isDark: boolean;
}

function NotesPage({ isDark }: NotesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastNoteElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  const fetchNotes = async (pageNum: number) => {
    try {
      setIsLoadingMore(pageNum > 1);
      const response = await NoteService.getAllNotes({ page: pageNum });
      
      if (response.status && response.data) {
        if (pageNum === 1) {
          setNotes(response.data.notes);
        } else {
          setNotes(prev => [...prev, ...response.data.notes]);
        }
        
        setHasMore(response.data.pagination.has_more);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    fetchNotes(1);
  }, [filterOptions]);

  useEffect(() => {
    if (page > 1) {
      fetchNotes(page);
    }
  }, [page]);

  const filteredNotes = notes.filter(note => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      note.title?.toLowerCase().includes(query) ||
      note.subject?.toLowerCase().includes(query) ||
      note.university?.toLowerCase().includes(query) ||
      note.department?.toLowerCase().includes(query)
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
            universities={[...new Set(notes.map(note => note.university).filter(Boolean))]}
            departments={[...new Set(notes.map(note => note.department).filter(Boolean))]}
            years={[...new Set(notes.map(note => note.year).filter(Boolean))]}
            semesters={[...new Set(notes.map(note => note.semester).filter(Boolean))]}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-2/3">
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Notlarda ara..." 
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
                {filteredNotes.map((note, index) => {
                  if (filteredNotes.length === index + 1) {
                    return (
                      <div ref={lastNoteElementRef} key={note.id}>
                        <NoteCard 
                          note={{
                            ...note,
                            imageUrl: note.storage_link || 'https://via.placeholder.com/400x300',
                            subject: note.subject || 'Genel'
                          }} 
                          isDark={isDark} 
                        />
                      </div>
                    );
                  } else {
                    return (
                      <NoteCard 
                        key={note.id} 
                        note={{
                          ...note,
                          imageUrl: note.storage_link || 'https://via.placeholder.com/400x300',
                          subject: note.subject || 'Genel'
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

          {!isLoading && filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg opacity-75">Aramanızla eşleşen not bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotesPage;