import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message:
    "We have detected too many requests from your IP address. Please try again later.",
});

export default rateLimiter;
