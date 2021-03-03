"use strict";
class DefaultDrawOptions {
	constructor () {
		this.result = "";
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


class AllDrawOptions {
	constructor    (              ) {}
	initNodeBefore (m             ) {}
	newRow         (m   , rI      ) {}
	addHeader      (m   , r_c     ) {}
	addBranchEl    (type, m  , r_c) {}
	endOfRow       (m   , rI      ) {}
	initNodeAfter  (m             ) {}
}