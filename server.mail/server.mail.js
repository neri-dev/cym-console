const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const { promisify } = require('util');
const fs = require('fs');
const express = require('express');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const path = require('path');
const DBHandler = require('./db.handler');
const app = express();
const uuidv4 = require('uuid').v4;
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'neri.dev.testing@gmail.com',
        pass: 'neri.dev.testing1234'
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.post('/sendMail', basicAuth({ users: { 'admin': 'admin' } }), async (req, res) => {

    // extract parameters
    let { from, to, subject, html, variables, useDemo } = req.body;

    // validate mandatory parameters
    if (!from || !to) {
        console.log('missing email arguments (from/to)');
        return res.sendStatus(500);
    }

    if (html && !variables) {
        console.log('missing html variables. e.g: {firstName: "Bob", lastName: "Marley"}');
        return res.sendStatus(500);
    }

    // generate unique id for phishing mail
    const phishingId = uuidv4();
    const host = getCurrentHostName(req);

    if (useDemo == true) {
        html = await loadTemplateSample();
        variables = getTemplateSampleVariables(to, host, phishingId);
    }

    // compile html text into template callback
    let template = handlebars.compile(html);

    // create the html template
    let htmlToSend = template(variables);

    if (!Array.isArray(to)) to = [to];

    to.forEach(t => {
        // prepare mail options
        var mailOptions = { from, to:t, subject, html: htmlToSend };

        // send mail
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                console.log('Email sent: ' + info.response);
                res.sendStatus(200);
                await DBHandler.storePhishingStatus(phishingId, t, htmlToSend)
            }
        });
    });
});

app.get('/done/:id', function (req, res) {
    DBHandler.updatePhishingStatus(req.params.id);
    res.send('You Busted!');
});

function getCurrentHostName(req) {
    const proxyHost = req.headers["x-forwarded-host"];
    const host = proxyHost ? proxyHost : req.headers.host;
    return host;
}

function getTemplateSampleVariables(to, host, phishingId) {
    return {
        username: to,
        recoveryUrl: `http://${host}/mail/done/${phishingId}`
    };
}

async function loadTemplateSample() {
    const readFile = promisify(fs.readFile);
    let htmlContent = await readFile(path.join(__dirname, '/templates/template.html'), 'utf8');
    return htmlContent;
}

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});