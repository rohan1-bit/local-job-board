import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { JOB_CATEGORIES } from '../utils/constants'
import './HomePage.css'

const STATS = [
  { value: '12,000+', label: 'Jobs Posted' },
  { value: '45,000+', label: 'Workers Registered' },
  { value: '800+', label: 'Cities Covered' },
  { value: '4.8★', label: 'Avg. Rating' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Create Your Profile', desc: 'Sign up as a worker or employer. Add your skills, location and availability in minutes.', icon: '👤' },
  { step: '02', title: 'Find or Post Jobs', desc: 'Workers browse local gigs. Employers post detailed job listings with pay and requirements.', icon: '🔍' },
  { step: '03', title: 'Connect & Work', desc: 'Apply directly or get contacted by employers. Start working and earn trust ratings.', icon: '🤝' },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/jobs?search=${searchQuery}&location=${searchLocation}`)
  }

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__grid" />
        </div>

        <div className="container hero__content">
          <div className="hero__badge animate-fadein">
            <span>⚡</span> India's #1 Blue-Collar Job Platform
          </div>

          <h1 className="hero__title animate-fadein">
            Find Local Work.<br />
            <span className="hero__title-accent">Get Paid. Build Trust.</span>
          </h1>

          <p className="hero__subtitle animate-fadein">
            Connecting skilled workers with local employers across India.
            From plumbing to driving — your next gig is one search away.
          </p>

          {/* Search */}
          <form className="hero__search animate-fadein" onSubmit={handleSearch}>
            <div className="hero__search-field">
              <span>🔍</span>
              <input
                className="hero__search-input"
                placeholder="What work are you looking for?"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hero__search-divider" />
            <div className="hero__search-field">
              <span>📍</span>
              <input
                className="hero__search-input"
                placeholder="City or Pincode"
                value={searchLocation}
                onChange={e => setSearchLocation(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">
              Search Jobs
            </button>
          </form>

          <div className="hero__tags animate-fadein">
            <span>Popular:</span>
            {['Plumber', 'Driver', 'Electrician', 'Cook', 'Security Guard', 'Painter'].map(tag => (
              <Link key={tag} to={`/jobs?search=${tag}`} className="hero__tag">{tag}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container stats__grid">
          {STATS.map((s, i) => (
            <div key={i} className="stats__item animate-fadein" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="stats__value">{s.value}</span>
              <span className="stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find jobs in your skill area</p>
          </div>
          <div className="categories__grid">
            {JOB_CATEGORIES.map((cat, i) => (
              <Link
                key={cat.value}
                to={`/jobs?category=${cat.value}`}
                className="category-card animate-fadein"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="category-card__icon">{cat.icon}</span>
                <span className="category-card__label">{cat.label.split(' ').slice(1).join(' ')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How KaamKhojo Works</h2>
            <p className="section-subtitle">Simple, fast and trusted</p>
          </div>
          <div className="how__grid">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="how-card animate-fadein" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="how-card__step">{step.step}</div>
                <div className="how-card__icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && <div className="how-card__arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <div className="cta__box">
            <div className="cta__orb" />
            <h2>Ready to find your next gig?</h2>
            <p>Join thousands of workers already earning through KaamKhojo</p>
            <div className="cta__btns">
              <Link to="/register" className="btn btn-primary btn-lg">Find Jobs as Worker</Link>
              <Link to="/register?role=employer" className="btn btn-outline btn-lg">Post a Job</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
