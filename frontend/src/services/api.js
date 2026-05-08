const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function submitRsvp(payload) {
  const response = await fetch(`${API_BASE_URL}/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.join(" ") || data.message || "Unable to submit RSVP.");
  }

  return data;
}

export { API_BASE_URL };
