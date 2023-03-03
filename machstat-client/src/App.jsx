import { Link } from "react-router-dom"

function App() {

  return (
    <div className="max-w-6xl mx-auto">
      <div>
        Welcome
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  )
}

export default App
