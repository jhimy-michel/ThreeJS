const express = require('express');
const path = require('path');
const app = express();
/* const helmet = require('helmet');

app.disable('x-powered-by');
app.enable('trust proxy'); */

app.use(
    express.static(path.join(__dirname, 'build'))
);

/* app.get('/', (req, res) => {
    if (!req.secure) {
        res.redirect(301, "https://" + req.headers.host + req.originalUrl);
    }
    res.status(200).send("hello, world\n").end();
}); */
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);