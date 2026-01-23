import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "~~/server/models/User";
import { sendMail } from "~~/server/utils/mail/sendMail";
import { emailVerificationTemplate } from "~~/server/utils/mail/templates/emailVerification";

const allowedEmailDomains = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
  "yandex.com",
  "mynet.com",
  "turk.net",
  "windowslive.com",
  "live.com",
  "microsoft.com",
  "apple.com",
  "google.com",
  "ttnet.net.tr",
  "superonline.com",
  "turkcell.com.tr",
  "vodafone.com.tr",
  "turk.net",
];

const tempEmailDomains = [
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "throwaway.email",
  "temp-mail.org",
  "fakeinbox.com",
  "trashmail.com",
  "getnada.com",
  "maildrop.cc",
  "sharklasers.com",
  "guerrillamail.info",
  "grr.la",
  "yopmail.com",
  "mohmal.com",
  "mintemail.com",
  "emailondeck.com",
  "spamgourmet.com",
  "dispostable.com",
  "tempr.email",
];

const registerSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string({
      required_error: "Password confirmation is required",
      invalid_type_error: "Password confirmation must be a string",
    })
    .min(8, "Password confirmation must be at least 8 characters"),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, "Name must be at least 2 characters"),
  surname: z
    .string({
      required_error: "Surname is required",
      invalid_type_error: "Surname must be a string",
    })
    .min(2, "Surname must be at least 2 characters"),
});

function validateEmailDomain(email: string): {
  isValid: boolean;
  message?: string;
} {
  const domain = email.split("@")[1]?.toLowerCase();

  if (!domain) {
    return { isValid: false, message: "Invalid email format" };
  }

  if (tempEmailDomains.includes(domain)) {
    return {
      isValid: false,
      message: "Temporary email address not allowed",
    };
  }

  if (!allowedEmailDomains.includes(domain)) {
    return {
      isValid: false,
      message: "Email provider not supported",
    };
  }

  return { isValid: true };
}

export default defineEventHandler(async (event) => {
  await connectDB();
  const body = await readBody(event);

  const result = registerSchema.safeParse(body);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    const firstErrorKey = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorKey]?.[0] || "Invalid data";
    
    throw createError({
      statusCode: 400,
      statusMessage: firstErrorMessage,
    });
  }

  const { email, password, confirmPassword, name, surname } = result.data;

  if (password !== confirmPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: "Passwords do not match",
    });
  }

  const emailValidation = validateEmailDomain(email);
  if (!emailValidation.isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: emailValidation.message,
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "Email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    surname,
    verificationToken,
  });

  const verifyUrl = `${process.env.CLIENT_URL}/api/auth/verify?token=${verificationToken}`;

  try {
    await sendMail({
      to: email,
      subject: "E-posta Doğrulama - Ederini Bul",
      html: emailVerificationTemplate(verifyUrl),
    });
  } catch (error) {
    await User.deleteOne({ _id: newUser._id });
    throw createError({
      statusCode: 500,
      statusMessage: "Email could not be sent",
    });
  }

  return {
    success: true,
  };
});
