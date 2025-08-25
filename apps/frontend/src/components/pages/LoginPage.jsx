export function LoginPage() {
  const login = () => {
    console.log("logged")
  }
  return (
    <div>
      <h1>Connexion</h1>
      <form action={login}>
        <label htmlFor="username">
          <span>Nom utilisateur</span>
          <input name="username" id="username" type="text" />
        </label>

        <label htmlFor="password">
          <span>Mot de passe</span>
          <input name="password" id="password" type="text" />
        </label>

        <button type="submit" value="submit">
          Connexion
        </button>
      </form>
    </div>
  )
}
