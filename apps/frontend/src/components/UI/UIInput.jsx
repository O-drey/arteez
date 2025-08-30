import { useState } from "react"

export const UIInput = ({
  label,
  defaultValue,
  type,
  id,
  name,
  htmlFor,
  required,
  value,
  onChange,
  accept,
  maxLength,
  multiple,
  ...props
}) => {
  const inputStyle = "py-2 px-3 border-1 border-gray-800 rounded bg-white"
  const labelStyle = "font-semibold flex flex-col gap-2"
  const [seePassword, setSeePassword] = useState(false)

  const handleSeePassword = (e) => {
    e.preventDefault()
    setSeePassword(!seePassword)
  }
  return (
    <label className={labelStyle} htmlFor={htmlFor}>
      <span>{label}</span>

      {type === "password" ? (
        <div className="flex items-center border-1 border-gray-800 rounded">
          <input
            type={seePassword ? "text" : "password"}
            defaultValue={defaultValue}
            className="py-2 px-3 rounded-l w-full bg-white"
            id={id}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            {...props}
          />
          <button
            onClick={handleSeePassword}
            className="!rounded-l-none cursor-pointer px-3"
          >
            Voir
          </button>
        </div>
      ) : (
        <input
          type={type ?? "text"}
          defaultValue={defaultValue}
          className={inputStyle}
          id={id}
          name={name}
          required={required}
          accept={accept}
          maxLength={maxLength}
          multiple={multiple}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    </label>
  )
}
