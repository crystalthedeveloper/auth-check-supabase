// Check for user session
document.addEventListener("DOMContentLoaded", async () => {
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9zZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

    // Initialize Supabase client
    const supabaseClient = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    try {
        console.log("Checking for an active session...");

        // Force refresh the session (optional but improves reliability)
        const { data: refreshData, error: refreshError } = await supabaseClient.auth.refreshSession();
        if (refreshError) console.warn("Session refresh failed:", refreshError.message);

        // Check if user session exists
        const {
            data: { user },
            error,
        } = await supabaseClient.auth.getUser();

        if (error || !user) {
            console.warn("No active session. Redirecting to login...");
            window.location.href = "https://www.crystalthedeveloper.ca/user-pages/login";
            return;
        }

        console.log("Active session found:", user);

        // If user is authenticated, allow access to the protected page
        if (window.location.pathname === "/user-pages/login") {
            window.location.href = "https://www.crystalthedeveloper.ca/crystalscrypt";
        }
    } catch (err) {
        console.error("Error while checking session:", err.message);
        window.location.href = "https://www.crystalthedeveloper.ca/user-pages/login";
    }
});

// Listen to Auth State Changes (for real-time updates)
supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth state change detected:", event, session);

    if (session) {
        window.location.href = "https://www.crystalthedeveloper.ca/crystalscrypt";
    }
});