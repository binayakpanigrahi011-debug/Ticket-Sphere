const nodemailer = require("nodemailer");

const welcomeEmail = () => "Welcome to Ticket-Sphere!";
const passwordResetEmail = (userName, url) => `Hi ${userName}, click this link to reset your password: ${url}`;
const PasswordResetSuccessEmail = (userName) => `Hi ${userName}, your password has been reset successfully.`;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error connecting to email server:", error);
    } else {
        console.log("Email server is ready to send messages")
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `Ticket-Sphere <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log(`Message sent ${info.messageId}`);
    } catch (error) {
        console.log("Error sending email", error)
    }
}

const sendWelcomeEmail = async (userEmail) => {
    try {
        const subject = "Welcome to Ticket-Sphere"
        await sendEmail(
            userEmail, subject, welcomeEmail(), welcomeEmail()
        )
    } catch (error) {
        console.log("Error sending registration email:", error.message)
    }
}

const sendPassResetSuccessEmail = async (userEmail, userName) => {
    try {
        const subject = "Password reset successful"
        await sendEmail(
            userEmail, subject, PasswordResetSuccessEmail(userName), PasswordResetSuccessEmail(userName)
        )
    } catch (error) {
        console.log("Error sending reset success email:", error.message)
    }
}

const sendPassResetEmail = async (userEmail, userName, url) => {
    try {
        const subject = "Reset your password"
        await sendEmail(
            userEmail, subject, passwordResetEmail(userName, url), passwordResetEmail(userName, url)
        )
    } catch (error) {
        console.log("Error sending reset email:", error.message)
    }
}

module.exports = {
    sendWelcomeEmail,
    sendPassResetEmail,
    sendPassResetSuccessEmail
};