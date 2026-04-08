import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { userService } from '../services/apiService'
import RatingStars from '../components/rating/RatingStars'
import { JOB_CATEGORIES } from '../utils/constants'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, login, token } = useAuth()
  const [form, setForm] = useState({ name: '', phone: '', location: '', skills: '', bio: '' })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        phone: user.phone || '',
        location: user.location || '',
        skills: user.skills || '',
        bio: user.bio || '',
      })
    }
  }, [user])

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await userService.updateProfile(form)
      login(res.data, token)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper profile-page">
      <div className="container">
        <div className="profile__layout">
          {/* Left: Profile Card */}
          <div className="profile__sidebar">
            <div className="card profile-card">
              <div className="profile-card__avatar">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <h2>{user?.name}</h2>
              <span className={`badge ${user?.role === 'employer' ? 'badge-blue' : 'badge-orange'}`}>
                {user?.role === 'employer' ? '🏢 Employer' : '👷 Worker'}
              </span>
              <div className="profile-card__rating">
                <RatingStars rating={user?.rating || 0} size="md" />
                <span>{user?.rating ? `${user.rating} rating` : 'No ratings yet'}</span>
              </div>
              <div className="profile-card__info">
                {user?.location && <p>📍 {user.location}</p>}
                {user?.phone && <p>📞 {user.phone}</p>}
                {user?.email && <p>✉️ {user.email}</p>}
              </div>
            </div>

            {/* Skills Card (workers only) */}
            {user?.role !== 'employer' && user?.skills && (
              <div className="card">
                <h3 className="profile-section-title">Skills</h3>
                <div className="skills-list">
                  {user.skills.split(',').map(skill => skill.trim()).filter(Boolean).map((skill, i) => {
                    const cat = JOB_CATEGORIES.find(c => c.label.toLowerCase().includes(skill.toLowerCase()))
                    return (
                      <span key={i} className="badge badge-grey">
                        {cat?.icon || '🔧'} {skill}
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Edit Form */}
          <div className="profile__main">
            <div className="card">
              <h2 className="profile-section-title">Edit Profile</h2>
              {error && <div className="alert alert-error" style={{ marginBottom: 16 }}>{error}</div>}
              {saved && <div className="alert alert-success" style={{ marginBottom: 16 }}>✅ Profile updated successfully!</div>}

              <form onSubmit={handleSave} className="profile-form">
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">City / Area</label>
                  <input className="form-input" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
                {user?.role !== 'employer' && (
                  <div className="form-group">
                    <label className="form-label">Your Skills (comma separated)</label>
                    <input className="form-input" placeholder="Plumbing, Electrical, Carpentry" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} />
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">About Me</label>
                  <textarea className="form-textarea" placeholder="Brief description about yourself or your company..." value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : '💾 Save Changes'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
