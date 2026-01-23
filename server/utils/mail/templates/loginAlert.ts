import { baseTemplate } from "./base";

export const loginAlertTemplate = (ip: string, device: string) =>
  baseTemplate({
    title: "Yeni Giriş Tespit Edildi",
    content: `
      <p>Hesabına yeni bir giriş yapıldı.</p>

      <ul>
        <li><strong>IP:</strong> ${ip}</li>
        <li><strong>Cihaz:</strong> ${device}</li>
      </ul>

      <p>Eğer bu sen değilsen lütfen hemen şifreni değiştir.</p>
    `,
  });
