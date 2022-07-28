console.log("azure.js");
var {disableResponseDecompressionPolicy}= require("@azure/core-http");
var {ClientRequest} = require("http");
require("regenerator-runtime/runtime");
var {BlobServiceClient} = require("@azure/storage-blob");
var { io } = require('socket.io-client');
const { send } = require("process");
require('dotenv').config();

//Setup and configure Socket IO
const socket = io(process.env.WEBPAGE_URL);
socket.on('connect', () =>{
    console.log('you connected with id: ' + socket.id);
})

var blobUrl;
function sendURL (_url) {
    socket.emit('event', _url);
}

//html element variables
var selectButton = document.getElementById("selectButton");
var _fileInput = document.getElementById("fileInput");
// var dummyButton=document.getElementById("dummyButton");
var formButton=document.getElementById("formButton");
var form=document.getElementById("form");

//====================================================================================================
//SETUP AN CONFIGURE AZURE BLOB API

//Shared Access Signature URL
var SASurl=process.env.SAS_URL;

//lets create a blob service client
const container=process.env.CONTAINER_NAME;
const blobServiceClient = new BlobServiceClient(SASurl);
const containerClient=blobServiceClient.getContainerClient(container);
const blockBlobClient="";

//lets write a function to upload an array of blobs to azure
function uploadBlob() {        
console.log(_fileInput.files[0].name);

//identify the file        
const blockBlobClient = containerClient.getBlockBlobClient(_fileInput.files[0].name);
//identify file url
blobUrl=blockBlobClient.url; console.log(blobUrl);
//emit url to main server.js
sendURL(blobUrl);

//upload file
blockBlobClient.uploadBrowserData(_fileInput.input);  
}

//====================================================================================================
//html upload methods
selectButton.addEventListener("click", () => _fileInput.click());
_fileInput.addEventListener("change", uploadBlob);
// dummyButton.addEventListener("click", () => formButton.click());


