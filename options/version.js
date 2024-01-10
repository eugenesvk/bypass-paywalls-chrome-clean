var ext_api = (typeof browser === 'object') ? browser : chrome;

var manifestData = ext_api.runtime.getManifest();
var url_loc = manifestData.key ? 'chrome' : 'firefox';
var version_str = 'v' + manifestData.version;
var version_span = document.querySelector('span#version');
if (version_span)
  version_span.innerText = version_str;
var version_span_new = document.querySelector('span#version_new');
if (version_span_new)
  version_span_new.setAttribute('style', 'font-weight: bold;');
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
        anchorEl.target = '_blank';
        let manifest_id = manifestData.browser_specific_settings ? manifestData.browser_specific_settings.gecko.id : '';
        if (manifest_id && manifest_id.includes('magnolia')) {
          if (installType === 'development')
            anchorEl.href = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean';
          else {
            anchorEl.href = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean/-/releases';
            ext_version_new = ext_version_new.replace(/\d$/, '0');
          }
        }
        if (installType !== 'development')
          ext_version_new = ext_version_new.replace(/\d$/, '0');
        anchorEl.innerText = 'New release v' + ext_version_new;
        anchorEl.target = '_blank';
        version_span_new.appendChild(anchorEl);
        let warning;
        if (!manifestData.name.includes('Clean')) {
          warning = 'fake';
        } else if (manifest_id && !manifest_id.match(/^magnolia(_limited_permissions)?@12\.34$/)) {
          warning = 'cloned';
        }
        if (warning) {
          let par = document.createElement('p');
          par.innerText = "You've installed a " + warning + " version of BPC (check help/GitLab)";
          par.style = 'font-weight: bold;';
          version_span_new.appendChild(par);
        }
      }
    });
  } else if (check) {
    anchorEl = document.createElement('a');
    anchorEl.text = 'Check Twitter for latest update';
    anchorEl.href = 'https://twitter.com/Magnolia1234B';
    anchorEl.target = '_blank';
    version_span_new.appendChild(anchorEl);
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
