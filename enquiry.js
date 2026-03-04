// === Feast & Forever Enquiry Form ===

const API_URL = "https://feastandforever-api.vercel.app/api/enquiry";

// Make sure your <form> has id="enquiry-form"
const form = document.getElementById("enquiry-form");

async function sendEnquiry(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Try to read any error message returned by the API
  let payload = null;
  try {
    payload = await res.json();
  } catch (_) {}

  if (!res.ok) {
    const msg = payload?.message || "Failed";
    throw new Error(msg);
  }

  return payload;
}

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Pull values safely from the form
    const data = {
      name: form.querySelector('[name="name"]')?.value?.trim() || "",
      email: form.querySelector('[name="email"]')?.value?.trim() || "",
      eventDate: form.querySelector('[name="eventDate"]')?.value || "",
      message: form.querySelector('[name="message"]')?.value?.trim() || "",
      // Honeypot field (optional) - if you add it in HTML, bots fill it
      company: form.querySelector('[name="company"]')?.value?.trim() || "",
    };

    try {
      await sendEnquiry(data);
      alert("Thank you! We'll be in touch soon.");
      form.reset();
    } catch (err) {
      alert(err?.message || "Something went wrong. Please try again.");
    }
  });
} else {
  console.warn('Enquiry form not found. Add id="enquiry-form" to your <form>.');
}
