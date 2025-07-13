"use client";

export default function RegisterPage() {
    return (
        <div>
            <h1>Register Page</h1>
            <p>Please fill in the details to create a new account.</p>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                
                <select value="role">Role :</select>
                <option value="Admin">Admin</option>
                <option value="User">User</option>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />

                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
}