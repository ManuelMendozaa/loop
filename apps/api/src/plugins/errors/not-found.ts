import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance) => {
  fastify.setNotFoundHandler(
    {
      preHandler: fastify.rateLimit({
        max: 10,
        timeWindow: '1 minute',
        ban: 2,
      }),
    },
    function (_, reply) {
      reply
        .code(404)
        .send({ message: 'The requested url was not found on our server' });
    }
  );
};
