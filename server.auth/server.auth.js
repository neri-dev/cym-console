const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const ACCESS_TOKEN_SECRET = 'ymda7TNx3djEDedkKaY0sayIkARCTJKUr0bSah1fDI09TZYpV7TTtWj50bfLcQvZ';

// # Define middleware
app.use(bodyParser.json());

// # Define API
app.post('/signin', signinRoute);

function signinRoute(req, res) {

    const { username, password } = req.body;
    const user = { name: username };

    if (username == 'admin' && password == 'admin') {

        const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
        // send the JWT back to the user
        res.json(accessToken);
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
}

// # Start server...
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});