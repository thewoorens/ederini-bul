import { User } from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  await connectDB();
  const { token } = getQuery(event);

  if (!token)
    throw createError({ statusCode: 400, statusMessage: "Token bulunamadı" });

  const user = await User.findOne({ verificationToken: token as string });
  if (!user)
    throw createError({
      statusCode: 400,
      statusMessage: "Geçersiz veya süresi dolmuş token",
    });

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  return sendRedirect(event, "/login?verified=true", 302);
});
