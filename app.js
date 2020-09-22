// research shows this package will display ISO data: https://github.com/gomfunkel/node-exif

var fs = require('fs'); // create file server object to access files
var imageFiles = fs.readdirSync(process.cwd() + '/Photos_To_Review'); // process.cwd() is a node.js method to grab our current directory
// note: imageFiles in an array containing all of the images names

let isoVal = []; // this is an array we will make, we will store all of the ISO values in the same order the images are. Later we will sort both from highest to lowest!


// Image_846.jpg

var exif = require('exif-parser');

const buffer = fs.readFileSync('Image_846.jpg');
const parser = exif.create(buffer);
const result = parser.parse();

console.log(result);
// var metadata = exif(buffer);

// console.log(metadata);



// for (var i = 0; i < 1; i++) { //imageFiles.length
// 	let imgName = 'Photos_To_Review/' + imageFiles[i];
// 	try {
// 	    new ExifImage({ image : imgName }, function (error, exifData) {
// 	        if (error)
// 	            console.log('Error: '+error.message);
// 	        else
// 	            console.log(exifData); // Do something with your data!
// 	    });
// 	} catch (error) {
// 	    console.log('Error: ' + error.message);
// 	}
// }