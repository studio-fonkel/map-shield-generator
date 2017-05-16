'use strict';

const Jimp = require('jimp');

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

// node index.js 10 20 1 222222

let imageData = [
  [ 0xFF0000FF, 0xFF0000FF, 0xFF0000FF ],
  [ 0xFF0000FF, false, 0xFF0000FF ],
  [ 0xFF0000FF, 0xFF0000FF, 0x0000FFFF ]
];


let image = new Jimp(30, 30, function (err, image) {
  if (err) throw err;

  imageData.forEach((row, y) => {
    row.forEach((color, x) => {
      if (color) {
        image.setPixelColor(color, x, y);
      }
    });
  });

  image.write('test.png', (err) => {
    if (err) throw err;
  });
});