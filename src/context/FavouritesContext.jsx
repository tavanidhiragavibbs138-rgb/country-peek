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
    case 'CLEAR_FAVOURITES':
      return []
    default:
      return state
  }
}

function getInitialFavourites() {
  try {
    return JSON.parse(localStorage.getItem('favourites') || '[]')
  } catch (error) {
    return []
  }
}

export function FavouritesProvider({ children }) {
  const [favourites, dispatch] = useReducer(favouritesReducer, [], getInitialFavourites)

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
