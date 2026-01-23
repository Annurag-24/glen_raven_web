import "@testing-library/jest-dom";

// Add jest-dom matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveValue(value: string | number): R;
      toBeChecked(): R;
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}
