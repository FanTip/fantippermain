var express = require('express');
const multer = require('multer');
const path = require('path');
var csrf = require('csurf');
var csrfProtection = csrf();

//Configeration of the Multer package
//---Location of the files saved
//---Name pattern of the each profile image
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, filename, callback){
        callback(null, filename.fieldname+ '-' + Date.now() + path.extname(filename.originalname));
    }
});

const creatorTileStorage = multer.diskStorage({
    destination : './public/uploads/tileImages',
    filename : function(req, filename, callback){
        callback(null, filename.filename + '-' + req.user.email + path.extname(filename.originalname));
    }
});

//Multer configerations (File size and the callback functions)
const upload = multer({
    storage : storage,
    limits: {fileSize : 1000000},
    fileFilter:function(req, filename, callback){
        checkFileType(filename, callback);
        console.log(filename);
    }
}).single('profileImage');

const uploadTile = multer({
    storage : creatorTileStorage,
    limits : {fileSize : 1000000},
    fileFilter:function(req, filename, callback){
        checkFileType(filename, callback);
    }
}).single('tileImage');


//storing the csrf token in the session cookie
csrf({cookie:true});

function checkFileType(filename, callback){
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(filename.originalname).toLowerCase());
    const mimeType = fileTypes.test(filename.mimetype);
    if(mimeType && extname){
        return callback(null, true);
    }else{
        callback('Error : Images only (Accepted extensions : jpeg,jpg,png,gif)');
    }
}

module.exports = {
    upload
}