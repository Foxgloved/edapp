describe('Notifications System', () => {
  beforeEach(() => {
    cy.loginAsStudent()
  })

  it('displays notification badge with count', () => {
    cy.get('.bg-red-500').contains('3').should('be.visible')
  })

  it('opens notifications dropdown when bell icon clicked', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    cy.contains('Notifications').should('be.visible')
  })

  it('shows all notification items', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    
    cy.contains('Course Completed!').should('be.visible')
    cy.contains('New Course Available').should('be.visible')
    cy.contains('Certificate Ready').should('be.visible')
  })

  it('displays notification icons', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    
    cy.contains('🎉').should('be.visible')
    cy.contains('🎣').should('be.visible')
    cy.contains('📜').should('be.visible')
  })

  it('shows timestamps on notifications', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    
    cy.contains('2 hours ago').should('be.visible')
    cy.contains('5 hours ago').should('be.visible')
    cy.contains('1 day ago').should('be.visible')
  })

  it('marks notification as read when clicked', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    
    // Click on a notification
    cy.contains('Course Completed!').click()
    
    // Badge count should decrease (from 3 to 2)
    cy.get('.bg-red-500').contains('2').should('be.visible')
  })

  it('has "Mark all read" button', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    cy.contains('Mark all read').should('be.visible')
  })

  it('marks all notifications as read', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    cy.contains('Mark all read').click()
    
    // Badge should disappear
    cy.get('.bg-red-500').should('not.exist')
  })

  it('has clear all button', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    cy.contains('Clear all').should('be.visible')
  })

  it('clears all notifications', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    cy.contains('Clear all').click()
    
    // Should show empty state
    cy.contains('No notifications').should('be.visible')
    cy.contains("You're all caught up!").should('be.visible')
  })

  it('has view all notifications link', () => {
    cy.get('button').find('svg.lucide-bell').parent().click()
    cy.contains('View all notifications').should('be.visible')
  })

  it('closes when profile menu is opened', () => {
    // Open notifications
    cy.get('button').find('svg.lucide-bell').parent().click()
    cy.contains('Notifications').should('be.visible')
    
    // Open profile menu
    cy.contains('John Doe').click()
    
    // Notifications should be closed
    cy.contains('Notifications').should('not.exist')
  })
})

