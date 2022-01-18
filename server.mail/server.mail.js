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

// # Define middleware
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

// # Define API
app.post('/sendMail', basicAuth({ users: { 'admin': 'admin' } }), (req, res) => {

    // extract parameters
    let { from, to, subject, content, useDemo } = req.body;

    // validate mandatory parameters
    if (!from || !to) {
        console.log('missing email arguments (from/to)');
        return res.sendStatus(500);
    }

    if (useDemo !== true && !content) {
        console.log('missing html content, or useDemo=true');
        return res.sendStatus(500);
    }

    // get the current host name in order to create the phishing url
    const host = getCurrentHostName(req);
    if (!Array.isArray(to)) to = [to];

    let sentStatus = { error: 0, total: 0 };
    to.forEach(async t => {
        // generate unique id for phishing mail
        const phishingId = uuidv4();

        if (useDemo == true) {
            content = await loadTemplateSample();
        }

        // get template variables
        const variables = getTemplateSampleVariables(t, host, phishingId);

        // compile html text into template callback
        let template = handlebars.compile(content);

        // create the html template
        let htmlToSend = template(variables);

        // prepare mail options
        var mailOptions = { from, to: t, subject, html: htmlToSend };

        // send mail
        transporter.sendMail(mailOptions, async (error, info) => {
            sentStatus.total++;

            if (error) {
                console.log(error);
                sentStatus.error++;
            } else {
                console.log('Email sent: ' + info.response);
                await DBHandler.storePhishingStatus(phishingId, t, htmlToSend)
            }

            // verify final status
            if (sentStatus.total == to.length) {
                const statusCode = sentStatus.error == 0 ? 200 : 500;
                return res.json(`{status: ${statusCode}}`);
            }
        });
    });
});

app.get('/done/:id', function (req, res) {
    DBHandler.updatePhishingStatus(req.params.id);
    res.send("Smile! You're Busted!");
});

// # Private methods
function getCurrentHostName(req) {
    const proxyHost = req.headers["x-forwarded-host"];
    const host = proxyHost ? proxyHost : req.headers.host;
    return host;
}

function getTemplateSampleVariables(to, host, phishingId) {
    return {
        username: to,
        url: `http://${host}/mail/done/${phishingId}`
    };
}

async function loadTemplateSample() {
    const readFile = promisify(fs.readFile);
    let htmlContent = await readFile(path.join(__dirname, '/templates/template.html'), 'utf8');
    return htmlContent;
}

// # Start server...
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});