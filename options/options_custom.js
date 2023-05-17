var ext_api = chrome || browser;
var url_loc = (typeof browser === 'object') ? 'firefox' : 'chrome';

var useragent_options = ['', 'googlebot', 'bingbot', 'facebookbot'];
var referer_options = ['', 'facebook', 'google', 'twitter'];
var random_ip_options = ['', 'all', 'eu'];
var add_ext_link_type_options = ['', 'archive.is', '12ft.io']

function capitalize(str) {
  return (typeof str === 'string') ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function sortJson(json) {
  return Object.keys(json)
  .sort().reduce(function (Obj, key) {
    Obj[key] = json[key];
    return Obj;
  }, {});
}

function filterObject(obj, filterFn, mapFn = function (val, key) {
  return [key, val];
}) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => filterFn(val, key)).map(([key, val]) => mapFn(val, key)));
}

// Saves options to ext_api.storage
function save_options() {
  var textareaEl = document.querySelector('#bypass_sites textarea');
  var sites_custom = {};
  if (textareaEl.value) {
    var sites_custom = JSON.parse(textareaEl.value);
    sites_custom = filterObject(sites_custom, function (val, key) {
      return !(val.add_ext_link && (!val.add_ext_link_type || val.add_ext_link_type === 'google_search_tool'))
    });
  }
  ext_api.storage.local.set({
    sites_custom: sites_custom
  }, function () {
    // Update status to let user know custom sites were saved.
    var status = document.getElementById('status');
    status.textContent = 'Custom sites saved.';
    setTimeout(function () {
      status.textContent = '';
      location.href = 'options.html';
      //window.close();
    }, 800);
  });
}

// Sort json by key in textarea
function sort_options() {
  var textareaEl = document.querySelector('#bypass_sites textarea');
  var sites_custom = {};
  if (textareaEl.value) {
    var sites_custom = JSON.parse(textareaEl.value);
    var sites_custom_sorted = sortJson(sites_custom);
    textareaEl.value = JSON.stringify(sites_custom_sorted);
  }
  
}

// Export custom sites to file
function export_options() {
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    var result = JSON.stringify(items.sites_custom);
    var a = document.createElement("a");
    var file = new Blob([result], {type: "text/plain"});
    a.href = window.URL.createObjectURL(file);
    let date = new Date();
    let dateStr = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    a.download = 'bypass_paywalls_clean_custom_' + dateStr + '.txt';
    a.click();
  });
}

function import_json(result) {
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    var sites_custom = items.sites_custom;
    var sites_custom_new = JSON.parse(result);
    for (let site in sites_custom_new)
      sites_custom[site] = sites_custom_new[site];
    sites_custom = filterObject(sites_custom, function (val, key) {
      return !(val.add_ext_link && (!val.add_ext_link_type || val.add_ext_link_type === 'google_search_tool'))
    });
    ext_api.storage.local.set({
      sites_custom: sites_custom
    }, function () {
      // Update status to let user know custom sites were imported.
      var status = document.getElementById('status');
      status.textContent = 'Custom sites imported.';
      setTimeout(function () {
        //status.textContent = '';
        importInput.value = '';
        renderOptions();
      }, 800);
    });
  });
}

