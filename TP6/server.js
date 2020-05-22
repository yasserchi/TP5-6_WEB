const {app} = require('./app')
const config = require('config');

const port = config.get('server.port')
const host = config.get('server.host')

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, host)