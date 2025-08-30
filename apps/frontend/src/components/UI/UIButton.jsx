import { Link } from "react-router"
export const UIButton = ({
  label,
  type = "button",
  to,
  variant = "primary",
  size = "m",
  disabled = false,
  loading = false,
  onClick,
  ...props
}) => {
  const btnStyle =
    "rounded border-1 border-transparent py-3 px-5 text-l font-semibold cursor-pointer focus:ring-2 focus:outline-offset-2 transition duration-300"

  const variantStyle = {
    primary:
      "bg-primary-600 border-primary-600 hover:bg-pink-700 hover:border-pink-700 text-white",
    secondary:
      "bg-pink-200 border-pink-200 hover:bg-pink-300 hover:border-pink-300",
    neutral:
      "bg-gray-300 border-gray-300 hover:bg-gray-400 hover:border-gray-400",
    destructive:
      "bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700 text-white",
  }

  const sizeStyle = {
    s: "py-1 px-3 text-sm",
    m: "py-2 px-4 text-base",
    l: "py-3 px-6 text-lg",
  }

  const classes = [btnStyle, variantStyle[variant], sizeStyle[size]]
    .filter(Boolean)
    .join(" ")

  return to ? (
    <Link to={to} className={classes}>
      {label}
    </Link>
  ) : (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? "Chargement…" : label}
    </button>
    // <button
    //   type={type}
    //   className={[
    //     btnStyle,
    //     primary
    //       ? "bg-pink-600 border-pink-600 hover:bg-pink-700 hover:border-pink-700 text-white"
    //       : secondary
    //       ? "bg-pink-200 border-pink-200 hover:bg-pink-300 hover:border-pink-300"
    //       : destructive
    //       ? "bg-red-800 border-red-800 hover:bg-red-900 hover:border-red-900 text-white"
    //       : "bg-gray-300 border-gray-300 hover:bg-gray-400 hover:border-gray-400",
    //     disabled && primary
    //       ? "bg-pink-300 border-pink-300 text-white"
    //       : "bg-gray-200 border-gray-200",
    //     { disabled: "cursor-none" },
    //   ].join(" ")}
    //   disabled={disabled}
    //   onClick={onClick}
    //   onLoad={() => setLoading(true)}
    // >
    //   {label}
    // </button>
  )
}
