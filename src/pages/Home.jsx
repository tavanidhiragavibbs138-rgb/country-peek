import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import CountryCard from '../components/CountryCard'
import Loader from '../components/Loader'
import useCountries from '../hooks/useCountries'

function Home() {
  const [query, setQuery] = useState('')
  const { countries, loading, error } = useCountries(query)

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">Explore countries around the world</h1>
        <p className="home__copy">
          Search for a country to see its flag, population, region, and capital city.
        </p>
      </section>

      <SearchBar query={query} onQueryChange={setQuery} onClear={() => setQuery('')} />

      <div className="home__info" aria-live="polite">
        {loading && <Loader />}

        {!loading && query && query.trim().length > 0 && query.trim().length < 2 && (
          <p className="home__status">Type at least 2 characters to search.</p>
        )}

        {!loading && !query && !error && (
          <p className="home__status">
            Start searching to explore countries. Try <strong>Brazil</strong>,{' '}
            <strong>India</strong>, or <strong>France</strong>.
          </p>
        )}

        {!loading && !error && countries.length > 0 && (
          <p className="home__status home__status--summary">
            Showing {countries.length} result{countries.length > 1 ? 's' : ''} for "{query.trim()}"
          </p>
        )}

        {!loading && error && (
          <p className="home__status home__status--error" role="alert">
            {error}
          </p>
        )}
      </div>

      {!loading && !error && countries.length > 0 && (
        <div className="cards-grid">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
