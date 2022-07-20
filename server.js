const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const process= require('process');
const mongoose = require('mongoose');
const { copyFileSync } = require('fs');
const Bundler = require('parcel-bundler');
require('dotenv').config();

//parcel bundler
let bundler = new Bundler('upload.html');
const app = express();

//express.js middleware
app.use(express.json());
app.use("/dist", express.static('./dist'));
app.use("/src", express.static('./src'));
app.use(bundler.middleware());
app.use(bodyParser.json());   

//socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//load main page
app.get('/', (req, res) => {res.sendFile(process.cwd() + "/upload.html")});

//MONGO POST METHOD
var ab1, employee, empSchema;
app.post('/upload', (req, res) => {
          
//html element variables (body-parser)
// var fName=req.body.firstName;
// var lName=req.body.lastName;
// var fileName=req.body.fileName;
// var selectButton=req.body.selectButton;
// var _fileInput = req.body.fileInput;
   
// setupMongo();

//upload to mongoDB
res.send("uploaded");});

//====================================================================================================
//SOCKET.io
var ab1="";
io.on('connection', socket => {
console.log(socket.id);
socket.on('event', (data)=>{ab1=data; console.log(ab1);})});
    
//====================================================================================================


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
 function saveData() {
    if(ab1){
    const newEmp = new employee({
        "name":fName+" "+lName,
        "Files":[
            {"file_id":"null",
            "filename":_fileName, 
            "fileUrl": ab1}]
    
    })
    newEmp.save();
    if(newEmp){console.log("3/3 'employee object' Done")}
   
}
    else{
        console.log("Could not retrieve file url");
        // console.log(ab1);
        
    }}
  
function setupMongo() {           
mongooseConnect();   
if(employee.findOne()===undefined){
    createEmpSchema();
    createEmpModel();
    saveData();}

    else{saveData();}} 

//====================================================================================================
server.listen(process.env.PORT, () => {console.log('listening on port ' + process.env.PORT);});
