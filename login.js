
// Login
document.addEventListener("DOMContentLoaded", async () => {
    // Ensure a single Supabase client instance
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";
    const supabase = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.querySelector("#login-email").value.trim();
      const password = document.querySelector("#login-password").value.trim();

      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;

        const { user, session } = data;

        // Log user information and access token
        console.log("User ID:", user.id);
        console.log("Access Token:", session.access_token);

        // Optional: Send the token and user ID to Unreal Engine or other backend
        await fetch("http://localhost:8080/store-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: session.access_token,
            userId: user.id,
          }),
        });

        alert("Login successful!");
        window.location.href = "https://www.crystalthedeveloper.ca/crystalscrypt";
      } catch (err) {
        console.error("Login error:", err.message);
        alert(`Login failed: ${err.message}`);
      }
    });

    // Forgot Password
    const forgotPasswordLink = document.querySelector("#forgot-password");
    forgotPasswordLink.addEventListener("click", async (event) => {
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