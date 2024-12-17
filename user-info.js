// Fetch the authenticated user name
document.addEventListener("DOMContentLoaded", async () => {
  // Supabase configuration
  const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";

  const supabase = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  try {
    console.log("Checking user session...");

    // Get the currently logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.warn("No active session or error fetching user:", userError?.message);
      updateUserInfo("Welcome");
      return;
    }

    console.log("User session found:", user);

    // Fetch the user's first name from the "profiles" table
    const { data: profileData, error: profileError } = await supabase
      .from("profiles") // Replace with your table name
      .select("first_name")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.warn("Error fetching user details:", profileError.message);
      updateUserInfo("Welcome");
      return;
    }

    const firstName = profileData?.first_name?.trim() || "Welcome";
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