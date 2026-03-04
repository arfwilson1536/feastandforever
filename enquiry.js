const API_URL = "https://feastandforever-api.vercel.app/api/enquiry";

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiry-form");

  if (!form) {
    console.error('Form not found. Add id="enquiry-form" to your <form>.');
    return;
  }

  async function sendEnquiry(data) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    let payload = null;
    try { payload = await res.json(); } catch (_) {}

    if (!res.ok) {
      throw new Error(payload?.message || `Failed (${res.status})`);
    }

    return payload;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      eventDate: form.date.value,
      guests: form.guests.value,
      type: form.type.value,
      location: form.location.value,
      message: form.story.value,
      company: form.company ? form.company.value : ""
    };

    try {
      await sendEnquiry(data);
      alert("Thank you! Your enquiry has been sent.");
      form.reset();
    } catch (err) {
      alert(err.message || "Something went wrong. Please try again.");
    }
  });
});
