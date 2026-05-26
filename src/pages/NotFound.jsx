import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="not-found">
      <h2>404 — Page not found</h2>
      <p>Sorry, we couldn’t find that page.</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default NotFound
