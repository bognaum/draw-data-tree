"use strict";

// Simple

class DefaultDrawOptions {
	constructor () {
		this.result = "";
		this.chProp = "ch";
	}
	addHeader      (m) {
		this.result += `${ m.ch ? "(/)" : "━#━" } ${ m.name }`;
	}
	addBranchEl    (type) {
		this.result += 
			type == "v" ? " ┃ " :
			type == "f" ? " ┣━" :
			type == "c" ? " ┗━" :
			type == "e" ? "   " :
				"ERR";
	}
	endOfRow       (m) {this.result += "\n";}
}

graph1.textContent = assemblyTree(t_01, new DefaultDrawOptions()).result;

// ----------------------------------------------------------
// DOM-model as template

class Orts2 extends DefaultDrawOptions {
	constructor () {
		super();
		this.chProp = "children";
	}
	addHeader      (m) {
		const arr = [m.localName];
		if (m.id)
			arr.push("#"+m.id);
		if (m.classList.length)
			arr.push("."+[].join.call(m.classList, "."));
		if (m.src)
			arr.push(` src="${m.src}"`)
		this.result += `<${ arr.join("") }>`;
	}
}

graph2.textContent = assemblyTree(document.documentElement, new Orts2()).result;

// ----------------------------------------------------------
// Added numbers of rows

class Orts3 extends DefaultDrawOptions {
	newRow         (m   , rI      ) {
		this.result += (rI + 1).toString().padStart(4, " ") + ". ";
	}
	constructor () {
		super();
		this.chProp = "children";
	}
	addHeader      (m) {
		const arr = [m.localName];
		if (m.id)
			arr.push("#"+m.id);
		if (m.classList.length)
			arr.push("."+[].join.call(m.classList, "."));
		if (m.src)
			arr.push(` src="${m.src}"`)
		this.result += `<${ arr.join("") }>`;
	}
}

graph3.textContent = assemblyTree(document.documentElement, new Orts3()).result;

// ----------------------------------------------------------
// Another way to create graph


class Opts4 extends DefaultDrawOptions {
	constructor (container) {
		super ();
		this.result = null;
		this.container = container;
		this.container.innerHTML = "";
	}
	newRow         (m   , rI      ) {
		this.currRow = this.eHTML(`<div class="row"></div>`);
		this.container.append(this.currRow);
	}
	addHeader      (m   , r_c     ) {
		const header = this.eHTML([
			`<span class="header">`,
				`<span class="symbol">${ m.ch ? "(/)" : "━#━" }</span>`,
				` `,
				`<span class="name">${ m.name }</span>`,
			`</span>`
		].join(""));
		this.currRow.append(header);
	}
	addBranchEl    (type, m  , r_c) {
		const inner = 
			type == "v" ? " ┃ " :
			type == "f" ? " ┣━" :
			type == "c" ? " ┗━" :
			type == "e" ? "   " :
				"ERR",
			el = this.eHTML(`<span class="branch">${ inner }</span>`);

		this.currRow.append(el);
	}
	endOfRow       (m   , rI      ) {}
	eHTML(code, shell=null) {
		const _shell = 
			! shell                  ? document.createElement("div") :
			typeof shell == "string" ? document.createElement(shell) :
			typeof shell == "object" ? shell :
				null;
		_shell.innerHTML = code;
		return _shell.children[0];
	}
}

assemblyTree(t_01, new Opts4(graph4));

// ----------------------------------------------------------
// All supported methods

class AllDrawOptions {
	constructor    (              ) {
		this.chProp = "ch";
	}
	initNodeBefore (m             ) {}
	newRow         (m   , rI      ) {}
	addHeader      (m   , r_c     ) {}
	addBranchEl    (type, m  , r_c) {}
	endOfRow       (m   , rI      ) {}
	initNodeAfter  (m             ) {}
}