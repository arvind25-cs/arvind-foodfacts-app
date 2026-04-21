import useFoodSearch from '../hooks/useFoodSearch';
import SearchBar from '../ components/SearchBar';
import FoodList from '../ components/FoodList';
import ErrorMessage from '../ components/ ErrorMessage';

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch();

  return (
    <div className="page">
      <header className="hero">
        <h2>Find your next meal</h2>
        <SearchBar onSearch={searchFood} />
      </header>
      
      {error && <ErrorMessage message={error} />}
      {loading && <p className="loader">Searching...</p>}
      {!loading && !error && <FoodList products={results} />}
    </div>
  );
}

export default HomePage;