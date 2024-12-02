import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useLanguage } from '../context/LanguageContext';

interface UseApiOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}

export function useApi<T>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();

  const execute = useCallback(async (apiCall: () => Promise<T>, successMessage?: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);

      if (options.showSuccessToast && successMessage) {
        toast.success(successMessage);
      }

      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);

      if (options.showErrorToast) {
        toast.error(currentLanguage === 'TR' ? 'Bir hata oluştu' : 'An error occurred');
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentLanguage, options.showSuccessToast, options.showErrorToast]);

  return {
    data,
    loading,
    error,
    execute
  };
}