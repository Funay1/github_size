'use strict';

require('dotenv').config({ silent: true });

const server = require('./server');

server.listen(process.env.PORT, () => console.log('Server running! Port', process.env.PORT));