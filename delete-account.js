// Delete Account
document.addEventListener("DOMContentLoaded", () => {
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
        const response = await fetch(
          "https://user-auth-supabase.vercel.app/api/delete-account",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.error || "Failed to delete account");
        }
  
        alert("Account deleted successfully!");
        window.location.href = "https://www.crystalthedeveloper.ca";
      } catch (err) {
        console.error("Delete account error:", err.message);
        alert(`Error: ${err.message}`);
      }
    });
  });