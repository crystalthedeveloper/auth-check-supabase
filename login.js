
// Login
document.addEventListener("DOMContentLoaded", async () => {
    // Ensure a single Supabase client instance
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";
    const supabase = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    try {
        // Fetch the authenticated user
        const { data: session, error } = await supabase.auth.getSession();
    
        if (error || !session) {
          console.error("No active session found:", error?.message);
          window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
          return;
        }
    
        console.log("Authenticated user:", session.user);
    
        // Update user info
        const userElement = document.querySelector("#user-info");
        if (userElement) {
          userElement.textContent = `Welcome, ${session.user.email}`;
        } else {
          console.error("Element with ID '#user-info' not found.");
        }
      } catch (err) {
        console.error("Error fetching user session:", err.message);
        window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
      }
    });