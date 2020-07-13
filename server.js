const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const DBMS = require('./pj_module/Config/DBMS');
const app = express();
const cors = require('cors')
const server = require('http').Server(app);
const io = require('socket.io')(server);


// import modules implementation
const DeviceMain = require('./pj_module/Client/DviceMain/DviceMainExport');
const DeviceSign = require('./pj_module/Client/DviceSign/DviceSignExport');
const CustomersProfile = require('./pj_module/Client/ProfileInf/ProfileExport');
const AdmManagerMain = require('./pj_module/Admin/AdmExport');
const AuthRequest = require('./pj_module/Auth/AuthExport');
const MQTTProtocol = require('./pj_module/MQTT/MQTTExport');
const MailModule = require('./pj_module/MailInf/MailExport')
const RLProtocol = require('./pj_module/RealTime/RealTimeExport')
const AnalyzeFunc = require('./pj_module/AnalyzeCondition/AnalyzeExport')

// Config server  
app.use(cors())
app.use(express.static('./pblic'));

app.set('view engine', 'ejs');
app.set('views', './pblic/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession({
  secret: 'mySecretKey',
  cookie: {
    maxAge: 1000 * 60 * 100
  }
}));
const PORT = process.env.PORT || 5000;
server.listen(PORT);

// Config database
const mongodb = require('./pj_module/Dbs/mongoDB.js');

const client = mongodb.client;
const ObjectId = mongodb.ObjectId;
var User = null;





client.connect().then(token => {
  User = token.db(DBMS.DatabaseName);

  // Config all dbms
  AuthRequest(app, User, ObjectId)
  DeviceMain(app, User, ObjectId)
  DeviceSign(app, User, ObjectId)
  CustomersProfile(app, User, ObjectId)
  AdmManagerMain(app, User, ObjectId)
  MailModule.initMailServer(app, User, ObjectId)
  RLProtocol(io, User, ObjectId)
  MQTTProtocol.initMQTTConnect(io, User, ObjectId)
  AnalyzeFunc.Init(app, User, ObjectId, io)
  AnalyzeFunc.AnalyzesSystem()
  // Notification
  app.get("/home", function (req, res) {
    // console.log(req)
    if (req.isAuthenticated() && req.user.typeAccount) {
      res.render('CliHome')
    }
    else {
      res.redirect('/')
    }
  });


  console.log('DBMS ready')
});




app.get('/', (req, res, next) => {
  let myInterval = setInterval(() => {
    if (User != null) {
      res.render("publicPage")
      clearInterval(myInterval)
    }
  }, 100)
})
