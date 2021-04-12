//Email stuff
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

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

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendPDFEmail = async (addressee, remarks) => {
    const accessToken = await oAuth2Client.getAccessToken();

    console.log("sending email to ", addressee, "with remarks", remarks);

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
        },
    });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    let mailOptions = {
        from: process.env.C2G8EMAIL,
<<<<<<< HEAD
        to: addressee   ,
        subject: 'Audit:'.concat(new Date().format("DD MMM YYYY")),
        text: 'Hi, please find the audit attached for viewing. \n\nRemarks: '.concat(remarks),
        attachments: [{
            filename: 'result.pdf',
            // path: 'C:/Users/Windows/ESCProject/sra-server/result.pdf',
            // path: 'C:/Users/tohka/Documents/SingHealth/sra-server/result.pdf',
            path: `~/result.pdf`,
            // path: '/Users/nicoleyu/Developer/ESC/sra-server/result.pdf',
            contentType: 'aplication/pdf',
        }]
=======
        to: addressee,
        subject: "Audit :".concat(today),
        text: "Hi, please find the audit attached for viewing. \n\nRemarks: ".concat(
            remarks
        ),
        attachments: [
            {
                filename: "result.pdf",
                // path: 'C:/Users/Windows/ESCProject/sra-server/result.pdf',
                // path: 'C:/Users/tohka/Documents/SingHealth/sra-server/result.pdf',
                // path: `~/result.pdf`,
                path: `./result.pdf`,
                // path: '/Users/nicoleyu/Developer/ESC/sra-server/result.pdf',
                contentType: "aplication/pdf",
            },
        ],
>>>>>>> master
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("err.message,", err);
        } else {
            console.log("email sent!!");
            return "email sent!!";
        }
    });
    return null;
};

const sendEmail = async (from, to, title, body) => {
    const accessToken = await oAuth2Client.getAccessToken();

    console.log("Message from ".concat(from).concat(": ").concat(title));

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
        },
    });

    let mailOptions = {
        from: process.env.C2G8EMAIL,
        to: to,
        subject: "Message from ".concat(from).concat(": ").concat(title),
        text: body,
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("err.message,", err);
        } else {
            console.log("email sent!!");
            return "email sent!!";
        }
    });
    return null;
};

module.exports = { sendEmail, sendPDFEmail };
