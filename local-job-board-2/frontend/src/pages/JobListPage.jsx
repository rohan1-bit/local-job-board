import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import JobCard from '../components/job/JobCard'
import JobFilter from '../components/job/JobFilter'
import { jobService } from '../services/apiService'
import { Loader } from '../components/common/Loader'
import './JobListPage.css'

// Mock data for UI display when backend not connected
const MOCK_JOBS = [
  { id: 1, title: 'Experienced Plumber Needed', employerName: 'RK Constructions', description: 'Looking for an experienced plumber for residential pipeline work. 3+ years experience required.', location: 'Bhubaneswar, Odisha', category: 'plumbing', status: 'open', salaryMin: 800, salaryMax: 1200, createdAt: new Date(Date.now() - 3600000).toISOString(), employerRating: 4.5 },
  { id: 2, title: 'Driver for Daily Office Runs', employerName: 'InfoTech Solutions', description: 'Need a reliable driver for daily office staff commute. Morning and evening shifts available.', location: 'Cuttack, Odisha', category: 'driving', status: 'open', salaryMin: 600, salaryMax: 900, createdAt: new Date(Date.now() - 7200000).toISOString(), employerRating: 4.2 },
  { id: 3, title: 'Home Cook for Family', employerName: 'Sharma Family', description: 'Looking for a home cook to prepare breakfast and dinner for a family of 4. Veg only preferred.', location: 'Bhubaneswar, Odisha', category: 'cooking', status: 'open', salaryMin: 500, salaryMax: 700, createdAt: new Date(Date.now() - 86400000).toISOString(), employerRating: 4.8 },
  { id: 4, title: 'Electrician for Wiring Work', employerName: 'BuildRight Pvt Ltd', description: 'Electrical wiring for a new 3BHK flat. Full wiring job, should have own tools.', location: 'Puri, Odisha', category: 'electrical', status: 'open', salaryMin: 1000, salaryMax: 1500, createdAt: new Date(Date.now() - 172800000).toISOString(), employerRating: 3.9 },
  { id: 5, title: 'Security Guard – Night Shift', employerName: 'Greenview Apartments', description: 'Security guard needed for apartment complex. Night shift 10PM–6AM. Uniform provided.', location: 'Bhubaneswar, Odisha', category: 'security', status: 'open', salaryMin: 400, salaryMax: 550, createdAt: new Date(Date.now() - 259200000).toISOString(), employerRating: 4.0 },
  { id: 6, title: 'House Painter – 2BHK Job', employerName: 'Nayak Property', description: '2BHK interior painting job. Materials will be provided. Need to start immediately.', location: 'Rourkela, Odisha', category: 'painting', status: 'open', salaryMin: 700, salaryMax: 900, createdAt: new Date(Date.now() - 345600000).toISOString(), employerRating: 4.3 },
]

export default function JobListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    jobType: '',
    salaryMin: '',
    sortBy: 'newest',
    urgent: false,
  })

  useEffect(() => {
    fetchJobs()
  }, [filters])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await jobService.searchJobs({
        search: filters.search || undefined,
        category: filters.category || undefined,
        location: filters.location || undefined,
      })
      const data = res.data?.data
      let jobList = Array.isArray(data) ? data : []
      if (filters.urgent) {
        const cutoff = Date.now() - 24 * 60 * 60 * 1000
        jobList = jobList.filter(j => new Date(j.createdAt).getTime() >= cutoff)
      }
      setJobs(jobList)
      setTotal(jobList.length)
    } catch {
      // Use mock data when backend not ready
      let filtered = MOCK_JOBS
      if (filters.category) filtered = filtered.filter(j => j.category === filters.category)
      if (filters.urgent) {
        const cutoff = Date.now() - 24 * 60 * 60 * 1000
        filtered = filtered.filter(j => new Date(j.createdAt).getTime() >= cutoff)
      }
      if (filters.search) filtered = filtered.filter(j =>
        j.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        j.description.toLowerCase().includes(filters.search.toLowerCase())
      )
      if (filters.location) filtered = filtered.filter(j =>
        j.location.toLowerCase().includes(filters.location.toLowerCase())
      )
      setJobs(filtered)
      setTotal(filtered.length)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    const params = {}
    if (newFilters.search) params.search = newFilters.search
    if (newFilters.location) params.location = newFilters.location
    if (newFilters.category) params.category = newFilters.category
    setSearchParams(params)
  }

  return (
    <div className="page-wrapper job-list-page">
      <div className="container">
        <div className="job-list__header">
          <div>
            <h1 className="section-title">Browse Jobs</h1>
            <p className="section-subtitle">
              {loading ? 'Searching...' : `${total} job${total !== 1 ? 's' : ''} found`}
            </p>
          </div>
        </div>

        <JobFilter filters={filters} onChange={handleFilterChange} />

        {loading ? (
          <Loader text="Finding jobs near you..." />
        ) : jobs.length === 0 ? (
          <div className="job-list__empty">
            <span>🔍</span>
            <h3>No jobs found</h3>
            <p>Try adjusting your filters or search in a different area</p>
          </div>
        ) : (
          <div className="job-list__grid">
            {jobs.map((job, i) => (
              <div key={job.id} className="animate-fadein" style={{ animationDelay: `${i * 0.05}s` }}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
