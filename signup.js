// Signup
document.addEventListener("DOMContentLoaded", async () => {
    // Ensure a single Supabase client instance
    const SUPABASE_URL = "https://pkaeqqqxhkgosfppzmmt.supabase.co";
    const SUPABASE_KEY =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYWVxcXF4aGtnb3NmcHB6bW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzEyMjgsImV4cCI6MjA0OTg0NzIyOH0.dpxd-Y6Zvfu_1tcfELPNV7acq6X9tWMd8paNK28ncsc";
    const supabase = window.supabase || supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    const signupForm = document.querySelector("#signup-form");

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.querySelector("#signup-email").value.trim();
        const password = document.querySelector("#signup-password").value.trim();
        const firstName = document.querySelector("#signup-first-name").value.trim();
        const agreePolicy = document.querySelector("#agree-policy").checked;
        const agreeMarketing = document.querySelector("#agree-marketing").checked;

        // Check for required policy agreement
        if (!agreePolicy) {
            alert("You must agree to the privacy policy and terms of service.");
            return;
        }

        try {
            // Add first name and marketing consent to metadata
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        marketing_consent: agreeMarketing,
                    },
                },
            });

            if (error) throw error;

            alert("Signup successful! Check your email to verify your account.");
            window.location.href = "https://www.crystalthedeveloper.ca/user-pages/login";
        } catch (err) {
            console.error("Signup error:", err.message);
            alert(`Signup failed: ${err.message}`);
        }
    });
});