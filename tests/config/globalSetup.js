require('@babel/register');

const server = require('../../index');

module.exports = async () => {
    global.httpServer = server;
    await global.httpServer.listen();
}