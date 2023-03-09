const common = require("./mocks/routes/common");
const users = require("./mocks/routes/users");
const tasks = require("./mocks/routes/tasks");

const routes = [...common, ...users, ...tasks];

const collections = require("./mocks/collections.json");

module.exports = {
  routes,
  collections,
};

// FRONTEND; ====================================
// import NAME from './fpath'
// import { getUser } from './fpath'
// import Name, { getUser } from './fpath'
// import { getUser, setUser } from './fpath'

// export { getuser };
// export default Name;
// export default Name; expor { getUser }
// ==============================================

// const name = require('./fpath')

// module.export = {}
