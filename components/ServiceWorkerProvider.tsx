'use client'
// app/components/ServiceWorkerProvider.tsx

import { useEffect } from 'react';

export function ServiceWorkerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' &&
        'serviceWorker' in navigator && 
        'PushManager' in window) {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/signin',
      }).then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(error => {
        console.error('Service Worker registration failed:', error);
      });
    }
  }, []);

  return children;
}