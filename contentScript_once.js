//"use strict";

if (matchDomain('inkl.com')) {
  window.setTimeout(function () {
    let menu_btn = document.querySelector('div.left-buttons-container button.menu-btn');
    if (!menu_btn) {
      let article_container = document.querySelector('div.article-content-container');
      if (article_container) {
        article_container.setAttribute('style', 'overflow: visible; max-height: none;');
        let figures = document.querySelectorAll('figure');
        for (let figure of figures)
          figure.setAttribute('style', 'display:block !important;');
      }
      let gradient_container = document.querySelector('div.gradient-container');
      if (gradient_container)
        gradient_container.setAttribute('style', 'height:auto;');
      let locked = document.querySelector('div.locked');
      if (locked)
        locked.classList.remove('locked');
    }
    let what_is_inkl = document.querySelector('.what-is-inkl-container, .features-panel');
    let signup = document.querySelector('.article-signup-container, .locked-sign-up-container');
    removeDOMElement(what_is_inkl, signup);
    let dismiss_button = document.querySelector('div.dismiss-button-container button.btn');
    if (dismiss_button)
      dismiss_button.click();
    let shared_banner = document.querySelector('div.shared-article-inline-banner');
    removeDOMElement(shared_banner);
    let dive_deeper_summary_bodies = document.querySelectorAll('div.dive-deeper-container div.summary-body');
    if (dive_deeper_summary_bodies) {
      for (let summary_body of dive_deeper_summary_bodies) {
        if (!summary_body.querySelector('a')) {
          let ng_click = summary_body.getAttribute('ng-click').replace("showArticle('", '').replace("')", '');
          let weblink = document.createElement('a');
          weblink.text = 'open';
          weblink.href = 'https://www.inkl.com/news/' + ng_click;
          summary_body.appendChild(weblink);
        }
      }
    }
  }, 1000);
}

else if (matchDomain('nationalgeographic.com')) {
  function natgeo_func(node) {
    removeDOMElement(node);
    let body = document.querySelector('body[class]');
    if (body) {
      body.removeAttribute('class');
      body.removeAttribute('style');
    }
  }
  waitDOMElement('div[id^="fittPortal"]', 'DIV', natgeo_func, false);
}

else if (matchDomain('nautil.us')) {
  let hidden_images = document.querySelectorAll('img[src^="data:image"][data-src]');
  for (let hidden_image of hidden_images)
    hidden_image.src = hidden_image.getAttribute('data-src');
  let empty_video_iframes = document.querySelectorAll('iframe[src="about:blank"][data-litespeed-src]');
  for (let empty_video_iframe of empty_video_iframes)
    empty_video_iframe.src = empty_video_iframe.getAttribute('data-litespeed-src');
}

else if (matchDomain('nyteknik.se')) {
  window.setTimeout(function () {
    let hidden_images = document.querySelectorAll('img[src=""][data-proxy-image]');
    for (let hidden_image of hidden_images)
      hidden_image.setAttribute('src', hidden_image.getAttribute('data-proxy-image').replace('_320', '_640'));
  }, 2000);
}

else if (matchDomain('nzherald.co.nz')) {
  function nzherald_main() {
    if (window.Fusion)
      window.Fusion.globalContent.isPremium = false;
  }
  window.setTimeout(function () {
    insert_script(nzherald_main);
  }, 100);
}

else if (matchDomain('gitlab.com')) {
  window.setTimeout(function () {
    let bio = document.querySelector('div.profile-user-bio');
    if (bio) {
      let split = bio.innerText.split(/(https:[\w\-/.]+)|\|/g).filter(x => x && x.trim());
      bio.innerText = '';
      for (let part of split) {
        let elem;
        if (part.startsWith('https')) {
          elem = document.createElement('a');
          elem.innerText = part;
          elem.href = part;
          elem.appendChild(document.createElement('br'));
        } else {
          elem = document.createElement('b');
          elem.appendChild(document.createTextNode(part));
          if (!part.includes(':'))
            elem.appendChild(document.createElement('br'));
        }
        bio.appendChild(elem);
      }
    }
  }, 1000);
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
    insertAfter.appendChild(script);
  }
}
