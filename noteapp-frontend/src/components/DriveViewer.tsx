import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import DriveService from '../services/DriveService';

interface DriveViewerProps {
  fileId: string;
  isDark: boolean;
}

function DriveViewer({ fileId, isDark }: DriveViewerProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError('');
        const driveService = DriveService.getInstance();
        const fileContent = await driveService.getFileContent(fileId);
        setContent(fileContent);
      } catch (err) {
        console.error('Error fetching Drive content:', err);
        setError('Dosya içeriği yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    if (fileId) {
      fetchContent();
    }
  }, [fileId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="prose dark:prose-invert max-w-none">
        {content}
      </div>
    </div>
  );
}

export default DriveViewer;