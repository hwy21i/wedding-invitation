export function generateInvitationId(lastInvitationId = "") {
  const lastNumber = Number.parseInt(String(lastInvitationId).split("-")[1] || "0", 10);
  const nextNumber = lastNumber + 1;
  return `LM-${String(nextNumber).padStart(4, "0")}`;
}
