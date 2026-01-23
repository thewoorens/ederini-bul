import { baseTemplate } from "./base";

export const emailVerificationTemplate = (verifyUrl: string) =>
  baseTemplate({
    title: "Email Adresini Doğrula",
    content: `
      <p>Email adresini doğrulamak için aşağıdaki butona tıkla:</p>

      <a href="${verifyUrl}" class="btn">
        Email Doğrula
      </a>

      <p>Eğer bu işlemi sen yapmadıysan bu maili görmezden gelebilirsin.</p>
    `,
  });
