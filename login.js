
// Login
document.addEventListener("DOMContentLoaded", () => {
    // Supabase configuration
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9zZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

    // Initialize Supabase client
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const loginForm = document.querySelector("#login-form");

    // Handle login form submission
    loginForm?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#login-email")?.value.trim();
        const password = document.querySelector("#login-password")?.value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            // Use Supabase's signInWithPassword method to log in the user
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) throw error;

            console.log("Login successful:", data.user);
            alert("Login successful!");
            window.location.href = "https://www.crystalthedeveloper.ca/crystalscrypt";
        } catch (err) {
            console.error("Login error:", err.message);
            alert(`Login failed: ${err.message}`);
        }
    });

    // Forgot password functionality
    const forgotPasswordLink = document.querySelector("#forgot-password");

    forgotPasswordLink?.addEventListener("click", async (event) => {
        event.preventDefault();

        const email = prompt("Enter your email to reset your password:");
        if (!email) {
            alert("Email is required.");
            return;
        }

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "https://www.crystalthedeveloper.ca/user-pages/reset-password",
            });

            if (error) throw error;

            alert("Password reset email sent! Check your inbox.");
        } catch (err) {
            console.error("Forgot Password Error:", err.message);
            alert(`Failed to send password reset email: ${err.message}`);
        }
    });
});