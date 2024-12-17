// Check for user session
document.addEventListener("DOMContentLoaded", async () => {
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9zZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

    const supabaseClient = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    console.log("Checking active user session...");

    try {
        // Fetch the current user
        const { data: { user }, error } = await supabaseClient.auth.getUser();

        if (error || !user) {
            console.log("No active session. Redirecting...");
            window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
            return;
        }

        console.log("User authenticated:", user);

        // Allow access or redirect to the protected page
        window.location.href = "https://www.crystalthedeveloper.ca/crystalscrypt";
    } catch (err) {
        console.error("Error checking user session:", err.message);
        window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
    }
});