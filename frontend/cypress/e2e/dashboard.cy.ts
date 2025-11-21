describe('Dashboard', () => {
  beforeEach(() => {
    cy.loginAsStudent()
  })

  it('displays dashboard with welcome message', () => {
    cy.contains('Welcome back, John!').should('be.visible')
  })

  it('shows featured courses', () => {
    cy.contains('NIST Cybersecurity Framework 2.0 Training').should('be.visible')
    cy.contains('Phishing and Scam Alert Training').should('be.visible')
    cy.contains('OSHA Restaurant Employee Training').should('be.visible')
  })

  it('displays self-paced badges on courses', () => {
    cy.contains('Self-Paced').should('be.visible')
    cy.contains('On-Demand').should('be.visible')
  })

  it('shows learning features section', () => {
    cy.contains('Learn On Your Schedule').should('be.visible')
    cy.contains('Self-Paced Learning').should('be.visible')
    cy.contains('24/7 Access').should('be.visible')
    cy.contains('Instant Certificates').should('be.visible')
  })

  it('does not show homework or due dates (async learning)', () => {
    cy.contains('Due:').should('not.exist')
    cy.contains('Homework').should('not.exist')
    cy.contains('Live Session').should('not.exist')
  })

  it('displays user statistics', () => {
    cy.contains('Courses in Progress').should('be.visible')
    cy.contains('Continue Learning').should('be.visible')
  })

  it('shows achievements section', () => {
    cy.contains('Recent Achievement').should('be.visible')
  })

  it('course banners are clickable', () => {
    cy.contains('NIST Cybersecurity Framework 2.0 Training')
      .parents('a')
      .should('have.attr', 'href', '/courses/6')
  })

  it('navigates to courses page from dashboard', () => {
    cy.contains('Browse all courses').click()
    cy.url().should('include', '/courses')
  })
})

