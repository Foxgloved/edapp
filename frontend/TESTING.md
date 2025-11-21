# Testing Guide for EdApp

Complete testing documentation using Jest and React Testing Library.

---

## 📋 Table of Contents
1. [Overview](#overview)
2. [Setup](#setup)
3. [Running Tests](#running-tests)
4. [Test Structure](#test-structure)
5. [Writing Tests](#writing-tests)
6. [Coverage Reports](#coverage-reports)
7. [Best Practices](#best-practices)

---

## 🎯 Overview

This project uses **Jest** with **React Testing Library** for comprehensive testing of components, pages, and functionality.

**Testing Stack:**
- ✅ **Jest** - Test runner and assertion library
- ✅ **React Testing Library** - Component testing utilities
- ✅ **@testing-library/user-event** - Simulating user interactions
- ✅ **@testing-library/jest-dom** - Custom Jest matchers

---

## 🚀 Setup

### Already Installed Dependencies:

```json
{
  "devDependencies": {
    "jest": "^29.x",
    "@testing-library/react": "^14.x",
    "@testing-library/jest-dom": "^6.x",
    "@testing-library/user-event": "^14.x",
    "jest-environment-jsdom": "^29.x",
    "@types/jest": "^29.x"
  }
}
```

### Configuration Files:

1. **`jest.config.js`** - Main Jest configuration
2. **`jest.setup.js`** - Test environment setup

---

## 🏃 Running Tests

### Basic Commands:

```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode (for GitHub Actions)
npm run test:ci
```

### Running Specific Tests:

```bash
# Run a specific test file
npm test Header.test.tsx

# Run tests matching a pattern
npm test -- --testPathPattern=components

# Run a single test by name
npm test -- --testNamePattern="renders header"
```

### Watch Mode Commands:

When in watch mode (`npm run test:watch`), press:
- **a** - Run all tests
- **f** - Run only failed tests
- **p** - Filter by filename pattern
- **t** - Filter by test name pattern
- **q** - Quit watch mode

---

## 📁 Test Structure

```
frontend/
├── __tests__/
│   ├── components/        # Component tests
│   │   ├── Header.test.tsx
│   │   ├── Sidebar.test.tsx
│   │   └── UserSwitcher.test.tsx
│   ├── pages/            # Page tests
│   │   ├── login.test.tsx
│   │   └── courses.test.tsx
│   ├── integration/      # Integration tests
│   │   └── course-navigation.test.tsx
│   └── lib/             # Utility tests
│       └── utils.test.ts
├── jest.config.js
├── jest.setup.js
└── TESTING.md
```

---

## ✍️ Writing Tests

### Component Test Example:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('handles button click', () => {
    render(<MyComponent />)
    const button = screen.getByRole('button', { name: 'Click me' })
    fireEvent.click(button)
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### Page Test Example:

```typescript
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('Home Page', () => {
  it('displays page title', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
```

### Integration Test Example:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import CoursesPage from '@/app/courses/page'

describe('Course Filtering Flow', () => {
  it('filters courses by category and level', () => {
    render(<CoursesPage />)
    
    // Click category
    fireEvent.click(screen.getByRole('button', { name: 'Cybersecurity' }))
    
    // Change level
    fireEvent.change(screen.getByRole('combobox'), { 
      target: { value: 'Beginner' } 
    })
    
    // Verify filtering worked
    expect(screen.getByText('Phishing and Scam Alert Training')).toBeInTheDocument()
  })
})
```

---

## 📊 Coverage Reports

### Running Coverage:

```bash
npm run test:coverage
```

### Coverage Output:

```
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   85.23 |    78.45 |   82.11 |   85.67 |                   
 components/           |   92.15 |    85.32 |   90.00 |   92.30 |                   
  Header.tsx           |   95.00 |    88.00 |   92.00 |   95.50 | 45-47             
  Sidebar.tsx          |   90.00 |    82.00 |   88.00 |   90.20 | 23-25             
 app/courses/          |   80.45 |    72.33 |   75.00 |   81.00 |                   
  page.tsx             |   80.45 |    72.33 |   75.00 |   81.00 | 112-120           
-----------------------|---------|----------|---------|---------|-------------------
```

### Coverage Thresholds:

Configured in `jest.config.js`:
- Statements: 70%
- Branches: 65%
- Functions: 70%
- Lines: 70%

---

## 🎯 What's Tested

### ✅ Components:

1. **Header**
   - Search functionality
   - Notifications dropdown
   - Profile menu
   - Badge counts

2. **Sidebar**
   - Navigation links
   - Active state highlighting
   - Removed homework link

3. **UserSwitcher**
   - Floating button
   - User list display
   - LocalStorage integration
   - Switch functionality

### ✅ Pages:

1. **Login Page**
   - Form inputs
   - Quick login buttons
   - Demo user display
   - Social login options

2. **Courses Page**
   - Course listing
   - Category filtering
   - Level filtering
   - Search functionality

### ✅ Integration Tests:

1. **Course Navigation**
   - Combined filters
   - Category + Level filtering
   - Search integration

### ✅ Utilities:

1. **cn() function**
   - Class merging
   - Tailwind conflicts
   - Conditional classes

---

## 📝 Best Practices

### 1. Use Semantic Queries:

```typescript
// ✅ Good - Use accessible queries
screen.getByRole('button', { name: 'Sign In' })
screen.getByLabelText('Email Address')
screen.getByText('Welcome back!')

// ❌ Avoid - Don't use test IDs unless necessary
screen.getByTestId('login-button')
```

### 2. Test User Behavior:

```typescript
// ✅ Good - Test what users see and do
it('shows success message after saving', () => {
  render(<ProfileEdit />)
  fireEvent.click(screen.getByRole('button', { name: 'Save' }))
  expect(screen.getByText('Saved successfully!')).toBeInTheDocument()
})

// ❌ Avoid - Testing implementation details
it('sets state correctly', () => {
  const { result } = renderHook(() => useState(false))
  // Don't test internal state
})
```

### 3. Clean Up:

```typescript
describe('MyComponent', () => {
  beforeEach(() => {
    // Reset before each test
    localStorage.clear()
  })

  afterEach(() => {
    // Clean up after each test
    jest.clearAllMocks()
  })
})
```

### 4. Async Testing:

```typescript
it('loads data asynchronously', async () => {
  render(<AsyncComponent />)
  
  // Wait for element to appear
  await waitFor(() => {
    expect(screen.getByText('Data Loaded')).toBeInTheDocument()
  })
})
```

### 5. Mocking:

```typescript
// Mock API calls
jest.mock('@/lib/api', () => ({
  fetchCourses: jest.fn(() => Promise.resolve([]))
}))

// Mock Next.js router (already done in jest.setup.js)
// No additional mocking needed!
```

---

## 🧪 Test Coverage Goals

### Current Coverage:

Run `npm run test:coverage` to see current coverage.

### Target Coverage:

- ✅ **Components:** 90%+
- ✅ **Pages:** 80%+
- ✅ **Utilities:** 95%+
- ✅ **Overall:** 85%+

### Priority Testing Areas:

1. **Critical User Flows:**
   - Login/Logout
   - Course enrollment
   - Profile management
   - Notifications

2. **Core Components:**
   - Header (navigation, notifications)
   - Sidebar (routing)
   - Course cards
   - User switcher

3. **Business Logic:**
   - Filtering algorithms
   - Progress calculations
   - Search functionality

---

## 🔍 Debugging Tests

### View Test Output:

```bash
# Verbose output
npm test -- --verbose

# Show all test names
npm test -- --listTests

# Debug a specific test
npm test -- --testNamePattern="renders header" --verbose
```

### Common Issues:

#### Issue: "Cannot find module '@/components/...'"

**Solution:** Check `jest.config.js` has correct `moduleNameMapper`:
```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/$1',
}
```

#### Issue: "window is not defined"

**Solution:** Ensure `jest.setup.js` mocks browser APIs:
```javascript
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    // ...
  })),
})
```

#### Issue: "useRouter is not a function"

**Solution:** Already mocked in `jest.setup.js`. If issues persist, check the mock is correct.

---

## 📊 CI/CD Integration

### GitHub Actions Example:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
        working-directory: ./frontend
      
      - name: Run tests
        run: npm run test:ci
        working-directory: ./frontend
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/lcov.info
```

---

## 🎓 Example Test Cases

### Testing Async Learning Features:

```typescript
describe('Async Learning', () => {
  it('does not show due dates', () => {
    render(<CoursesPage />)
    expect(screen.queryByText(/due:/i)).not.toBeInTheDocument()
  })

  it('shows self-paced badges', () => {
    render(<CoursesPage />)
    expect(screen.getByText('Self-Paced')).toBeInTheDocument()
  })
})
```

### Testing Notifications:

```typescript
describe('Notifications', () => {
  it('displays unread count', () => {
    render(<Header />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('marks notification as read when clicked', async () => {
    render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: /notifications/i }))
    
    const notification = screen.getByText('Course Completed!')
    fireEvent.click(notification.closest('div'))
    
    // Badge count should decrease
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })
})
```

---

## 📚 Resources

### Documentation:
- **Jest:** https://jestjs.io/docs/getting-started
- **React Testing Library:** https://testing-library.com/docs/react-testing-library/intro/
- **Testing Library Queries:** https://testing-library.com/docs/queries/about
- **Jest DOM Matchers:** https://github.com/testing-library/jest-dom

### Tutorials:
- Testing Library Cheatsheet: https://testing-library.com/docs/react-testing-library/cheatsheet
- Common mistakes: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

---

## 🔧 Troubleshooting

### Tests Running Slow?

```bash
# Run tests in parallel (default)
npm test

# Limit workers for slower machines
npm test -- --maxWorkers=2

# Run specific test file only
npm test Header.test.tsx
```

### Update Snapshots:

```bash
# Update all snapshots
npm test -- -u

# Update snapshots interactively
npm test -- -u --watch
```

### Clear Jest Cache:

```bash
npx jest --clearCache
```

---

## ✅ Test Checklist

When adding new features, ensure you:

- [ ] Write unit tests for new components
- [ ] Add integration tests for user flows
- [ ] Test error states
- [ ] Test loading states
- [ ] Test empty states
- [ ] Run `npm run test:coverage` and maintain >80%
- [ ] All tests pass before committing
- [ ] Update this documentation if needed

---

## 🎉 You're Ready to Test!

Run your first test:

```bash
npm test
```

Watch the magic happen! ✨

---

**Last Updated:** November 2025  
**Test Framework:** Jest + React Testing Library  
**Coverage Goal:** 85%+

