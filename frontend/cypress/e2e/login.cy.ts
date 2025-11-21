describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('displays login page correctly', () => {
    cy.contains('Welcome back!').should('be.visible')
    cy.contains('Sign in to continue your learning journey').should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
  })

  it('shows quick login buttons for demo users', () => {
    cy.contains('Login as Student').should('be.visible')
    cy.contains('Login as Instructor').should('be.visible')
    cy.contains('Login as Admin').should('be.visible')
  })

  it('displays demo credentials', () => {
    cy.contains('john.doe@edapp.com').should('be.visible')
    cy.contains('instructor@edapp.com').should('be.visible')
    cy.contains('admin@edapp.com').should('be.visible')
  })

  it('allows manual login with email and password', () => {
    cy.get('input[type="email"]').type('john.doe@edapp.com')
    cy.get('input[type="password"]').type('student123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })

  it('quick login as student works', () => {
    cy.loginAsStudent()
    cy.url().should('include', '/dashboard')
    cy.contains('Welcome back, John!').should('be.visible')
  })

  it('quick login as instructor works', () => {
    cy.loginAsInstructor()
    cy.url().should('include', '/dashboard')
  })

  it('quick login as admin works', () => {
    cy.loginAsAdmin()
    cy.url().should('include', '/dashboard')
  })

  it('shows platform branding', () => {
    cy.contains('EduPlatform').should('be.visible')
  })

  it('has remember me checkbox', () => {
    cy.contains('Remember me').should('be.visible')
  })

  it('has forgot password link', () => {
    cy.contains('Forgot password?').should('be.visible')
  })

  it('has sign up link', () => {
    cy.contains('Sign up now').should('be.visible')
  })

  it('shows social login options', () => {
    cy.contains('Google').should('be.visible')
    cy.contains('Microsoft').should('be.visible')
  })
})

