import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function OfflineAlert() {
  const { isOnline, retryConnection } = useAuth();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-4 px-4 py-3 bg-yellow-500 text-white rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <WifiOff size={20} />
          <span>You are currently offline</span>
        </div>
        <button
          onClick={retryConnection}
          className="p-2 hover:bg-yellow-600 rounded-lg transition-colors"
          aria-label="Retry connection"
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  );
}

export default OfflineAlert;