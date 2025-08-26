export const UITextarea = ({
  label,
  defaultValue,
  id,
  name,
  htmlFor,
  maxLength,
}) => {
  const textareaStyle = "py-2 px-3 border-1 border-gray-800 rounded resize-none"
  const labelStyle = "font-semibold flex flex-col gap-2"

  return (
    <label className={labelStyle} htmlFor={htmlFor}>
      <span>{label}</span>
      <textarea
        defaultValue={defaultValue}
        className={textareaStyle}
        id={id}
        name={name}
        maxLength={maxLength}
      />
      {/* {maxLength && <span>{`${value.length}/${maxLength}`}</span>} */}
    </label>
  )
}
