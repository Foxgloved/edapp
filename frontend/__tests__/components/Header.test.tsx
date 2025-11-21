import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header Component', () => {
  it('renders header with search input', () => {
    render(<Header />)
    const searchInput = screen.getByPlaceholderText(/search courses/i)
    expect(searchInput).toBeInTheDocument()
  })

  it('displays user name and role', () => {
    render(<Header />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Student')).toBeInTheDocument()
  })

  it('shows notification badge with unread count', () => {
    render(<Header />)
    const badge = screen.getByText('3')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-red-500')
  })

  it('opens notifications dropdown when bell icon is clicked', async () => {
    render(<Header />)
    const bellButton = screen.getByRole('button', { name: /notifications/i })
    fireEvent.click(bellButton)
    
    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument()
    })
  })

  it('displays notification items in dropdown', async () => {
    render(<Header />)
    const bellButton = screen.getByRole('button', { name: /notifications/i })
    fireEvent.click(bellButton)
    
    await waitFor(() => {
      expect(screen.getByText('Course Completed!')).toBeInTheDocument()
      expect(screen.getByText('New Course Available')).toBeInTheDocument()
      expect(screen.getByText('Certificate Ready')).toBeInTheDocument()
    })
  })

  it('marks notification as read when clicked', async () => {
    render(<Header />)
    const bellButton = screen.getByRole('button', { name: /notifications/i })
    fireEvent.click(bellButton)
    
    await waitFor(() => {
      const notification = screen.getByText('Course Completed!')
      expect(notification).toBeInTheDocument()
    })

    const notificationElement = screen.getByText('Course Completed!').closest('div')
    if (notificationElement) {
      fireEvent.click(notificationElement)
    }
    
    // Notification should be marked as read (visual changes)
    expect(notificationElement).not.toHaveClass('bg-blue-50/30')
  })

  it('shows "Mark all read" button when there are unread notifications', async () => {
    render(<Header />)
    const bellButton = screen.getByRole('button', { name: /notifications/i })
    fireEvent.click(bellButton)
    
    await waitFor(() => {
      expect(screen.getByText('Mark all read')).toBeInTheDocument()
    })
  })

  it('opens profile menu when profile button is clicked', () => {
    render(<Header />)
    const profileButton = screen.getByText('John Doe').closest('button')
    
    if (profileButton) {
      fireEvent.click(profileButton)
      expect(screen.getByText('View Profile')).toBeInTheDocument()
      expect(screen.getByText('Edit Profile')).toBeInTheDocument()
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    }
  })

  it('closes notifications when profile menu is opened', async () => {
    render(<Header />)
    
    // Open notifications
    const bellButton = screen.getByRole('button', { name: /notifications/i })
    fireEvent.click(bellButton)
    
    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument()
    })

    // Open profile menu - notifications should close
    const profileButton = screen.getByText('John Doe').closest('button')
    if (profileButton) {
      fireEvent.click(profileButton)
      expect(screen.queryByText('Notifications')).not.toBeInTheDocument()
    }
  })

  it('has search functionality', () => {
    render(<Header />)
    const searchInput = screen.getByPlaceholderText(/search courses/i)
    fireEvent.change(searchInput, { target: { value: 'cybersecurity' } })
    expect(searchInput).toHaveValue('cybersecurity')
  })
})

