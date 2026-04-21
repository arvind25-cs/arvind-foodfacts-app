import { NavLink } from 'react-router-dom';

function NavBar({ savedCount }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">🥗 FoodFacts</NavLink>
      <div className="links">
        <NavLink to="/">Search</NavLink>
        <NavLink to="/saved">
          Saved {savedCount > 0 && <span className="badge">{savedCount}</span>}
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;