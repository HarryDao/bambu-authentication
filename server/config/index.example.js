module.exports = {
    MONGO_DB: 'mongodb://127.0.0.1:27017/authentication', // mongodb://<dbUsername>:<dbPassword>@<host>:<port>/<dbName>
    APP_URL: 'http://localhost:3000', // client app url
    EMAIL_CONFIG: {
        service: 'gmail',
        auth: {
            user: '', // example@gmail.com
            pass: '' // 123456
        }
    },
    JWT_SECRET: '', // 12345678
};