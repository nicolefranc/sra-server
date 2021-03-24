const nodemailer = require("nodemailer");

const sendRegistrationEmail = (addressee, token) =>{
    

  let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.C2G8EMAIL,
          pass: process.env.C2G8PASSWORD,
      },
      tls: {
          rejectUnauthorized: false,
      }
  });

  const url = `http://localhost:3000/register/${token}`;
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