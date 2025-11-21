import { render, screen, fireEvent } from '@testing-library/react'
import CoursesPage from '@/app/courses/page'

describe('Courses Page', () => {
  it('renders page title and description', () => {
    render(<CoursesPage />)
    expect(screen.getByText('My Courses')).toBeInTheDocument()
    expect(screen.getByText('Continue your learning journey')).toBeInTheDocument()
  })

  it('displays search input', () => {
    render(<CoursesPage />)
    const searchInput = screen.getByPlaceholderText('Search courses...')
    expect(searchInput).toBeInTheDocument()
  })

  it('shows all three featured courses', () => {
    render(<CoursesPage />)
    
    expect(screen.getByText('Phishing and Scam Alert Training - Food Service')).toBeInTheDocument()
    expect(screen.getByText('NIST Cybersecurity Framework 2.0 Training')).toBeInTheDocument()
    expect(screen.getByText('OSHA Restaurant Employee Training - Missouri')).toBeInTheDocument()
  })

  it('displays course categories', () => {
    render(<CoursesPage />)
    
    expect(screen.getByText('Cybersecurity')).toBeInTheDocument()
    expect(screen.getByText('Safety & Compliance')).toBeInTheDocument()
  })

  it('displays course levels', () => {
    render(<CoursesPage />)
    
    const beginnerBadges = screen.getAllByText('Beginner')
    const intermediateBadges = screen.getAllByText('Intermediate')
    
    expect(beginnerBadges.length).toBeGreaterThan(0)
    expect(intermediateBadges.length).toBeGreaterThan(0)
  })

  it('shows course duration', () => {
    render(<CoursesPage />)
    
    const durations = screen.getAllByText(/\d+h/)
    expect(durations.length).toBeGreaterThan(0)
    
    // Check that specific durations exist
    expect(screen.getAllByText('12h').length).toBeGreaterThan(0) // Phishing course
    expect(screen.getAllByText('44h').length).toBeGreaterThan(0) // NIST course
    expect(screen.getAllByText('40h').length).toBeGreaterThan(0) // OSHA course
  })

  it('filters courses by category', () => {
    render(<CoursesPage />)
    
    const categoryButton = screen.getByRole('button', { name: 'Cybersecurity' })
    fireEvent.click(categoryButton)
    
    expect(categoryButton).toHaveClass('bg-blue-600')
  })

  it('filters courses by level', () => {
    render(<CoursesPage />)
    
    const levelSelect = screen.getByRole('combobox')
    fireEvent.change(levelSelect, { target: { value: 'Beginner' } })
    
    expect(levelSelect).toHaveValue('Beginner')
  })

  it('allows searching courses', () => {
    render(<CoursesPage />)
    
    const searchInput = screen.getByPlaceholderText('Search courses...')
    fireEvent.change(searchInput, { target: { value: 'phishing' } })
    
    expect(searchInput).toHaveValue('phishing')
  })

  it('shows course ratings', () => {
    render(<CoursesPage />)
    
    const ratings = screen.getAllByText('4.9')
    expect(ratings.length).toBeGreaterThan(0)
  })

  it('displays course cards as links', () => {
    render(<CoursesPage />)
    
    const courseCards = screen.getAllByRole('link')
    expect(courseCards.length).toBeGreaterThan(0)
  })

  it('shows "Start Course" button for new courses', () => {
    render(<CoursesPage />)
    
    const startButtons = screen.getAllByText('Start Course')
    expect(startButtons.length).toBeGreaterThan(0)
  })

  it('shows category filter buttons', () => {
    render(<CoursesPage />)
    
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cybersecurity' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Safety & Compliance' })).toBeInTheDocument()
  })
})

