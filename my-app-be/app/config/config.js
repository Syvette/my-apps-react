module.exports = {
  HOST: process.env.HOST || 'localhost',
  USER: process.env.DBUSER || '',
  PASSWORD: process.env.DBPASSWORD || '',
  DB: process.env.DB || 'my-app-be',
  dialect: process.env.DIALECT || 'mariadb',
  pool: {
    max: parseInt(process.env.MAX, 10) || 10,
    min: parseInt(process.env.MIN, 10) || 1,
    acquire: parseInt(process.env.ACQUIRE, 10) || 30000,
    idle: parseInt(process.env.IDLE, 10) || 10000,
  },
};
