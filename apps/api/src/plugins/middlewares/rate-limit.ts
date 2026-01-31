import rateLimit, { FastifyRateLimitOptions } from '@fastify/rate-limit';

export const autoConfig: FastifyRateLimitOptions = {
  global: true, // Apply rate limit globally
  max: 1000, // Requests per window
  timeWindow: '1 minute',
  ban: 3, // Maximum number of 429 responses before banning client
  keyGenerator: (req) => {
    // User IP and authentication token
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const token = req.headers.authorization
      ? (req.headers.authorization as string).replace('Bearer ', '')
      : 'no-token';
    return `${ip}-${token}`;
  },
  errorResponseBuilder: function (_, context) {
    if (context.statusCode === 403) {
      return {
        statusCode: 403,
        error: 'Forbidden',
        message: 'You have been banned for exceeding the rate limit.',
        date: Date.now(),
      };
    }

    return {
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'You have exceeded the rate limit.',
      date: Date.now(),
    };
  },
};

export default rateLimit;
