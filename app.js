//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req, res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  var data={
    members: [
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: lastname

        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);
  const url="https://us6.api.mailchimp.com/3.0/lists/7ae6c91dc";

  const options={
    method:"POST",
    auth: "ab:d431aa0d27c28e4fea1c58e09755043d-us6"
  }

  const request=https.request(url, options, function(response){
    if(response.statusCode == 200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));

    })
  })



  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server started");
});

//'{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"visibility":"pub","double_optin":false,"marketing_permissions":false}'


//d431aa0d27c28e4fea1c58e09755043d-us6

//7ae6c91dc2
