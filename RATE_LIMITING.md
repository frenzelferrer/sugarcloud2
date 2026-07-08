# Rate Limiting Documentation

## Overview

This document describes the rate limiting implementation for the Sugarcloud server. Rate limiting is a critical security feature that helps protect the application from DDoS attacks, brute-force attacks, and resource exhaustion.

## Implementation

The rate limiting system is built using the `express-rate-limit` middleware, which provides flexible and robust request throttling capabilities.

### Files

- **`server/rateLimiter.ts`**: Core rate limiting configuration and middleware definitions
- **`server/index.ts`**: Integration of rate limiting into the Express server

## Rate Limiting Tiers

### 1. Global Limiter

**Purpose**: Protects the entire application from overwhelming traffic

**Configuration**:
- **Window**: 15 minutes
- **Limit**: 100 requests per IP address
- **Response**: HTTP 429 (Too Many Requests)

**Applied to**: All routes except health checks

```typescript
globalLimiter // Applied globally to all requests
```

### 2. Strict Limiter

**Purpose**: Protects sensitive operations with stricter limits

**Configuration**:
- **Window**: 15 minutes
- **Limit**: 10 requests per IP address
- **Counts**: All requests (successful and failed)

**Use Cases**:
- Password reset endpoints
- Account deletion
- Payment processing
- Administrative operations

```typescript
app.post('/api/sensitive-operation', strictLimiter, handler);
```

### 3. Authentication Limiter

**Purpose**: Prevents brute-force attacks on login endpoints

**Configuration**:
- **Window**: 15 minutes
- **Limit**: 5 requests per IP address
- **Counts**: Only failed requests (successful requests bypass the counter)

**Applied to**: Login, registration, and password reset endpoints

```typescript
app.post('/api/auth/login', authLimiter, handler);
```

### 4. API Limiter

**Purpose**: Throttles general API endpoints for fair resource distribution

**Configuration**:
- **Window**: 1 minute
- **Limit**: 30 requests per IP address
- **Response**: HTTP 429 (Too Many Requests)

**Applied to**: General API endpoints

```typescript
app.get('/api/data', apiLimiter, handler);
```

### 5. Download Limiter

**Purpose**: Prevents abuse of download endpoints

**Configuration**:
- **Window**: 10 minutes
- **Limit**: 5 downloads per IP address

**Applied to**: File download endpoints

```typescript
app.get('/api/download/:fileId', downloadLimiter, handler);
```

## Usage Examples

### Apply Global Limiter (Automatic)

The global limiter is automatically applied to all routes:

```typescript
app.use(globalLimiter);
```

### Apply Specific Limiters to Routes

```typescript
import {
  strictLimiter,
  authLimiter,
  apiLimiter,
  downloadLimiter,
} from './rateLimiter.js';

// Authentication endpoint
app.post('/api/auth/login', authLimiter, (req, res) => {
  // Handle login
});

// Sensitive operation
app.post('/api/admin/delete-user', strictLimiter, (req, res) => {
  // Handle deletion
});

// API endpoint
app.get('/api/users', apiLimiter, (req, res) => {
  // Handle request
});

// Download endpoint
app.get('/api/files/download/:id', downloadLimiter, (req, res) => {
  // Handle download
});
```

### Create Custom Limiter

For endpoints with specific requirements:

```typescript
import { createCustomLimiter } from './rateLimiter.js';

// 20 requests per 5 minutes
const customLimiter = createCustomLimiter(
  5 * 60 * 1000,
  20,
  'Custom rate limit exceeded'
);

app.post('/api/custom-endpoint', customLimiter, (req, res) => {
  // Handle request
});
```

## Response Headers

When rate limiting is active, the server includes the following headers in responses:

```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1625097600
```

These headers inform clients about:
- **RateLimit-Limit**: Total requests allowed in the window
- **RateLimit-Remaining**: Requests remaining before hitting the limit
- **RateLimit-Reset**: Unix timestamp when the rate limit window resets

## Error Responses

When a client exceeds the rate limit, they receive:

```
HTTP 429 Too Many Requests

{
  "message": "Too many requests from this IP, please try again later."
}
```

## Configuration Options

### Adjusting Limits

To modify rate limits, edit `server/rateLimiter.ts`:

