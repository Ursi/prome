const prome = new Proxy(()=>{}, {
	apply(targ, flag, args) {
		if (args[0] === targ) {
			if (!targ.chromeMethod) targ.chromeMethod = chrome;
			targ.chromeThis = targ.chromeMethod;
			targ.chromeMethod = targ.chromeMethod[args[1]];
		} else {
			const {
				chromeMethod,
				chromeThis,
			} = targ;

			delete targ.chromeMethod;
			delete targ.chromeThis;
			return new Promise(resolve => {
				chromeMethod.call(chromeThis, ...args, resolve)
			});
		}
	},
	get(targ, prop) {
		prome(targ, prop);
		return prome;
	},
});
