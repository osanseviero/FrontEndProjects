var c = document.querySelector('#c');
var ctx = c.getContext("2d");
ctx.save();

var imgData = ctx.getImageData(0,0,400,400);

function paintGreen(imageData) {
	var numPixels = imageData.data.length/4;
	for(var i = 0; i < numPixels; i++) {
		if(i%10 === 0) {
			imageData.data[i * 4 + 1] = 255;
			imageData.data[i * 4 + 3] = 255;
		}
	}
	ctx.putImageData(imageData, 0, 0);
}


var makePixelGrayScale = function (r,g,b,a){
	var y = (0.3 * r) + (0.59 * g) + (0.11 *b);
	return {r:y, g:y, b:y, a:y};
}
function makeGrayScale(){
	var r,g,b,a;
	var imageData = ctx.getImageData(0,0,image.width,image.height);
	var numPixels = imageData.data.length/4;

	for (var i=0; i<numPixels; i++){
		r = imageData.data[i*4+0];
		g = imageData.data[i*4+1];
		b = imageData.data[i*4+2];
		a = imageData.data[i*4+3];
		pixel = makePixelGrayScale(r,g,b,a);
		imageData.data[i*4+0] = pixel.r;
		imageData.data[i*4+1] = pixel.g;
		imageData.data[i*4+2] = pixel.b;
		imageData.data[i*4+3] = pixel.a;
	}
	ctx.putImageData(imageData,0,0);
}

function invertPixels() {
  var imageData = ctx.getImageData(0,0,image.width,image.height);
  var length = imageData.data.length / 4;
  for (var i = 0; i < length; i++){
      imageData.data[i * 4 + 0] = 255 - imageData.data[i * 4 + 0];   //Red
      imageData.data[i * 4 + 1] = 255 - imageData.data[i * 4 + 1];   //Green
      imageData.data[i * 4 + 2] = 255 - imageData.data[i * 4 + 2];   //Blue
  }
  // Comment this line to see original image
  ctx.putImageData(imageData, 0, 0);
}


//paintGreen(imgData);

var image = new Image();
image.onload = function() {
	ctx.drawImage(image, 0, 0);
	invertPixels();
}
image.src = 'test.jpg';






