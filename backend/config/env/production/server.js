// Path: ./config/env/production/server.js`

module.exports = ({ env }) => ({
  url: env('https://avion-production.up.railway.app/'),
});

