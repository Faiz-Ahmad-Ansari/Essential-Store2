import React from 'react';
import RouterComponent from './RouterComponent';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';


function App() {
  return (
    <ErrorBoundary>
      <div >
          <RouterComponent />
      </div>
    </ErrorBoundary>
  );
}

export default App;
