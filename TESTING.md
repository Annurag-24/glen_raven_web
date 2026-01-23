# Testing Guide for Beginners

## Table of Contents

1. [What is Testing?](#what-is-testing)
2. [Why Do We Test?](#why-do-we-test)
3. [Running Tests](#running-tests)
4. [Understanding the Testing Setup](#understanding-the-testing-setup)
5. [Configuration Files Explained](#configuration-files-explained)
6. [Writing Your First Test](#writing-your-first-test)
7. [Common Testing Patterns](#common-testing-patterns)
8. [Best Practices](#best-practices)

---

## What is Testing?

Testing is the practice of writing code that verifies your application code works correctly. Think of it like:

- **Without tests**: You manually click through your app to check if everything works
- **With tests**: Automated scripts do the clicking and checking for you

### Types of Tests We Use

**Unit Tests** (What we have now):

- Test individual components in isolation
- Fast to run
- Example: Testing if the login form accepts user input correctly

**Other types** (not implemented yet):

- **Integration Tests**: Test how multiple components work together
- **End-to-End (E2E) Tests**: Test the entire application flow like a real user

---

## Why Do We Test?

1. **Catch Bugs Early**: Find problems before users do
2. **Confidence in Changes**: Make changes without fear of breaking things
3. **Documentation**: Tests show how your code is supposed to work
4. **Faster Development**: Automated testing is faster than manual clicking
5. **Prevent Regressions**: Ensure old bugs don't come back

**Example**: If you change the login form styling, tests ensure the functionality still works.

---

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs when you save files)
npm run test:watch

# Run tests with coverage report (shows what % of code is tested)
npm test -- --coverage
```

### What Happens When You Run Tests?

1. Jest finds all `.test.tsx` files in your project
2. Runs each test
3. Reports which tests passed ✓ or failed ✗
4. Shows error messages if tests fail

---

## Understanding the Testing Setup

This project uses **Jest** and **React Testing Library**:

### Jest

- **What**: A JavaScript testing framework
- **Purpose**: Runs your tests, provides assertion functions, mocking capabilities
- **Think of it as**: The engine that runs everything

### React Testing Library

- **What**: A library for testing React components
- **Purpose**: Helps you render components and interact with them like a real user would
- **Philosophy**: Test how users interact with your app, not implementation details

---

## Configuration Files Explained

### 1. `jest.config.mjs`

**What it does**: Main configuration for Jest

```javascript
{
  preset: "ts-jest",              // Enables TypeScript support
  testEnvironment: "jsdom",       // Simulates a browser environment
  roots: ["<rootDir>/src"],       // Where to look for tests
  testMatch: [...],               // Which files are tests (*.test.tsx)
  moduleNameMapper: {             // How to handle imports
    "^@/(.*)$": "<rootDir>/src/$1",              // Maps @/ to src/
    "\\.(svg|png|jpg)$": "fileMock.js",          // Mocks images
  },
  setupFilesAfterEnv: [...],      // Files to run before tests
}
```

**Why you need it**: Tells Jest how to find and run your tests, how to handle TypeScript, and how to mock images/styles.

---

### 2. `tsconfig.jest.json`

**What it does**: TypeScript configuration specifically for tests

```json
{
  "compilerOptions": {
    "jsx": "react", // How to handle JSX syntax
    "moduleResolution": "node", // How to find imports
    "types": ["jest", "@testing-library/jest-dom"] // Type definitions
  }
}
```

**Why you need it**: Your app uses different TypeScript settings than tests need. This ensures tests compile correctly.

---

### 3. `src/setupTests.ts`

**What it does**: Runs once before all tests start

```typescript
import "@testing-library/jest-dom"; // Adds custom matchers
```

**Why you need it**: Adds helpful assertion functions like:

- `expect(element).toBeInTheDocument()`
- `expect(element).toHaveValue('text')`
- `expect(element).toBeVisible()`

Without this, you'd only have basic assertions like `expect(true).toBe(true)`.

---

### 4. `src/__mocks__/` Directory

**What it does**: Contains mock files that replace real assets during testing

**Files**:

- `fileMock.js`: Replaces images (PNG, JPG, etc.) with `'test-file-stub'`
- `svgRawMock.js`: Replaces SVG imports with empty strings
- `svgUrlMock.js`: Replaces SVG URL imports with stub values

```javascript
// fileMock.js
module.exports = "test-file-stub";
```

**Why you need it**:

- Tests don't need actual images
- Images can't be loaded in Node.js environment
- Makes tests faster
- Prevents import errors

**Example**:

```typescript
// In your component:
import logo from "@/assets/logo.png";

// In tests, this becomes:
const logo = "test-file-stub"; // No actual image loaded
```

---

### 5. `src/types/assets.d.ts`

**What it does**: TypeScript type declarations for asset imports

```typescript
declare module "*.svg" {
  const content: string;
  export default content;
}
```

**Why you need it**: Tells TypeScript that importing SVG/PNG files is valid and returns a string.

---

## Test Coverage

Currently, unit tests are implemented for:

- **Login Page** (`src/pages/auth/login/index.test.tsx`):
  - Form rendering
  - User input interactions
  - Password visibility toggle
  - Checkbox interactions
  - Form submission
  - HTML5 validation

---

## Writing Your First Test

Let's break down a simple test from the login page:

```typescript
it('allows user to type in email input', async () => {
  // 1. Setup: Create a user simulator
  const user = userEvent.setup();

  // 2. Render: Display the component
  render(<Login />);

  // 3. Query: Find the email input
  const emailInput = screen.getByPlaceholderText('@sample.com');

  // 4. Interact: Type into the input
  await user.type(emailInput, 'test@example.com');

  // 5. Assert: Check if it worked
  expect(emailInput.value).toBe('test@example.com');
});
```

### Key Testing Functions

#### `render()`

```typescript
render(<YourComponent />);
```

- Renders your component in a test environment
- Creates a virtual DOM you can interact with

#### `screen` Queries

Find elements like a user would:

```typescript
// By text content
screen.getByText("Welcome Back!");

// By placeholder
screen.getByPlaceholderText("@sample.com");

// By role (most accessible)
screen.getByRole("button", { name: "Login" });

// By label text
screen.getByLabelText("Email");
```

#### `userEvent`

Simulate user interactions:

```typescript
const user = userEvent.setup();

await user.type(input, "text"); // Type into input
await user.click(button); // Click button
await user.clear(input); // Clear input
await user.selectOptions(select, "option"); // Select dropdown
```

#### `expect()` Assertions

Check if things work:

```typescript
expect(element).toBeInTheDocument(); // Element exists
expect(element).toHaveValue("text"); // Input has value
expect(element).toBeChecked(); // Checkbox is checked
expect(element.type).toBe("password"); // Element attribute
expect(mockFunction).toHaveBeenCalled(); // Function was called
```

---

## Common Testing Patterns

### 1. Testing Form Inputs

```typescript
it('accepts user input', async () => {
  const user = userEvent.setup();
  render(<MyForm />);

  const input = screen.getByRole('textbox', { name: /email/i });
  await user.type(input, 'test@example.com');

  expect(input).toHaveValue('test@example.com');
});
```

### 2. Testing Button Clicks

```typescript
it('calls submit handler when button clicked', async () => {
  const handleSubmit = jest.fn();  // Mock function
  const user = userEvent.setup();
  render(<MyForm onSubmit={handleSubmit} />);

  const button = screen.getByRole('button', { name: /submit/i });
  await user.click(button);

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});
```

### 3. Testing Visibility Toggles

```typescript
it('toggles password visibility', () => {
  render(<LoginForm />);

  const passwordInput = screen.getByPlaceholderText('Password');
  const toggleButton = screen.getByRole('button', { name: /show password/i });

  expect(passwordInput.type).toBe('password');

  fireEvent.click(toggleButton);
  expect(passwordInput.type).toBe('text');
});
```

### 4. Testing Conditional Rendering

```typescript
it('shows error message when input is invalid', async () => {
  const user = userEvent.setup();
  render(<MyForm />);

  const input = screen.getByRole('textbox');
  await user.type(input, 'invalid');
  await user.tab();  // Trigger blur event

  expect(screen.getByText('Invalid input')).toBeInTheDocument();
});
```

### 5. Mocking Components

```typescript
// Mock a complex child component
jest.mock('@/components/ComplexChart', () => ({
  ComplexChart: () => <div>Mocked Chart</div>
}));

it('renders with mocked chart', () => {
  render(<Dashboard />);
  expect(screen.getByText('Mocked Chart')).toBeInTheDocument();
});
```

---

## Best Practices

### ✅ Do This

1. **Test User Behavior, Not Implementation**

   ```typescript
   // ✅ Good: Tests what users see
   expect(screen.getByText("Welcome")).toBeInTheDocument();

   // ❌ Bad: Tests internal state
   expect(component.state.isLoggedIn).toBe(true);
   ```

2. **Use Accessible Queries**

   ```typescript
   // ✅ Best: By role (most accessible)
   screen.getByRole("button", { name: "Submit" });

   // ✅ Good: By label
   screen.getByLabelText("Email");

   // ⚠️ OK: By placeholder
   screen.getByPlaceholderText("Enter email");

   // ❌ Avoid: By test IDs (last resort)
   screen.getByTestId("submit-button");
   ```

3. **Write Descriptive Test Names**

   ```typescript
   // ✅ Good: Clear what it tests
   it("displays error message when email is invalid", () => {});

   // ❌ Bad: Vague
   it("works correctly", () => {});
   ```

4. **One Assertion Focus Per Test**

   ```typescript
   // ✅ Good: Tests one thing
   it("disables submit button when form is invalid", () => {});
   it("enables submit button when form is valid", () => {});

   // ❌ Bad: Tests too many things
   it("handles form validation and submission", () => {});
   ```

5. **Use `async/await` with User Events**

   ```typescript
   // ✅ Good
   await user.click(button);
   expect(modal).toBeVisible();

   // ❌ Bad: Might cause timing issues
   user.click(button);
   expect(modal).toBeVisible();
   ```

### ❌ Avoid This

1. **Don't Test Third-Party Libraries**
   - Don't test that React works
   - Don't test that a UI library renders correctly
   - Trust that they have their own tests

2. **Don't Test Styles**
   - Avoid: `expect(element).toHaveStyle({ color: 'red' })`
   - Instead: Test behavior, not appearance

3. **Don't Make Tests Too Specific**
   - Avoid: `expect(element.textContent).toBe('Exactly this text with spaces')`
   - Better: `expect(element).toHaveTextContent(/this text/i)`

---

## Troubleshooting Common Issues

### "Cannot find module '@/components/...'"

**Problem**: Path alias not configured
**Solution**: Already configured in `jest.config.mjs` under `moduleNameMapper`

### "SyntaxError: Unexpected token '<'" (for SVG/images)

**Problem**: Jest doesn't know how to handle image imports
**Solution**: Already handled by mocks in `src/__mocks__/`

### "toBeInTheDocument is not a function"

**Problem**: jest-dom matchers not loaded
**Solution**: Already imported in `src/setupTests.ts`

### Test Times Out

**Problem**: Async operation not completed
**Solution**: Use `await` with userEvent and check for async operations

---

## Writing New Tests

Place tests next to the component they test:

```
src/
  components/
    MyComponent.tsx
    MyComponent.test.tsx       ← Create this
  pages/
    dashboard/
      index.tsx
      index.test.tsx            ← Or this
```

### Basic Test Template

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('Updated Text')).toBeInTheDocument();
  });
});
```

---

## Learning Resources

- **Official Docs**: https://testing-library.com/react
- **Jest Docs**: https://jestjs.io/
- **Common Mistakes**: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- **Testing Playground**: https://testing-playground.com/ (helps you find the best queries)

---

## Next Steps

1. **Run existing tests**: `npm test` to see how they work
2. **Read the login test**: Open `src/pages/auth/login/index.test.tsx` and study it
3. **Write a new test**: Pick a simple component and write a test for it
4. **Add more tests**: Gradually increase test coverage

Remember: **You don't need 100% coverage**. Focus on testing:

- Critical user paths (login, checkout, etc.)
- Complex logic
- Bug-prone areas
- Features that break often
