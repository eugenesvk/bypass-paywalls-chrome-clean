var ext_api = (typeof browser === 'object') ? browser : chrome;
var url_loc = (typeof browser === 'object') ? 'firefox' : 'chrome';

var manifestData = ext_api.runtime.getManifest();
var versionString = 'v' + manifestData.version;
document.getElementById('version').innerText = versionString;
var versionString_new = document.getElementById('version_new');
versionString_new.setAttribute('style', 'font-weight: bold;');
var anchorEl;

function show_update(ext_version_new, check = true) {
  if (ext_version_new) {
    ext_api.management.getSelf(function (result) {
      var installType = result.installType;
      var version_len = (installType === 'development') ? 7 : 5;
      if (ext_version_new.substring(0, version_len) > manifestData.version.substring(0, version_len)) {
        ext_api.storage.local.set({
          ext_version_new: ext_version_new
        });
        anchorEl = document.createElement('a');
        anchorEl.innerText = 'New release v' + ext_version_new;
        if (manifestData.applications && manifestData.applications.gecko.id.includes('magnolia')) {
          if (installType === 'development')
            anchorEl.href = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean';
          else
            anchorEl.href = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean/-/releases';
        } else
          anchorEl.href = 'https://addons.mozilla.org/en-US/firefox/addon/bypass-paywalls-clean';
        anchorEl.target = '_blank';
        versionString_new.appendChild(anchorEl);
        if (!manifestData.name.includes('Clean')) {
          let par = document.createElement('p');
          par.innerHTML = "<strong>You've installed a fake version of BPC (check GitLab)</strong>";
          versionString_new.appendChild(par);
        }
      }
    });
  } else if (check) {
    anchorEl = document.createElement('a');
    anchorEl.text = 'Check Twitter for latest update';
    anchorEl.href = 'https://twitter.com/Magnolia1234B';
    anchorEl.target = '_blank';
    versionString_new.appendChild(anchorEl);
  }
}

function check_version_update(ext_version_new, popup) {
  if (!popup) {
    let manifest_new = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean/raw/master/manifest.json';
    fetch(manifest_new)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          var version_new = json['version'];
          show_update(version_new);
        })
      } else {
        show_update(ext_version_new);
      }
    }).catch(function (err) {
      false;
    });
  } else
    show_update(ext_version_new, false);
}

ext_api.storage.local.get({optInUpdate: true, ext_version_new: false}, function (result) {
  if (result.optInUpdate) {
    let popup = document.querySelector('script[id="popup"]');
    check_version_update(result.ext_version_new, popup);
  }
});
