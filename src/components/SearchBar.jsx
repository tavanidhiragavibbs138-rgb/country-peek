function SearchBar({ query, onQueryChange, onClear }) {
  return (
    <div className="search-bar">
      <label htmlFor="country-search" className="search-bar__label">
        Search countries
      </label>
      <div className="search-bar__input-row">
        <input
          id="country-search"
          className="search-bar__input"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search for a country..."
          aria-label="Search for a country"
        />
        {query && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={onClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
