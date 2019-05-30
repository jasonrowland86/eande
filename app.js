const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

// const Recaptcha = require('express-recaptcha').RecaptchaV3;
// const recaptcha = new Recaptcha(
//   '6LdD-6QUAAAAAAVTa7H5mXCp1KjuqRR8b5c_KJxW',
//   '6LdD-6QUAAAAAEoJcKJYSqiBoBfYm8vloCkFxqT8',
//   {callback:'cb'}
// );

const app = express();

//static files
app.use(express.static('public'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//views
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const yelp = require('./services/yelp-reviews');

app.get('/', yelp.getReviews, (req, res) => {
  res.render('index', {
    thankYou: " ",
    message: " ",
    reviews: res.locals.reviews
  });
  // console.log(res.locals.reviews);
});

const nodemailer = require('./services/nodemailer');
app.post('/', yelp.getReviews, (req, res) => {
  // const secretKey = '6LerXKYUAAAAALoiRXNDdI1MGCKh5_F7VAWlSJMT';
  // const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  // request(verificationURL,function(error,response,body) {
  //   body = JSON.parse(body);
  //   console.log(body);
  //   console.log(response);
  //   if(req.body.firstName === '' || req.body.email === '' || req.body.message === '') {
  //     res.render('index', {
  //       message: "Message not sent, missing field",
  //       reviews: res.locals.reviews
  //       //add feilds to refill users info when redirected
  //     })
  //   } else if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
  //     res.render('index', {
  //       message: "Please check the box",
  //       reviews: res.locals.reviews
  //       //add feilds to refill users info when redirected
  //     })
  //   } else if(body.success !== undefined && !body.success) {
  //     res.render('index', {
  //       message: "Message not sent",
  //       reviews: res.locals.reviews
  //       //add feilds to refill users info when redirected
  //     })
  //   } else {
  //     console.log("Message sent from " + req.body.firstName + " " + req.body.lastName);
  //     let mailOptions = {
  //       from: req.body.email,
  //       to: 'eandeautoservices@gmail.com',
  //       subject: 'Contact Form Submitted: ' + req.body.firstName + " " + req.body.lastName,
  //       text: req.body.message + " " + req.body.phoneNumber
  //     };
  //     nodemailer.transporter.sendMail(mailOptions, (err, info) => {
  //       if (err) {
  //         console.log("Nodemailer error: " + err);
  //       } else {
  //         console.log('Email sent: ' + info.response);
  //       }
  //     });
  //     // res.redirect('/');
  //     res.render('index', {
  //       message: "Thank you, Your message was sent",
  //       reviews: res.locals.reviews
  //     })
  //   }
  // });

  if(req.body.firstName === '' || req.body.email === '' || req.body.message === '') {
    res.render('index', {
      message: "Message not sent, missing field",
      reviews: res.locals.reviews
      //add feilds to refill users info when redirected
    })
  }

  console.log("Message sent from " + req.body.firstName + " " + req.body.lastName);
  let mailOptions = {
    from: req.body.email,
    to: 'eandeautoservices@gmail.com',
    subject: 'Contact Form Submitted: ' + req.body.firstName + " " + req.body.lastName,
    text: req.body.message + " " + req.body.phoneNumber
  };
  nodemailer.transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Nodemailer error: " + err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  // res.redirect('/');
  res.render('index', {
    message: "Thank you, Your message was sent",
    reviews: res.locals.reviews
  })
});

//error handler
app.get('*', (req, res) => {
    res.status(404).send('Not Found!');
    // res.sendFile(path.join(__dirname, '/views', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Listening on ${port}`);
