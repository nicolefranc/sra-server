//Email stuff
const nodemailer = require("nodemailer");


// // Node Mailer
// // Step 1 add key for ht mail gun account
// const auth = {
//   auth: {
//     api_key: "558828fe9b9a12152e6843eed80b26e8-6e0fd3a4-f778b6fb",
//     domain: "sandbox4bcf2ed7c15848aa80cd45dea1bfea1c.mailgun.org",
//   },
// };


// // Step 2: Transporter - allow you connect to whatever place you want to connect
// // we want to connect to node gun
// // nodemailMailgun is a function that will take in the configuration password for the mailgun
// let transporter = nodemailer.createTransport(nodemailerMailgun(auth));

// // Step 3: what we want the user to receive?
// const mailOptions = {
//     from: "excisted user: <me@sample.mailgun.org>",
//     to: 'kaifeng_toh@mymail.sutd.edu.sg', 
//     subject: 'Welcome to my app',
//     text: 'IT is working'
// }

// // S tep 4
// // parse the mail options inside the transporter
// // and create a callback tp check for error or success

// transporter.sendMail(mailOptions, function(err, data){
//     if (err){
//         console.log("error: ", err);
//     } else{
//         console.log("message sent!!!");
//     }
// })

// Gmail

const sendEmail = () =>{
    
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
    
    let mailOptions = {
        from: process.env.C2G8EMAIL,
        to: 'currentixer@gmail.com'   ,
        subject: 'testing and testing',
        text: 'test',
    };
    
    transporter.sendMail(mailOptions, function(err,data){
        if (err){
            console.log("err.message,", err);
        } else{
            console.log("email sent!!");
        }
    });

}


module.exports = sendEmail;