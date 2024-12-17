// Fetch the authenticated user name
document.addEventListener("DOMContentLoaded", async () => {
  const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9zZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

  const supabase = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    console.log("Checking user session...");

    // Fetch current session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session) {
      console.warn("No active session found.");
      updateUserInfo("Welcome");
      return;
    }

    const user = sessionData.session.user;

    console.log("User session found:", user);

    // Retrieve the user's first_name from user metadata
    const firstName = user.user_metadata?.first_name?.trim() || "Welcome";
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