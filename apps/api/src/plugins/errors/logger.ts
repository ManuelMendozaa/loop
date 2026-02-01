import { FastifyRequest } from 'fastify';

export function logError(request: FastifyRequest, error: Error) {
  const date = new Date().toISOString();
  const body = request?.body;

  console.log('\n------------------------------------------------------------');
  console.log('Uncaught RES error');
  console.log('------------------------------------------------------------');
  console.log('Message:', error?.message);
  console.log('Date:', date);
  console.log('Stack:', error?.stack);
  console.log('------------------------------------------------------------');
  console.log('Request Body:', body);
  console.log('Request Query:', request?.query);
  console.log('Headers:', request?.headers);
  console.log('------------------------------------------------------------\n');
}
