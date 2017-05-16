'use strict';

const Jimp = require('jimp');

// Defaults:
var options = {
  letterWidth: 10,
  letterHeight: 10,
  paddingX: 5,
  paddingY: 5,
  borderColor: 0xFF000000,
  contentColor: 0xFF000000,
  amount: 1,
  folder: 'images/',
  filenamePrefix: 'image-'
}

// Set options:
process.argv.forEach(function (val, index, array) {
  switch(index) {
    case 2:
      options.letterWidth = parseInt(val);
      break;
    case 3:
      options.letterHeight = parseInt(val);
      break;
    case 4:
      options.paddingX = parseInt(val);
      break;
    case 5:
      options.paddingY = parseInt(val);
      break;
    case 6:
      var values = val.split(",");
      var r = parseInt(values[0]);
      var g = parseInt(values[1]);
      var b = parseInt(values[2]);
      var a = parseInt(values[3]);
      options.borderColor = Jimp.rgbaToInt(r, g, b, a);
      break;
    case 7:
      var values = val.split(",");
      var r = parseInt(values[0]);
      var g = parseInt(values[1]);
      var b = parseInt(values[2]);
      var a = parseInt(values[3]);
      options.contentColor = Jimp.rgbaToInt(r, g, b, a);
      break;
    case 8:
      options.amount = parseInt(val);
      break;
    case 9:
      options.filenamePrefix = val;
      break;
  }

});

// node index.js 10 20 5 3 1 0,0,0,255 5
// node index.js letterWidth letterHeight paddingX paddingY r,g,b,a amount

for (var i = 1; i <= options.amount; i++) {

  // Set current image dimensions:
  let imageWidth = options.letterWidth * i + (options.paddingX * 2);
  let imageHeight = options.letterHeight + (options.paddingY * 2);

  // Create image:
  let image = new Jimp(parseInt(imageWidth), parseInt(imageHeight), function (err, image) {
    if (err) throw err;

    for (var x = 0; x < imageWidth; x++) {
	    for (var y = 0; y < imageHeight; y++) {
			image.setPixelColor(options.contentColor, x, y);
		}
	}

    // Each row of pixels:
    for (var y = 0; y < imageHeight; y++) {
      let border = 0;

      switch(y) {
        case 0:
          border = 1;
          break;
        case imageHeight-1:
          border = 1;
          break;
      }
      if (border) {
        // Each column that needs a border:
        for (var x = 0; x < imageWidth; x++) {
          image.setPixelColor(options.borderColor, x, y);
        }
      }
    }
    // Each column:
    for (var x = 0; x < imageWidth; x++) {
      let border = 0;

      switch(x) {
        case 0:
          border = 1;
          break;
        case imageWidth-1:
          border = 1;
          break;
      }
      if (border) {
        for (var y = 0; y < imageHeight; y++) {
          image.setPixelColor(options.borderColor, x, y);
        }
      }
    }

    image.write(options.folder + options.filenamePrefix + i +'.png', (err) => {
      if (err) throw err;
    });
  });

}
