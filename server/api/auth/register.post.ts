import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "~~/server/models/User";
import { sendEmail } from "~~/server/utils/mail";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  surname: z.string().min(2),
});

export default defineEventHandler(async (event) => {
  await connectDB();
  const body = await readBody(event);

  const result = registerSchema.safeParse(body);
  if (!result.success)
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid data",
    });

  const { email, password, name, surname } = result.data;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw createError({
      statusCode: 409,
      statusMessage: "User already exists",
    });

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
  await sendEmail(
    email,
    "Email Doğrulama",
    `Hesabınızı doğrulamak için tıklayın: <a href="${verifyUrl}">Doğrula</a>`,
  );

  return { message: "User created" };
});
