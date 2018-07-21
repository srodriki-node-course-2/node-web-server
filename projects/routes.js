/**
 * This module allows me to show projects.
 */

var install = (app) => {
    app.get('/projects', (req, res) => {
        res.render('projects.hbs', {
            projects: [{
                name: 'Project 1'
            }]
        })
    });
}

module.exports = {
    install
}