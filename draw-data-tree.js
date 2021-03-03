"use strict";
function assemblyTree(treeModel, o) {

	o.getPath = o.getPath || ((pathArr) => pathArr.join("/"));
	
	let 
		lastChildStateArr = [],
		rI = 0,
		mArr = []

	recursive(treeModel);
	return o;
		

	function recursive(mNode) {
		if (o.initNodeBefore)
			o.initNodeBefore(mNode);

		createRow(mNode, 1);
		lastChildStateArr.push(!(mNode.ch && mNode.ch.length));
		mArr.push(mNode);

		if (mNode.ch) {
			let lastChIndex = mNode.ch.length - 1
			for (let i = 0; i < mNode.ch.length; i++) {

				lastChildStateArr[lastChildStateArr.length - 1] = i == lastChIndex;
				recursive(mNode.ch[i]);
			}
		}

		lastChildStateArr.pop();
		mArr.pop();

		if (o.initNodeAfter)
			o.initNodeAfter(mNode);
	}

	function createRow(mNode, rowType) {
		let cI = 0;
		if (o.newRow)
			o.newRow(mNode, rI);

		let 
			len = lastChildStateArr.length,
			lastK = len - 1;
		for (let k = 0; k < len; k++) {
			let type;

			if (rowType == 1 && k == lastK) 
				type = lastChildStateArr[k] ? "c" : "f";
			else
				type = lastChildStateArr[k] ? "e" : "v";

			o.addBranchEl(type, mArr[k], {row: rI, cell: cI});
			cI ++;
		}
		o.addHeader(mNode, {row: rI, cell: cI});

		if (o.endOfRow)
			o.endOfRow(mNode, rI);
		rI ++;
	}

}