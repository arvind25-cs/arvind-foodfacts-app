import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        if (!cancelled) {
          setProduct(res.data.product);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Product not found.');
          setLoading(false);
        }
      }
    };
    fetchProduct();
    return () => { cancelled = true; };
  }, [barcode]);

  if (loading) return <div className="loader">Loading product details...</div>;
  if (error || !product) return <div className="page">{error || 'Not found'}</div>;

  const isSaved = saved.some(p => p.code === barcode);

  return (
    <div className="page detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-grid">
        <img src={product.image_url} alt={product.product_name} />
        <div>
          <h1>{product.product_name}</h1>
          <p className="brand">{product.brands}</p>
          <button 
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            onClick={() => dispatch({ type: isSaved ? 'REMOVE' : 'ADD', product, code: barcode })}
          >
            {isSaved ? '★ Saved' : '☆ Save to List'}
          </button>
          <div className="nutrition-facts">
            <h3>Nutrition Facts (per 100g)</h3>
            <ul>
              <li>Calories: {product.nutriments?.['energy-kcal_100g']} kcal</li>
              <li>Proteins: {product.nutriments?.proteins_100g}g</li>
              <li>Fat: {product.nutriments?.fat_100g}g</li>
              <li>Carbs: {product.nutriments?.carbohydrates_100g}g</li>
              <li>Fiber: {product.nutriments?.fiber_100g}g</li>
              <li>Sodium: {product.nutriments?.sodium_100g}g</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;