"use strict";
function assemblyTree(treeModel, o) {
	if (o.beforeAssembly)
		o.beforeAssembly(treeModel);
	const chProp = o.chProp || "ch"
	
	let 
		lastChildStateArr = [],
		rI = 0,
		mArr = []

	recursive(treeModel);

	if (o.afterafterAssembly)
		o.afterafterAssembly(treeModel);
	return o;
		

	function recursive(mNode) {
		createRow(mNode, 1);
		lastChildStateArr.push(!(mNode[chProp] && mNode[chProp].length));
		mArr.push(mNode);

		if (mNode[chProp]) {
			let lastChIndex = mNode[chProp].length - 1
			for (let i = 0; i < mNode[chProp].length; i++) {

				lastChildStateArr[lastChildStateArr.length - 1] = i == lastChIndex;
				recursive(mNode[chProp][i]);
			}
		}

		lastChildStateArr.pop();
		mArr.pop();
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