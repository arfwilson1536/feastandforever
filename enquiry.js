const API_URL = "https://feastandforever-api.vercel.app/api/enquiry";

const form = document.getElementById("enquiry-form");

async function sendEnquiry(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to send enquiry");
  }

  return res.json();
}

form.addEventListener("submit", async function (e) {
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
    alert("Something went wrong. Please try again.");
  }
});
