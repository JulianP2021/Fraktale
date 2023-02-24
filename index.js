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
	type: "Mandelbrot-Set",
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
	type: "Mandelbrot-Set",
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
	type: "Mandelbrot-Set",
	formel: "",
};

let sternhaufen = {
	kantenlänge: 0.5,
	xM: 0,
	yM: 0,
	startX: -0.221346489,
	startY: 1.464902383,
	anzahlIterationen: 100,
	aK: 100,
	type: "Julia-Menge",
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
	type: "Mandelbrot-Set",
	formel: "",
};

let plasmakugel = {
	kantenlänge: 0.000912495,
	xM: 0.073347907,
	yM: 0.045859537,
	startX: 0,
	startY: 0,
	anzahlIterationen: 100,
	aK: 60,
	type: "Newton-Fraktal",
	formel: "",
};

let schleife = {
	kantenlänge: 2.24,
	xM: 7.848,
	yM: 4.8,
	startX: 0,
	startY: 0,
	anzahlIterationen: 50,
	//TODO
	aK: 10,
	type: "Newton-Fraktal",
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
	if (fraktalinput.value == "Plasmakugel") {
		ausgewählt = plasmakugel;
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
	if (fraktalinput.value == "Plasmakugel") {
		ausgewählt = plasmakugel;
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

//resizeCanvas();

console.log("ready");

function draw(codeAsString) {
	for (let k = 0; k < canvas.width; k++) {
		for (let j = 0; j < canvas.height; j++) {
			ctx.fillStyle = "white";
			let iteration = 0;
			if (ausgewählt.type == "Mandelbrot-Set") {
				rC = getPixelCoordinate(k, j).r;
				iC = getPixelCoordinate(k, j).i;
				r = 0;
				i = 0;
			} else if (ausgewählt.type == "Julia-Menge") {
				rC = ausgewählt.startX;
				iC = ausgewählt.startY;
				r = getPixelCoordinate(k, j).r;
				i = getPixelCoordinate(k, j).i;
			} else if (ausgewählt.type == "Newton-Fraktal") {
				rC = 0;
				iC = 0;
				r = getPixelCoordinate(k, j).r;
				i = getPixelCoordinate(k, j).i;
			}
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

function iterationBerechnen(r, i, codeAsString) {
	if (ausgewählt == seepferdchen) {
		let ergebniss = potenzieren(r, i, 2);
		let r2 = ergebniss.r;
		let i2 = ergebniss.i;
		r = r2;
		i = i2;
		r = r - iC;
		i = i + rC;
	} else if (ausgewählt == apfelmännchen) {
		let ergebniss = potenzieren(r, i, 2);
		let r2 = ergebniss.r;
		let i2 = ergebniss.i;
		r = r2;
		i = i2;
		r = r - iC;
		i = i + rC;
	} else if (ausgewählt == mandelbrot) {
		let ergebniss = potenzieren(r, i, 2);
		let r2 = ergebniss.r;
		let i2 = ergebniss.i;
		r = r2;
		i = i2;
		r = r + rC;
		i = i + iC;
	} else if (ausgewählt == schleife) {
		const z_5_r = potenzieren(r, i, 5).r;
		const z_5_i = potenzieren(r, i, 5).i;
		const z_4_r = potenzieren(r, i, 4).r;
		const z_4_i = potenzieren(r, i, 4).i;
		//dividieren von komplexen Zahlen https://www.mathebibel.de/komplexe-zahlen-dividieren
		let zähler_R = z_5_r - 2 * r - 1;
		let zähler_I = z_5_i - 2 * i;
		let nenner_R = 5 * z_4_r - 2;
		let nenner_I = 5 * z_4_i;
		r = r - teilen(zähler_R, zähler_I, nenner_R, nenner_I).r;
		i = i - teilen(zähler_R, zähler_I, nenner_R, nenner_I).i;
	} else if (ausgewählt == sternhaufen) {
		//tangens bestimmen https://www.redcrab-software.com/de/Rechner/Komplex/Tan
		let tan_R = Math.sin(2 * r) / (Math.cos(2 * r) + Math.cosh(2 * i));
		let tan_I = Math.sin(2 * i) / (Math.cos(2 * r) + Math.cosh(2 * i));
		r = r * tan_R - iC;
		i = i * tan_I + rC;
	} else if (ausgewählt == blueMoon) {
		//phi bestimmen http://www.math-grain.de/download/m1/komplex/potenzieren-1.pdf S.12
		let zminusC_3_r = potenzieren(r - rC, i - iC, 3).r;
		let zminusC_3_i = potenzieren(r - rC, i - iC, 3).i;
		let zminusiMalc_2_r = potenzieren(r + iC, i - rC, 2).r;
		let zminusiMalc_2_i = potenzieren(r + iC, i - rC, 2).i;
		//dividieren von komplexen Zahlen https://www.mathebibel.de/komplexe-zahlen-dividieren
		let zähler_R = zminusC_3_r - 2 * (r - rC);
		let zähler_I = zminusC_3_i - 2 * (i - iC) - 4;
		let nenner_R = 3 * zminusiMalc_2_r;
		let nenner_I = 3 * zminusiMalc_2_i - 2;
		r = r - rC - teilen(zähler_R, zähler_I, nenner_R, nenner_I).r;
		i = i - iC - teilen(zähler_R, zähler_I, nenner_R, nenner_I).i;
		/*console.log(
			"i: ",
			i,
			"r: ",
			r,
			"zhoch5r: ",
			zminusC_3_r,
			"zhoch5i: ",
			zminusC_3_i,
			zminusiMalc_2_r,
			zminusiMalc_2_i
		);*/
	} else if (codeAsString != "") {
		eval(codeAsString);
	}
	return { r: r, i: i };
}

function phiermitteln(r, i) {
	if (zBetrag(r, i) != 0) {
		if (r > 0) {
			return Math.asin(i / zBetrag(r, i));
		} else {
			return Math.PI - Math.asin(i / zBetrag(r, i));
		}
	} else {
		return 0;
	}
}

function potenzieren(r1, i1, n) {
	let phi = phiermitteln(r1, i1);
	/*if(Math.pow(zBetrag(r1, i1), n) * Math.cos(n * phi)!=multiplizieren(r1,i1,r1,i1).r || Math.pow(zBetrag(r1, i1), n) * Math.sin(n * phi) != multiplizieren(r1,i1,r1,i1).i){
		console.log( Math.pow(zBetrag(r1, i1), n) * Math.cos(n * phi),Math.pow(zBetrag(r1, i1), n) * Math.sin(n * phi),multiplizieren(r1,i1,r1,i1),r1,i1, phi, Math.PI/2);
	}*/
	return {
		r: Math.pow(zBetrag(r1, i1), n) * Math.cos(n * phi),
		i: Math.pow(zBetrag(r1, i1), n) * Math.sin(n * phi),
	};
}

function teilen(nenner_R, nenner_I, zähler_R, zähler_I) {
	return {
		r:
			(nenner_R * zähler_R + nenner_I * zähler_I) /
			(zähler_R * zähler_R + zähler_I * zähler_I),
		i:
			(nenner_R * -zähler_I + nenner_I * zähler_R) /
			(zähler_R * zähler_R + zähler_I * zähler_I),
	};
}

function zBetrag(r, i) {
	return Math.sqrt(Math.pow(r, 2) + Math.pow(i, 2));
}

function getPixelCoordinate(k, j) {
	return {
		r:
			ausgewählt.xM -
			ausgewählt.kantenlänge * 0.5 +
			(ausgewählt.kantenlänge / canvas.width) * k,
		i:
			ausgewählt.yM -
			ausgewählt.kantenlänge * 0.5 +
			(ausgewählt.kantenlänge / canvas.height) * j,
	};
}

function multiplizieren(r1, i1, r2, i2) {
	return { r: r1 * r2 - i1 * i2, i: r1 * i2 + i1 * r2 };
}

console.log(teilen(2, 3, 1, -4));
draw();
