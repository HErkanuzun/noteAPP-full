import React from 'react';
import { FileText, GraduationCap, BookOpen, Star, ChevronRight } from 'lucide-react';

interface ProfileSkeletonProps {
  isDark: boolean;
}

function ProfileSkeleton({ isDark }: ProfileSkeletonProps) {
  const sidebarSections = [
    { icon: FileText, label: 'Notlarım' },
    { icon: GraduationCap, label: 'Sınavlarım' },
    { icon: BookOpen, label: 'Makalelerim' },
    { icon: Star, label: 'Favorilerim' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar Skeleton */}
      <div className={`w-64 flex-shrink-0 border-r ${
        isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      }`}>
        {/* Profile Summary Skeleton */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
              <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>

        {/* Navigation Sections Skeleton */}
        <nav className="p-4">
          {sidebarSections.map((section, index) => (
            <div
              key={index}
              className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              } animate-pulse`}
            >
              <div className="flex items-center gap-3">
                <section.icon size={20} className="text-gray-400" />
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-6 bg-gray-200 dark:bg-gray-700 rounded" />
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>
          ))}
        </nav>

        {/* Stats Skeleton */}
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 p-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              key={index}
              className={`rounded-xl ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              } animate-pulse`}
            >
              <div className="aspect-video rounded-t-xl bg-gray-200 dark:bg-gray-700" />
              <div className="p-4">
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
                <div className="space-y-2">
                  {[1, 2].map((line) => (
                    <div
                      key={line}
                      className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;