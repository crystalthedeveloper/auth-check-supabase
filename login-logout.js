// login & logout button 
document.addEventListener("DOMContentLoaded", async () => {
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

    const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const toggleBtn = document.querySelector("#auth-toggle-btn");

    // Check user status and update button
    async function updateAuthButton() {
        const { data: { user } } = await supabaseClient.auth.getUser();

        if (user) {
            // User is logged in
            toggleBtn.textContent = "Logout";
            toggleBtn.dataset.authAction = "logout";
        } else {
            // User is logged out
            toggleBtn.textContent = "Login";
            toggleBtn.dataset.authAction = "login";
        }
    }

    await updateAuthButton(); // Set initial button state

    // Toggle Button Handler
    toggleBtn.addEventListener("click", async () => {
        const authAction = toggleBtn.dataset.authAction;

        if (authAction === "logout") {
            // Logout user
            try {
                const { error } = await supabaseClient.auth.signOut();
                if (error) throw error;

                alert("Logged out successfully!");
                window.location.href = "https://www.crystalthedeveloper.ca/";
            } catch (error) {
                alert(`Logout failed: ${error.message}`);
            }
        } else if (authAction === "login") {
            // Redirect to login page
            window.location.href = "https://www.crystalthedeveloper.ca/user-pages/login";
        }
    });
});