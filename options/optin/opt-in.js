var ext_api = (typeof browser === 'object') ? browser : chrome;
var url_loc = (typeof browser === 'object') ? 'firefox' : 'chrome';
var manifestData = ext_api.runtime.getManifest();
var navigator_ua = navigator.userAgent;
var navigator_ua_mobile = navigator_ua.toLowerCase().includes('mobile');
var yandex_browser = navigator_ua_mobile && (url_loc === 'chrome') && navigator_ua.toLowerCase().includes('yabrowser');
var custom_switch = ((manifestData.optional_permissions && manifestData.optional_permissions.length) || (manifestData.optional_host_permissions && manifestData.optional_host_permissions.length)) && !(navigator_ua_mobile && (url_loc === 'chrome') && !yandex_browser);

window.addEventListener("load", function () {
    document.getElementById("button-close").addEventListener("click", function () {
        ext_api.storage.local.set({
            "optInShown": true,
            "customShown": true
        });
        window.close();
    });

    var opt_in_enabled = document.getElementById('opt-in-enabled');
    ext_api.storage.local.get("optIn", function (result) {
        opt_in_enabled.innerText = result.optIn ? 'YES' : 'NO';
    });

    document.getElementById("optin-enable").addEventListener("click", function () {
        ext_api.storage.local.set({
            "optIn": true,
            "optInShown": true
        });
        opt_in_enabled.innerText = 'YES';
    });

    document.getElementById("optin-disable").addEventListener("click", function () {
        ext_api.storage.local.set({
            "optIn": false,
            "optInShown": true
        });
        opt_in_enabled.innerText = 'NO';
    });

    var custom_enabled = document.getElementById('custom-enabled');
    ext_api.permissions.contains({
        origins: ["*://*/*"]
    }, function (result) {
        if (result) {
            custom_enabled.innerText = 'YES';
        } else {
            custom_enabled.innerText = 'NO';
        }
    });

    if (custom_switch) {

    document.querySelector('#custom-enable').addEventListener('click', function (event) {
        ext_api.permissions.request({
            origins: ["*://*/*"]
        }, function (granted) {
            if (granted) {
                custom_enabled.innerText = 'YES';
                ext_api.storage.local.set({
                    "customOptIn": true
                });
            } else {
                custom_enabled.innerText = 'NO';
            }
            ext_api.storage.local.set({
                "customShown": true
            });
        });
    });

    document.querySelector('#custom-disable').addEventListener('click', function (event) {
        ext_api.permissions.remove({
            origins: ["*://*/*", "<all_urls>"]
        }, function (removed) {
            if (removed) {
                custom_enabled.innerText = 'NO';
                ext_api.storage.local.set({
                    "customOptIn": false
                });
            }
            ext_api.storage.local.set({
                "customShown": true
            });
        });
    });

    }// custom_switch

    var update_enabled = document.getElementById('update-enabled');
    ext_api.storage.local.get({optInUpdate: true}, function (result) {
        update_enabled.innerText = result.optInUpdate ? 'YES' : 'NO';
    });

    document.getElementById("update-enable").addEventListener("click", function () {
        ext_api.storage.local.set({
            "optInUpdate": true
        });
        update_enabled.innerText = 'YES';
    });

    document.getElementById("update-disable").addEventListener("click", function () {
        ext_api.storage.local.set({
            "optInUpdate": false
        });
        update_enabled.innerText = 'NO';
    });

    var counter_enabled = document.getElementById('counter-enabled');
    ext_api.storage.local.get({counter: true}, function (result) {
        counter_enabled.innerText = result.counter ? 'YES' : 'NO';
    });

    document.getElementById("counter-enable").addEventListener("click", function () {
        ext_api.storage.local.set({
            "counter": true
        });
        counter_enabled.innerText = 'YES';
    });

    document.getElementById("counter-disable").addEventListener("click", function () {
        ext_api.storage.local.set({
            "counter": false
        });
        counter_enabled.innerText = 'NO';
    });
});
