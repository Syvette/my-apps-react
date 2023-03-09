const { createServer } = require("@mocks-server/main");
const { routes, collections } = require("./fixture");

const server = createServer({
  server: {
    port: 3001,
  },
});

server.start().then(async () => {
  const { loadRoutes, loadCollections } = server.mock.createLoaders();
  loadRoutes(routes);
  loadCollections(collections);

  server.mock.collections.select("universe");
});
