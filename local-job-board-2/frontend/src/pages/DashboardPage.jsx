import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { jobService, userService } from '../services/apiService'
import { timeAgo, formatSalary, JOB_CATEGORIES } from '../utils/constants'
import { Loader } from '../components/common/Loader'
import './DashboardPage.css'

export default function DashboardPage() {
  const { user } = useAuth()
  const [myJobs, setMyJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(user?.role === 'employer' ? 'posted' : 'applied')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (user?.role === 'employer') {
        const res = await jobService.getMyJobs()
        setMyJobs(Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : [])
      } else {
        const res = await userService.getMyApplications()
        setApplications(Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : [])
      }
    } catch {
      // Mock data
      setMyJobs([
        { id: 1, title: 'Plumber Needed', status: 'open', category: 'plumbing', location: 'Bhubaneswar', salaryMin: 800, salaryMax: 1200, applicantsCount: 5, createdAt: new Date().toISOString() },
        { id: 2, title: 'House Painter', status: 'filled', category: 'painting', location: 'Cuttack', salaryMin: 700, salaryMax: 900, applicantsCount: 12, createdAt: new Date(Date.now() - 86400000).toISOString() },
      ])
      setApplications([
        { id: 1, jobTitle: 'Driver for Office Runs', employerName: 'InfoTech Solutions', status: 'pending', appliedAt: new Date().toISOString(), location: 'Bhubaneswar' },
        { id: 2, jobTitle: 'Home Security Guard', employerName: 'Greenview Apts', status: 'accepted', appliedAt: new Date(Date.now() - 86400000).toISOString(), location: 'Puri' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job posting?')) return
    try {
      await jobService.deleteJob(id)
      setMyJobs(jobs => jobs.filter(j => j.id !== id))
    } catch {
      setMyJobs(jobs => jobs.filter(j => j.id !== id))
    }
  }

  const stats = user?.role === 'employer'
    ? [
        { label: 'Jobs Posted', value: myJobs.length, icon: '📋' },
        { label: 'Open Jobs', value: myJobs.filter(j => j.status === 'open').length, icon: '🟢' },
        { label: 'Total Applicants', value: myJobs.reduce((acc, j) => acc + (j.applicantsCount || 0), 0), icon: '👥' },
        { label: 'Filled Jobs', value: myJobs.filter(j => j.status === 'filled').length, icon: '✅' },
      ]
    : [
        { label: 'Applied Jobs', value: applications.length, icon: '📨' },
        { label: 'Pending', value: applications.filter(a => a.status === 'pending').length, icon: '⏳' },
        { label: 'Accepted', value: applications.filter(a => a.status === 'accepted').length, icon: '✅' },
        { label: 'Rejected', value: applications.filter(a => a.status === 'rejected').length, icon: '❌' },
      ]

  return (
    <div className="page-wrapper dashboard">
      <div className="container">
        {/* Welcome */}
        <div className="dashboard__welcome">
          <div className="dashboard__avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</div>
          <div>
            <h1>Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
            <p>{user?.role === 'employer' ? 'Manage your job postings' : 'Track your job applications'}</p>
          </div>
          {user?.role === 'employer' && (
            <Link to="/post-job" className="btn btn-primary" style={{ marginLeft: 'auto' }}>
              + Post New Job
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="dashboard__stats">
          {stats.map((s, i) => (
            <div key={i} className="stat-card animate-fadein" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="stat-card__icon">{s.icon}</span>
              <span className="stat-card__value">{s.value}</span>
              <span className="stat-card__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dashboard__tabs">
          {user?.role === 'employer' ? (
            <>
              <button className={`tab-btn ${activeTab === 'posted' ? 'active' : ''}`} onClick={() => setActiveTab('posted')}>My Job Postings</button>
            </>
          ) : (
            <>
              <button className={`tab-btn ${activeTab === 'applied' ? 'active' : ''}`} onClick={() => setActiveTab('applied')}>My Applications</button>
            </>
          )}
        </div>

        {/* Content */}
        {loading ? <Loader text="Loading your dashboard..." /> : (
          <div className="dashboard__content animate-fadein">
            {user?.role === 'employer' && (
              <div className="dashboard__list">
                {myJobs.length === 0 ? (
                  <div className="dashboard__empty">
                    <span>📋</span>
                    <h3>No jobs posted yet</h3>
                    <Link to="/post-job" className="btn btn-primary">Post Your First Job</Link>
                  </div>
                ) : myJobs.map(job => {
                  const cat = JOB_CATEGORIES.find(c => c.value === job.category)
                  return (
                    <div key={job.id} className="dashboard-job-row">
                      <div className="djr__icon">{cat?.icon || '💼'}</div>
                      <div className="djr__info">
                        <Link to={`/jobs/${job.id}`} className="djr__title">{job.title}</Link>
                        <div className="djr__meta">
                          <span>📍 {job.location}</span>
                          <span>💰 {formatSalary(job.salaryMin, job.salaryMax)}</span>
                          <span>👥 {job.applicantsCount || 0} applicants</span>
                          <span>🕐 {timeAgo(job.createdAt)}</span>
                        </div>
                      </div>
                      <span className={`badge ${job.status === 'open' ? 'badge-green' : 'badge-grey'}`}>{job.status}</span>
                      <div className="djr__actions">
                        <Link to={`/jobs/${job.id}`} className="btn btn-ghost btn-sm">View</Link>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job.id)}>Delete</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {user?.role !== 'employer' && (
              <div className="dashboard__list">
                {applications.length === 0 ? (
                  <div className="dashboard__empty">
                    <span>🔍</span>
                    <h3>No applications yet</h3>
                    <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
                  </div>
                ) : applications.map(app => (
                  <div key={app.id} className="dashboard-job-row">
                    <div className="djr__info">
                      <p className="djr__title">{app.jobTitle}</p>
                      <div className="djr__meta">
                        <span>🏢 {app.employerName}</span>
                        <span>📍 {app.location}</span>
                        <span>🕐 Applied {timeAgo(app.appliedAt)}</span>
                      </div>
                    </div>
                    <span className={`badge ${app.status === 'accepted' ? 'badge-green' : app.status === 'rejected' ? 'badge-red' : 'badge-orange'}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
