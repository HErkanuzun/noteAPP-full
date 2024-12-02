import { useState, useEffect, useRef, useCallback } from 'react';
import { Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ExamCard from '../components/ExamCard';
import FilterPanel from '../components/FilterPanel';
import LoadingCard from '../components/LoadingCard';
import * as ExamService from '../services/api/ExamService';
import { FilterOptions, Exam } from '../types';

interface ExamsPageProps {
  isDark: boolean;
}

function ExamsPage({ isDark }: ExamsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [exams, setExams] = useState<Exam[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastExamElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  const fetchExams = async (pageNum: number) => {
    try {
      setIsLoadingMore(pageNum > 1);
      const response = await ExamService.getAllExams();
      console.log(response.data.exams);
      
      setExams(response.data.exams);
    
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    fetchExams(1);
  }, [filterOptions]);

  useEffect(() => {
    
      fetchExams(page);
    
  }, [page]);



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <FilterPanel
            isDark={isDark}
            options={filterOptions}
            onFilterChange={setFilterOptions}
            universities={[]}
            departments={[]}
            years={[]}
            semesters={[]}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-2/3">
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Sınavlarda ara..." 
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
              
                exams.map((exam, index) => 
              
                
                   (
                      <div ref={lastExamElementRef} key={exam.id}>
                        <ExamCard 
                          exam={{
                            ...exam,
                            imageUrl: exam.storage_link ?? '',  // Use nullish coalescing
                            subject: exam.name
                          }} 
                          isDark={isDark} 
                        />
                      </div>
                    )
              
              
            ))
          }
          </div>

        </div>
      </div>
    </div>
  );
}

export default ExamsPage;