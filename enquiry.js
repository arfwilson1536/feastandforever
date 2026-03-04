const API_URL = "https://feastandforever-api.vercel.app/api/enquiry";

async function sendEnquiry(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed");
  return res.json();
}
