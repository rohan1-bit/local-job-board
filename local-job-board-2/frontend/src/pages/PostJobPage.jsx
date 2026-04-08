import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobService } from '../services/apiService'
import { JOB_CATEGORIES, JOB_TYPES } from '../utils/constants'
import './PostJobPage.css'

export default function PostJobPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', description: '', category: '', jobType: 'gig',
    location: '', pincode: '', salaryMin: '', salaryMax: '',
    duration: '', requirements: '', contactPhone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await jobService.createJob(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper post-job-page">
      <div className="container">
        <div className="post-job__header">
          <h1 className="section-title">Post a Job</h1>
          <p className="section-subtitle">Fill in the details to find the right worker</p>
        </div>

        <div className="post-job__layout">
          <form onSubmit={handleSubmit} className="post-job__form">
            {error && <div className="alert alert-error">{error}</div>}

            <div className="card">
              <h2 className="form-section-title">Basic Details</h2>
              <div className="form-stack">
                <div className="form-group">
                  <label className="form-label">Job Title *</label>
                  <input className="form-input" placeholder="e.g. Experienced Plumber for 3BHK" value={form.title} onChange={e => set('title', e.target.value)} required />
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)} required>
                      <option value="">Select Category</option>
                      {JOB_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Job Type *</label>
                    <select className="form-select" value={form.jobType} onChange={e => set('jobType', e.target.value)}>
                      {JOB_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Job Description *</label>
                  <textarea className="form-textarea" placeholder="Describe the work, hours, what you need done..." value={form.description} onChange={e => set('description', e.target.value)} required style={{ minHeight: 140 }} />
                </div>
                <div className="form-group">
                  <label className="form-label">Requirements</label>
                  <textarea className="form-textarea" placeholder="Experience required, tools needed, any other conditions..." value={form.requirements} onChange={e => set('requirements', e.target.value)} style={{ minHeight: 80 }} />
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="form-section-title">Location & Pay</h2>
              <div className="form-stack">
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">City / Area *</label>
                    <input className="form-input" placeholder="e.g. Bhubaneswar" value={form.location} onChange={e => set('location', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pincode</label>
                    <input className="form-input" placeholder="e.g. 751001" value={form.pincode} onChange={e => set('pincode', e.target.value)} />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Min Salary (₹/day)</label>
                    <input className="form-input" type="number" placeholder="500" value={form.salaryMin} onChange={e => set('salaryMin', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Max Salary (₹/day)</label>
                    <input className="form-input" type="number" placeholder="1000" value={form.salaryMax} onChange={e => set('salaryMax', e.target.value)} />
                  </div>
                </div>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input className="form-input" placeholder="e.g. 2 days, 1 week" value={form.duration} onChange={e => set('duration', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Phone</label>
                    <input className="form-input" placeholder="98765 43210" value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="post-job__actions">
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? '⏳ Posting...' : '🚀 Post Job'}
              </button>
              <button type="button" className="btn btn-outline btn-lg" onClick={() => navigate('/dashboard')}>
                Cancel
              </button>
            </div>
          </form>

          {/* Preview tip */}
          <div className="post-job__tips">
            <div className="card">
              <h3>✅ Tips for a Good Post</h3>
              <ul>
                <li>Be specific about the work involved</li>
                <li>Mention exact location or area</li>
                <li>State tools or skills required</li>
                <li>Set a fair and competitive pay rate</li>
                <li>Add your contact number for quick responses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
