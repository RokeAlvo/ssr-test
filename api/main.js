// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-cors'), {
  // put your options here
})

// Declare a route
fastify.get('/components', function (request, reply) {
  reply.send({ data: [
      { name: 'Logo', settings: [] },
      { name: 'Text', settings: { text: 'async text from settings' } }
    ] })
})
fastify.get('/api', function (request, reply) {
  reply.send({ data: 'data from api' })
})

// Run the server!
fastify.listen(5000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
