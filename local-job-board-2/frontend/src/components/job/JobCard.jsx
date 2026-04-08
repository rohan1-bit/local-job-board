import { Link } from 'react-router-dom'
import RatingStars from '../rating/RatingStars'
import { timeAgo, formatSalary, JOB_CATEGORIES } from '../../utils/constants'
import './JobCard.css'

export default function JobCard({ job }) {
  const category = JOB_CATEGORIES.find(c => c.value === job.category)
  const statusClass = job.status === 'open' ? 'badge-green' : job.status === 'filled' ? 'badge-blue' : 'badge-grey'
  const isUrgent = job.createdAt && (Date.now() - new Date(job.createdAt).getTime()) < 24 * 60 * 60 * 1000

  return (
    <Link to={`/jobs/${job.id}`} className="job-card">
      <div className="job-card__top">
        <div className="job-card__icon">{category?.icon || '💼'}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {isUrgent && <span className="badge badge-urgent">🔥 Urgent</span>}
          <span className={`badge ${statusClass}`}>{job.status}</span>
        </div>
      </div>

      <div className="job-card__body">
        <h3 className="job-card__title">{job.title}</h3>
        <p className="job-card__company">{job.employerName || 'Private Employer'}</p>
        <p className="job-card__desc">{job.description?.slice(0, 100)}...</p>
      </div>

      <div className="job-card__meta">
        <span className="job-card__meta-item">
          <span>📍</span> {job.location}
        </span>
        <span className="job-card__meta-item">
          <span>💰</span> {formatSalary(job.salaryMin, job.salaryMax)}
        </span>
        <span className="job-card__meta-item">
          <span>🕐</span> {timeAgo(job.createdAt)}
        </span>
      </div>

      <div className="job-card__footer">
        <RatingStars rating={job.employerRating || 0} size="sm" />
        <span className={`badge badge-grey`}>{category?.label || job.category}</span>
      </div>
    </Link>
  )
}
