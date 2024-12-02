import { useState, useEffect, useRef, useCallback } from 'react';
import { Filter } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';
import FilterPanel from '../components/FilterPanel';
import LoadingCard from '../components/LoadingCard';
import * as ArticleService from '../services/api/ArticleService';
import { FilterOptions } from '../types';

interface ArticlesPageProps {
  isDark: boolean;
}

// Add this new interface to match your expected data structure
interface Article {
  id: number;
  title: string;
  content: string;
  subject?: string;  // Make subject optional
  university?: string;  // Make university optional
  department?: string;  // Make department optional
  storage_link?: string;  // Make storage_link optional
  year?: number;  // Make year optional
  semester?: string;  // Make semester optional
}

function ArticlesPage({ isDark }: ArticlesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastArticleElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  const fetchArticles = async (pageNum: number) => {
    try {
      setIsLoadingMore(pageNum > 1);

      const response = await ArticleService.getAllArticles({ page: pageNum });
      console.log('Raw API Response:', response); // Debug için ekledim

      // API yanıtının yapısını kontrol et
      const articles = response.data.articles;
      console.log('Articles from API:', articles); // Debug için ekledim

      if (pageNum === 1) {
        setArticles(articles);
      } else {
        setArticles(prev => [...prev, ...articles]);
      }
      
      setHasMore(response.data.pagination.has_more);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setPage(1);
    fetchArticles(1);
  }, [filterOptions]);

  useEffect(() => {
    if (page > 1) {
      fetchArticles(page);
    }
  }, [page]);

  const filteredArticles = articles.filter(article => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      article.title?.toLowerCase().includes(query) ||
      (article.subject && article.subject.toLowerCase().includes(query)) ||
      (article.university && article.university.toLowerCase().includes(query)) ||
      (article.department && article.department.toLowerCase().includes(query))
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
            universities={[...new Set(articles.map(article => article.university?.name || article.university).filter((uni): uni is string => uni !== undefined))]}
            departments={[...new Set(articles.map(article => article.department?.name || article.department).filter((dept): dept is string => dept !== undefined))]}
            years={[...new Set(articles.map(article => article.year).filter((year): year is number => year !== undefined))]}
            semesters={[...new Set(articles.map(article => article.semester).filter((sem): sem is string => sem !== undefined))]}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-2/3">
              <SearchBar 
                onSearch={setSearchQuery} 
                placeholder="Makalelerde ara..." 
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
                {articles.map((article, index) => {
                  if (articles.length === index + 1) {
                    return (
                      <div ref={lastArticleElementRef} key={article.id}>
                        <ArticleCard 
                          article={{
                            ...article,
                            imageUrl: article.storage_link || 'https://via.placeholder.com/400x300',
                            subject: article.subject || 'Genel'
                          }} 
                          isDark={isDark} 
                        />
                      </div>
                    );
                  } else {
                    return (
                      <ArticleCard 
                        key={article.id} 
                        article={{
                          ...article,
                          imageUrl: article.storage_link || 'https://via.placeholder.com/400x300',
                          subject: article.subject || 'Genel'
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

          {!isLoading && filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg opacity-75">Aramanızla eşleşen makale bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticlesPage;