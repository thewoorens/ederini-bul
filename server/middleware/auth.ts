import { verifyAccessToken } from "../utils/jwt";

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/user")) return;

  const authHeader = getRequestHeader(event, "Authorization");
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: "Yetkilendirme tokenı yok",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    event.context.auth = decoded;
  } catch (err) {
    throw createError({
      statusCode: 403,
      statusMessage: "Geçersiz veya süresi dolmuş token",
    });
  }
});
