var ext_api = (typeof browser === 'object') ? browser : chrome;

var manifestData = ext_api.runtime.getManifest();
var url_loc = manifestData.key ? 'chrome' : 'firefox';
var ext_url = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean';
var ext_name = manifestData.name;
var self_hosted = false;
var version_str = 'v' + manifestData.version;
var version_span = document.querySelector('span#version');
if (version_span)
  version_span.innerText = version_str;
var version_span_new = document.querySelector('span#version_new');
version_span_new.setAttribute('style', 'font-weight: bold;');
var anchorEl;

function show_warning() {
  let warning;
  if (!ext_name.includes('Clean')) {
    warning = 'fake';
  } else if (!self_hosted) {
    warning = 'cloned';
  }
  if (warning) {
    let par = document.createElement('p');
    let ext_link = document.createElement('a');
    ext_link.href = ext_url;
    ext_link.innerText = "You've installed a " + warning + " version of Bypass Paywalls Clean";
    ext_link.target = '_blank';
    par.style = 'font-weight: bold;';
    par.appendChild(ext_link);
    version_span_new.appendChild(par);
  }
}

function show_update(ext_version_new, ext_upd_version_new = '', check = true) {
  if (ext_version_new) {
    ext_api.management.getSelf(function (result) {
      var installType = result.installType;
      var version_len = (installType === 'development') ? 7 : 5;
      if (version_len === 5 && ext_upd_version_new && ext_upd_version_new < ext_version_new)
        ext_version_new = ext_upd_version_new;
      if (ext_version_new.substring(0, version_len) > manifestData.version.substring(0, version_len)) {
        ext_api.storage.local.set({
          ext_version_new: ext_version_new
        });
        anchorEl = document.createElement('a');
        anchorEl.target = '_blank';
        if (installType === 'development')
          anchorEl.href = ext_url;
        else {
          anchorEl.href = ext_url + '/-/releases';
          ext_version_new = ext_version_new.replace(/\d$/, '0');
        }
        anchorEl.innerText = 'New release v' + ext_version_new;
        version_span_new.appendChild(anchorEl);
      }
    });
    show_warning();
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
    let manifest_new = ext_url + '/raw/master/manifest.json';
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
    show_update(ext_version_new, '', false);
}

ext_api.storage.local.get({optInUpdate: true, ext_version_new: false}, function (result) {
  if (result.optInUpdate) {
    let popup = document.querySelector('script[id="popup"]');
    check_version_update(result.ext_version_new, popup);
  } else
    show_warning();
});
