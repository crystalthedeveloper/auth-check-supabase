// Reset Password
document.addEventListener("DOMContentLoaded", () => {
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const resetForm = document.querySelector("#reset-password-form");

    resetForm?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#reset-email")?.value.trim();
        if (!email) {
            alert("Please enter your email.");
            return;
        }

        try {
            // Send the reset password email
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "https://www.crystalthedeveloper.ca/user-pages/update-password",
            });

            if (error) throw error;

            alert("Password reset link sent! Check your inbox.");
        } catch (err) {
            console.error("Reset password error:", err.message);
            alert(`Error: ${err.message}`);
        }
    });
});