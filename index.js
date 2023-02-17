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
let apfelmännchen = {
	kantenlänge: 0.0000350911,
	xM: 0.225305566,
	yM: 0.840426025,
	startX: 0,
	startY: 0,
	anzahlIterationen: 1131,
	aK: 100,
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
let blueMoon = {
	kantenlänge: 0.0164069,
	xM: -0.9355857,
	yM: -0.171,
	startX: 0,
	startY: 0,
	anzahlIterationen: 100,
	aK: 10,
	formel: "",
};
let schleife = {
	kantenlänge: 2.24,
	xM: 7.848,
	yM: 4.8,
	startX: 0,
	startY: 0,
	anzahlIterationen: 50,
	aK: 100000000,
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
	if (fraktalinput.value == "Apfelmännchen") {
		ausgewählt = apfelmännchen;
	}
	if (fraktalinput.value == "Schleife") {
		ausgewählt = schleife;
	}
	if (fraktalinput.value == "Sternhaufen") {
		ausgewählt = sternhaufen;
	}
	if (fraktalinput.value == "Blauer Mond") {
		ausgewählt = blueMoon;
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
	if (fraktalinput.value == "Apfelmännchen") {
		ausgewählt = apfelmännchen;
	}
	if (fraktalinput.value == "Schleife") {
		ausgewählt = schleife;
	}
	if (fraktalinput.value == "Sternhaufen") {
		ausgewählt = sternhaufen;
	}
	if (fraktalinput.value == "Blauer Mond") {
		ausgewählt = blueMoon;
	}
	ausgewählt.kantenlänge = kantenlängeinput.value;
	ausgewählt.xM = xMinput.value;
	ausgewählt.yM = yMinput.value;
	ausgewählt.anzahlIterationen = anzahlIterationeninput.value;
	ausgewählt.aK = aKinput.value;
	draw();
});

let ausgewählt = mandelbrot;
kantenlängeinput.value = ausgewählt.kantenlänge;
xMinput.value = ausgewählt.xM;
yMinput.value = ausgewählt.yM;
anzahlIterationeninput.value = ausgewählt.anzahlIterationen;
aKinput.value = ausgewählt.aK;

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
				let iterationsberechnung = iterationBerechnen(
					r,
					i,
					codeAsString,
					iteration
				);
				r = iterationsberechnung.r;
				i = iterationsberechnung.i;
				iteration++;
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

function iterationBerechnen(r, i, codeAsString, iteration) {
	if (ausgewählt == seepferdchen) {
		let r2 = r * r - i * i;
		let i2 = 2 * r * i;
		r = r2;
		i = i2;
		r = r - iC;
		i = i + rC;
	} else if (ausgewählt == apfelmännchen) {
		let r2 = r * r - i * i;
		let i2 = 2 * r * i;
		r = r2;
		i = i2;
		r = r - iC;
		i = i + rC;
	} else if (ausgewählt == mandelbrot) {
		let r2 = r * r - i * i;
		let i2 = 2 * r * i;
		r = r2;
		i = i2;
		r = r + rC;
		i = i + iC;
	} else if (ausgewählt == schleife) {
		if (iteration == 0) {
			r = rC;
			i = iC;
		}
		//Potenzieren von komplexen Zahlen https://www.youtube.com/watch?v=rXM9GXxa-cU
		let phi = 0;
		if (!isNaN(Math.acos(r / Math.sqrt(r * r + i * i)))) {
			phi = Math.acos(r / Math.sqrt(r * r + i * i));
		}
		const z_5_r = Math.pow(r, 5) * Math.cos(5 * phi);
		const z_5_i = Math.pow(r, 5) * Math.sin(5 * phi);
		const z_4_r = Math.pow(r, 4) * Math.cos(4 * phi);
		const z_4_i = Math.pow(r, 4) * Math.sin(4 * phi);
		//dividieren von komplexen Zahlen https://www.mathebibel.de/komplexe-zahlen-dividieren
		let nenner_R = z_5_r - 2 * r - 1 + z_5_i * i;
		let zähler_R = 5 * z_4_r - 2;
		let nenner_I = z_5_i - 2 * i + z_5_i * r;
		let zähler_I = 5 * z_4_i - 2;
		r =
			r -
			(nenner_R * zähler_R + nenner_I * -zähler_I) /
				(nenner_R * nenner_R - nenner_I * nenner_I);
		i =
			i -
			(nenner_R * -zähler_I + nenner_I * zähler_R) /
				(nenner_R * nenner_R - nenner_I * nenner_I);
		console.log(
			"i: ",
			i,
			"r: ",
			r,
			"phi: ",
			phi,
			"zhoch5r: ",
			z_5_r,
			"zhoch5i: ",
			z_5_i,
			z_4_r,
			z_4_i
		);
	} else if (ausgewählt == sternhaufen) {
		let phi = 0;
		if (!isNaN(Math.acos(r / Math.sqrt(r * r + i * i)))) {
			phi = Math.acos(r / Math.sqrt(r * r + i * i));
		}
		r = r * Math.tan(phi);
		i = i * Math.tan(phi);
		r = r - iC;
		i = i + rC;
	} else if (ausgewählt == blueMoon) {
		//@TODO
		let zminusC_3_r =
			Math.pow(r, 3) *
			Math.cos(
				3 *
					Math.acos(
						(r - rC) / Math.sqrt((r - rC) * (r - rC) + (i - iC) * (i - iC))
					)
			);
		let zminusC_3_i =
			Math.pow(r, 3) *
			Math.sin(
				3 *
					Math.acos(
						(r - rC) / Math.sqrt((r - rC) * (r - rC) + (i - iC) * (i - iC))
					)
			);
		let zminusiMalc_2_r =
			Math.pow(r, 2) *
			Math.cos(
				2 *
					Math.acos(
						(r + iC) / Math.sqrt((r + iC) * (r + iC) + (i - rC) * (i - rC))
					)
			);
		let zminusiMalc_2_i =
			Math.pow(r, 2) *
			Math.sin(
				2 *
					Math.acos(
						(r + iC) / Math.sqrt((r + iC) * (r + iC) + (i - rC) * (i - rC))
					)
			);
		//dividieren von komplexen Zahlen https://www.mathebibel.de/komplexe-zahlen-dividieren
		let nenner_R = zminusC_3_r - 2 * (r - rC);
		let zähler_R = 3 * zminusiMalc_2_r;
		let nenner_I = zminusC_3_i - 2 * (i - iC) - 4;
		let zähler_I = 3 * zminusiMalc_2_i;
		r =
			r -
			rC -
			(nenner_R * zähler_R + nenner_I * -zähler_I) /
				(nenner_R * nenner_R - nenner_I * nenner_I);
		i =
			i -
			iC -
			(nenner_R * -zähler_I + nenner_I * zähler_R) /
				(nenner_R * nenner_R - nenner_I * nenner_I);
		//console.log("i: ",i,"r: ", r, "zhoch5r: ",zminusC_3_r, "zhoch5i: ",zminusC_3_i, zminusiMalc_2_r, zminusiMalc_2_i);
	} else if (codeAsString != "") {
		eval(codeAsString);
	}
	return { r: r, i: i };
}

draw();
