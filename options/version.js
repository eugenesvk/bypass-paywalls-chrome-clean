var ext_api = chrome || browser;

var manifestData = ext_api.runtime.getManifest();
var versionString = 'v' + manifestData.version;
document.getElementById('version').innerText = versionString;
var versionString_new = document.getElementById('version_new');
versionString_new.setAttribute('style', 'font-weight: bold;');
var anchorEl;

const proxyurl = "https://bpc-cors-anywhere.herokuapp.com/";
//const manifest_new = 'https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/raw/master/manifest.json';
const manifest_new = 'https://bitbucket.org/magnolia1234/bypass-paywalls-firefox-clean/raw/master/manifest.json';
//fetch(proxyurl + manifest_new, { headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" } })
fetch(manifest_new)
.then(response => {
    if (response.ok) {
        response.json().then(json => {
            ext_api.management.getSelf(function (result) {
                var installType = result.installType;
                var version_len = (installType === 'development') ? 7 : 5;
                var version_new = json['version'];
                if (version_new.substring(0, version_len) > manifestData.version.substring(0, version_len)) {
                    ext_api.storage.local.set({
                        version_new: version_new
                    });
                    anchorEl = document.createElement('a');
                    anchorEl.innerText = 'New release v' + version_new;
                    if (manifestData.applications && manifestData.applications.gecko.id.includes('magnolia')) {
                        if (installType === 'development')
                            anchorEl.href = 'https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean';
                        else
                            anchorEl.href = 'https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean/-/releases';
                    } else
                        anchorEl.href = 'https://addons.mozilla.org/en-US/firefox/addon/bypass-paywalls-clean';
                    anchorEl.target = '_blank';
                    versionString_new.appendChild(anchorEl);
                    if (manifestData.name.includes('(lp')) {
                        let par = document.createElement('p');
                        par.innerHTML = "Limited permissions version is no longer updated (check GitLab)";
                        versionString_new.appendChild(par);
                    }
                    if (!manifestData.name.includes('Clean')) {
                        let par = document.createElement('p');
                        par.innerHTML = "<strong>You've installed a fake version of BPC (check GitLab)</strong>";
                        versionString_new.appendChild(par);
                    }
                }
            });
        })
    } else {
        anchorEl = document.createElement('a');
        anchorEl.text = 'Check Twitter for latest update';
        anchorEl.href = 'https://twitter.com/Magnolia1234B';
        anchorEl.target = '_blank';
        versionString_new.appendChild(anchorEl);
    }
});
