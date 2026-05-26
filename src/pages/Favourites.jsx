import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import CountryCard from '../components/CountryCard'

function Favourites() {
  const { favourites } = useFavourites()

  if (favourites.length === 0) {
    return (
      <div className="favourites-empty">
        <h2>No favourites saved yet</h2>
        <p>Save a country from the search results and it will appear here.</p>
        <Link to="/" className="secondary-link">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="favourites-page">
      <h2 className="favourites-title">Saved countries</h2>
      <div className="cards-grid">
        {favourites.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  )
}

export default Favourites
