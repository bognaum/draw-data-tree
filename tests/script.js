class DrawOptions {
	constructor () {
		this.result = "";
	}
	initNodeBefore (m)      {}
	newRow         (m, yi)  {}
	addHeader      (m, yxi) {
		this.result += m.ch ? "(/)" : "━#━";
		this.result += ` ${m.name}`;
	}
	addBranchEl    (type, m, yxi) {
		this.result += 
			type == "v" ? " ┃ " :
			type == "f" ? " ┣━" :
			type == "c" ? " ┗━" :
			type == "e" ? "   " :
				"ERR";
	}
	endOfRow       (m, yi) {this.result += "\n";}
	initNodeAfter  (m) {}
}

graph1.textContent = assemblyTree(t_01, new DrawOptions()).result;