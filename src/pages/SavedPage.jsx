import { useNavigate } from 'react-router-dom';
import FoodCard from '../ components/FoodCard';

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate();

  // 1. Empty State: Handle when the user hasn't saved anything yet
  if (saved.length === 0) {
    return (
      <div className="page empty-saved">
        <h2>Your Saved Items</h2>
        <div className="empty-message">
          <span style={{ fontSize: '3rem' }}>📁</span>
          <p>You haven't saved any food items yet.</p>
          <button className="back-btn" onClick={() => navigate('/')}>
            Go Search for Food
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page saved-page">
      <header className="page-header">
        <h2>My Saved Nutrition List ({saved.length})</h2>
        <p>Keep track of your favorite products and their nutrition data.</p>
      </header>

      <div className="food-list">
        {saved.map((product) => (
          <div key={product.code} className="saved-item-wrapper">
            {/* Reuse the FoodCard component from Part 1 */}
            <FoodCard product={product} />
            
            {/* Add a Remove button specifically for this page */}
            <button 
              className="remove-btn"
              onClick={() => dispatch({ type: 'REMOVE', code: product.code })}
            >
              Remove from List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPage;