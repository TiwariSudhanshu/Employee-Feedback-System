"use client";

export default function LoginPage() {
    return (
        <div>
        <h1>Login Page</h1>

        <p>Please enter your credentials to log in.</p>
        <form>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />

            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    );
    }