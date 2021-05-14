const hostname = '127.0.0.1';
const port = 5000;

const server = require('./controllers/controller.js');

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});