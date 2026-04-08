import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/apiService'
import './AuthPages.css'

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authService.login(form)
      login(res.data.data.user, res.data.data.token)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page page-wrapper">
      <div className="auth-box animate-fadein">
        <div className="auth-box__header">
          <Link to="/" className="auth-logo">⚡ KaamKhojo</Link>
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-box__footer">
          <p>Don't have an account? <Link to="/register">Create one free</Link></p>
        </div>
      </div>
    </div>
  )
}

export function RegisterPage() {
  const searchParams = new URLSearchParams(window.location.search)
  const defaultRole = searchParams.get('role') || 'worker'

  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    role: defaultRole, location: '', skills: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authService.register(form)
      login(res.data.data.user, res.data.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page page-wrapper">
      <div className="auth-box auth-box--wide animate-fadein">
        <div className="auth-box__header">
          <Link to="/" className="auth-logo">⚡ KaamKhojo</Link>
          <h1>Create your account</h1>
          <p>Join thousands of workers and employers</p>
        </div>

        {/* Role Toggle */}
        <div className="role-toggle">
          <button
            className={`role-btn ${form.role === 'worker' ? 'active' : ''}`}
            onClick={() => setForm({ ...form, role: 'worker' })}
            type="button"
          >👷 I'm a Worker</button>
          <button
            className={`role-btn ${form.role === 'employer' ? 'active' : ''}`}
            onClick={() => setForm({ ...form, role: 'employer' })}
            type="button"
          >🏢 I'm an Employer</button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="Ravi Kumar" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" placeholder="+91 98765 43210" value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Min. 8 characters" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required minLength={8} />
          </div>
          <div className="form-group">
            <label className="form-label">Your City / Area</label>
            <input className="form-input" placeholder="e.g. Bhubaneswar, Odisha" value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })} required />
          </div>
          {form.role === 'worker' && (
            <div className="form-group">
              <label className="form-label">Your Skills</label>
              <input className="form-input" placeholder="e.g. Plumbing, Electrical, Painting" value={form.skills}
                onChange={e => setForm({ ...form, skills: e.target.value })} />
            </div>
          )}
          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-box__footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
