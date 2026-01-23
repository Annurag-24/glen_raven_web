import '@testing-library/jest-dom';

declare global {
  interface JestMatchers<R> {
    toBeInTheDocument(): R;
    toHaveValue(value: string | number): R;
    toBeChecked(): R;
    toHaveAttribute(attr: string, value?: string): R;
  }
}

export {};
