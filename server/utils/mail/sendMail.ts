import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

type SendMailParams = {
  to: string;
  subject: string;
  html: string;
};

export const sendMail = async ({ to, subject, html }: SendMailParams) => {
  await transporter.sendMail({
    from: `"Ederini Bul | BETA" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};
