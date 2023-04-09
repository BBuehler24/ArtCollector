import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// These imports won't work until you fix ./components/index.js
import {
  // Feature,
  Loading,
  // Preview,
  Search,
  Title
} from './components';

const App = () => {
  const [searchResults, setSearchResults] = useState({info: {}, records: []});
  const [featuredResult, setFeaturedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return <div className="app">
    <Title />
    {/* <Search /> needs props for setIsLoading and setSearchResults (trigger <Loading /> on search start/end, and transfer results to preview) */}
    <Search 
      setIsLoading={setIsLoading}
      setSearchResults={setSearchResults}
    />
    {/* <Preview /> needs props for searchResults, setIsLoading and setSearchResults (clicking prev/next buttons), and setFeaturedResult (clicking a preview) */}
    {/* <Preview 
      setIsLoading={setIsLoading}
      searchResults={searchResults}
      setSearchResults={setSearchResults}
      setFeaturedResult={setFeaturedResult}
    /> */}
    {/* <Feature /> needs props for featuredResult, as well as setIsLoading and setSearchResults (clicking on searchable properties) */}
    {/* <Feature 
      setIsLoading={setIsLoading}
      featuredResult={featuredResult}
      setSearchResults={setSearchResults}
    /> */}
    {/* <Loading /> is static, but should only render when isLoading is true */}
    <Loading isLoading={isLoading} /> {/* use a ternary and render null if isLoading is false */}
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'));

/**
 * Boostrap the <App /> component into the '#app' element in the DOM,
 * using ReactDOM.render();
 */