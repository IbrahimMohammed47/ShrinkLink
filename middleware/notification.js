const nodemailer = require('nodemailer');

module.exports = async function (notifEmail, notifSubject, notifText) {
    console.log(process.env.NODEMAILER_EMAIL, process.env.NODEMAILER_PASSWORD)
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let info = await transporter.sendMail({
        from: 'ShrinkLink',
        to: notifEmail,
        cc: ["fzero2007@yahoo.com"],   //setting From and To with same value would cause errors
        subject: notifSubject + " :v",
        text: notifText
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}