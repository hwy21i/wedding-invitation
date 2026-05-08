import QRCode from "qrcode";

export async function generateGuestQr(guest) {
  const payload = JSON.stringify({
    id: guest.id,
    name: guest.name,
    phone: guest.contact,
  });

  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: "H",
    margin: 1,
    width: 360,
    color: {
      dark: "#7a4d2c",
      light: "#fffdf9",
    },
  });
}
