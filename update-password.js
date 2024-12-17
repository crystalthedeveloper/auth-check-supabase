// update password
document.addEventListener("DOMContentLoaded", () => {
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

    // Ensure proper Supabase client initialization
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const updateForm = document.querySelector("#update-password-form");

    updateForm?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const newPassword = document.querySelector("#new-password")?.value.trim();

        if (!newPassword) {
            alert("Please enter a new password.");
            return;
        }

        try {
            console.log("Updating password...");

            // Update the user's password
            const { error } = await supabaseClient.auth.updateUser({ password: newPassword });

            if (error) throw error;

            alert("Password updated successfully! You can now log in with your new password.");
            window.location.href = "https://www.crystalthedeveloper.ca/user-pages/login";
        } catch (err) {
            console.error("Update password error:", err.message);
            alert(`Error: ${err.message}`);
        }
    });
});