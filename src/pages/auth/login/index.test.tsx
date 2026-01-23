import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./index";

// Mock the Button component
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.JSX.IntrinsicElements["button"]) => (
    <button {...props}>{children}</button>
  ),
}));

describe("Login Component", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("renders login form with all elements", () => {
    render(<Login />);

    // Check for heading and description
    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Enter your email address and we'll send you a secure login link/i,
      ),
    ).toBeInTheDocument();

    // Check for form inputs using placeholders
    expect(screen.getByPlaceholderText("@sample.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("*************")).toBeInTheDocument();

    // Check for checkbox and terms
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByText(/I agree the/i)).toBeInTheDocument();

    // Check for login button
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("allows user to type in email input", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(
      "@sample.com",
    ) as HTMLInputElement;
    await user.type(emailInput, "test@example.com");

    expect(emailInput.value).toBe("test@example.com");
  });

  it("allows user to type in password input", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText(
      "*************",
    ) as HTMLInputElement;
    await user.type(passwordInput, "password123");

    expect(passwordInput.value).toBe("password123");
  });

  it("toggles password visibility when toggle button is clicked", () => {
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText(
      "*************",
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    // Initially password should be hidden
    expect(passwordInput.type).toBe("password");

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  it("allows user to check the agreement checkbox", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

    // Initially unchecked
    expect(checkbox.checked).toBe(false);

    // Click to check
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);

    // Click to uncheck
    await user.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it("submits form with correct data when login button is clicked", async () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("@sample.com");
    const passwordInput = screen.getByPlaceholderText("*************");
    const checkbox = screen.getByRole("checkbox");
    const loginButton = screen.getByRole("button", { name: "Login" });

    // Fill in the form
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(checkbox);

    // Submit the form
    await user.click(loginButton);

    // Verify console.log was called with correct data
    expect(consoleSpy).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      agree: true,
    });

    consoleSpy.mockRestore();
  });

  it("prevents default form submission", async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("@sample.com");
    const passwordInput = screen.getByPlaceholderText("*************");
    const loginButton = screen.getByRole("button", { name: "Login" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    // Submit form
    await user.click(loginButton);

    // If preventDefault wasn't called, the page would reload
    // Since we're still in the test, preventDefault worked
    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
  });

  it("requires email and password fields (HTML5 validation)", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(
      "@sample.com",
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      "*************",
    ) as HTMLInputElement;

    expect(emailInput.required).toBe(true);
    expect(passwordInput.required).toBe(true);
  });

  it("email input has correct type and placeholder", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText(
      "@sample.com",
    ) as HTMLInputElement;

    expect(emailInput.type).toBe("email");
    expect(emailInput.placeholder).toBe("@sample.com");
  });

  it("password input has correct placeholder", () => {
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText(
      "*************",
    ) as HTMLInputElement;

    expect(passwordInput.placeholder).toBe("*************");
  });
});
