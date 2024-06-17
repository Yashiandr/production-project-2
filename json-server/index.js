const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

server.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.send(200);
});

server.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.post('/login', (req, res) => {
    try {
        console.log(req.body);
        const {
            username,
            password,
        } = req.body;
        const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

        const { users = [] } = db;

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        );
        console.log(username);

        if (userFromBd) {
            return res.json(userFromBd);
        }

        return res.status(403)
            .json({ message: 'User not found' });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .json({ message: e.message });
    }
});

// eslint-disable-next-line consistent-return
server.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403)
            .json({ message: 'AUTH ERROR' });
    }

    next();
});

server.use(jsonServer.defaults());
server.use(router);

server.listen(8000, () => {
    console.log('server is running on 8000 port');
});
