describe('Courses Page', () => {
  beforeEach(() => {
    cy.loginAsStudent()
    cy.visit('/courses')
  })

  it('displays courses catalog', () => {
    cy.contains('My Courses').should('be.visible')
    cy.contains('Continue your learning journey').should('be.visible')
  })

  it('shows all three featured courses', () => {
    cy.contains('Phishing and Scam Alert Training - Food Service').should('be.visible')
    cy.contains('NIST Cybersecurity Framework 2.0 Training').should('be.visible')
    cy.contains('OSHA Restaurant Employee Training - Missouri').should('be.visible')
  })

  it('displays search input', () => {
    cy.get('input[placeholder="Search courses..."]').should('be.visible')
  })

  it('allows searching for courses', () => {
    cy.get('input[placeholder="Search courses..."]').type('Phishing')
    cy.get('input[placeholder="Search courses..."]').should('have.value', 'Phishing')
  })

  it('shows category filter buttons', () => {
    cy.contains('All').should('be.visible')
    cy.contains('Cybersecurity').should('be.visible')
    cy.contains('Safety & Compliance').should('be.visible')
  })

  it('filters courses by category', () => {
    cy.contains('button', 'Cybersecurity').click()
    cy.contains('button', 'Cybersecurity').should('have.class', 'bg-blue-600')
  })

  it('shows level dropdown', () => {
    cy.get('select').should('be.visible')
    cy.get('select').select('Beginner')
    cy.get('select').should('have.value', 'Beginner')
  })

  it('displays course ratings', () => {
    cy.contains('4.9').should('be.visible')
  })

  it('shows course duration', () => {
    cy.contains('12h').should('be.visible') // Phishing
    cy.contains('44h').should('be.visible') // NIST
    cy.contains('40h').should('be.visible') // OSHA
  })

  it('course cards are clickable', () => {
    cy.contains('Phishing and Scam Alert Training')
      .parents('a')
      .should('have.attr', 'href')
      .and('include', '/courses/')
  })

  it('navigates to course detail page', () => {
    cy.contains('Phishing and Scam Alert Training').click()
    cy.url().should('include', '/courses/7')
  })

  it('shows course level badges', () => {
    cy.contains('Beginner').should('be.visible')
    cy.contains('Intermediate').should('be.visible')
  })
})

describe('Course Detail Page', () => {
  beforeEach(() => {
    cy.loginAsStudent()
  })

  it('displays phishing course details', () => {
    cy.visit('/courses/7')
    cy.contains('Phishing and Scam Alert Training - Food Service').should('be.visible')
    cy.contains('Self-paced learning').should('be.visible')
  })

  it('shows all modules', () => {
    cy.visit('/courses/7')
    cy.contains('Phishing Fundamentals').should('be.visible')
    cy.contains('Industry-Specific Threats').should('be.visible')
    cy.contains('Safe Digital Practices').should('be.visible')
    cy.contains('Incident Response and Reporting').should('be.visible')
  })

  it('modules can be expanded and collapsed', () => {
    cy.visit('/courses/7')
    
    // Click to expand module
    cy.contains('Phishing Fundamentals').click()
    
    // Should show lessons
    cy.contains('What is Phishing?').should('be.visible')
  })

  it('displays lesson count and duration', () => {
    cy.visit('/courses/7')
    cy.contains('26 lessons').should('be.visible')
    cy.contains('12h').should('be.visible')
  })

  it('shows certification information', () => {
    cy.visit('/courses/7')
    cy.contains('Phishing Awareness Certificate').should('be.visible')
  })

  it('has enroll button', () => {
    cy.visit('/courses/7')
    cy.contains('Enroll Now').should('be.visible')
  })

  it('displays course features sidebar', () => {
    cy.visit('/courses/7')
    cy.contains('Course Features').should('be.visible')
    cy.contains('on-demand video lessons').should('be.visible')
    cy.contains('24/7 access').should('be.visible')
  })
})

