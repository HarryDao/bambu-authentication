const Nodemailer = require('nodemailer');
const { EMAIL_CONFIG } = require('../config');

exports.sendVerifyEmail = ({ email, verifyUrl }) => {
    return new Promise(resolve => {
        const transport = Nodemailer.createTransport(EMAIL_CONFIG);
        const emailOptions = {
            from: EMAIL_CONFIG.auth.user,
            to: email,
            subject: `Verify your email`,
            html: generateVerifyHtml(email, verifyUrl)
        };
        transport.sendMail(emailOptions, (error) => {
            resolve();
        });
    });
}

const generateVerifyHtml = (email, verifyUrl) => {
    return `
        <div>
            <p>Hi ${email},</p>
            <p>Please click the link below to verify your email</p>
            <a href="${verifyUrl}" style="padding: 10px; background-color: green; color: white; border-radius: 5px;text-decoration: none">
                Verify Email
            </a>
            <p>Regards,</p>
        </div>
    `;
}
