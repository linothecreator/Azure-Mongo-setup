console.log("azure.js");
var {disableResponseDecompressionPolicy}= require("@azure/core-http");
var {ClientRequest} = require("http");
require("regenerator-runtime/runtime");
var {BlobServiceClient} = require("@azure/storage-blob");
var { io } = require('socket.io-client');
const { send } = require("process");

const socket = io('http://localhost:3000');
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

// ab1.value="";
_fileInput.value="";

//Shared Access Signature URL
var SASurl="https://databsetut.blob.core.windows.net/container?sp=racwdl&st=2022-07-04T16:11:24Z&se=2022-07-31T00:11:24Z&sip=0.0.0.0-255.255.255.255&spr=https&sv=2021-06-08&sr=c&sig=bY3flFzPoTIqrKCCWZsYyBAvti0yXCavh%2BboTxEigY8%3D"
//lets create a blob service client
const container="container";
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
dummyButton.addEventListener("click", () => formButton.click());


