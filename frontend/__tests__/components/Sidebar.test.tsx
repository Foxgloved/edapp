import { render, screen } from '@testing-library/react'
import Sidebar from '@/components/Sidebar'

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
}))

describe('Sidebar Component', () => {
  it('renders all navigation items', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('My Courses')).toBeInTheDocument()
    expect(screen.getByText('Schedule')).toBeInTheDocument()
    expect(screen.getByText('Leaderboard')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('does not show Homework link (async learning)', () => {
    render(<Sidebar />)
    expect(screen.queryByText('Homework')).not.toBeInTheDocument()
  })

  it('renders platform logo', () => {
    render(<Sidebar />)
    expect(screen.getByText('EduPlatform')).toBeInTheDocument()
  })

  it('highlights active navigation item', () => {
    render(<Sidebar />)
    const dashboardLink = screen.getByText('Dashboard').closest('a')
    // Check if it has active styling (bg-blue-50 and text-blue-600)
    expect(dashboardLink?.className).toContain('blue')
  })

  it('has correct number of navigation items', () => {
    render(<Sidebar />)
    const links = screen.getAllByRole('link')
    // Logo link + 6 navigation items = 7 total
    expect(links.length).toBe(7)
  })

  it('all navigation links have correct hrefs', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard')
    expect(screen.getByText('My Courses').closest('a')).toHaveAttribute('href', '/courses')
    expect(screen.getByText('Schedule').closest('a')).toHaveAttribute('href', '/schedule')
    expect(screen.getByText('Leaderboard').closest('a')).toHaveAttribute('href', '/leaderboard')
    expect(screen.getByText('Profile').closest('a')).toHaveAttribute('href', '/profile')
    expect(screen.getByText('Settings').closest('a')).toHaveAttribute('href', '/settings')
  })
})

