import { useState } from 'react';
import SearchBar from './ components/SearchBar';
import FoodList from './ components/FoodList';
import './index.css';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setHasSearched(true);

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=12`;
      const response = await fetch(url);
      const data = await response.json();

      // Filter out items without names to keep the UI clean
      const validProducts = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ''
      );

      setResults(validProducts);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🥗 FoodFacts</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main>
        {loading && <div className="loader">Searching database...</div>}
        
        {!loading && !hasSearched && (
          <p className="message">Enter a food name above to see nutrition facts.</p>
        )}

        {!loading && hasSearched && (
          <FoodList products={results} />
        )}
      </main>
    </div>
  );
}

export default App;