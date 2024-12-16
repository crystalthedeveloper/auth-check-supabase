
// Fetch the authenticated user name
document.addEventListener("DOMContentLoaded", async () => {
  // Ensure a single Supabase client instance
  const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";
  const supabase = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    // Fetch the current session
    const { data, error } = await supabase.auth.getSession();

    // Default to "Welcome" if no active session
    if (error || !data.session) {
      console.warn("No active session found.");
      updateUserInfo("Welcome");
      return;
    }

    const user = data.session.user;

    // Retrieve the user's metadata (e.g., first name) if stored
    const { data: userData, error: userError } = await supabase
      .from("profiles") // Replace "profiles" with your actual table name
      .select("first_name")
      .eq("id", user.id)
      .single();

    if (userError) {
      console.warn("Error fetching user details:", userError.message);
      updateUserInfo("Welcome");
      return;
    }

    const firstName = userData?.first_name?.trim() || "Welcome";
    updateUserInfo(firstName);
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