// Import custom sites from GitLab
function import_gitlab_options(e) {
  let url = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean/-/raw/master/custom/sites_custom.json';
  try {
    fetch(url)
    .then(response => {
      if (response.ok) {
        response.text().then(result => {
          import_json(result);
        })
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// Import custom sites from file
function import_options(e) {
  var files = e.target.files;
  var reader = new FileReader();
  reader.onload = _imp;
  reader.readAsText(files[0]);
}

function _imp() {
  var result = this.result;
  import_json(result);
}

// Add custom site to ext_api.storage
function add_options() {
  var inputEls = document.querySelectorAll('#add_site input, #add_site select, #add_site textarea');
  var sites_custom = {};
  
  for (let elem of inputEls) {
    if (elem.dataset.key === 'title') {
      var title = capitalize(elem.value);
      if (!title)
        break;
      sites_custom[title] = {};
    } else {
      if (elem.dataset.value) {
        if (elem.checked)
          sites_custom[title][elem.dataset.key] = parseInt(elem.dataset.value);
      } else if (elem.value)
        sites_custom[title][elem.dataset.key] = elem.value;
    }
  }
  
  if (title && sites_custom[title]['domain']) {
    sites_custom[title]['domain'] = sites_custom[title]['domain'].replace(/(http(s)?:\/\/|\/$)/g, '').replace(/^(www|amp(html)?|m|wap)(\d)?\./, '').toLowerCase();
    
    // add new site to local storage
    ext_api.storage.local.get({
      sites_custom: {}
    }, function (items) {
      var sites_custom_old = items.sites_custom;
      
      for (var key in sites_custom) {
        sites_custom_old[key] = sites_custom[key];
      }
      
      ext_api.storage.local.set({
        sites_custom: sites_custom_old
      }, function () {
        // Update status to let user know new custom site was added.
        var status_add = document.getElementById('status_add');
        status_add.textContent = 'Site added.';
        setTimeout(function () {
          //status.textContent = '';
          renderOptions();
        }, 800);
      });
    });
  }
}

// Delete custom site from ext_api.storage
function delete_options() {
  var selectEl = document.querySelector('#custom_sites select');
  var sites_custom = {};
  var remove_key = selectEl.value;
  if (!remove_key)
    return false;
  
  // delete site from local storage
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    var sites_custom_old = items.sites_custom;
    delete sites_custom_old[remove_key];
    
    ext_api.storage.local.set({
      sites_custom: sites_custom_old
    }, function () {
      // Update status to let user know custom site was deleted.
      var status_delete = document.getElementById('status_delete');
      status_delete.textContent = 'Site deleted.';
      setTimeout(function () {
        //status.textContent = '';
        renderOptions();
      }, 800);
    });
  });
}

// Edit custom site (copy to add)
function edit_options() {
  var selectEl = document.querySelector('#custom_sites select');
  var sites_custom = {};
  var title = selectEl.value;
  if (!title)
    return false;
  
  // copy site to add-fields
  ext_api.storage.local.get({
    sites_custom: {}
  }, function (items) {
    sites_custom = items.sites_custom;
    var edit_site = sites_custom[title];
    document.querySelector('input[data-key="title"]').value = title;
    document.querySelector('input[data-key="domain"]').value = edit_site.domain;
    document.querySelector('input[data-key="allow_cookies"]').checked = (edit_site.allow_cookies > 0);
    document.querySelector('input[data-key="remove_cookies"]').checked = (edit_site.remove_cookies > 0);
    document.querySelector('select[data-key="useragent"]').selectedIndex = (edit_site.googlebot > 0) ? 1 : useragent_options.indexOf(edit_site.useragent);
    document.querySelector('select[data-key="referer"]').selectedIndex = referer_options.indexOf(edit_site.referer);
    document.querySelector('select[data-key="random_ip"]').selectedIndex = random_ip_options.indexOf(edit_site.random_ip);
    document.querySelector('input[data-key="block_js"]').checked = (edit_site.block_js > 0 || edit_site.block_javascript > 0);
    document.querySelector('input[data-key="block_js_ext"]').checked = (edit_site.block_js_ext > 0 || edit_site.block_javascript_ext > 0);
    document.querySelector('input[data-key="block_js_inline"]').value = edit_site.block_js_inline ? edit_site.block_js_inline : '';
    document.querySelector('input[data-key="block_regex"]').value = edit_site.block_regex ? edit_site.block_regex : '';
    document.querySelector('input[data-key="amp_unhide"]').checked = (edit_site.amp_unhide > 0);
    document.querySelector('input[data-key="amp_redirect"]').value = edit_site.amp_redirect ? edit_site.amp_redirect : '';
    document.querySelector('input[data-key="ld_json"]').value = edit_site.ld_json ? edit_site.ld_json : '';
    document.querySelector('input[data-key="ld_json_next"]').value = edit_site.ld_json_next ? edit_site.ld_json_next : '';
    document.querySelector('input[data-key="ld_google_webcache"]').value = edit_site.ld_google_webcache ? edit_site.ld_google_webcache : '';
    document.querySelector('input[data-key="add_ext_link"]').value = edit_site.add_ext_link ? edit_site.add_ext_link : '';
    document.querySelector('select[data-key="add_ext_link_type"]').selectedIndex = add_ext_link_type_options.indexOf(edit_site.add_ext_link_type);
    document.querySelector('textarea[data-key="cs_code"]').value = edit_site.cs_code ? edit_site.cs_code : '';
  });
}

// request permissions for custom sites (in list only)
function request_permissions() {
  var perm_custom = document.getElementById('perm-custom');
  ext_api.permissions.request({
    origins: perm_origins
  }, function (granted) {
    if (granted) {
      perm_custom.innerText = 'YES';
    } else {
      perm_custom.innerText = 'NO';
    }
  });
}

// remove permissions for custom sites
function remove_permissions() {
  var perm_custom = document.getElementById('perm-custom');
  ext_api.permissions.remove({
    origins: perm_origins
  }, function (removed) {
    if (removed) {
      perm_custom.innerText = 'NO';
    }
  });
}

var perm_origins;
// Restores checkbox input states using the preferences stored in ext_api.storage.
function renderOptions() {
  ext_api.storage.local.get({
    sites_custom: {},
    sites_updated: {}
  }, function (items) {
    var sites_custom = items.sites_custom;
    var sites_updated = items.sites_updated;
    var sites_updated_domains_new = Object.values(sites_updated).filter(x => (x.domain && !defaultSites_domains.includes(x.domain) || x.group)).map(x => x.group ? x.group.filter(y => !defaultSites_domains.includes(y)) : x.domain).flat();
    var sitesEl = document.getElementById('bypass_sites');
    sitesEl.innerHTML = '';
    var labelEl = document.createElement('label');
    var textareaEl = document.createElement('textarea');
    textareaEl.value = JSON.stringify(sites_custom);
    textareaEl.rows = 12;
    textareaEl.cols = 40;
    labelEl.appendChild(textareaEl);
    sitesEl.appendChild(labelEl);
    
    // add site
    var add_sitesEl = document.getElementById('add_site');
    add_sitesEl.innerHTML = '';
    var inputEl;
    var add_checkboxes = {
      'title': 0,
      'domain': 0,
      'allow_cookies': 1,
      'remove_cookies': 1,
      'useragent': 0,
      'referer': 0,
      'random_ip': 0,
      'block_js (domain)': 1,
      'block_js_ext': 1,
      'block_js_inline': 0,
      'block_regex': 0,
      'amp_unhide': 1,
      'amp_redirect': 0,
      'ld_json': 0,
      'ld_json_next': 0,
      'ld_google_webcache': 0,
      'add_ext_link': 0,
      'add_ext_link_type': 0,
      'cs_code': 0,
    };
    var add_options = {
      useragent: useragent_options,
      referer: referer_options,
      random_ip: random_ip_options,
      add_ext_link_type: add_ext_link_type_options
    };
    for (var key in add_checkboxes) {
      if (add_checkboxes[key]) {
        inputEl = document.createElement('input');
        inputEl.type = 'checkbox';
        inputEl.dataset.value = 1;
      } else {
        if (add_options[key]) {
          inputEl = document.createElement('select');
          for (let elem of add_options[key]) {
            let option = document.createElement("option");
            option.value = elem;
            option.text = elem;
            inputEl.appendChild(option);
          }
        } else {
          if (!['cs_code'].includes(key)) {
            inputEl = document.createElement('input');
            inputEl.size = 25;
          } else {
            inputEl = document.createElement('textarea');
            inputEl.rows = 5;
            inputEl.cols = 25;
          }
          let placeholders = {
            title: 'Example',
            domain: 'example.com',
            block_js_inline: '\\.example\\.com\\/article\\/',
            block_regex: '\\.example\\.com\\/js\\/',
            amp_redirect: 'div.paywall',
            ld_json: 'div.paywall|div.article',
            ld_json_next: 'div.paywall|div.article',
            ld_google_webcache: 'div.paywall|div.article',
            add_ext_link: 'div.paywall|div.article',
            cs_code: 'for dev: check GitLab examples',
          };
          if (placeholders[key])
            inputEl.placeholder = placeholders[key];
        }
      }
      labelEl = document.createElement('label');
      labelEl.style = 'margin: 2px 0px;';
      inputEl.dataset.key = key.split(' (')[0];
      labelEl.appendChild(inputEl);
      labelEl.appendChild(document.createTextNode(' ' + key));
      add_sitesEl.appendChild(labelEl);
    }
    
    // list of custom sites
    var custom_sitesEl = document.getElementById('custom_sites');
    custom_sitesEl.innerHTML = '';
    labelEl = document.createElement('label');
    var selectEl = document.createElement('select');
    selectEl.id = 'sites';
    selectEl.size = 6;
    var optionEl;
    perm_origins = [];
    for (let key in sites_custom) {
      optionEl = document.createElement('option');
      let domain = sites_custom[key]['domain'];
      perm_origins.push(domain);
      let isDefaultSite = defaultSites_domains.includes(domain);
      optionEl.text = isDefaultSite ? '*' : '';
      optionEl.text += key + ': ' + domain +
      (sites_custom[key]['allow_cookies'] > 0 ? ' | allow_cookies' : '') +
      (sites_custom[key]['remove_cookies'] > 0 ? ' | remove_cookies' : '') +
      (sites_custom[key]['useragent'] ? ' | useragent: ' + sites_custom[key]['useragent'] : '') +
      (sites_custom[key]['googlebot'] > 0 ? ' | googlebot' : '') +
      (sites_custom[key]['referer'] ? ' | referer: ' + sites_custom[key]['referer'] : '') +
      (sites_custom[key]['random_ip'] ? ' | random_ip: ' + sites_custom[key]['random_ip'] : '') +
      ((sites_custom[key]['block_js'] > 0 || sites_custom[key]['block_javascript'] > 0) ? ' | block_js' : '') +
      ((sites_custom[key]['block_js_ext'] > 0 || sites_custom[key]['block_javascript_ext'] > 0) ? ' | block_js_ext' : '') +
      (sites_custom[key]['block_js_inline'] ? ' | block_js_inline' : '') +
      (sites_custom[key]['block_regex'] ? ' | block_regex' : '') +
      (sites_custom[key]['amp_unhide'] > 0 ? ' | amp_unhide' : '') +
      (sites_custom[key]['amp_redirect'] ? ' | amp_redirect' : '') +
      (sites_custom[key]['ld_json'] ? ' | ld_json' : '') +
      (sites_custom[key]['ld_json_next'] ? ' | ld_json_next' : '') +
      (sites_custom[key]['ld_google_webcache'] ? ' | ld_google_webcache' : '') +
      (sites_custom[key]['add_ext_link'] && sites_custom[key]['add_ext_link_type'] ? ' | add_ext_link' : '') +
      (sites_custom[key]['cs_code'] ? ' | cs_code' : '');
      optionEl.value = key;
      selectEl.add(optionEl);
    }
    labelEl.appendChild(selectEl);
    custom_sitesEl.appendChild(labelEl);
    
    if (sites_updated_domains_new.length > 0) {
      labelEl = document.createElement('p');
      labelEl.appendChild(document.createElement('label'));
      labelEl.appendChild(document.createTextNode('Updated sites: ' + sites_updated_domains_new.join()));
      custom_sitesEl.appendChild(labelEl);
    }
    
    perm_origins = perm_origins.concat(sites_updated_domains_new).map(x => '*://*.' + x + '/*');
    var perm_custom = document.getElementById('perm-custom');
    ext_api.permissions.contains({
      origins: perm_origins
    }, function (result) {
      if (result) {
        perm_custom.innerText = 'YES';
      } else {
        perm_custom.innerText = 'NO';
      }
    });
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
}

document.addEventListener('DOMContentLoaded', renderOptions);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('sort').addEventListener('click', sort_options);
document.getElementById('export').addEventListener('click', export_options);
document.getElementById('import').onclick = function () {importInput.click()}
document.getElementById('importInput').addEventListener("change", import_options, false);
document.getElementById('import_gitlab').addEventListener('click', import_gitlab_options);
document.getElementById('add').addEventListener('click', add_options);
document.getElementById('delete').addEventListener('click', delete_options);
document.getElementById('edit').addEventListener('click', edit_options);
document.getElementById('perm_request').addEventListener('click', request_permissions);
document.getElementById('perm_remove').addEventListener('click', remove_permissions);