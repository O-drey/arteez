import { Link } from "react-router"
export const UIButton = ({
  label,
  type,
  href,
  primary,
  secondary,
  destructive,
  neutral,
  large,
  small,
}) => {
  const btnStyle =
    "rounded border-1 border-transparent py-3 px-5 text-l font-semibold cursor-pointer focus:ring-2 focus:outline-offset-2 transition duration-300"
  return href ? (
    <Link
      to={href}
      className={[
        btnStyle,
        (
          primary
            ? "bg-primary-600 border-primary-600 hover:bg-pink-700 hover:border-pink-700 text-white"
            : secondary
            ? "bg-pink-200 border-pink-200 hover:bg-pink-300 hover:border-pink-300"
            : destructive
        )
          ? "bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700 text-white"
          : "bg-gray-300 border-gray-300 hover:bg-gray-400 hover:border-gray-400",
      ]}
    >
      {label}
    </Link>
  ) : (
    <button
      type={type ?? "button"}
      className={[
        btnStyle,
        primary
          ? "bg-pink-600 border-pink-600 hover:bg-pink-700 hover:border-pink-700 text-white"
          : secondary
          ? "bg-pink-200 border-pink-200 hover:bg-pink-300 hover:border-pink-300"
          : destructive
          ? "bg-red-800 border-red-800 hover:bg-red-900 hover:border-red-900 text-white"
          : "bg-gray-300 border-gray-300 hover:bg-gray-400 hover:border-gray-400",
      ]}
    >
      {label}
    </button>
  )
}
