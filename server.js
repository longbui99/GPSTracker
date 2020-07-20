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
const CLIHOME = require('./pj_module/Client/Home/CliHomeExport')

// Config server  
app.use(cors())
app.use(express.static('./pblic'));
app.use('/static',express.static('pblic/Adm/static'))

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
app.use('/static',express.static('Adm/static'))
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
  CLIHOME(app,User,ObjectId)
  MailModule.initMailServer(app, User, ObjectId)
  RLProtocol(io, User, ObjectId)
  MQTTProtocol.initMQTTConnect(io, User, ObjectId)
  AnalyzeFunc.Init(app, User, ObjectId, io)
  AnalyzeFunc.AnalyzesSystem()


  // Notification



  console.log('DBMS ready')
});

async function randomeBalance(){
  let returnVal = await User.collection(DBMS.ClientInfoCollection).find({}).toArray();

  for(let i = 0 ; i < returnVal.length; i ++){
    let value = Math.floor((Math.random() * 10000) + 1);
    User.collection(DBMS.ClientInfoCollection).updateOne({_id:returnVal[i]._id},{$set:{Balance:value}})
  }
  console.log("DONE")
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function randomeDateDBMS(){
  let returnVal = await User.collection(DBMS.ClientInfoCollection).find({}).toArray();

  for(let i = 0 ; i < returnVal.length; i ++){
    let value = randomDate(new Date(2020, 5, 1), new Date()).toISOString().substring(0,10)
    User.collection(DBMS.ClientInfoCollection).updateOne({_id:returnVal[i]._id},{$set:{DateIn:value}})
  }
  console.log("DONE")
} 



async function randomeStateAccount(){
  let returnVal = await User.collection(DBMS.ClientInfoCollection).find({}).toArray();

  for(let i = 0 ; i < returnVal.length; i ++){
    let value = Math.floor((Math.random() * 2) + Math.random());
    User.collection(DBMS.ClientInfoCollection).updateOne({_id:returnVal[i]._id},{$set:{State:value}})
  }
  console.log("DONE")
} 



async function randomeLevelAccount(){
  let returnVal = await User.collection(DBMS.ClientInfoCollection).find({}).toArray();

  for(let i = 0 ; i < returnVal.length; i ++){
    let value = Math.floor((Math.random() * 2 + + Math.random()));
    User.collection(DBMS.ClientInfoCollection).updateOne({_id:returnVal[i]._id},{$set:{"Level.NowLevel":value}})
  }
  console.log("DONE")
} 



app.get('/', (req, res, next) => {
  let myInterval = setInterval(() => {
    if (User != null) {
      res.render("publicPage")
      clearInterval(myInterval)
    }
  }, 100)
})

app.get('/log-out', (req, res) => {
  req.logout()
  res.redirect('/')
})
