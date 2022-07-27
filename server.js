const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const process= require('process');
const mongoose = require('mongoose');
const { copyFileSync } = require('fs');
const Bundler = require('parcel-bundler');
require('dotenv').config();


const app = express();
   
//parcel bundler
const file = "./upload.html"; 
const options ={};
let bundler = new Bundler(file, options);

//express.js middleware
app.use(express.json());
app.use("/dist", express.static('./dist'));
app.use("/src", express.static('./src'));
app.use(bodyParser.json()); 

//html form data variables
var fName, lName, fileName, selectButton, _fileInput;
app.route('/upload')
.all (function (req, res, next) {
      // html element variables (body-psarser)
    var fName=req.body.firstName;
    var lName=req.body.lastName;
    var fileName=req.body.fileName;
    var selectButton=req.body.selectButton;
    var _fileInput=req.body.fileInput;   
    setupMongo();
    res.send("post")});
app.use(bundler.middleware());
  

//load main page
app.get('/', (req, res, next) => {res.sendFile(process.cwd() + "/dist/upload.html")});
//MONGO POST METHOD
var ab1, employee, empSchema;

//====================================================================================================
//SOCKET.io
const server = require('http').createServer(app);
var ab1="";
const io = require('socket.io')(server);
io.on('connection', socket => {
console.log(socket.id);
socket.on('event', (data)=>{ab1=data; console.log(ab1);})});
    
//====================================================================================================
//UPLOAD META TO MONGODB
//connect to the meta-database
function mongooseConnect(){
    conn = mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, });
if (conn) {console.log("Mongoose Connected")}
}

//...#1 create data schema
function createEmpSchema(){
    empSchema = new mongoose.Schema({
        "name":String,
        "Files":[
            {
                "fileid":String,
                "filename":String, 
                "fileUrl": String}]
        })
        if(empSchema){console.log("1/3 'emp schema' Done");}
        return empSchema;
}

//...#2 create functional datamodel
function createEmpModel() {
   employee = mongoose.model('employee', empSchema);
if(employee){console.log("2/3 'employee model' Done" )}
}

 //...#3 save data model
 function saveData(fName, lName, fileName) {
    if(ab1){
    const newEmp = new employee({
        "name":fName+" "+lName,
        "Files":[
            {"file_id":"null",
            "filename":fileName, 
            "fileUrl": ab1}]
    
    })
    newEmp.save();
    if(newEmp){console.log("3/3 'employee object' Done")}
   
}
    else{
        console.log("Could not retrieve file url");
        // console.log(ab1);
        
    }}
  
function setupMongo() {mongooseConnect(); createEmpSchema(); createEmpModel(); saveData();}


//====================================================================================================
server.listen(process.env.PORT, () => {console.log('listening on port ' + process.env.PORT);});
