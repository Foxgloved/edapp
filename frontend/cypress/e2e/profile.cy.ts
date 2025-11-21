describe('Profile Management', () => {
  beforeEach(() => {
    cy.loginAsStudent()
  })

  describe('Profile View Page', () => {
    beforeEach(() => {
      cy.visit('/profile')
    })

    it('displays user profile information', () => {
      cy.contains('John Doe').should('be.visible')
      cy.contains('Student').should('be.visible')
    })

    it('shows user statistics', () => {
      cy.contains('Completed').should('be.visible')
      cy.contains('In Progress').should('be.visible')
      cy.contains('Hours').should('be.visible')
      cy.contains('Certificates').should('be.visible')
    })

    it('displays about me section', () => {
      cy.contains('About Me').should('be.visible')
    })

    it('shows courses in progress', () => {
      cy.contains('Courses In Progress').should('be.visible')
    })

    it('shows completed courses', () => {
      cy.contains('Completed Courses').should('be.visible')
    })

    it('displays contact information', () => {
      cy.contains('Contact Information').should('be.visible')
      cy.contains('john.doe@edapp.com').should('be.visible')
    })

    it('has edit profile button', () => {
      cy.contains('Edit Profile').should('be.visible')
    })

    it('edit profile button navigates to edit page', () => {
      cy.contains('Edit Profile').click()
      cy.url().should('include', '/profile/edit')
    })

    it('shows quick actions menu', () => {
      cy.contains('Quick Actions').should('be.visible')
    })

    it('displays recent achievements', () => {
      cy.contains('Recent Achievements').should('be.visible')
    })
  })

  describe('Profile Edit Page', () => {
    beforeEach(() => {
      cy.visit('/profile/edit')
    })

    it('displays account settings page', () => {
      cy.contains('Account Settings').should('be.visible')
      cy.contains('Manage your security and account preferences').should('be.visible')
    })

    it('shows security and delete account tabs', () => {
      cy.contains('Security').should('be.visible')
      cy.contains('Delete Account').should('be.visible')
    })

    it('security tab is active by default', () => {
      cy.contains('button', 'Security').should('have.class', 'text-blue-600')
    })

    it('displays password change form', () => {
      cy.contains('Change Password').should('be.visible')
      cy.get('input[name="currentPassword"]').should('be.visible')
      cy.get('input[name="newPassword"]').should('be.visible')
      cy.get('input[name="confirmPassword"]').should('be.visible')
    })

    it('shows password requirements', () => {
      cy.contains('Password Requirements:').should('be.visible')
      cy.contains('At least 8 characters long').should('be.visible')
    })

    it('switches to delete account tab', () => {
      cy.contains('button', 'Delete Account').click()
      cy.contains('This action is irreversible').should('be.visible')
    })

    it('delete account section shows warnings', () => {
      cy.contains('button', 'Delete Account').click()
      cy.contains('All your personal information').should('be.visible')
      cy.contains('Your course progress').should('be.visible')
      cy.contains('All earned certificates').should('be.visible')
    })

    it('shows delete account button', () => {
      cy.contains('button', 'Delete Account').click()
      cy.contains('Delete My Account').should('be.visible')
    })

    it('displays confirmation when delete is clicked', () => {
      cy.contains('button', 'Delete Account').click()
      cy.contains('Delete My Account').click()
      cy.contains('Final Confirmation').should('be.visible')
      cy.contains('Type DELETE to confirm').should('be.visible')
    })
  })

  describe('Profile Navigation', () => {
    it('can access profile from header dropdown', () => {
      cy.contains('John Doe').click()
      cy.contains('View Profile').click()
      cy.url().should('include', '/profile')
    })

    it('can access edit profile from header dropdown', () => {
      cy.contains('John Doe').click()
      cy.contains('Edit Profile').click()
      cy.url().should('include', '/profile/edit')
    })
  })
})

