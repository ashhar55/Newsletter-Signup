// jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
const { response } = require("express");

const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/45176b5f2c";

  const options = {
    method: "POST",
    auth: "Ashhar1:c27945a98649acc605bf71ecbefec123-us21",
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) res.sendFile(__dirname + "/success.html");
    else res.sendFile(__dirname + "/failure.html");

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Local server is live at port ${port}`);
});

// API key = c27945a98649acc605bf71ecbefec123-us21

// audience id = 45176b5f2c
