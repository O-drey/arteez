import { useState } from "react"

const UIInput = ({ label, value, type }) => {
  const [value, setValue] = useState()

  return (
    <label>
      <span>{label}</span>
      <input type={type ?? "text"} value={value} on />
    </label>
  )
}
