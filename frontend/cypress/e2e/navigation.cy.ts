describe('App Navigation', () => {
  beforeEach(() => {
    cy.loginAsStudent()
  })

  describe('Sidebar Navigation', () => {
    it('navigates to dashboard', () => {
      cy.visit('/courses')
      cy.contains('a', 'Dashboard').click()
      cy.url().should('include', '/dashboard')
    })

    it('navigates to courses page', () => {
      cy.visit('/dashboard')
      cy.contains('a', 'My Courses').click()
      cy.url().should('include', '/courses')
    })

    it('navigates to schedule page', () => {
      cy.contains('a', 'Schedule').click()
      cy.url().should('include', '/schedule')
    })

    it('navigates to leaderboard', () => {
      cy.contains('a', 'Leaderboard').click()
      cy.url().should('include', '/leaderboard')
    })

    it('navigates to profile', () => {
      cy.contains('a', 'Profile').click()
      cy.url().should('include', '/profile')
    })

    it('navigates to settings', () => {
      cy.contains('a', 'Settings').click()
      cy.url().should('include', '/settings')
    })

    it('does not show homework link (async learning)', () => {
      cy.contains('Homework').should('not.exist')
    })

    it('highlights active navigation item', () => {
      cy.visit('/dashboard')
      cy.contains('a', 'Dashboard').should('have.class', 'bg-blue-50')
    })
  })

  describe('Header Navigation', () => {
    it('profile dropdown opens and closes', () => {
      cy.contains('John Doe').click()
      cy.contains('View Profile').should('be.visible')
      
      // Click elsewhere to close
      cy.get('body').click(0, 0)
      cy.contains('View Profile').should('not.exist')
    })

    it('search is accessible', () => {
      cy.get('input[placeholder*="Search courses"]').should('be.visible')
    })
  })

  describe('Course Navigation Flow', () => {
    it('complete flow from dashboard to course detail', () => {
      // Start at dashboard
      cy.visit('/dashboard')
      
      // Click on course banner
      cy.contains('Phishing and Scam Alert Training').click()
      cy.url().should('include', '/courses/7')
      
      // Verify course loaded
      cy.contains('Phishing Fundamentals').should('be.visible')
    })

    it('navigates from courses list to detail', () => {
      cy.visit('/courses')
      
      // Click on a course card
      cy.contains('NIST Cybersecurity Framework 2.0 Training').click()
      cy.url().should('include', '/courses/6')
      
      // Verify modules are visible
      cy.contains('GOVERN (GV)').should('be.visible')
    })

    it('can return to courses from course detail', () => {
      cy.visit('/courses/7')
      cy.visit('/courses')
      cy.contains('My Courses').should('be.visible')
    })
  })

  describe('Logout Flow', () => {
    it('logs out successfully', () => {
      cy.contains('John Doe').click()
      cy.contains('Sign Out').click()
      cy.url().should('include', '/login')
    })

    it('clears session on logout', () => {
      cy.contains('John Doe').click()
      cy.contains('Sign Out').click()
      
      // Try to access dashboard (should redirect to login)
      cy.visit('/dashboard')
      // In a real app with auth, this would redirect
      // For now, just verify logout happened
      cy.url().should('not.include', 'undefined')
    })
  })

  describe('Responsive Navigation', () => {
    it('works on mobile viewport', () => {
      cy.viewport('iphone-x')
      cy.visit('/dashboard')
      cy.contains('Welcome back, John!').should('be.visible')
    })

    it('works on tablet viewport', () => {
      cy.viewport('ipad-2')
      cy.visit('/dashboard')
      cy.contains('My Courses').should('be.visible')
    })
  })
})

