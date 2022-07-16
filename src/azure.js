console.log("azure.js");
var {disableResponseDecompressionPolicy}= require("@azure/core-http");
var {ClientRequest} = require("http");
require("regenerator-runtime/runtime");
var {BlobServiceClient} = require("@azure/storage-blob");
var { io } = require('socket.io-client');
const { send } = require("process");
require('dotenv').config();

const socket = io(process.env.WEBPAGE_URL);
socket.on('connect', () =>{
    console.log('you connected with id: ' + socket.id);
})

function sendURL (_url) {
    socket.emit('event', _url);
}

//html element variables
var selectButton = document.getElementById("selectButton");
var _fileInput = document.getElementById("fileInput");
var ab1=document.getElementById("ab1");
var dummyButton=document.getElementById("dummyButton");
var formButton=document.getElementById("formButton");
var form=document.getElementById("form");

// ab1.value="";
_fileInput.value="";

//Shared Access Signature URL
var SASurl=process.env.SAS_URL;
//lets create a blob service client
const container=process.env.CONTAINER_NAME;
const blobServiceClient = new BlobServiceClient(SASurl);
const containerClient=blobServiceClient.getContainerClient(container);
const blockBlobClient="";

//lets write a function to upload an array of blobs
function uploadBlob() {        
console.log(_fileInput.files[0].name);

//identify the file        
const blockBlobClient = containerClient.getBlockBlobClient(_fileInput.files[0].name);
     
// console.log(blockBlobClient.url)    
// blobUrl=blockBlobClient.url;     
        
//upload file
ab1.value=blockBlobClient.url;
console.log(ab1.value);
sendURL(ab1.value);
blockBlobClient.uploadBrowserData(_fileInput.input);  
// ab1.value="";
// _fileInput.value="";
}

//html upload methods
selectButton.addEventListener("click", () => _fileInput.click());
_fileInput.addEventListener("change", uploadBlob);
// _fileInput.addEventListener("change", ()=>{document.getElementById("ab1").value=blockBlobClient.url;});
// dummyButton.addEventListener("click", () => form.submit());


