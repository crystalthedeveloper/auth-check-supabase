// Check for user session
document.addEventListener("DOMContentLoaded", async () => {
    // Supabase configuration
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9zZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

    // Initialize Supabase client
    const supabaseClient = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    try {
        console.log("Checking user session...");

        // Get user session
        const { data, error } = await supabaseClient.auth.getSession();

        if (error || !data.session) {
            console.log("No active session. Redirecting...");
            window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
            return;
        }

        console.log("Authenticated user:", data.session.user);

        // Optional: Update user info on the page
        const userElement = document.querySelector("#user-info");
        if (userElement) {
            const firstName = data.session.user.user_metadata?.first_name || "User";
            userElement.textContent = `Welcome, ${firstName}`;
        }
    } catch (err) {
        console.error("Error checking session:", err.message);
        window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
    }
});