const prome = new Proxy({}, {
	// the double proxy is required for nesting
	get(_, prop) {
		return new Proxy(()=>{}, {
			apply(targ, thisArg, args) {
				if (thisArg === targ) {
					if (!targ.chromeMethod) targ.chromeMethod = chrome;
					targ.chromeThis = targ.chromeMethod;
					targ.chromeMethod = targ.chromeMethod[args[0]];
				} else {
					const {
						chromeMethod,
						chromeThis,
					} = targ;

					delete targ.chromeMethod;
					delete targ.chromeThis;
					return new Promise((resolve, reject) => {
						try {
							chromeMethod.call(chromeThis, ...args, resolve);
						} catch (error) {
							reject(error);
						}
					});
				}
			},
			get(targ, prop, rec) {
				if (prop === Symbol.toPrimitive) {// chromium dev tools likes to call this
					return ()=> `prome`;
				} else {
					Function.prototype.call.call(rec, targ, prop);
					return rec;
				}
			},
		})[prop];
	}
});
