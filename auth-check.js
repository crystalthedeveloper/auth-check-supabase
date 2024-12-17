// Check for user session
document.addEventListener("DOMContentLoaded", async () => {
    // Supabase configuration
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9zZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

    // Initialize Supabase client
    const supabaseClient = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    try {
        console.log("Checking active user session...");

        // Refresh session if needed
        const { data: sessionData, error: refreshError } = await supabaseClient.auth.refreshSession();
        if (refreshError) {
            console.warn("Session refresh failed:", refreshError.message);
        }

        // Use getUser to fetch the authenticated user
        const { data: { user }, error } = await supabaseClient.auth.getUser();

        if (error || !user) {
            console.log("No active user session found. Redirecting...");
            window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
            return;
        }

        console.log("Authenticated user session confirmed:", user);

        // If session exists, stay on the current page or allow navigation
        // No redirect needed; the user can access the current page.
    } catch (err) {
        console.error("Error checking user session:", err.message);
        window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
    }
});