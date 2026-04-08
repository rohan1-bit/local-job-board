import { useState } from 'react'
import { JOB_CATEGORIES, JOB_TYPES } from '../../utils/constants'
import './JobFilter.css'

export default function JobFilter({ filters, onChange }) {
  const [open, setOpen] = useState(false)

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value })
  }

  const clearAll = () => {
    onChange({ search: '', category: '', location: '', jobType: '', salaryMin: '', urgent: false })
  }

  const hasFilters = filters.category || filters.location || filters.jobType || filters.salaryMin || filters.urgent

  return (
    <div className="job-filter">
      {/* Search Bar */}
      <div className="job-filter__search">
        <span className="job-filter__search-icon">🔍</span>
        <input
          className="form-input job-filter__input"
          placeholder="Search jobs, skills, roles..."
          value={filters.search || ''}
          onChange={e => handleChange('search', e.target.value)}
        />
        <input
          className="form-input job-filter__location"
          placeholder="📍 Area or Pincode"
          value={filters.location || ''}
          onChange={e => handleChange('location', e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => onChange(filters)}>
          Search
        </button>
      </div>

      {/* Filter Toggle */}
      <div className="job-filter__bar">
        <div className="job-filter__categories">
          <button
            className={`filter-chip ${!filters.category && !filters.urgent ? 'active' : ''}`}
            onClick={() => { handleChange('category', ''); handleChange('urgent', false) }}
          >All</button>
          <button
            className={`filter-chip filter-chip--urgent ${filters.urgent ? 'active' : ''}`}
            onClick={() => handleChange('urgent', !filters.urgent)}
          >🔥 Urgent</button>
          {JOB_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={`filter-chip ${filters.category === cat.value ? 'active' : ''}`}
              onClick={() => handleChange('category', cat.value)}
            >
              {cat.icon} {cat.label.split(' ').slice(1).join(' ')}
            </button>
          ))}
        </div>

        <div className="job-filter__actions">
          {hasFilters && (
            <button className="btn btn-ghost btn-sm" onClick={clearAll}>
              ✕ Clear
            </button>
          )}
          <button className="btn btn-outline btn-sm" onClick={() => setOpen(!open)}>
            ⚙ Filters {open ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {open && (
        <div className="job-filter__advanced animate-fadein">
          <div className="form-group">
            <label className="form-label">Job Type</label>
            <select
              className="form-select"
              value={filters.jobType || ''}
              onChange={e => handleChange('jobType', e.target.value)}
            >
              <option value="">All Types</option>
              {JOB_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Min Salary (₹/day)</label>
            <input
              className="form-input"
              type="number"
              placeholder="e.g. 500"
              value={filters.salaryMin || ''}
              onChange={e => handleChange('salaryMin', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={filters.sortBy || 'newest'}
              onChange={e => handleChange('sortBy', e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="salary_high">Highest Salary</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
