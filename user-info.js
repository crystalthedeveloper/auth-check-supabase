// Fetch the authenticated user name
document.addEventListener("DOMContentLoaded", async () => {
  // Ensure Supabase is initialized before accessing it
  const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

  // Initialize Supabase client here
  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    console.log("Checking user session...");

    // Fetch the currently logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.warn("No active session or error fetching user:", userError?.message);
      updateUserInfo("Welcome");
      return;
    }

    console.log("User session found:", user);

    // Retrieve the first_name from user metadata
    const firstName = user.user_metadata?.first_name || "User";
    updateUserInfo(`Welcome, ${firstName}!`);
  } catch (err) {
    console.error("Error fetching user session:", err.message);
    updateUserInfo("Welcome");
  }

  // Function to update the #user-info element
  function updateUserInfo(message) {
    const userElement = document.querySelector("#user-info");
    if (userElement) {
      userElement.textContent = message;
    } else {
      console.warn("Element with ID '#user-info' not found.");
    }
  }
});