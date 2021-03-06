const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const projects = require('./projects');

const APP_PORT = process.env.PORT || 3000;
var app = express();

// handlebars setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// example middleware
/**
 * next is used so node knows when the middleware ended. 
 */
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next(); // required so the application continues running
});

/* app.use((req, res, next) => {
    res.render('maintenance.hbs');
}); */

// static middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello there'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'error handling request'
    })
});

// setup projects
projects(app);

app.listen(APP_PORT, () => {
    console.log('Server is up on port ' + APP_PORT);
});