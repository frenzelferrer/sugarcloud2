import { useEffect } from 'react';

/**
 * Hook that implements comprehensive anti-inspection features
 * Disables: right-click, copy, paste, drag/drop, F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
 * Also detects and attempts to prevent DevTools access
 */
export const useAntiInspection = () => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable paste
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = 'none';
      return false;
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for developer tools and inspection
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 - Open DevTools
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I - Open DevTools (Windows/Linux)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J - Open Console (Windows/Linux)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }

      // Ctrl+U - View Page Source
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+I - Open DevTools (Mac)
      if (e.metaKey && e.altKey && e.key === 'i') {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+J - Open Console (Mac)
      if (e.metaKey && e.altKey && e.key === 'j') {
        e.preventDefault();
        return false;
      }

      // Cmd+Option+U - View Page Source (Mac)
      if (e.metaKey && e.altKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu, false);
    document.addEventListener('copy', handleCopy, false);
    document.addEventListener('paste', handlePaste, false);
    document.addEventListener('dragover', handleDragOver, false);
    document.addEventListener('drop', handleDrop, false);
    document.addEventListener('keydown', handleKeyDown, false);

    // DevTools detection using console object size
    const detectDevTools = () => {
      let devToolsOpen = false;

      // Method 1: Check console object size
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold) {
        devToolsOpen = true;
      }

      // Method 2: Check if debugger statement is being used
      const start = performance.now();
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        devToolsOpen = true;
      }

      return devToolsOpen;
    };

    // Run DevTools detection periodically
    const detectionInterval = setInterval(() => {
      if (detectDevTools()) {
        console.clear();
        console.log('%c⚠️ Developer Tools Detection', 'color: red; font-size: 16px; font-weight: bold;');
        console.log('%cUnauthorized access attempt detected. This application is protected.', 'color: red; font-size: 14px;');
      }
    }, 1000);

    // Disable F12 and other shortcuts at window level
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // Disable selection of page content
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      input, textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(detectionInterval);
      document.head.removeChild(style);
    };
  }, []);
};
