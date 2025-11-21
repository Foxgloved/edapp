describe('User Switcher', () => {
  beforeEach(() => {
    cy.loginAsStudent()
  })

  it('displays floating user switcher button', () => {
    cy.get('button[title="Switch User (Demo)"]').should('be.visible')
  })

  it('floating button is in bottom right corner', () => {
    cy.get('button[title="Switch User (Demo)"]')
      .should('have.class', 'fixed')
      .should('have.class', 'bottom-6')
      .should('have.class', 'right-6')
  })

  it('opens user switcher panel when clicked', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    cy.contains('Switch User').should('be.visible')
    cy.contains('Quick login for testing').should('be.visible')
  })

  it('displays all three demo users', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    
    cy.contains('John Doe').should('be.visible')
    cy.contains('Security Experts').should('be.visible')
    cy.contains('Admin User').should('be.visible')
  })

  it('shows user roles', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    
    cy.contains('Student').should('be.visible')
    cy.contains('Instructor').should('be.visible')
    cy.contains('Admin').should('be.visible')
  })

  it('shows user emails', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    
    cy.contains('john.doe@edapp.com').should('be.visible')
    cy.contains('instructor@edapp.com').should('be.visible')
    cy.contains('admin@edapp.com').should('be.visible')
  })

  it('displays user icons', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    
    cy.contains('👨‍🎓').should('be.visible')
    cy.contains('👨‍🏫').should('be.visible')
    cy.contains('👨‍💼').should('be.visible')
  })

  it('shows password information', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    cy.contains(/admin123, instructor123, student123/i).should('be.visible')
  })

  it('has link to login page', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    cy.contains('Go to Login Page').should('be.visible')
  })

  it('switches to instructor user', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    cy.contains('Security Experts').click()
    cy.url().should('include', '/dashboard')
  })

  it('closes panel when backdrop is clicked', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    cy.contains('Switch User').should('be.visible')
    
    // Click backdrop
    cy.get('.fixed.inset-0').first().click({ force: true })
    cy.contains('Switch User').should('not.exist')
  })

  it('button icon changes to X when panel is open', () => {
    cy.get('button[title="Switch User (Demo)"]').click()
    cy.get('button[title="Switch User (Demo)"]').find('svg.lucide-x').should('exist')
  })
})

