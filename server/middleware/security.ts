import { H3Event } from "h3";

const rateLimitMap = new Map();

export default defineEventHandler((event) => {
  setResponseHeader(event, "X-XSS-Protection", "1; mode=block");
  setResponseHeader(event, "X-Frame-Options", "DENY");
  setResponseHeader(event, "X-Content-Type-Options", "nosniff");

  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  const now = Date.now();
  const windowStart = now - 60000;

  const requestLog = rateLimitMap.get(ip) || [];
  const recentRequests = requestLog.filter(
    (time: number) => time > windowStart,
  );

  if (recentRequests.length >= 60) {
    throw createError({ statusCode: 429, statusMessage: "Too Many Requests" });
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
});
