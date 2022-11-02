const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv').config();
const generateMailToken = require('./generateMailToken');

const sendMail = async (id, email, option) => {

    const frontendURL = process.env.FRONTEND_BASE_URL;

    // send email for the email verification option
    if (option === 'email verification') {
        const emailToken = generateMailToken(id, 'email');
        const url = `${frontendURL}/user/confirm/${emailToken}`;

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
        to: email, // Change to your recipient
        from: process.env.AUTH_EMAIL, // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `
            <div>
					<h2>Account Created!</h2>
					Click this link to 
					<a href="${url}">verify your account</a>
					<br>
					Note that this link is valid only for the next 15 minutes.
			</div>
        `,
        }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
	}
	// send a mail for resetting password if forgot password
	else if (option === 'forgot password') {
		// create a new JWT to verify user via email
		const forgetPasswordToken = generateToken(id, 'forgot password');
		const url = `${frontendURL}/user/password/reset/${forgetPasswordToken}`;
		const mailOptions = {
			from: process.env.EMAIL, // sender address
			to: email,
			subject: 'Reset Password for Kosells', // Subject line
			html: `<div>
					<h2>Reset Password for your Kosells account</h2>
					<br/>
					Forgot your password? No worries! Just click this link to 
					<a href="${url}">reset your password</a>. 
					<br>
					Note that this link is valid for only the next 10 minutes. 
				</div>
				
			`,
		};

		const mailSent = await transporter.sendMail(
			mailOptions,
			(err, info) => {
				if (err) {
					console.log(err);
				} else {
					console.log(info);
				}
			}
		);

		if (mailSent) return Promise.resolve(1);
	}
};

module.exports = sendMail;