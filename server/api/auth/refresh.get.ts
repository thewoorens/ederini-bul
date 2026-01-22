import { User } from "~~/server/models/User";
import { verifyRefreshToken, generateTokens } from "~~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  await connectDB();
  const refreshToken = getCookie(event, "refresh_token");

  if (!refreshToken)
    throw createError({
      statusCode: 401,
      statusMessage: "Oturum süresi dolmuş",
    });

  try {
    const decoded: any = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw createError({ statusCode: 403, statusMessage: "Geçersiz oturum" });
    }

    const tokens = generateTokens(user._id.toString());

    user.refreshToken = tokens.refreshToken;
    await user.save();

    setCookie(event, "refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    return { accessToken: tokens.accessToken };
  } catch (error) {
    throw createError({ statusCode: 403, statusMessage: "Geçersiz token" });
  }
});
