
// import React, { useEffect } from 'react';
// import { Sidebar } from './Sidebar';
// import useLoadingStore from '../stores/loadingStore';
// import { useLocation } from 'react-router-dom';

// const Loader = () => (
//   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-[9999]">
//     <div className="w-16 h-16 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
//   </div>
// );

// // Create a HOC to wrap page components
// export const withLoader = (WrappedComponent) => {
//   return function WithLoaderComponent(props) {
//     const { setIsLoading } = useLoadingStore();

//     useEffect(() => {
//       // Start loading when component mounts
//       setIsLoading(true);

//       // Create an observer to watch for changes in the DOM
//       const observer = new MutationObserver((mutations) => {
//         for (const mutation of mutations) {
//           if (mutation.addedNodes.length > 0) {
//             // Check if meaningful content has been added
//             const hasContent = document.querySelector('.content-loaded');
//             if (hasContent) {
//               setIsLoading(false);
//               observer.disconnect();
//             }
//           }
//         }
//       });

//       // Start observing the document
//       observer.observe(document.body, {
//         childList: true,
//         subtree: true
//       });

//       // Fallback timeout in case content doesn't load
//       const timeout = setTimeout(() => {
//         setIsLoading(false);
//         observer.disconnect();
//       }, 300); // Reduced timeout to 300ms

//       return () => {
//         observer.disconnect();
//         clearTimeout(timeout);
//       };
//     }, [setIsLoading]);

//     return <WrappedComponent {...props} />;
//   };
// };

// export function Layout({ children }) {
//   const { isLoading } = useLoadingStore();
//   const location = useLocation();

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {isLoading && <Loader />}
//       <Sidebar />
//       <main className="flex-1 pl-[150px]">
//         {children}
//       </main>
//     </div>
//   );
// }

// src/component/Layout.jsx

import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import useLoadingStore from '../stores/loadingStore';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

// Create a HOC to wrap page components
export const withLoader = (WrappedComponent) => {
  return function WithLoaderComponent(props) {
    const { setIsLoading } = useLoadingStore();

    useEffect(() => {
      // Start loading when component mounts
      setIsLoading(true);

      // Create an observer to watch for changes in the DOM
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length > 0) {
            // Check if meaningful content has been added
            const hasContent = document.querySelector('.content-loaded');
            if (hasContent) {
              setIsLoading(false);
              observer.disconnect();
            }
          }
        }
      });

      // Start observing the document
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Fallback timeout in case content doesn't load
      const timeout = setTimeout(() => {
        setIsLoading(false);
        observer.disconnect();
      }, 300); // Reduced timeout to 300ms

      return () => {
        observer.disconnect();
        clearTimeout(timeout);
      };
    }, [setIsLoading]);

    return <WrappedComponent {...props} />;
  };
};

export function Layout({ children }) {
  const { isLoading } = useLoadingStore();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isLoading && <Loader />}
      <Sidebar />
      <main className="flex-1 pl-[150px]">
        {children}
      </main>
    </div>
  );
}