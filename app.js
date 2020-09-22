function main() {
	var fs = require('fs'); // create file server object to access files
	var imageFiles = getImageFileNames(fs); // imageFiles in an array containing all of the images names

	var isoVal = getISOVals(fs, imageFiles); // this is an array we will make, we will store all of the ISO values in the same order the images are. Later we will sort both from highest to lowest!

	displayNames(imageFiles, isoVal); // now let's display the name based on the sorted order -- if two have the same ISO value show the first one in order, first
}

function getImageFileNames(fs) {
	return fs.readdirSync(process.cwd() + '/Photos_To_Review'); // process.cwd() is a node.js method to grab our current directory
}

function getISOVals(fs, imageFiles) {
	var exif = require('exif-parser'); // this is our node package that we will use to read the ISO data!
	var isoVal = [];
	for (var i = 0; i < imageFiles.length; i++) {
		let imageName = process.cwd() + '/Photos_To_Review/' + imageFiles[i];

		// This guide shows how to get ISO data from an image path: https://www.beyondjava.net/how-to-extract-exif-metadata-from-an-image
		const buffer = fs.readFileSync(imageName);
		const parser = exif.create(buffer);
		const result = parser.parse();
		isoVal[i] = result.tags.ISO; // add this ISO value to the array
	}

	return isoVal;
}

function displayNames(imageFiles, isoVal) {
	var set = new Set(); // create a hashset to save which images we have already displayed! (so we don't display the same one twice)

	// O(N^2) time complexity -- could be faster with a comparator -- if there are many image files this may need improvement!
	for (var i = 0; i < imageFiles.length; i++) {
		var currIso = -1;
		var currInd = -1;
		for (var j = 0; j < imageFiles.length; j++) {
			if (set.has(j) == false) {
				if (isoVal[j] > currIso) { // if the two images have the same ISO we display the one that appears first as the first one (we could do the last one by going greater than or equal!)
					currIso = isoVal[j];
					currInd = j;
				}
			}
		}

		set.add(currInd);
		console.log(imageFiles[currInd]);
	}
}

main(); // call our main function