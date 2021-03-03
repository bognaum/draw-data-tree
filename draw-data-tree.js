"use strict";
function assemblyTree(treeModel, o) {

	o.getPath = o.getPath || ((pathArr) => pathArr.join("/"));
	
	let 
		lastChildStateArr = [],
		yi = 0,
		mArr = []

	recursive(treeModel);
	return o;
		

	function recursive(mNode) {
		if (o.initNodeBefore)
			o.initNodeBefore(mNode);

		createRow(mNode, 1);
		lastChildStateArr.push(!(mNode.ch && mNode.ch.length));
		mArr.push(mNode);
		// o.addSecondHeaderLine && createRow(mNode, 2);
		// createRow(mNode);

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
		let xi = 0;
		if (o.newRow)
			o.newRow(mNode, yi);

		let 
			len = lastChildStateArr.length,
			lastK = len - 1;
		for (let k = 0; k < len; k++) {
			let type;

			if (rowType == 1 && k == lastK) 
				type = lastChildStateArr[k] ? "c" : "f";
			else
				type = lastChildStateArr[k] ? "e" : "v";

			let yxi = [yi, xi];
			o.addBranchEl(type, mArr[k] ,yxi);
			xi ++;
		}
		
		let yxi = [yi, xi];

		if (rowType == 1) {
			o.addHeader(mNode, yxi);
		} else if (rowType == 2 && o.addHExt) {
			o.addSecondHeaderLine(mNode ,yxi);
		} 

		if (o.endOfRow)
			o.endOfRow(mNode, yi);

		yi ++;
	}

}