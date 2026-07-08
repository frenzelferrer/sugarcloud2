/**
 * Example Routes with Rate Limiting
 * 
 * This file demonstrates how to apply rate limiting to different types of endpoints.
 * Copy and adapt these examples for your actual API routes.
 */

import express from 'express';
import {
  globalLimiter,
  strictLimiter,
  authLimiter,
  apiLimiter,
  downloadLimiter,
  createCustomLimiter,
} from './rateLimiter.js';

const router = express.Router();

// ============================================================================
// AUTHENTICATION ENDPOINTS - Use authLimiter
// ============================================================================

/**
 * Login endpoint with authentication rate limiting
 * Prevents brute-force attacks
 */
router.post('/auth/login', authLimiter, (req, res) => {
  // Handle login
  res.json({ message: 'Login successful' });
});

/**
 * Registration endpoint with authentication rate limiting
 */
router.post('/auth/register', authLimiter, (req, res) => {
  // Handle registration
  res.json({ message: 'Registration successful' });
});

/**
 * Password reset endpoint with authentication rate limiting
 */
router.post('/auth/forgot-password', authLimiter, (req, res) => {
  // Handle password reset request
  res.json({ message: 'Password reset email sent' });
});

// ============================================================================
// SENSITIVE OPERATIONS - Use strictLimiter
// ============================================================================

/**
 * Delete user account - Very sensitive operation
 */
router.delete('/admin/users/:id', strictLimiter, (req, res) => {
  // Handle user deletion
  res.json({ message: 'User deleted' });
});

/**
 * Update payment method - Sensitive financial operation
 */
router.post('/api/payment/update-method', strictLimiter, (req, res) => {
  // Handle payment method update
  res.json({ message: 'Payment method updated' });
});

/**
 * Process payment - Sensitive financial operation
 */
router.post('/api/payment/process', strictLimiter, (req, res) => {
  // Handle payment processing
  res.json({ message: 'Payment processed' });
});

/**
 * Change email address - Sensitive account operation
 */
router.post('/api/account/change-email', strictLimiter, (req, res) => {
  // Handle email change
  res.json({ message: 'Email change requested' });
});

// ============================================================================
// GENERAL API ENDPOINTS - Use apiLimiter
// ============================================================================

/**
 * Get user list - General API endpoint
 */
router.get('/api/users', apiLimiter, (req, res) => {
  // Fetch and return users
  res.json({ users: [] });
});

/**
 * Get user details - General API endpoint
 */
router.get('/api/users/:id', apiLimiter, (req, res) => {
  // Fetch and return user
  res.json({ user: {} });
});

/**
 * Create new item - General API endpoint
 */
router.post('/api/items', apiLimiter, (req, res) => {
  // Create new item
  res.json({ message: 'Item created', id: 1 });
});

/**
 * Update item - General API endpoint
 */
router.put('/api/items/:id', apiLimiter, (req, res) => {
  // Update item
  res.json({ message: 'Item updated' });
});

/**
 * Delete item - General API endpoint
 */
router.delete('/api/items/:id', apiLimiter, (req, res) => {
  // Delete item
  res.json({ message: 'Item deleted' });
});

// ============================================================================
// DOWNLOAD ENDPOINTS - Use downloadLimiter
// ============================================================================

/**
 * Download file - Limited to prevent abuse
 */
router.get('/api/files/download/:id', downloadLimiter, (req, res) => {
  // Stream file download
  res.json({ message: 'File download initiated' });
});

/**
 * Export data - Limited to prevent resource exhaustion
 */
router.get('/api/export/data', downloadLimiter, (req, res) => {
  // Generate and send export
  res.json({ message: 'Export generated' });
});

/**
 * Download report - Limited to prevent abuse
 */
router.get('/api/reports/download/:id', downloadLimiter, (req, res) => {
  // Generate and send report
  res.json({ message: 'Report download initiated' });
});

// ============================================================================
// CUSTOM RATE LIMITING - Use createCustomLimiter
// ============================================================================

/**
 * Search endpoint with custom rate limiting
 * More lenient than API limiter: 50 requests per minute
 */
const searchLimiter = createCustomLimiter(
  1 * 60 * 1000, // 1 minute
  50, // 50 requests
  'Search rate limit exceeded. Please try again later.'
);

router.get('/api/search', searchLimiter, (req, res) => {
  // Handle search
  res.json({ results: [] });
});

/**
 * Public API endpoint with very lenient rate limiting
 * 200 requests per 15 minutes
 */
const publicApiLimiter = createCustomLimiter(
  15 * 60 * 1000, // 15 minutes
  200, // 200 requests
  'Public API rate limit exceeded.'
);

router.get('/api/public/data', publicApiLimiter, (req, res) => {
  // Handle public data request
  res.json({ data: [] });
});

/**
 * WebSocket upgrade endpoint with custom rate limiting
 * 10 connections per minute per IP
 */
const wsLimiter = createCustomLimiter(
  1 * 60 * 1000, // 1 minute
  10, // 10 connections
  'WebSocket connection limit exceeded.'
);

router.get('/api/ws', wsLimiter, (req, res) => {
  // Handle WebSocket upgrade
  res.json({ message: 'WebSocket connection established' });
});

// ============================================================================
// HEALTH CHECK - No rate limiting
// ============================================================================

/**
 * Health check endpoint - Not rate limited
 * Used by load balancers and monitoring services
 */
router.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// ============================================================================
// ERROR HANDLING FOR RATE LIMITS
// ============================================================================

/**
 * Global error handler for rate limit errors
 */
router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.status === 429) {
    // Rate limit exceeded
    res.status(429).json({
      error: 'Too many requests',
      message: err.message,
      retryAfter: res.getHeader('Retry-After'),
    });
  } else {
    next(err);
  }
});

export default router;

// ============================================================================
// USAGE IN MAIN SERVER FILE
// ============================================================================

/**
 * In your main server file (index.ts), import and use these routes:
 * 
 * import exampleRoutes from './exampleRoutes.js';
 * 
 * const app = express();
 * app.use(globalLimiter); // Apply global rate limiter
 * app.use(exampleRoutes); // Use example routes
 */
