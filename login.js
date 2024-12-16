// Login
document.addEventListener("DOMContentLoaded", () => {
    // Supabase configuration
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9zZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";
  
    // Initialize Supabase client with a unique variable name
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
    console.log("Supabase initialized:", supabaseClient);
  
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
        console.log("Attempting login for:", email);
  
        // Use Supabase's signInWithPassword method
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
  
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
        console.log("Attempting password reset for:", email);
  
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
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