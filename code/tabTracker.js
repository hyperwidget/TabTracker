resetTabs = function () {
    chrome.windows.getAll({"populate": true}, function (windows) {
        for (var i = 0; i < windows.length; i++) {
            for (var j = 0; j < windows[i].tabs.length; j++) {
                var prefix = '[' + (j + 1) + '] ';
                var name = windows[i].tabs[j].title.replace(/\[.\]/, '');
                if (j < 8) {
                    chrome.tabs.executeScript(windows[i].tabs[j].id, {code: "document.title ='" + prefix + name + "'"});
                } else if (j == windows[i].tabs.length - 1) {
                    chrome.tabs.executeScript(windows[i].tabs[j].id, {code: "document.title ='[9] " + name + "'"});
                } else {
                    chrome.tabs.executeScript(windows[i].tabs[j].id, {code: "document.title ='" + name + "'"});
                }
            }
        }
    });
};

chrome.tabs.onCreated.addListener(function () {
    resetTabs()
});

chrome.tabs.onUpdated.addListener(function () {
    resetTabs()
});

chrome.tabs.onRemoved.addListener(function () {
    resetTabs()
});

resetTabs();
