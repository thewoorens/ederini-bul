import { baseTemplate } from "./base";

export const welcomeTemplate = (name: string) =>
  baseTemplate({
    title: "Hoş Geldin 🎉",
    content: `
      <p>Merhaba <strong>${name}</strong>,</p>
      <p>Ederini Bul ailesine hoş geldin.</p>
      <p>Platformumuzu kullanmaya hemen başlayabilirsin.</p>
    `,
  });
