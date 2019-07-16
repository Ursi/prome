function getPath(obj, path) {
	let value = obj;
	for (let pathPart of path) {
		value = value[pathPart];
	}

	return value;
}

function makePromise(path, cbPos) {
	return function(...args) {
		let methodThis = getPath(chrome, path.slice(0, -1));
		let method = methodThis[path[path.length - 1]];
		return new Promise(resolve => {
			args[cbPos] = resolve;
			method.apply(methodThis, args);
		});
	}
}

let promiseMe =  {//the number is the index of the callback
	bookmarks: {
		getChildren: 1,
		move: 2,
	},
	storage: {
		sync: {
			get: 1,
			set: 1,
		},
	},
	tabs: {
		get: 1,
		query: 1,
		sendMessage: 3,
		update: 2,
	},
}

let prome = {};
(function makeProme(obj, path = []) {
	for (let [p, v] of Object.entries(obj)) {
		if (typeof v == 'number') {
			getPath(prome, path)[p] = makePromise(path.concat([p]), v);
		} else {
			getPath(prome, path)[p] = {};
			makeProme(v, path.concat(p));
		}
	}
})(promiseMe);

export default prome;
