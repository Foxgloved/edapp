# Cypress E2E Testing Guide

Complete guide for end-to-end testing with Cypress for EdApp.

---

## 📋 Table of Contents
1. [What is Cypress?](#what-is-cypress)
2. [Setup](#setup)
3. [Running Tests](#running-tests)
4. [Test Structure](#test-structure)
5. [Custom Commands](#custom-commands)
6. [Writing E2E Tests](#writing-e2e-tests)
7. [Best Practices](#best-practices)
8. [CI/CD Integration](#cicd-integration)

---

## 🎯 What is Cypress?

**Cypress** is a next-generation front-end testing tool for modern web applications.

**Benefits:**
- 🚀 **Fast** - Runs directly in the browser
- 🎥 **Visual** - See tests run in real-time
- 🔄 **Auto-reload** - Tests rerun on file changes
- 📸 **Screenshots** - Automatic screenshots on failure
- 🎬 **Videos** - Record test runs
- 🐛 **Time Travel** - Debug tests easily
- 🌐 **Real Browser** - Test in Chrome, Firefox, Edge

**When to Use:**
- ✅ Testing complete user flows
- ✅ Testing across multiple pages
- ✅ Testing real browser interactions
- ✅ Integration testing with backend
- ✅ Visual regression testing

**When to Use Jest Instead:**
- Unit testing individual components
- Testing isolated logic
- Fast feedback during development

---

## 🚀 Setup

### Already Installed:

```json
{
  "devDependencies": {
    "cypress": "^13.x",
    "@testing-library/cypress": "^10.x",
    "@cypress/code-coverage": "^3.x",
    "start-server-and-test": "^2.x"
  }
}
```

**Total:** 343 additional packages

### Configuration Files:

1. **`cypress.config.ts`** - Main Cypress configuration
2. **`cypress/support/e2e.ts`** - E2E setup
3. **`cypress/support/commands.ts`** - Custom commands

---

## 🏃 Running Tests

### Interactive Mode (Recommended for Development):

```bash
# Open Cypress Test Runner (GUI)
npm run cypress

# Opens interactive window where you can:
# - Choose browser (Chrome, Firefox, Edge, Electron)
# - Select and run individual tests
# - See tests execute in real-time
# - Time-travel through test steps
```

### Headless Mode (CI/CD):

```bash
# Run all tests in headless mode
npm run cypress:headless

# Run in specific browser
npm run cypress:chrome
npm run cypress:firefox

# Run with dev server automatically started
npm run e2e:headless
```

### Run with Dev Server:

```bash
# Starts dev server, waits for it, then runs tests
npm run e2e

# Headless version
npm run e2e:headless
```

### Run All Tests (Jest + Cypress):

```bash
npm run test:all
```

---

## 📁 Test Structure

```
frontend/
├── cypress/
│   ├── e2e/                    # E2E test files
│   │   ├── login.cy.ts         # Login flow tests
│   │   ├── dashboard.cy.ts     # Dashboard tests
│   │   ├── courses.cy.ts       # Course browsing & detail
│   │   ├── notifications.cy.ts # Notification system
│   │   ├── profile.cy.ts       # Profile management
│   │   ├── user-switcher.cy.ts # User switching
│   │   └── navigation.cy.ts    # App navigation
│   ├── support/
│   │   ├── e2e.ts             # E2E setup
│   │   └── commands.ts         # Custom commands
│   ├── fixtures/              # Test data (auto-created)
│   ├── screenshots/           # Failure screenshots
│   └── videos/                # Test videos
├── cypress.config.ts
└── CYPRESS_TESTING.md
```

---

## 🎮 Custom Commands

We've created custom commands to make tests easier to write:

### Authentication Commands:

```typescript
// Manual login
cy.login('john.doe@edapp.com', 'student123')

// Quick login shortcuts
cy.loginAsStudent()
cy.loginAsInstructor()
cy.loginAsAdmin()

// Logout
cy.logout()
```

### Navigation Commands:

```typescript
// Navigate to specific course
cy.navigateToCourse('7') // Phishing course

// Open notifications
cy.openNotifications()

// Switch user
cy.switchUser('Instructor')
```

### Usage in Tests:

```typescript
describe('My Test', () => {
  beforeEach(() => {
    cy.loginAsStudent() // Use custom command
  })

  it('does something', () => {
    cy.navigateToCourse('7')
    cy.contains('Phishing Fundamentals').should('be.visible')
  })
})
```

---

## ✍️ Writing E2E Tests

### Basic Test Structure:

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
    cy.loginAsStudent()
  })

  it('describes what it tests', () => {
    // Arrange
    cy.visit('/dashboard')
    
    // Act
    cy.contains('View Course').click()
    
    // Assert
    cy.url().should('include', '/courses')
    cy.contains('My Courses').should('be.visible')
  })
})
```

### Testing User Flows:

```typescript
describe('Complete Course Enrollment Flow', () => {
  it('user can enroll in a course from start to finish', () => {
    // Login
    cy.loginAsStudent()
    
    // Browse courses
    cy.visit('/courses')
    
    // Filter by category
    cy.contains('button', 'Cybersecurity').click()
    
    // Select course
    cy.contains('Phishing and Scam Alert Training').click()
    
    // Verify course details
    cy.contains('26 lessons').should('be.visible')
    
    // Enroll
    cy.contains('Enroll Now').click()
    
    // Start learning
    cy.contains('Start Course').click()
  })
})
```

### Testing Forms:

```typescript
it('fills out profile form', () => {
  cy.visit('/profile/edit')
  
  cy.get('input[name="currentPassword"]').type('oldpass')
  cy.get('input[name="newPassword"]').type('newpass123!')
  cy.get('input[name="confirmPassword"]').type('newpass123!')
  
  cy.contains('Update Password').click()
  
  cy.contains('saved successfully').should('be.visible')
})
```

---

## 📊 Test Coverage

### Current E2E Tests:

**7 test files, 80+ E2E tests:**

1. **login.cy.ts** (15 tests)
   - Manual login
   - Quick login buttons
   - Demo credentials
   - Social login display

2. **dashboard.cy.ts** (10 tests)
   - Welcome message
   - Featured courses
   - Async learning features
   - Statistics display

3. **courses.cy.ts** (20 tests)
   - Course listing
   - Filtering by category/level
   - Search functionality
   - Course detail pages
   - Module expansion

4. **notifications.cy.ts** (13 tests)
   - Notification dropdown
   - Badge counts
   - Mark as read
   - Clear all

5. **profile.cy.ts** (14 tests)
   - Profile view
   - Profile edit
   - Password change
   - Account deletion

6. **user-switcher.cy.ts** (12 tests)
   - Floating button
   - User switching
   - Role display

7. **navigation.cy.ts** (15 tests)
   - Sidebar navigation
   - Header navigation
   - Course flows
   - Logout

**Total:** 99 E2E test cases

---

## 🎯 Best Practices

### 1. Use Real User Actions:

```typescript
// ✅ Good - Simulate real user behavior
cy.contains('Login as Student').click()
cy.get('input[type="email"]').type('user@example.com')

// ❌ Avoid - Direct API calls (unless necessary)
cy.request('POST', '/api/login', { ... })
```

### 2. Use Data Attributes for Test Selectors:

```typescript
// ✅ Best - Stable selectors
cy.get('[data-cy="submit-button"]').click()

// ✅ Good - Text content
cy.contains('Submit').click()

// ❌ Avoid - CSS classes (can change)
cy.get('.btn-primary').click()
```

### 3. Wait for Elements:

```typescript
// ✅ Good - Cypress auto-waits
cy.contains('Course Loaded').should('be.visible')

// ❌ Avoid - Manual waits
cy.wait(5000) // Only use when absolutely necessary
```

### 4. Clean Up:

```typescript
beforeEach(() => {
  // Reset state before each test
  cy.clearLocalStorage()
  cy.clearCookies()
})
```

---

## 🎬 Test Execution

### What Happens When Tests Run:

1. **Cypress opens browser** (or runs headless)
2. **Navigates to your app** (localhost:3000)
3. **Executes test commands** step by step
4. **Takes screenshots** on failures
5. **Records video** of entire run
6. **Generates report** with results

### Output Locations:

- **Screenshots:** `cypress/screenshots/`
- **Videos:** `cypress/videos/`
- **Reports:** Terminal output + Cypress Dashboard (optional)

---

## 🤖 CI/CD Integration

### GitHub Actions Workflow:

```yaml
name: Cypress E2E Tests

on: [push, pull_request]

jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
        working-directory: ./frontend
      
      - name: Run Cypress tests
        uses: cypress-io/github-action@v6
        with:
          working-directory: ./frontend
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000'
          browser: chrome
      
      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: cypress-screenshots
          path: frontend/cypress/screenshots
      
      - name: Upload videos
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: cypress-videos
          path: frontend/cypress/videos
```

---

## 📊 Cypress vs Jest

| Feature | Cypress (E2E) | Jest (Unit) |
|---------|---------------|-------------|
| **Purpose** | End-to-end user flows | Component/unit testing |
| **Speed** | Slower (real browser) | Fast (jsdom) |
| **Scope** | Full app integration | Isolated components |
| **Visual** | Yes (see it run) | No (command line) |
| **Debugging** | Time travel debugger | Console logs |
| **Use For** | User journeys | Logic & components |

**Best Strategy:** Use both!
- **Jest** for fast unit/component tests
- **Cypress** for critical user flows

---

## 🎓 Example Test Scenarios

### 1. Complete Course Enrollment:

```typescript
it('user enrolls in and starts a course', () => {
  cy.loginAsStudent()
  cy.visit('/courses')
  cy.contains('Phishing and Scam Alert Training').click()
  cy.contains('Enroll Now').click()
  cy.contains('Start Course').click()
  cy.contains('What is Phishing?').should('be.visible')
})
```

### 2. User Switching:

```typescript
it('switches from student to instructor', () => {
  cy.loginAsStudent()
  cy.get('button[title="Switch User (Demo)"]').click()
  cy.contains('Security Experts').click()
  cy.contains('Instructor').should('be.visible')
})
```

### 3. Notification Interaction:

```typescript
it('marks all notifications as read', () => {
  cy.loginAsStudent()
  cy.get('.bg-red-500').should('contain', '3')
  cy.get('svg.lucide-bell').parent().click()
  cy.contains('Mark all read').click()
  cy.get('.bg-red-500').should('not.exist')
})
```

---

## 🔧 Debugging Tests

### Interactive Mode:

1. Open Cypress: `npm run cypress`
2. Click on test file
3. Watch test execute
4. Hover over commands to see snapshots
5. Click commands to time-travel

### Debugging Commands:

```typescript
// Pause test execution
cy.pause()

// Print to console
cy.log('Debug message')

// Take screenshot
cy.screenshot('my-screenshot')

// Debug command
cy.debug()
```

### Video Recording:

Videos are automatically recorded for all test runs and saved to `cypress/videos/`

---

## 📝 Test Commands Reference

### Navigation:

```typescript
cy.visit('/dashboard')           // Visit a page
cy.go('back')                    // Browser back
cy.go('forward')                 // Browser forward
cy.reload()                      // Refresh page
```

### Querying:

```typescript
cy.get('button')                 // Get by selector
cy.contains('Submit')            // Get by text
cy.get('[data-cy="submit"]')    // Get by data attribute
cy.findByRole('button')          // Testing Library query
```

### Actions:

```typescript
cy.click()                       // Click element
cy.type('text')                  // Type text
cy.clear()                       // Clear input
cy.check()                       // Check checkbox
cy.select('option')              // Select dropdown
```

### Assertions:

```typescript
.should('be.visible')           // Is visible
.should('have.text', 'Hello')   // Has text
.should('have.class', 'active') // Has class
.should('have.value', 'test')   // Has value
.should('exist')                // Exists in DOM
.should('not.exist')            // Doesn't exist
```

---

## 🎯 Coverage Areas

### Authentication (15 tests):
- Manual login
- Quick login buttons
- Demo credentials
- Social login UI
- Form validation

### Dashboard (10 tests):
- Welcome message
- Featured courses
- Self-paced badges
- Learning features
- Statistics

### Courses (20 tests):
- Course listing
- Category filtering
- Level filtering
- Search functionality
- Course details
- Module expansion

### Notifications (13 tests):
- Dropdown opening
- Badge counts
- Mark as read
- Mark all read
- Clear all
- Empty state

### Profile (14 tests):
- Profile view
- Edit profile
- Password change
- Account deletion
- Navigation

### User Switcher (12 tests):
- Floating button
- Panel opening
- User display
- Role switching
- localStorage

### Navigation (15 tests):
- Sidebar links
- Header navigation
- Course flows
- Logout
- Responsive design

---

## 📊 Test Statistics

**Test Files:** 7 E2E suites  
**Total Tests:** 99 E2E test cases  
**Coverage:** All critical user flows  
**Browsers:** Chrome, Firefox, Edge, Electron  

---

## 🚀 Running Tests

### Development:

```bash
# Interactive mode (best for writing tests)
npm run cypress

# Headless mode (faster)
npm run cypress:headless

# Specific browser
npm run cypress:chrome
```

### Continuous Integration:

```bash
# Run all tests (Jest + Cypress)
npm run test:all

# Just E2E tests with server
npm run e2e:headless
```

---

## 🎨 Test Organization

### Naming Convention:

- **File names:** `feature-name.cy.ts`
- **Describe blocks:** Feature or page name
- **Test names:** Clear description of behavior

### Example:

```typescript
// File: courses.cy.ts
describe('Courses Page', () => {
  describe('Filtering', () => {
    it('filters courses by cybersecurity category', () => {
      // Test code
    })
  })
  
  describe('Search', () => {
    it('searches courses by title', () => {
      // Test code
    })
  })
})
```

---

## 🔒 Environment Variables

Set in `cypress.config.ts`:

```typescript
env: {
  apiUrl: 'http://localhost:8000',
  baseUrl: 'http://localhost:3000',
}
```

Access in tests:

```typescript
cy.visit(Cypress.env('baseUrl'))
```

---

## 📸 Screenshots & Videos

### Automatic Captures:

- **Screenshots:** Taken on test failure
- **Videos:** Recorded for all test runs
- **Location:** `cypress/screenshots/` and `cypress/videos/`

### Manual Screenshots:

```typescript
it('takes screenshot', () => {
  cy.visit('/dashboard')
  cy.screenshot('dashboard-view')
})
```

### Disable Videos (faster):

In `cypress.config.ts`:
```typescript
video: false
```

---

## 🎯 Next Steps

1. ✅ Open Cypress: `npm run cypress`
2. ✅ Run a test file
3. ✅ Watch it execute in browser
4. ✅ Write your own tests
5. ✅ Add to CI/CD pipeline

---

## 📚 Resources

- **Cypress Docs:** https://docs.cypress.io
- **Best Practices:** https://docs.cypress.io/guides/references/best-practices
- **Examples:** https://example.cypress.io
- **Recipes:** https://docs.cypress.io/examples/recipes

---

## 💡 Pro Tips

1. **Use `cy.intercept()`** to mock API calls
2. **Use fixtures** for test data
3. **Create custom commands** for repeated actions
4. **Use `.only`** to run single test during development
5. **Use time-travel debugger** to understand failures

---

**✅ Cypress E2E testing is ready!**

Open the test runner: `npm run cypress`

---

*Framework: Cypress 13.x*  
*Last Updated: November 2025*  
*Platform: EdApp Educational Platform*

