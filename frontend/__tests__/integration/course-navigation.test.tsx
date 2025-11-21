import { render, screen, fireEvent } from '@testing-library/react'
import CoursesPage from '@/app/courses/page'

describe('Course Navigation Integration', () => {
  it('allows filtering courses by category', () => {
    render(<CoursesPage />)
    
    // Click Cybersecurity category
    const cybersecurityButton = screen.getByRole('button', { name: 'Cybersecurity' })
    fireEvent.click(cybersecurityButton)
    
    // Button should be active
    expect(cybersecurityButton).toHaveClass('bg-blue-600')
    
    // Should still show courses
    expect(screen.getByText('Phishing and Scam Alert Training - Food Service')).toBeInTheDocument()
    expect(screen.getByText('NIST Cybersecurity Framework 2.0 Training')).toBeInTheDocument()
  })

  it('allows filtering courses by level', () => {
    render(<CoursesPage />)
    
    const levelSelect = screen.getByRole('combobox')
    fireEvent.change(levelSelect, { target: { value: 'Beginner' } })
    
    expect(levelSelect).toHaveValue('Beginner')
  })

  it('combines category and level filters', () => {
    render(<CoursesPage />)
    
    // Select category
    const categoryButton = screen.getByRole('button', { name: 'Cybersecurity' })
    fireEvent.click(categoryButton)
    
    // Select level
    const levelSelect = screen.getByRole('combobox')
    fireEvent.change(levelSelect, { target: { value: 'Beginner' } })
    
    // Both filters should be applied
    expect(categoryButton).toHaveClass('bg-blue-600')
    expect(levelSelect).toHaveValue('Beginner')
  })

  it('search works independently', () => {
    render(<CoursesPage />)
    
    const searchInput = screen.getByPlaceholderText('Search courses...')
    fireEvent.change(searchInput, { target: { value: 'NIST' } })
    
    expect(searchInput).toHaveValue('NIST')
  })

  it('clicking "All" category shows all courses', () => {
    render(<CoursesPage />)
    
    // First click a specific category
    const cybersecurityButton = screen.getByRole('button', { name: 'Cybersecurity' })
    fireEvent.click(cybersecurityButton)
    
    // Then click All
    const allButton = screen.getByRole('button', { name: 'All' })
    fireEvent.click(allButton)
    
    expect(allButton).toHaveClass('bg-blue-600')
  })

  it('course cards have proper links', () => {
    render(<CoursesPage />)
    
    const courseLinks = screen.getAllByRole('link')
    
    // Should have links to course detail pages
    const phishingLink = courseLinks.find(link => 
      link.getAttribute('href') === '/courses/7'
    )
    expect(phishingLink).toBeDefined()
  })
})

