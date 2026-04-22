import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast, hideToast } = useApp();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(hideToast, 3800);
    return () => clearTimeout(t);
  }, [toast, hideToast]);

  if (!toast) return null;

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };

  return (
    <div className="toast-wrap">
      <div className={`toast-inner toast-${toast.type}`}>
        <span>{icons[toast.type] || 'ℹ️'}</span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
