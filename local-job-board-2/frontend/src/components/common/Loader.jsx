// Loader.jsx
import './Loader.css'

export function Loader({ text = 'Loading...' }) {
  return (
    <div className="loader-wrap">
      <div className="loader-spinner" />
      <p>{text}</p>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="page-loader">
      <div className="loader-spinner large" />
    </div>
  )
}
