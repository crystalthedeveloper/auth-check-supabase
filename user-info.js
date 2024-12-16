
// Fetch the authenticated user name
document.addEventListener("DOMContentLoaded", async () => {
    // Ensure a single Supabase client instance
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";
    const supabase = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // Fetch the authenticated user
  const { data: { user }, error } = await supabase.auth.getUser();

  const userInfoElement = document.getElementById("user-info");

  if (error || !user) {
    userInfoElement.textContent = "Not logged in.";
  } else {
    userInfoElement.textContent = `Welcome, ${user.email || 'User'}!`;
  }
});