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
	kantenlänge: 0.5,
	xM: 0,
	yM: 0,
	startX: -0.221346489,
	startY: 1.464902383,
	anzahlIterationen: 100,
	aK: 100,
	formel: "",
};

let ausgewählt = mandelbrot;

let kantenlängeinput = document.getElementById("kantenlängeSlider");
kantenlängeinput.addEventListener("input", ev => {
	ausgewählt.kantenlänge = kantenlängeinput.value;
});
let xMinput = document.getElementById("xMSlider");
xMinput.addEventListener("input", ev => {
	ausgewählt.xM = xMinput.value;
});
let yMinput = document.getElementById("yMSlider");
yMinput.addEventListener("input", ev => {
	ausgewählt.yM = yMinput.value;
});
let anzahlIterationeninput = document.getElementById(
	"anzahlItterationenSlider"
);
anzahlIterationeninput.addEventListener("input", ev => {
	ausgewählt.anzahlIterationen = anzahlIterationeninput.value;
});
let aKinput = document.getElementById("aKSlider");
aKinput.addEventListener("input", ev => {
	ausgewählt.aK = aKinput.value;
});

let drawbtn = document.getElementById("draw");
drawbtn.addEventListener("click", ev => {
	draw();
});

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
		r2 = Math.tan(i / r) * r;
		i2 = Math.tan(i / r) * i;
		r = r2;
		i = i2;
		r = r - iC;
		i = i + rC;
	} else if (codeAsString != "") {
		eval(codeAsString);
	}
	return { r: r, i: i };
}

draw();
