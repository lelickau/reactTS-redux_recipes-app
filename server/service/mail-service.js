const nodemailer = require('nodemailer');
const config = require('config');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.get('smtpHost'),
            port: config.get('smtpPort'),
            secure: true,
            auth: {
                user: config.get('smtpUser'),
                pass: config.get('smtpPassword')
            }
        })
    }
    /**
     *
     * @param {*email} to
     * @param {*link} link
     */
    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: config.get('smtpUser'),
            to,
            subject: `Verify your email for FitnessApp`,
            text: '',
            html:
                `
                    <div>
                        <h1>You’re nearly there!</h1>
                        <p>To finish setting up your account and start using FitnessApp, confirm we’ve got the correct email for you.</p>
                        <div><h4 style="color:#172b4d;font-size:14px;font-weight:600;line-height:16px;margin-bottom:0;margin-top:16px">Make sure you are using the same device and browser you used to sign up to complete your registration.</h4></div>
                        <div style="margin-top:28px">
                            <a href="${link}" style="background:#0052cc;border:medium;border-radius:3px;box-sizing:border-box;color:#ffffff;font-size:inherit;font-style:normal;height:2.2em;line-height:2.2em;margin:0;padding:10px 12px 10px 12px;text-align:center;text-decoration:none;vertical-align:middle;white-space:nowrap">Verify your email</a>
                        </div>
                        <hr style="border-bottom-color:#c1c7d0;border-style:none none solid none;border-width:0 0 1px 0;margin-bottom:24px;margin-top:24px">
                    </div>
                `
        })
    };

    async resetPasswordMail(to, link){
        await this.transporter.sendMail({
            from: config.get('smtpUser'),
            to,
            subject: `Reset password instructions`,
            text: '',
            html:
                `
                    <div>
                        <div style="margin-top:28px">
                        <h3>Someone has requested a link to change your password, and you can do this through the link below.</h3>
                            <a href='${link}' style="background:#0052cc;border:medium;border-radius:3px;box-sizing:border-box;color:#ffffff;font-size:inherit;font-style:normal;height:2.2em;line-height:2.2em;margin:0;padding:10px 12px 10px 12px;text-align:center;text-decoration:none;vertical-align:middle;white-space:nowrap">Reset</a>
                            <p>If you didn't request this, please ignore this email.</p>
                            <p>Your password won't change until you access the link above and create a new one.</p>
                        </div>
                        <hr style="border-bottom-color:#c1c7d0;border-style:none none solid none;border-width:0 0 1px 0;margin-bottom:24px;margin-top:24px">
                    </div>
                `
        })
    };
}

module.exports = new MailService();