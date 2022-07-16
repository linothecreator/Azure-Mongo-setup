const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const process= require('process');
const mongoose = require('mongoose');
const { copyFileSync } = require('fs');
const Bundler = require('parcel-bundler');

//
let bundler = new Bundler('upload.html');
const app = express();

        //     //set middleware
        app.use(express.json());
        app.use("/dist", express.static('./dist'));
        app.use("/src", express.static('./src'));
        app.use(bundler.middleware());


const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.get('/', (req, res) => {res.sendFile(process.cwd() + "/upload.html")});

console.log("server.js");

//====================================================================================================
//EXPRESS SOCKET SERVER

var ab1=""
    io.on('connection', socket => {
        console.log(socket.id);

        socket.on('event', (data)=>{ab1=data; console.log(ab1);})
    });
    
         server.listen(3000, () => {
        console.log('listening on *:3000');
      });


//     app.use(bodyParser.json());    
//     var urlencodedParser = bodyParser.urlencoded({ extended: true });

//     //local blob url variable 
//     var fileExist, _ab1;

//     //local mongo data variabes
//     var employee;

    //main page
  

//         //Upload Post Method
//         app.post('/upload', (req, res) => {
          
//         //html element variables
//         var fName=req.body.firstName;
//         var lName=req.body.lastName;
//         var fileName=req.body.fileName;
//         var selectButton=req.body.selectButton;
//         var _fileInput = req.body.fileInput;
//         var _ab1=req.body.ab1;
        
//         const verify = verifyFile();
    
//         function verifyFile() {
//             if(fileExist==true){
//                 console.log("file accepted");
//                 mongooseConnect();   
//                 if(!empSchema){createEmpSchema()}        
//                 createEmpModel();             
//                 }
//             } 
            
//         saveEmpData();
//         // if(employee.findOne({"fileUrl": _ab1})){}
//         console.log(fName)
//             res.send("uploaded");
//         });

// //====================================================================================================
// //connect to the meta-database
// var empSchema;
// function mongooseConnect(){
//     conn = mongoose.connect("mongodb+srv://auth:aS1LHz5uxK43CKvA@cluster0.itp4p.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, });
// if (conn) {console.log("Mongoose Connected")}
// }

// //#1 create employee data schema
// function createEmpSchema(){
//     empSchema = new mongoose.Schema({
//         "name":String,
//         "Files":[
//             {
//                 "fileid":String,
//                 "filename":String, 
//                 "fileUrl": String}]
//         })
//         if(empSchema){console.log("1/3 'emp schema' Done");}
//         return empSchema;
// }

// //#2 create functional datamodel
// function createEmpModel() {
//    employee = mongoose.model('employee', empSchema);
// if(employee){console.log("2/3 'employee model' Done" )}
// }

//  //#3 save data model
//  function saveEmpData() {
//     if(_ab1){
//     const newEmp = new employee({
//         "name":fName+" "+lName,
//         "Files":[
//             {"file_id":"null",
//             "filename":_fileName, 
//             "fileUrl": _ab1}]
    
//     })
//     newEmp.save();
//     if(newEmp){console.log("3/3 'employee object' Done")}
   
// }
//     else{
//         console.log("Could not retrieve file url");
//         console.log(_ab1);
        
//     }}
    
 