```typescript
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Change time window
  max: 100, // Change request limit
  message: 'Custom message', // Change error message
  // ... other options
});
```

### Disabling Rate Limiting for Specific IPs

To whitelist specific IP addresses:

```typescript
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skip: (req) => {
    // Skip rate limiting for internal IPs
    return req.ip === '127.0.0.1' || req.ip === '::1';
  },
});
```

### Using Redis for Distributed Rate Limiting

For production deployments with multiple server instances, use Redis store:

```typescript
import RedisStore from 'rate-limit-redis';
import redis from 'redis';

const client = redis.createClient();

export const globalLimiter = rateLimit({
  store: new RedisStore({
    client: client,
    prefix: 'rl:', // Rate limit prefix
  }),
  windowMs: 15 * 60 * 1000,
  max: 100,
});
```

Install Redis store:
```bash
pnpm add rate-limit-redis redis
```

## DDoS Protection Strategy

### Multi-Layer Approach

1. **Application Layer**: Express rate limiting (implemented)
2. **Network Layer**: Reverse proxy (nginx, CloudFlare)
3. **Infrastructure**: WAF (Web Application Firewall)
4. **Monitoring**: Request logging and anomaly detection

### Recommended Production Setup

```
Client → CloudFlare/WAF → Reverse Proxy (nginx) → Rate Limiter → Express App
```

### Monitoring

Monitor rate limit hits:

```typescript
app.use((req, res, next) => {
  res.on('finish', () => {
    if (res.statusCode === 429) {
      console.warn(`Rate limit hit for IP: ${req.ip}`);
      // Log to monitoring service
    }
  });
  next();
});
```

## Best Practices

### 1. **Layered Rate Limiting**
- Use global limits for baseline protection
- Apply stricter limits to sensitive endpoints
- Implement per-user limits for authenticated endpoints

### 2. **Graceful Degradation**
- Inform users about rate limits via response headers
- Provide clear error messages
- Suggest retry timing

### 3. **Monitoring and Alerts**
- Log rate limit violations
- Set up alerts for unusual patterns
- Track metrics over time

### 4. **Testing**
- Test rate limits in development
- Verify limits don't affect legitimate users
- Load test with realistic traffic patterns

### 5. **User Communication**
- Document rate limits in API documentation
- Provide clear error messages
- Suggest best practices for API usage

## Troubleshooting

### Rate Limits Too Strict

**Problem**: Legitimate users are being rate limited

**Solution**:
1. Increase `max` value in the limiter configuration
2. Increase `windowMs` to spread requests over longer period
3. Implement user-based limiting instead of IP-based

### Rate Limits Not Working

**Problem**: Rate limiting isn't preventing requests

**Solution**:
1. Verify middleware is applied before route handlers
2. Check that `express-rate-limit` is properly installed
3. Ensure server is restarted after configuration changes
4. Check for reverse proxy headers (X-Forwarded-For)

### Redis Store Connection Issues

**Problem**: Redis store not connecting

**Solution**:
1. Verify Redis server is running
2. Check connection string
3. Verify network connectivity
4. Check Redis authentication credentials

## Performance Considerations

- **Memory**: Rate limiting stores request counts in memory (or Redis)
- **CPU**: Minimal overhead per request
- **Latency**: <1ms added per request for rate limit check

### Memory Usage

Approximate memory usage per 1000 unique IPs:
- **In-memory store**: ~50KB
- **Redis store**: ~10KB (distributed)

## Security Considerations

### IP Spoofing

If behind a reverse proxy, ensure proper header handling:

```typescript
app.set('trust proxy', 1); // Trust first proxy
```

### Distributed Attacks

For protection against distributed attacks across many IPs:
1. Use WAF rules
2. Implement behavioral analysis
3. Use CDN protection services

## Future Enhancements

- [ ] User-based rate limiting (authenticated users)
- [ ] Dynamic rate limiting based on server load
- [ ] Machine learning-based anomaly detection
- [ ] Geographic-based rate limiting
- [ ] Adaptive rate limiting based on request patterns

## References

- [express-rate-limit Documentation](https://github.com/nfriedly/express-rate-limit)
- [OWASP: Rate Limiting](https://owasp.org/www-community/attacks/Denial_of_Service)
- [HTTP 429 Status Code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429)
