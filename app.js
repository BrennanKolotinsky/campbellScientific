// research shows this package will display ISO data: https://github.com/gomfunkel/node-exif

var fs = require('fs'); // create file server object to access files
var files = fs.readdirSync(process.cwd() + '/Photos_To_Review'); // process.cwd() is a node.js method to grab our current directory

console.log(files[0]);