import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from '@/app/login/page'

describe('Login Page', () => {
  it('renders login form', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('Welcome back!')).toBeInTheDocument()
    expect(screen.getByText('Sign in to continue your learning journey')).toBeInTheDocument()
  })

  it('displays email and password inputs', () => {
    render(<LoginPage />)
    
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
  })

  it('has sign in button', () => {
    render(<LoginPage />)
    
    const signInButton = screen.getByRole('button', { name: 'Sign In' })
    expect(signInButton).toBeInTheDocument()
  })

  it('shows quick login buttons for demo users', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('Login as Student')).toBeInTheDocument()
    expect(screen.getByText('Login as Instructor')).toBeInTheDocument()
    expect(screen.getByText('Login as Admin')).toBeInTheDocument()
  })

  it('displays demo user emails', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('john.doe@edapp.com')).toBeInTheDocument()
    expect(screen.getByText('instructor@edapp.com')).toBeInTheDocument()
    expect(screen.getByText('admin@edapp.com')).toBeInTheDocument()
  })

  it('shows password hint for demo accounts', () => {
    render(<LoginPage />)
    
    expect(screen.getByText(/admin123, instructor123, student123/i)).toBeInTheDocument()
  })

  it('allows email input', () => {
    render(<LoginPage />)
    
    const emailInput = screen.getByPlaceholderText('john@company.com')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('allows password input', () => {
    render(<LoginPage />)
    
    const passwordInput = screen.getByPlaceholderText('••••••••')
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    expect(passwordInput).toHaveValue('password123')
  })

  it('has remember me checkbox', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('Remember me')).toBeInTheDocument()
  })

  it('has forgot password link', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('Forgot password?')).toBeInTheDocument()
  })

  it('has sign up link', () => {
    render(<LoginPage />)
    
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    expect(screen.getByText('Sign up now')).toBeInTheDocument()
  })

  it('shows social login options', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('Google')).toBeInTheDocument()
    expect(screen.getByText('Microsoft')).toBeInTheDocument()
  })

  it('displays platform logo', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('EduPlatform')).toBeInTheDocument()
  })

  it('quick login buttons link to dashboard', () => {
    render(<LoginPage />)
    
    const studentButton = screen.getByText('Login as Student').closest('a')
    expect(studentButton).toHaveAttribute('href', '/dashboard')
  })
})

