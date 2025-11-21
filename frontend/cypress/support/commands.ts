/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom commands for EdApp

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/dashboard')
})

// Quick login as different users
Cypress.Commands.add('loginAsStudent', () => {
  cy.visit('/login')
  cy.contains('Login as Student').click()
  cy.url().should('include', '/dashboard')
})

Cypress.Commands.add('loginAsInstructor', () => {
  cy.visit('/login')
  cy.contains('Login as Instructor').click()
  cy.url().should('include', '/dashboard')
})

Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/login')
  cy.contains('Login as Admin').click()
  cy.url().should('include', '/dashboard')
})

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="profile-menu"], .h-10.w-10.rounded-full').click()
  cy.contains('Sign Out').click()
  cy.url().should('include', '/login')
})

// Navigate to courses
Cypress.Commands.add('navigateToCourse', (courseId: string) => {
  cy.visit(`/courses/${courseId}`)
  cy.url().should('include', `/courses/${courseId}`)
})

// Open notifications
Cypress.Commands.add('openNotifications', () => {
  cy.get('button').contains('Bell').click()
  cy.contains('Notifications').should('be.visible')
})

// Switch user via floating button
Cypress.Commands.add('switchUser', (role: 'Student' | 'Instructor' | 'Admin') => {
  cy.get('button[title="Switch User (Demo)"]').click()
  cy.contains(`Login as ${role}`).click()
})

// Declare custom commands for TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      loginAsStudent(): Chainable<void>
      loginAsInstructor(): Chainable<void>
      loginAsAdmin(): Chainable<void>
      logout(): Chainable<void>
      navigateToCourse(courseId: string): Chainable<void>
      openNotifications(): Chainable<void>
      switchUser(role: 'Student' | 'Instructor' | 'Admin'): Chainable<void>
    }
  }
}

export {}

