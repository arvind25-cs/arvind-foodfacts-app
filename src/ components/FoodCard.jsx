function FoodCard({ product }) {
  const { 
    product_name, 
    brands, 
    nutriments, 
    image_small_url 
  } = product;

  return (
    <div className="food-card">
      <div className="card-image">
        {image_small_url ? (
          <img src={image_small_url} alt={product_name} />
        ) : (
          <div className="placeholder">No Image Available</div>
        )}
      </div>
      
      <div className="card-content">
        <h3>{product_name || 'Unknown Product'}</h3>
        <p className="brand">{brands || 'Generic Brand'}</p>
        
        <div className="stats">
          <span>🔥 {nutriments?.['energy-kcal_100g'] || 0} kcal</span>
          <span>🥩 {nutriments?.proteins_100g || 0}g Protein</span>
          <span>🍞 {nutriments?.carbohydrates_100g || 0}g Carbs</span>
          <span>🥑 {nutriments?.fat_100g || 0}g Fat</span>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;