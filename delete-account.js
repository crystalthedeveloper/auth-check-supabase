// Delete Account
document.addEventListener("DOMContentLoaded", () => {
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";
  
    // Initialize Supabase client
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  
    const deleteForm = document.querySelector("#delete-account-form");
  
    deleteForm?.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const email = document.querySelector("#delete-account-email")?.value.trim();
  
      if (!email) {
        alert("Please enter your email.");
        return;
      }
  
      const confirmation = confirm(
        "Are you sure you want to delete your account? This action cannot be undone!"
      );
      if (!confirmation) return;
  
      try {
        console.log("Deleting account for:", email);
  
        // Get the current session to authenticate the user
        const {
          data: { session },
          error: sessionError,
        } = await supabaseClient.auth.getSession();
  
        if (sessionError || !session) {
          alert("You need to be logged in to delete your account.");
          throw new Error("No active session.");
        }
  
        // Call Supabase to delete the user's account
        const { error } = await supabaseClient.auth.signOut();
  
        if (error) throw error;
  
        alert("Account deleted successfully.");
        window.location.href = "https://www.crystalthedeveloper.ca/user-pages/login";
      } catch (err) {
        console.error("Error deleting account:", err.message);
        alert(`Error: ${err.message}`);
      }
    });
  });