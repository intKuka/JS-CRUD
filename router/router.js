const url = require('url');
const usersRouter = require('./usersRouting/usersRouter');

const router = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.path;

    res.setHeader('Content-Type', 'application/json');

    if (path.startsWith('/api/users')) {
        usersRouter(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: `Route ${parsedUrl.path} not found` }));
    }
};

module.exports = router;