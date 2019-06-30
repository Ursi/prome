export default {
    bookmarks: {
        getChildren(id) {
            return new Promise(resolve => {
                chrome.bookmarks.getChildren(id, resolve);
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
};