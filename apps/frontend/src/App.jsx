import { useState, useEffect } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { userMethods } from "./fetch/users"
import { usersHooks } from "./hooks/usersHooks"

function App() {
  const [count, setCount] = useState(0)

  const { userList, userRetrieved } = usersHooks()

  const user = userRetrieved(1)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {userList().map((user, index) => (
        <div key={user.id || index}>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.dob}</p>
        </div>
      ))}
      {!userList() && <p>Il n'y a a pas encore d'utilisateur</p>}
      {user && (
        <div>
          <h1>Utilisateur appelé</h1>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
        </div>
      )}
    </>
  )
}

export default App
