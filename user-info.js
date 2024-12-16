
// Fetch the authenticated user name
document.addEventListener("DOMContentLoaded", async () => {
  // Ensure a single Supabase client instance
  const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";
  const supabase = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      console.error("No active session found. Redirecting...");
      window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
      return;
    }

    const user = data.session.user;

    const userElement = document.querySelector("#user-info");
    if (userElement) {
      userElement.textContent = `Welcome, ${user.email}`;
    }
  } catch (err) {
    console.error("Error fetching user session:", err.message);
    window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
  }
});