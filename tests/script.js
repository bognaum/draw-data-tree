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

document.querySelector("#simpleUsingGraph").
	textContent = assemblyTree(t_01, new DefaultDrawOptions()).result;

// ----------------------------------------------------------
// Another way to create graph


class EBOptions extends DefaultDrawOptions {
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

assemblyTree(t_01, new EBOptions(document.querySelector("#fromElementsBuildedGraph")));


// ----------------------------------------------------------
// DOM-model as template

class DTOptions extends DefaultDrawOptions {
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
			arr.push(` src="${m.src}"`);

		let content = "";
		if (m.localName == "h3")
			content = `"${ m.textContent }"`;

		this.result += `<${ arr.join("") }> ${ content }`;
	}
}

document.querySelector("#domAsTemplate").
	textContent = assemblyTree(document.documentElement, new DTOptions()).result;

// ----------------------------------------------------------
// Added numbers of rows

class WithNumbers extends DTOptions {
	newRow         (m   , rI      ) {
		this.result += (rI + 1).toString().padStart(4, " ") + ". ";
	}
	constructor () {
		super();
	}
}

document.querySelector("#withNumbers").
	textContent = assemblyTree(document.documentElement, new WithNumbers()).result;


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