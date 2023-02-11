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

let mandelbrot = {
	kantenlänge: 3,
	xM: -0.7,
	yM: 0,
	startX: 0,
	startY: 0,
	anzahlIterationen: 20,
	aK: 5,
	formel: "",
};
let seepferdchen = {
	kantenlänge: 0.002773013,
	xM: 0.650258764,
	yM: 0.064533868,
	startX: 0,
	startY: 0,
	anzahlIterationen: 400,
	aK: 10,
	formel: "",
};
//TODO
let sternhaufen = {
	kantenlänge: 2,
	xM: 0,
	yM: 0,
	startX: -0.221346489,
	startY: 1.464902383,
	anzahlIterationen: 100,
	aK: 100,
	formel: "",
};

let kantenlängeinput = document.getElementById("kantenlängeinput");
let xMinput = document.getElementById("xMinput");
let yMinput = document.getElementById("yMinput");
let anzahlIterationeninput = document.getElementById("anzahlItterationeninput");
let aKinput = document.getElementById("aKinput");
let fraktalinput = document.getElementById("fraktalinput");
fraktalinput.addEventListener("input", ev => {
	if (fraktalinput.value == "Mandelbrot") {
		ausgewählt = mandelbrot;
	}
	if (fraktalinput.value == "Seepferdchen") {
		ausgewählt = seepferdchen;
	}
	kantenlängeinput.value = ausgewählt.kantenlänge;
	xMinput.value = ausgewählt.xM;
	yMinput.value = ausgewählt.yM;
	anzahlIterationeninput.value = ausgewählt.anzahlIterationen;
	aKinput.value = ausgewählt.aK;
});

let drawbtn = document.getElementById("draw");
drawbtn.addEventListener("click", ev => {
	if (fraktalinput.value == "Mandelbrot") {
		ausgewählt = mandelbrot;
	}
	if (fraktalinput.value == "Seepferdchen") {
		ausgewählt = seepferdchen;
	}
	ausgewählt.kantenlänge = kantenlängeinput.value;
	ausgewählt.xM = xMinput.value;
	ausgewählt.yM = yMinput.value;
	ausgewählt.anzahlIterationen = anzahlIterationeninput.value;
	ausgewählt.aK = aKinput.value;
	draw();
});

let ausgewählt = seepferdchen;
kantenlängeinput.value = ausgewählt.kantenlänge;
xMinput.value = ausgewählt.xM;
yMinput.value = ausgewählt.yM;
anzahlIterationeninput.value = ausgewählt.anzahlIterationen;
aKinput.value = ausgewählt.aK;

console.log(Math.tanh(90 * Math.PI));
resizeCanvas();

console.log("ready");

function draw(codeAsString) {
	for (let k = 0; k < canvas.width; k++) {
		for (let j = 0; j < canvas.height; j++) {
			ctx.fillStyle = "white";
			let iteration = 0;
			rC =
				ausgewählt.xM -
				ausgewählt.kantenlänge * 0.5 +
				(ausgewählt.kantenlänge / canvas.width) * k +
				ausgewählt.startX;
			iC =
				ausgewählt.yM -
				ausgewählt.kantenlänge * 0.5 +
				(ausgewählt.kantenlänge / canvas.height) * j +
				ausgewählt.startX;
			r = 0;
			i = 0;
			while (
				iteration < ausgewählt.anzahlIterationen &&
				Math.sqrt(r * r + i * i) < ausgewählt.aK
			) {
				iteration++;
				let iterationsberechnung = iterationBerechnen(r, i, codeAsString);
				r = iterationsberechnung.r;
				i = iterationsberechnung.i;
			}
			if (iteration == ausgewählt.anzahlIterationen) {
				ctx.fillStyle = "white";
			} else {
				let colorvalue = Math.floor(
					(iteration / ausgewählt.anzahlIterationen) * 255
				);
				ctx.fillStyle = "rgb(" + colorvalue + "," + 0 + "," + 0 + ")";
			}

			ctx.fillRect(
				(k / canvas.width) * canvas.width,
				(j / canvas.height) * canvas.height,
				1,
				1
			);
		}
	}
	console.log("Fertig gezeichnet");
}

function iterationBerechnen(r, i, codeAsString) {
	if (ausgewählt == seepferdchen) {
		r2 = r * r - i * i;
		i2 = 2 * r * i;
		r = r2;
		i = i2;
		r = r - iC;
		i = i + rC;
	} else if (ausgewählt == mandelbrot) {
		r2 = r * r - i * i;
		i2 = 2 * r * i;
		r = r2;
		i = i2;
		r = r + rC;
		i = i + iC;
	} else if (ausgewählt == sternhaufen) {
		const e_2iz = Math.exp(2 * i * r);
		const resultReal = r * (e_2iz - 1) / (e_2iz + 1);
		const resultImg = i * (e_2iz - 1) / (e_2iz + 1);
		r = resultReal;
		i = resultImg;
		r = r + rC;
		i = i + iC;
	} else if (codeAsString != "") {
		eval(codeAsString);
	}
	return { r: r, i: i };
}

draw();
