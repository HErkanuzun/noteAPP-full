import React, { useState } from 'react';
import { X, Upload, Loader2, AlertCircle } from 'lucide-react';
import { uploadNote } from '../../services/NoteService';
import { useAuth } from '../../context/AuthContext';

interface NoteUploadModalProps {
  isDark: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

function NoteUploadModal({ isDark, onClose, onSuccess }: NoteUploadModalProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    university: user?.university || '',
    department: user?.department || '',
    year: new Date().getFullYear().toString(),
    semester: 'Bahar'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;

    setIsLoading(true);
    setError('');

    try {
      await uploadNote({
        title: formData.title,
        subject: formData.subject,
        author: user.name,
        authorId: user.id,
        date: new Date().toISOString(),
        likes: 0,
        downloads: 0,
        university: formData.university,
        department: formData.department,
        year: formData.year,
        semester: formData.semester,
        description: formData.description
      }, file);

      onSuccess();
      onClose();
    } catch (err) {
      setError('Not yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 backdrop-blur-md bg-black/50" onClick={onClose} />
      
      <div className="fixed inset-0 z-[60] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <div className={`relative rounded-xl shadow-2xl ${
              isDark ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Not Yükle</h2>

                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-100/10 border border-red-600/20 flex items-center gap-2 text-red-600">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Not Başlığı
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Ders
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Üniversite
                      </label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                          ${isDark 
                            ? 'bg-gray-800 focus:bg-gray-700' 
                            : 'bg-gray-50 focus:bg-white'
                          } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                          focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Bölüm
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                          ${isDark 
                            ? 'bg-gray-800 focus:bg-gray-700' 
                            : 'bg-gray-50 focus:bg-white'
                          } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                          focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Yıl
                      </label>
                      <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                          ${isDark 
                            ? 'bg-gray-800 focus:bg-gray-700' 
                            : 'bg-gray-50 focus:bg-white'
                          } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                          focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Dönem
                      </label>
                      <select
                        value={formData.semester}
                        onChange={(e) => setFormData(prev => ({ ...prev, semester: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                          ${isDark 
                            ? 'bg-gray-800 focus:bg-gray-700' 
                            : 'bg-gray-50 focus:bg-white'
                          } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                          focus:ring-2 focus:ring-blue-500`}
                        required
                      >
                        <option value="Güz">Güz</option>
                        <option value="Bahar">Bahar</option>
                        <option value="Yaz">Yaz</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg outline-none transition-all
                        ${isDark 
                          ? 'bg-gray-800 focus:bg-gray-700' 
                          : 'bg-gray-50 focus:bg-white'
                        } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                        focus:ring-2 focus:ring-blue-500`}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      PDF Dosyası
                    </label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="pdf-upload"
                      required
                    />
                    <label
                      htmlFor="pdf-upload"
                      className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg 
                        cursor-pointer transition-all border-2 border-dashed
                        ${isDark 
                          ? 'border-gray-700 hover:border-gray-600' 
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      <Upload size={20} />
                      {file ? file.name : 'PDF dosyası seçin'}
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !file}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Yükleniyor...
                      </>
                    ) : (
                      <>
                        <Upload size={20} />
                        Notu Yükle
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteUploadModal;