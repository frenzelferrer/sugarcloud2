import rateLimit from 'express-rate-limit';

/**
 * Global rate limiter for all requests
 * Limits: 100 requests per 15 minutes per IP
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for health check endpoints
    return req.path === '/health';
  },
});

/**
 * Strict rate limiter for sensitive endpoints
 * Limits: 10 requests per 15 minutes per IP
 */
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests to this endpoint, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Count all requests
});

/**
 * Authentication rate limiter
 * Limits: 5 failed attempts per 15 minutes per IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Only count failed requests
});

/**
 * API endpoint rate limiter
 * Limits: 30 requests per minute per IP
 */
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 requests per minute
  message: 'Too many API requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Download rate limiter
 * Limits: 5 downloads per 10 minutes per IP
 */
export const downloadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 downloads per windowMs
  message: 'Too many downloads, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Create a custom rate limiter with specific parameters
 * @param windowMs - Time window in milliseconds
 * @param max - Maximum requests per window
 * @param message - Custom error message
 * @returns Configured rate limiter middleware
 */
export const createCustomLimiter = (
  windowMs: number,
  max: number,
  message: string = 'Too many requests, please try again later.'
) => {
  return rateLimit({
    windowMs,
    max,
    message,
    standardHeaders: true,
    legacyHeaders: false,
  });
};
