const express = require('express');
const path = require('path')
const APIs = require('./api');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const ACCESS_TOKEN_SECRET = 'ymda7TNx3djEDedkKaY0sayIkARCTJKUr0bSah1fDI09TZYpV7TTtWj50bfLcQvZ';

// # Define middleware
app.use(bodyParser.json());

// # Define View Engine & static page
var _path = path.join(__dirname, '/client/dist/cymulate-console')
app.use(express.static(_path))
app.set('view engine', 'pug');

// # Define API Routes
app.get('/', (req, res) => res.sendFile(path.join(_path, 'index.html')));
app.get('/statuses', authenticateJWT, APIs.getStatuses);
app.get('/statusesCount', authenticateJWT, APIs.getStatusesCount);

// # Define JWT middleware
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// # Start server...
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});