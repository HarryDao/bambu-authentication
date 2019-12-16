const Express = require('express');
const Path = require('path');
const BodyParser = require('body-parser');
const Morgan = require('morgan');
const CORS = require('cors');
const Mongoose = require('mongoose');
const { MONGO_DB } = require('./config');
const router = require('./router');
const PORT = process.env.PORT || 3001;

const app = new Express();

Mongoose.connect(MONGO_DB, (error) => {
    if (error) {
        console.error('Error in connecting to MongoDB: ', error);
        return;
    }
    console.log('Connected to MongoDB');
});

app.use(CORS());
app.use(BodyParser.json({ type: '*/*' }));
app.use(Morgan('dev'));

router(app);

app.use(Express.static(Path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(Path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});