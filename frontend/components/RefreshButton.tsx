'use client';

import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="fixed bottom-24 left-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg flex items-center gap-2 z-40 disabled:opacity-50"
      title="Refresh UI to apply all changes"
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      <span className="text-sm font-medium">
        {isRefreshing ? 'Refreshing...' : 'Refresh UI'}
      </span>
    </button>
  );
}

