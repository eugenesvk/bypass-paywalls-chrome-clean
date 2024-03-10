//'use strict';
var ext_api = (typeof browser === 'object') ? browser : chrome;

var hostname = window.location.hostname;
var de_madsack_domains = ['haz.de', 'kn-online.de', 'ln-online.de', 'lvz.de', 'maz-online.de', 'neuepresse.de', 'ostsee-zeitung.de', 'rnd.de'];

if (hostname.match(/\.de$/)) {

if (matchDomain(de_madsack_domains) || document.querySelector('head > link[href*=".rndtech.de/"]')) {
  function madsack_main() {
    for (let n = 0; n < 10; n++) {
      window.setTimeout(function () {
        if (window.Fusion) {
          window.Fusion.globalContent.isPaid = false;
        }
      }, n * 50);
    }
  }
  insert_script(madsack_main);
}

}

if (matchDomain('dagsavisen.no')) {
  function dagsavisen_main() {
    for (let n = 0; n < 10; n++) {
      window.setTimeout(function () {
        if (window.Fusion) {
         window.Fusion.globalContent.content_restrictions.content_code = 0;
        }
      }, n * 50);
    }
  }
  insert_script(dagsavisen_main);
}

else if (matchDomain(['journaldemontreal.com', 'journaldequebec.com'])) {
  for (let n = 0; n < 10; n++) {
    window.setTimeout(function () {
      let article = document.querySelector('div.article-main-txt.composer-content');
      if (article)
        article.classList.remove('composer-content');
    }, n * 50);
  }
}

else if (matchDomain('nzherald.co.nz')) {
  function nzherald_main() {
    for (let n = 0; n < 10; n++) {
      window.setTimeout(function () {
        if (window.Fusion) {
          window.Fusion.globalContent.isPremium = false;
        }
      }, n * 50);
    }
  }
  insert_script(nzherald_main);
}

function matchDomain(domains, hostname) {
  var matched_domain = false;
  if (!hostname)
    hostname = window.location.hostname;
  if (typeof domains === 'string')
    domains = [domains];
  domains.some(domain => (hostname === domain || hostname.endsWith('.' + domain)) && (matched_domain = domain));
  return matched_domain;
}

function removeDOMElement(...elements) {
  for (let element of elements) {
    if (element)
      element.remove();
  }
}

function waitDOMElement(selector, tagName = '', callback, multiple = false) {
  new window.MutationObserver(function (mutations) {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (!tagName || (node.tagName === tagName)) {
          if (node.matches(selector)) {
            callback(node);
            if (!multiple)
              this.disconnect();
          }
        }
      }
    }
  }).observe(document, {
    subtree: true,
    childList: true
  });
}

function insert_script(func, insertAfterDom) {
  let bpc_script = document.querySelector('script#bpc_script');
  if (!bpc_script) {
    let script = document.createElement('script');
    script.setAttribute('id', 'bpc_script');
    script.appendChild(document.createTextNode('(' + func + ')();'));
    let insertAfter = insertAfterDom ? insertAfterDom : (document.body || document.head || document.documentElement);
    if (insertAfter)
      insertAfter.appendChild(script);
  }
}
