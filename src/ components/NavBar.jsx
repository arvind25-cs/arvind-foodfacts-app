import { AppBar, Toolbar, Typography, Button, Badge, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar() {
  const savedCount = useSelector(state => state.saved.items.length);

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid #ddd', bgcolor: 'white', color: 'black' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component={NavLink} to="/" sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 'bold' }}>
            🥗 FoodFacts
          </Typography>
          <div>
            <Button component={NavLink} to="/" color="inherit">Search</Button>
            <Button component={NavLink} to="/saved" color="inherit">
              <Badge badgeContent={savedCount} color="primary">Saved</Badge>
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;