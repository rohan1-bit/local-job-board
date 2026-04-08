import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span>⚡</span> KaamKhojo
            </div>
            <p>Connecting blue-collar workers with local employers across India. Find work, post jobs, build trust.</p>
            <div className="footer__social">
              <a href="#" aria-label="GitHub">GH</a>
              <a href="#" aria-label="Twitter">TW</a>
              <a href="#" aria-label="LinkedIn">LI</a>
            </div>
          </div>

          <div className="footer__col">
            <h4>For Workers</h4>
            <Link to="/jobs">Browse Jobs</Link>
            <Link to="/register">Create Profile</Link>
            <Link to="/jobs?category=plumbing">Plumbing Jobs</Link>
            <Link to="/jobs?category=electrical">Electrical Jobs</Link>
            <Link to="/jobs?category=driving">Driving Jobs</Link>
          </div>

          <div className="footer__col">
            <h4>For Employers</h4>
            <Link to="/post-job">Post a Job</Link>
            <Link to="/register?role=employer">Employer Signup</Link>
            <Link to="/dashboard">Manage Listings</Link>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2025 KaamKhojo. Made with ❤️ for India's workforce.</p>
          <p className="footer__team">Built by <span>StackedCrew</span> · CVR University</p>
        </div>
      </div>
    </footer>
  )
}
