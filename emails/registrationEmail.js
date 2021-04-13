const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const sendRegistrationEmail = (addressee, token) =>{
    

  let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          type: "OAuth2",
          user: process.env.C2G8EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
      },
      tls: {
          rejectUnauthorized: false,
      }
  });

  const url = `http://singhealth.netlify.app/register/${token}`;
  console.log(url);
  
  let mailOptions = {
      from: process.env.C2G8EMAIL,
      to: addressee,
      subject: 'SingHealth - Registration of Account for E-Audit Platform',
      html: `Register Via this link <a href=${url}> ${url}</a>`,
  };
  
  transporter.sendMail(mailOptions, function(err,data){
      if (err){
          console.log("err.message,", err);
          return err;
      } else{
          console.log("email sent!!");
          return "email sent"
      }
  });
}


module.exports = sendRegistrationEmail;