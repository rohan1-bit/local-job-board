import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">⚡</span>
          <span className="navbar__logo-text">KaamKhojo</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar__links">
          <Link to="/jobs" className={`navbar__link ${location.pathname === '/jobs' ? 'active' : ''}`}>
            Browse Jobs
          </Link>
          {isAuthenticated && user?.role === 'employer' && (
            <Link to="/post-job" className={`navbar__link ${location.pathname === '/post-job' ? 'active' : ''}`}>
              Post a Job
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/dashboard" className={`navbar__link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="navbar__auth">
          {isAuthenticated ? (
            <div className="navbar__user">
              <Link to="/profile" className="navbar__avatar">
                <span>{user?.name?.[0]?.toUpperCase() || 'U'}</span>
              </Link>
              <div className="navbar__dropdown">
                <Link to="/profile">My Profile</Link>
                <Link to="/dashboard">Dashboard</Link>
                <div className="dropdown-divider" />
                <button onClick={handleLogout} className="dropdown-logout">Sign Out</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        <Link to="/jobs">Browse Jobs</Link>
        {isAuthenticated && user?.role === 'employer' && <Link to="/post-job">Post a Job</Link>}
        {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
        {isAuthenticated && <Link to="/profile">My Profile</Link>}
        {isAuthenticated
          ? <button onClick={handleLogout} className="mobile-logout">Sign Out</button>
          : <>
              <Link to="/login">Sign In</Link>
              <Link to="/register" className="mobile-register">Get Started</Link>
            </>
        }
      </div>
    </nav>
  )
}
