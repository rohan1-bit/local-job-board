import './RatingStars.css'

export default function RatingStars({ rating = 0, max = 5, size = 'md', interactive = false, onChange }) {
  const stars = Array.from({ length: max }, (_, i) => i + 1)

  return (
    <div className={`stars stars--${size}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={() => interactive && onChange?.(star)}
        >
          ★
        </span>
      ))}
      {rating > 0 && <span className="stars__label">{Number(rating).toFixed(1)}</span>}
    </div>
  )
}
