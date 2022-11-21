const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv').config();
const generateMailToken = require('./generateMailToken');

const sendMail = async (id, email, option) => {

    const backendUrl = process.env.BACKEND_BASE_URL;
    const frontendUrl = process.env.FRONTEND_BASE_URL;

    // send email for the email verification option
    if (option === 'email verification') {
        const emailToken = generateMailToken(id, 'email');
        const url = `${backendUrl}api/users/verify/${emailToken}`;

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
        to: email, // Change to your recipient
        from: process.env.AUTH_EMAIL, // Change to your verified sender
        subject: 'Anthem Account Confirmation!',
        text: 'Please confirm your account to use Anthem',
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
        .catch((error) => {
            console.error(error)
        })
	}
	// send a mail for resetting password if forgot password
	else if (option === 'forgot password') {
		const forgetPasswordToken = generateMailToken(id, 'forgot password');
        console.log(forgetPasswordToken)
        //const url = `${backendUrl}/api/users/reset/${forgetPasswordToken}`;
        const url = `${frontendUrl}reset_password/${forgetPasswordToken}`;
        

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
        to: email, // Change to your recipient
        from: process.env.AUTH_EMAIL, // Change to your verified sender
        subject: 'Anthem Account Password Reset',
        text: 'Please follow the instructions to reset your password for your Anthem Account',
        html: `
            <div>
					<h2>Forgot Password?</h2>
					Click this link to 
					<a href="${url}">Reset Password</a>
					<br>
					Note that this link is valid only for the next 10 minutes.
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
};

module.exports = sendMail;