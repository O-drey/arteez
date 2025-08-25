import { UIButton } from "./UIButton"

export const UIForm = () => {
  function handleSubmit(e) {
    e.preventDefault()

    // Read the form data
    const form = e.target
    const formData = new FormData(form)

    // You can pass formData as a fetch body directly:
    fetch("/some-api", { method: form.method, body: formData })

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries())
    console.log(formJson)
  }
  return (
    <form action={search}>
      <input name="query" />
      <UIButton type="submit" label="Valider" onClick={handleSubmit} />
    </form>
  )
}
