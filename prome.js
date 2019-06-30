/*export default {
    bookmarks: {
        getChildren(id) {
            return new Promise(resolve => {
                chrome.bookmarks.getChildren(id, resolve);
            });
        },
        move(id, destination) {
            return new Promise(resolve => {
                chrome.bookmarks.move(id, destination, resolve);
            });
        },
    },
    storage: {
        sync: {
            get(keys) {
                return new Promise(resolve => {
                    chrome.storage.sync.get(keys, resolve);
                });
            },
            set(items) {
                return new Promise(resolve => {
                    chrome.storage.sync.set(items, resolve);
                });
            },
        },
    },
    tabs: {
        get(tabId) {
            return new Promise(resolve => {
                chrome.tabs.get(tabId, resolve);
            });
        },
        query(queryInfo) { //chrome.tabs.query(object queryInfo, function callback)
            return new Promise(resolve => {
                chrome.tabs.query(queryInfo, resolve);
            });
        },
        sendMessage(tabId, message, options) {
            return new Promise(resolve => {
                chrome.tabs.sendMessage(tabId, message, options, resolve);
            });
        },
        update(tabId, updateProperties) {
            return new Promise(resolve => {
                chrome.tabs.update(tabId, updateProperties, resolve);
            });
        },
    },
};*/

function getPath(obj, ...path) {
    let value = obj;
    for (let pathPart of path) {
        value = value[pathPart];
    }

    return value;
},

function makePromise(path, cbPos) {
    return function(...args){
        let method = chrome;
        let methodThis;
        let method = getPath(chrome, path);
        let methodThis = getPath(chrome, path.slice(0, -1));
        return new Promise(resolve => {
            args[cbPos] = resolve;
            mthod.call(methodThis, ...args);
        });
    }
}

let promiseMe =  {
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
            getPath(prome, path.slice(0, -1))[p] = makePromeise(path, v);
        } else {
            prome[p] = {};
            makeProme(v, path.concat(p));
        }
    }
})(promiseMe);

export default prome;
