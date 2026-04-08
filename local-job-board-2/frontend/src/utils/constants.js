export const JOB_CATEGORIES = [
  { value: 'plumbing', label: '🔧 Plumbing', icon: '🔧' },
  { value: 'electrical', label: '⚡ Electrical', icon: '⚡' },
  { value: 'carpentry', label: '🪚 Carpentry', icon: '🪚' },
  { value: 'driving', label: '🚗 Driving', icon: '🚗' },
  { value: 'cooking', label: '🍳 Cooking', icon: '🍳' },
  { value: 'cleaning', label: '🧹 Cleaning', icon: '🧹' },
  { value: 'construction', label: '🏗️ Construction', icon: '🏗️' },
  { value: 'painting', label: '🎨 Painting', icon: '🎨' },
  { value: 'gardening', label: '🌿 Gardening', icon: '🌿' },
  { value: 'security', label: '🔒 Security', icon: '🔒' },
  { value: 'delivery', label: '📦 Delivery', icon: '📦' },
  { value: 'other', label: '💼 Other', icon: '💼' },
]

export const JOB_TYPES = [
  { value: 'full-time', label: 'Full-Time' },
  { value: 'part-time', label: 'Part-Time' },
  { value: 'gig', label: 'One-time Gig' },
  { value: 'contract', label: 'Contract' },
]

export const JOB_STATUS = {
  OPEN: 'open',
  FILLED: 'filled',
  EXPIRED: 'expired',
}

export const USER_ROLES = {
  WORKER: 'worker',
  EMPLOYER: 'employer',
  ADMIN: 'admin',
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const timeAgo = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return formatDate(dateString)
}

export const formatSalary = (min, max, period = 'day') => {
  if (!min && !max) return 'Negotiable'
  if (min && max) return `₹${min}–₹${max}/${period}`
  if (min) return `₹${min}+/${period}`
  return `Up to ₹${max}/${period}`
}
