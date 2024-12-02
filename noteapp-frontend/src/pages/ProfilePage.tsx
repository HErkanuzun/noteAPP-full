import React, { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Pencil, 
  FileText, 
  GraduationCap, 
  BookOpen, 
  Star,
  Users,
  Calendar,
  Building2,
  ChevronRight
} from 'lucide-react';
import NoteCard from '../components/NoteCard';
import ExamCard from '../components/ExamCard';
import ArticleCard from '../components/ArticleCard';
import ProfileEditModal from '../components/profile/ProfileEditModal';
import ProfileSkeleton from '../components/profile/ProfileSkeleton';
import EmptyState from '../components/EmptyState';
import FavoriteToggle from '../components/FavoriteToggle';

interface ProfilePageProps {
  isDark: boolean;
}

type Section = 'notes' | 'exams' | 'articles' | 'favorites';

function ProfilePage({ isDark }: ProfilePageProps) {
  const { user, loading, updateUserProfile } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('notes');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleFavorite = useCallback(async (type: 'notes' | 'exams' | 'articles', id: number) => {
    if (!user) return;

    const favorites = user.favorites || { notes: [], exams: [], articles: [] };
    const isCurrentlyFavorite = favorites[type].includes(id);
    
    const updatedFavorites = {
      ...favorites,
      [type]: isCurrentlyFavorite
        ? favorites[type].filter((itemId: number) => itemId !== id)
        : [...favorites[type], id]
    };

    try {
      await updateUserProfile({ favorites: updatedFavorites });
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  }, [user, updateUserProfile]);

  if (loading) {
    return <ProfileSkeleton isDark={isDark} />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`max-w-md w-full p-8 rounded-xl text-center ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-xl`}>
          <div className="mb-6">
            <Users className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold mb-2">Giriş Yapın</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Bu sayfayı görüntülemek için lütfen giriş yapın veya hesap oluşturun.
            </p>
          </div>
          <div className="space-y-3">
            <a
              href="/login"
              className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Giriş Yap
            </a>
            <a
              href="/register"
              className="block w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Hesap Oluştur
            </a>
          </div>
        </div>
      </div>
    );
  }

  const favorites = user.favorites || { notes: [], exams: [], articles: [] };
  const favoritedNotes = user.notes?.filter(note => favorites.notes.includes(note.id)) || [];
  const favoritedExams = user.exams?.filter(exam => favorites.exams.includes(exam.id)) || [];
  const favoritedArticles = user.articles?.filter(article => favorites.articles.includes(article.id)) || [];

  const sidebarSections = [
    { id: 'notes', icon: FileText, label: 'Notlarım', count: user.notes?.length || 0 },
    { id: 'exams', icon: GraduationCap, label: 'Sınavlarım', count: user.exams?.length || 0 },
    { id: 'articles', icon: BookOpen, label: 'Makalelerim', count: user.articles?.length || 0 },
    { 
      id: 'favorites', 
      icon: Star, 
      label: 'Favorilerim',
      count: favoritedNotes.length + favoritedExams.length + favoritedArticles.length
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'notes':
        return user.notes?.length ? (
          user.notes.map(note => (
            <div key={note.id} className="relative">
              <FavoriteToggle
                isFavorite={favorites.notes.includes(note.id)}
                onToggle={() => toggleFavorite('notes', note.id)}
              />
              <NoteCard note={note} isDark={isDark} />
            </div>
          ))
        ) : (
          <EmptyState type="notes" isDark={isDark} />
        );

      case 'exams':
        return user.exams?.length ? (
          user.exams.map(exam => (
            <div key={exam.id} className="relative">
              <FavoriteToggle
                isFavorite={favorites.exams.includes(exam.id)}
                onToggle={() => toggleFavorite('exams', exam.id)}
              />
              <ExamCard exam={exam} isDark={isDark} />
            </div>
          ))
        ) : (
          <EmptyState type="exams" isDark={isDark} />
        );

      case 'articles':
        return user.articles?.length ? (
          user.articles.map(article => (
            <div key={article.id} className="relative">
              <FavoriteToggle
                isFavorite={favorites.articles.includes(article.id)}
                onToggle={() => toggleFavorite('articles', article.id)}
              />
              <ArticleCard article={article} isDark={isDark} />
            </div>
          ))
        ) : (
          <EmptyState type="articles" isDark={isDark} />
        );

      case 'favorites':
        return (favoritedNotes.length || favoritedExams.length || favoritedArticles.length) ? (
          <>
            {favoritedNotes.map(note => (
              <div key={note.id} className="relative">
                <FavoriteToggle
                  isFavorite={true}
                  onToggle={() => toggleFavorite('notes', note.id)}
                />
                <NoteCard note={note} isDark={isDark} />
              </div>
            ))}
            {favoritedExams.map(exam => (
              <div key={exam.id} className="relative">
                <FavoriteToggle
                  isFavorite={true}
                  onToggle={() => toggleFavorite('exams', exam.id)}
                />
                <ExamCard exam={exam} isDark={isDark} />
              </div>
            ))}
            {favoritedArticles.map(article => (
              <div key={article.id} className="relative">
                <FavoriteToggle
                  isFavorite={true}
                  onToggle={() => toggleFavorite('articles', article.id)}
                />
                <ArticleCard article={article} isDark={isDark} />
              </div>
            ))}
          </>
        ) : (
          <EmptyState type="favorites" isDark={isDark} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`w-64 flex-shrink-0 border-r ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        {/* User Profile Summary */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user.profile_photo_url}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
            />
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm opacity-75">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg 
              bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <Pencil size={16} />
            Profili Düzenle
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="p-4">
          {sidebarSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as Section)}
              className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : `hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`
              }`}
            >
              <div className="flex items-center gap-3">
                <section.icon size={20} />
                <span>{section.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm opacity-75">{section.count}</span>
                <ChevronRight size={16} />
              </div>
            </button>
          ))}
        </nav>

        {/* User Stats */}
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm opacity-75">
              <Users size={16} />
              <span>{user.followers} takipçi · {user.following} takip</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-75">
              <Building2 size={16} />
              <span>{user.university || 'Üniversite belirtilmedi'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm opacity-75">
              <Calendar size={16} />
              <span>Katılım: {new Date(user.joinDate).toLocaleDateString('tr-TR')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">
              {sidebarSections.find(s => s.id === activeSection)?.label}
            </h1>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <ProfileEditModal
          isDark={isDark}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ProfilePage;