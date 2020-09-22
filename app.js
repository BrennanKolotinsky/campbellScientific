// This guide shows how to get ISO data from an image path: https://www.beyondjava.net/how-to-extract-exif-metadata-from-an-image

function main() {
	console.log("Let's begin running this mini app!");
	var fs = require('fs'); // create file server object to access files
	var imageFiles = getImageFileNames(fs); // imageFiles in an array containing all of the images names

	var isoVal = getISOVals(fs, imageFiles); // this is an array we will make, we will store all of the ISO values in the same order the images are. Later we will sort both from highest to lowest!
	console.log(isoVal);
}

function getImageFileNames(fs) {
	return fs.readdirSync(process.cwd() + '/Photos_To_Review'); // process.cwd() is a node.js method to grab our current directory
}

function getISOVals(fs, imageFiles) {
	var exif = require('exif-parser'); // this is our node package that we will use to read the ISO data!
	var isoVal = [];
	for (var i = 0; i < imageFiles.length; i++) {
		let imageName = process.cwd() + '/Photos_To_Review/' + imageFiles[i];
		const buffer = fs.readFileSync(imageName);
		const parser = exif.create(buffer);
		const result = parser.parse();
		isoVal[i] = result.tags.ISO; // add this ISO value to the array
	}

	return isoVal;
}

main(); // call our main function