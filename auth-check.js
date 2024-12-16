const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

// Initialize Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to check if a user is authenticated
async function checkUserAuthentication() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      console.log("No active session. Redirecting to access denied.");
      window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
    } else {
      console.log("Authenticated user:", data.session.user);
    }
  } catch (err) {
    console.error("Error during session check:", err.message);
    window.location.href = "https://www.crystalthedeveloper.ca/user-pages/access-denied";
  }
}

document.addEventListener("DOMContentLoaded", checkUserAuthentication);