import { Link, useLocation } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'

function Header() {
  const location = useLocation()
  const { favourites } = useFavourites()
  const favouriteCount = favourites.length

  return (
    <header className="header">
      <Link to="/" className="header__brand">
        CountryPeek
      </Link>
      <nav className="header__nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/favourites" className={location.pathname === '/favourites' ? 'active' : ''}>
          Favourites{favouriteCount > 0 ? ` (${favouriteCount})` : ''}
        </Link>
      </nav>
    </header>
  )
}

export default Header
