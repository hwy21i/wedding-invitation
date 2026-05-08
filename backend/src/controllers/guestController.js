import { env } from "../config/env.js";
import { readCollection, writeCollection } from "../utils/fileDb.js";
import { generateInvitationId } from "../utils/idGenerator.js";
import { generateGuestQr } from "../utils/qr.js";

function validateGuest(payload) {
  const errors = [];

  if (!payload.name || payload.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long.");
  }

  const phone = payload.contact?.trim() || "";
  if (!phone || phone.length < 7) {
    errors.push("Phone number is required.");
  }

  if (!/^[+\d\s-]+$/.test(phone)) {
    errors.push("Phone number format is invalid.");
  }

  return errors;
}

export async function createRsvp(req, res) {
  try {
    const payload = req.body ?? {};
    const errors = validateGuest(payload);

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed.", errors });
    }

    const guests = await readCollection(env.dataFile);
    const latestGuest = guests.at(-1);
    const invitationId = generateInvitationId(latestGuest?.id);
    const draftGuest = {
      id: invitationId,
      name: payload.name.trim(),
      contact: payload.contact.trim(),
    };

    const qrCode = await generateGuestQr(draftGuest);
    const savedGuest = {
      id: invitationId,
      name: draftGuest.name,
      contact: draftGuest.contact,
      qrCode,
      createdAt: new Date().toISOString(),
    };

    guests.push(savedGuest);
    await writeCollection(env.dataFile, guests);

    return res.status(201).json({
      message: "RSVP received successfully.",
      guest: savedGuest,
      confirmation: `A confirmation message would be sent to ${savedGuest.contact}.`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to save RSVP right now." });
  }
}

export async function listGuests(_req, res) {
  try {
    const guests = await readCollection(env.dataFile);
    const sortedGuests = [...guests].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return res.json({
      count: sortedGuests.length,
      guests: sortedGuests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Unable to retrieve guests right now." });
  }
}
