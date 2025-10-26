// Global error handler for React Native
import type { ErrorUtils } from 'react-native';

// Set up global error handler
const originalHandler = (ErrorUtils as any).getGlobalHandler();

(ErrorUtils as any).setGlobalHandler((error: Error, isFatal: boolean) => {
  console.error('Global error handler:', error, 'isFatal:', isFatal);
  
  // Call the original handler
  if (originalHandler) {
    originalHandler(error, isFatal);
  }
});

// Handle unhandled promise rejections
if (typeof global !== 'undefined') {
  const originalUnhandledRejection = (global as any).onunhandledrejection;
  
  (global as any).onunhandledrejection = (event: any) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    if (originalUnhandledRejection) {
      originalUnhandledRejection.call(global, event);
    }
  };
}
