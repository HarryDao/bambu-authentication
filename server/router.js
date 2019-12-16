const { signup, verify, signin } = require('./controllers/auth');

module.exports = (app) => {
    app.post('/api/signup', signup);
    app.post('/api/verify', verify);
    app.post('/api/signin', signin);
}