const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://wedding-invitation-ux43.onrender.com/api";

export async function submitRsvp(payload) {
  const response = await fetch(`${API_BASE_URL}/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : { message: await response.text() };

  if (!response.ok) {
    throw new Error(data.errors?.join(" ") || data.message || "Unable to submit RSVP.");
  }

  return data;
}

export { API_BASE_URL };
