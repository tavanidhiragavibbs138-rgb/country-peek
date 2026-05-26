import { createContext, useReducer, useEffect, useContext } from 'react'

const FavouritesContext = createContext(null)

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVOURITE': {
      const exists = state.some((country) => country.cca3 === action.payload.cca3)
      return exists ? state : [...state, action.payload]
    }
    case 'REMOVE_FAVOURITE':
      return state.filter((country) => country.cca3 !== action.payload)
    default:
      return state
  }
}

export function FavouritesProvider({ children }) {
  const initialFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
  const [favourites, dispatch] = useReducer(favouritesReducer, initialFavourites)

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  return (
    <FavouritesContext.Provider value={{ favourites, dispatch }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  const context = useContext(FavouritesContext)
  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider')
  }
  return context
}
