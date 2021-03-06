//importing express
const express = require('express');
//const router = require('./api/routes/contact');
//const problemsharerouter = require('./api/routes/ProblemShare')
const morgan = require('morgan')
//The path module provides a lot of very useful functionality to access and interact with the file system
const path = require('path');
// express application will be created
const app = express();
app.use('/static', express.static('view'))
//client give value in url than it needs to extrected
//that why body parser is used

//const bodyParser = require('body-parser')
//importing contact routes
const contactRoute = require('./api/routes/contact')

//importing problemshare routes
const problemshareRoute = require('./api/routes/ProblemShare')
const userRoute = require('./api/routes/Authentication')
const loadcontactalldata = require('./api/model/ContactWithUsModel')
const loaduserlldata = require('./api/model/AuthenticationModel')
const loadallsharedproblem = require('./api/model/ProblemSharingModel')
// morgan will formate how we want to see the data
app.use(morgan("dev"))//devloment mode e  dekhabe
//ui te console er print er jonno cors middleware lagse
var cors = require('cors')
app.use(cors())
//to use body-parser
/*app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())*/
// server should listen at some point. This point can be given by us 
// or if we host it then it will reconize it
//in 3000 our surver is running
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/disclose/api/problemshare',problemshareRoute)
app.use('/disclose/api/contacts',contactRoute)
app.use('/disclose/api/auth',userRoute)
app.listen(PORT,()=>{      // now server is running
    console.log(`Server is running on PORT ${PORT}`)
    //first server will loaded up all the data for the first time while the web is running
    new loadcontactalldata.ContactModel().GetContactUserData()
    new loadallsharedproblem.ProblemShare().GetAllstoredComplain()
    new loaduserlldata.UserModel().GetUserData()
})          
// route created
app.get('/',function(req, res){
    res.sendFile(path.join(__dirname, '/view/index.html'))
})


//all the html page are connecting with the server

app.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname, '/view/Contact.html'));
});

app.get('/editpage', function(req, res) {
    res.sendFile(path.join(__dirname, '/view/EditPage.html'));
});

app.get('/admin', function(req, res) {
    res.sendFile(path.join(__dirname, '/view/Admin.html'));
});
app.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname, '/view/log_in.html'));
});
app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '/view/sign_up.html'));
});
