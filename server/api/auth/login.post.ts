import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "~~/server/models/User";
import { generateTokens } from "~~/server/utils/jwt";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  await connectDB();
  const body = await readBody(event);

  const result = loginSchema.safeParse(body);
  if (!result.success)
    throw createError({ statusCode: 400, statusMessage: "Invalid data" });

  const user = await User.findOne({ email: result.data.email });
  if (!user)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });

  if (!user.isVerified)
    throw createError({
      statusCode: 403,
      statusMessage: "Email not verified",
    });

  const isMatch = await bcrypt.compare(result.data.password, user.password);
  if (!isMatch)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });

  const { accessToken, refreshToken } = generateTokens(user._id.toString());

  user.refreshToken = refreshToken;
  await user.save();

  setCookie(event, "refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
  });

  return { accessToken, user: { email: user.email, name: user.name } };
});
