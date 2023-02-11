let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
	canvas.width = window.innerWidth - 10;
	canvas.height = window.innerHeight - 120;
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let r = 0;
let i = 0;
let rC;
let iC;

/*let kantenlänge = 0.002773013;
let xM = 0.650258764;
let yM = 0.064533868;
let anzahlIterationen = 400;
let aK = 10;*/

let kantenlängeinput = document.getElementById("kantenlängeSlider");


let kantenlänge = 3;
let xM = -0.7;
let yM = 0;
let anzahlIterationen = 400;
let aK = 5;

canvas.width = 640;
canvas.height = 480;

resizeCanvas();

/*r = 0;
i = 0;
rC = 2;
iC = 0;

for (let k = 0; k < 10; k++) {
	let r2 = r * r - i * i;
	let i2 = -2 * r * i;
	r = r2;
	i = i2;
	r = r + rC;
	i = i + iC;
	console.log(i, r);
}*/

console.log("ready");

function draw() {
	for (let k = 0; k < canvas.width; k++) {
		for (let j = 0; j < canvas.height; j++) {
			ctx.fillStyle = "black";
			let iteration = 0;
			rC = xM - kantenlänge * 0.5 + (kantenlänge / canvas.width) * k;
			iC = yM - kantenlänge * 0.5 + (kantenlänge / canvas.height) * j;
			r = 0;
			i = 0;
			while (iteration < anzahlIterationen) {
				iteration++;
				//(a²-b²)-2abi
				let code =
					"";
				let iterationsberechnung = iterationBerechnen(r, i, "");
				r = iterationsberechnung.r;
				i = iterationsberechnung.i;
				//console.log(i,r);
				if (Math.sqrt(r * r + i * i) > aK) {
					ctx.fillStyle = "white";
					iteration = anzahlIterationen;
				}
			}
			ctx.fillRect(
				(k / canvas.width) * canvas.width,
				(j / canvas.height) * canvas.height,
				1,
				1
			);
		}
	}
}

function iterationBerechnen(r, i, codeasString) {
	//eval(codeasString);
	r2 = r * r - i * i;i2 = 2 * r * i;r = r2;i = i2;r = r +rC;i = i + iC;
	//r2 = r * r - i * i;i2 = 2 * r * i;r = r2;i = i2;r = r - iC;i = i + rC;
	return { r: r, i: i };
}

draw();
