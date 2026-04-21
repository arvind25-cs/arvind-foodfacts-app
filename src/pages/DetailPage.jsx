import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '../store/savedSlice';
import { Container, Button, Typography, Paper, Box, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NutritionRow from '../ components/NutritionRow';
import { useState, useEffect } from 'react';
import axios from 'axios';

function DetailPage() {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedItems = useSelector(state => state.saved.items);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      .then(res => {
        setProduct(res.data.product);
        setLoading(false);
      });
  }, [barcode]);

  if (loading) return <Typography sx={{ p: 4 }}>Loading...</Typography>;
  if (!product) return <Typography sx={{ p: 4 }}>Product not found.</Typography>;

  const isSaved = savedItems.some(item => item.code === barcode);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      
      <Paper elevation={0} sx={{ p: 4, border: '1px solid #eee' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box component="img" src={product.image_url} sx={{ width: '100%', borderRadius: 2 }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4">{product.product_name}</Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>{product.brands}</Typography>
            
            <Button 
              variant={isSaved ? "outlined" : "contained"} 
              startIcon={isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              onClick={() => isSaved ? dispatch(removeItem(barcode)) : dispatch(addItem(product))}
              sx={{ mt: 2 }}
            >
              {isSaved ? "Remove from List" : "Save Product"}
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Nutrition Facts (per 100g)</Typography>
          <NutritionRow label="Energy" value={product.nutriments?.['energy-kcal_100g']} unit=" kcal" />
          <NutritionRow label="Proteins" value={product.nutriments?.proteins_100g} />
          <NutritionRow label="Fat" value={product.nutriments?.fat_100g} />
          <NutritionRow label="Carbs" value={product.nutriments?.carbohydrates_100g} />
        </Box>
      </Paper>
    </Container>
  );
}

export default DetailPage;