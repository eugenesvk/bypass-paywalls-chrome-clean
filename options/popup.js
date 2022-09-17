var ext_api = (typeof browser === 'object') ? browser : chrome;

function popup_show_toggle(domain, enabled) {
  if (domain) {
    var site_switch_span = document.getElementById('site_switch_span');
    let labelEl = document.createElement('label');
    labelEl.setAttribute('class', 'switch');
    let inputEl = document.createElement('input');
    inputEl.setAttribute('id', 'site_switch');
    inputEl.setAttribute('type', 'checkbox');
    if (enabled)
      inputEl.setAttribute('checked', true);
    labelEl.appendChild(inputEl);
    let spanEl = document.createElement('span');
    spanEl.setAttribute('class', 'slider round');
    spanEl.setAttribute('title', 'en/disable current site in BPC');
    labelEl.appendChild(spanEl);
    site_switch_span.appendChild(labelEl);
    document.getElementById("site_switch").addEventListener('click', function () {
      ext_api.runtime.sendMessage({
        request: 'site_switch'
      });
      //open(location).close();
    });
  }
};

ext_api.runtime.sendMessage({
  request: 'popup_show_toggle'
});
ext_api.runtime.onMessage.addListener(function (message, sender) {
  if (message.msg === 'popup_show_toggle' && message.data) {
    popup_show_toggle(message.data.domain, message.data.enabled)
  }
});

var cookie_domain;
ext_api.tabs.query({
  active: true,
  currentWindow: true
}, function (tabs) {
  if (tabs && tabs[0] && tabs[0].url && tabs[0].url.startsWith('http')) {
    let hostname = new URL(tabs[0].url).hostname;
    cookie_domain = getCookiePermDomain(hostname);
  }
});

document.getElementById("clear_cookies").addEventListener('click', function () {
  ext_api.permissions.request({
    origins: ["*://*." + cookie_domain + "/*"]
  }, function (granted) {
    if (granted) {
      ext_api.runtime.sendMessage({
        request: 'clear_cookies'
      });
    }
  });
});

function showArchiveLinks() {
  ext_api.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs && tabs[0] && tabs[0].url && tabs[0].url.startsWith('http')) {
      let url = tabs[0].url.split('?')[0];
      let archive_array = {
        'Archive.today': 'https://archive.today?run=1&url=' + url,
        'Google webcache': 'https://webcache.googleusercontent.com/search?q=cache:' + url
      };
      let archive_id = document.querySelector('span#archive');
      if (archive_id) {
        archive_id.appendChild(document.createTextNode('Open tab in:'));
        for (let key in archive_array) {
          let elem_div = document.createElement('div');
          let elem = document.createElement('a');
          elem.innerText = key;
          elem.href = archive_array[key];
          elem.target = '_blank';
          elem_div.appendChild(elem);
          archive_id.appendChild(elem_div);
        }
      }
    }
  });
}
showArchiveLinks();

function closeButton() {
  window.close();
}

function getCookiePermDomain(hostname) {
  let domain = hostname.replace(/^(www|amp(html)?|m|wap)(\d)?\./, '');
  let domain_split = domain.split('.');
  let num = 2;
  if (domain_split.length > 2 && domain.match(/(\w){2,4}\.(\w){2}$/))
    num = 3;
  domain = domain_split.slice(-num).join('.');
  return domain;
}

document.getElementById("button-close").addEventListener('click', closeButton);
