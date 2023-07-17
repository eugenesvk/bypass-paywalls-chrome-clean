'use strict';
var ext_api = (typeof browser === 'object') ? browser : chrome;
var url_loc = (typeof browser === 'object') ? 'firefox' : 'chrome';
var manifestData = ext_api.runtime.getManifest();
var ext_name = manifestData.name;
var ext_version = manifestData.version;
var navigator_ua = navigator.userAgent;
var navigator_ua_mobile = navigator_ua.toLowerCase().includes('mobile');
var kiwi_browser = navigator_ua_mobile && (url_loc === 'chrome') && !navigator_ua.toLowerCase().includes('yabrowser');

if (typeof ext_api.action !== 'object') {
  ext_api.action = ext_api.browserAction;
}

var dompurify_sites = [];
var optin_setcookie = false;
var optin_update = true;
var blocked_referer = false;

// defaultSites are loaded from sites.js at installation extension

var restrictions = {
  'bloomberg.com': /^((?!\.bloomberg\.com\/news\/terminal\/).)*$/,
  'bloombergadria.com': /^((?!\.bloombergadria\.com\/video\/).)*$/,
  'dailywire.com': /^((?!\.dailywire\.com\/(episode|show|videos|watch)).)*$/,
  'economictimes.com': /\.economictimes\.com($|\/($|(__assets|prime)(\/.+)?|.+\.cms))/,
  'elespanol.com': /^((?!\/cronicaglobal\.elespanol\.com\/).)*$/,
  'espn.com': /^((?!espn\.com\/watch).)*$/,
  'esquire.com': /^((?!\/classic\.esquire\.com\/).)*$/,
  'foreignaffairs.com': /^((?!\/reader\.foreignaffairs\.com\/).)*$/,
  'hilltimes.com': /^((?!hilltimes\.com\/slideshow\/).)*$/,
  'nytimes.com': /^((?!\/timesmachine\.nytimes\.com\/).)*$/,
  'science.org': /^((?!\.science\.org\/doi\/).)*$/,
  'timesofindia.com': /\.timesofindia\.com($|\/($|toi-plus(\/.+)?|.+\.cms))/,
  'quora.com': /^((?!quora\.com\/search\?q=).)*$/,
  'seekingalpha.com': /\/seekingalpha\.com($|\/($|(amp\/)?(article|news)\/|samw\/))/,
  'statista.com': /^((?!\.statista\.com\/study\/).)*$/,
  'techinasia.com': /\.techinasia\.com\/.+/,
  'theatlantic.com': /^((?!\/newsletters\.theatlantic\.com\/).)*$/,
  'thetimes.co.uk': /^((?!epaper\.thetimes\.co\.uk).)*$/,
  'timeshighereducation.com': /\.timeshighereducation\.com\/((features|news|people)\/|.+((\w)+(\-)+){3,}.+|sites\/default\/files\/)/,
  'uol.com.br': /^((?!(conta|email)\.uol\.com\.br).)*$/,
}

for (let domain of au_news_corp_domains)
  restrictions[domain] = new RegExp('^((?!todayspaper\\.' + domain.replace(/\./g, '\\.') + '\\/).)*$');
if (typeof browser !== 'object') {
  for (let domain of [])
    restrictions[domain] = new RegExp('((\\/|\\.)' + domain.replace(/\./g, '\\.') + '\\/$|' + restrictions[domain].toString().replace(/(^\/|\/$)/g, '') + ')');
}

// Don't remove cookies before/after page load
var allow_cookies = [];
var remove_cookies = [];
// select specific cookie(s) to hold/drop from remove_cookies domains
var remove_cookies_select_hold, remove_cookies_select_drop;

// Set User-Agent
var use_google_bot, use_bing_bot, use_facebook_bot;
// Set Referer
var use_facebook_referer, use_google_referer, use_twitter_referer;
// Set random IP-address
var random_ip = {};
var use_random_ip = [];
// concat all sites with change of headers (useragent, referer or random ip)
var change_headers;

// block paywall-scripts
var blockedRegexes = {};
var blockedRegexesDomains = [];
var blockedRegexesGeneral = {};
var blockedJsInline = {};
var blockedJsInlineDomains = [];

// unhide text on amp-page
var amp_unhide;
// redirect to amp-page
var amp_redirect;
// code for contentScript
var cs_code;
// load text from json (script[type="application/ld+json"])
var ld_json;
// load text from json (script#__NEXT_DATA__)
var ld_json_next;
// load text from Google webcache
var ld_google_webcache;
// add external link to article
var add_ext_link;

// custom: block javascript
var block_js_custom = [];
var block_js_custom_ext = [];

function initSetRules() {
  allow_cookies = [];
  remove_cookies = [];
  remove_cookies_select_drop = {};
  remove_cookies_select_hold = {};
  use_google_bot = [];
  use_bing_bot = [];
  use_facebook_bot = [];
  use_facebook_referer = [];
  use_google_referer = [];
  use_twitter_referer = [];
  random_ip = {};
  change_headers = [];
  amp_unhide = [];
  amp_redirect = {};
  cs_code = {};
  ld_json = {};
  ld_json_next = {};
  ld_google_webcache = {};
  add_ext_link = {};
  block_js_custom = [];
  block_js_custom_ext = [];
  blockedRegexes = {};
  blockedRegexesDomains = [];
  blockedRegexesGeneral = {};
  blockedJsInline = {};
  blockedJsInlineDomains = [];
  init_custom_flex_domains();
}

const userAgentDesktopG = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const userAgentMobileG = "Chrome/80.0.3987.92 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)";

const userAgentDesktopB = "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)";
const userAgentMobileB = "Chrome/80.0.3987.92 Mobile Safari/537.36 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)";

const userAgentDesktopF = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';

var enabledSites = [];
var disabledSites = [];
var optionSites = {};
var customSites = {};
var customSites_domains = [];
var updatedSites = {};
var updatedSites_new = [];
var updatedSites_domains_new = [];
var excludedSites = [];

function setDefaultOptions() {
  ext_api.storage.local.set({
    sites: filterObject(defaultSites, function (val, key) {
      return val.domain && !val.domain.match(/^(###$|#options_(disable|optin)_)/)
    },
      function (val, key) {
      return [key, val.domain]
    })
  }, function () {
    ext_api.runtime.openOptionsPage();
  });
}

function check_sites_updated() {
  let sites_updated_json = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean/-/raw/master/sites_updated.json';
  fetch(sites_updated_json)
  .then(response => {
    if (response.ok) {
      response.json().then(json => {
        expandSiteRules(json, true);
        ext_api.storage.local.set({
          sites_updated: json
        });
      })
    }
  }).catch(function (err) {
    false;
  });
}

function prep_regex_str(str, domain = '') {
  if (domain)
    str = str.replace(/{domain}/g, domain.replace(/\./g, '\\.'));
  return str.replace(/^\//, '').replace(/\/\//g, '/').replace(/([^\\])\/$/, "$1")
}

function addRules(domain, rule) {
  if (rule.hasOwnProperty('remove_cookies_select_drop') || rule.hasOwnProperty('remove_cookies_select_hold')) {
    rule.allow_cookies = 1;
    rule.remove_cookies = 1;
  }
  if (rule.allow_cookies > 0 && !allow_cookies.includes(domain))
    allow_cookies.push(domain);
  if (rule.remove_cookies > 0 && !remove_cookies.includes(domain))
    remove_cookies.push(domain);
  if (rule.hasOwnProperty('remove_cookies_select_drop'))
    remove_cookies_select_drop[domain] = rule.remove_cookies_select_drop;
  if (rule.hasOwnProperty('remove_cookies_select_hold'))
    remove_cookies_select_hold[domain] = rule.remove_cookies_select_hold;
  if (rule.hasOwnProperty('block_regex')) {
    if (rule.block_regex instanceof RegExp)
      blockedRegexes[domain] = rule.block_regex;
    else {
      try {
        blockedRegexes[domain] = new RegExp(prep_regex_str(rule.block_regex, domain));
      } catch (e) {
        console.log(`regex not valid, error: ${e}`);
      }
    }
  }
  if (rule.hasOwnProperty('block_regex_general')) {
    if (rule.block_regex_general instanceof RegExp)
      blockedRegexesGeneral[domain] = {block_regex: rule.block_regex_general};
    else {
      try {
        blockedRegexesGeneral[domain] = {block_regex: new RegExp(prep_regex_str(rule.block_regex_general, domain))};
      } catch (e) {
        console.log(`regex not valid, error: ${e}`);
      }
    }
    blockedRegexesGeneral[domain]['excluded_domains'] = rule.excluded_domains ? rule.excluded_domains : [];
  }
  if (rule.hasOwnProperty('block_js_inline')) {
    if (rule.block_js_inline instanceof RegExp)
      blockedJsInline[domain] = rule.block_js_inline;
    else {
      try {
        blockedJsInline[domain] = new RegExp(prep_regex_str(rule.block_js_inline, domain));
      } catch (e) {
        console.log(`regex not valid, error: ${e}`);
      }
    }
  }
  if (rule.useragent) {
    switch (rule.useragent) {
    case 'googlebot':
      if (!use_google_bot.includes(domain))
        use_google_bot.push(domain);
      break;
    case 'bingbot':
      if (!use_bing_bot.includes(domain))
        use_bing_bot.push(domain);
      break;
    case 'facebookbot':
      if (!use_facebook_bot.includes(domain))
        use_facebook_bot.push(domain);
      break;
    }
  }
  if (rule.referer) {
    switch (rule.referer) {
    case 'facebook':
      if (!use_facebook_referer.includes(domain))
        use_facebook_referer.push(domain);
      break;
    case 'google':
      if (!use_google_referer.includes(domain))
        use_google_referer.push(domain);
      break;
    case 'twitter':
      if (!use_twitter_referer.includes(domain))
        use_twitter_referer.push(domain);
      break;
    }
  }
  if (rule.random_ip) {
    random_ip[domain] = rule.random_ip;
  }
  if (rule.amp_unhide > 0 && !amp_unhide.includes(domain))
    amp_unhide.push(domain);
  if (rule.amp_redirect)
    amp_redirect[domain] = rule.amp_redirect.paywall ? rule.amp_redirect : {paywall: rule.amp_redirect};
  if (rule.cs_code) {
    if (typeof rule.cs_code === 'string') {
      try {
        rule.cs_code = JSON.parse(rule.cs_code);
      } catch (e) {
        console.log(`cs_code not valid: ${rule.cs_code} error: ${e}`);
      }
    }
    if (typeof rule.cs_code === 'object')
      cs_code[domain] = rule.cs_code;
  }
  if (rule.ld_json)
    ld_json[domain] = rule.ld_json;
  if (rule.ld_json_next)
    ld_json_next[domain] = rule.ld_json_next;
  if (rule.ld_google_webcache)
    ld_google_webcache[domain] = rule.ld_google_webcache;
  if (rule.ld_json || rule.ld_json_next || rule.ld_google_webcache || rule.cs_dompurify)
    if (!dompurify_sites.includes(domain))
      dompurify_sites.push(domain);
  if (rule.add_ext_link && rule.add_ext_link_type)
    add_ext_link[domain] = {css: rule.add_ext_link, type: rule.add_ext_link_type};

  // custom
  if (rule.googlebot > 0)
    use_google_bot.push(domain); // legacy
  if (rule.block_js > 0 || rule.block_javascript > 0)
    block_js_custom.push(domain);
  if (rule.block_js_ext > 0 || rule.block_javascript_ext > 0)
    block_js_custom_ext.push(domain);
}

function customFlexAddRules(custom_domain, rule) {
  addRules(custom_domain, rule);
  if (blockedRegexes[custom_domain])
    blockedRegexesDomains.push(custom_domain);
  if (blockedJsInline[custom_domain]) {
    blockedJsInlineDomains.push(custom_domain);
    disableJavascriptInline();
  }
  if (rule.useragent || rule.referer || rule.random_ip)
    change_headers.push(custom_domain);
  if (rule.random_ip)
    use_random_ip.push(custom_domain);
  ext_api.tabs.reload({bypassCache: true});
}

function set_rules(sites, sites_updated, sites_custom) {
  initSetRules();
  for (let site in sites) {
    let site_domain = sites[site].toLowerCase();
    let custom = false;
    if (!site_domain.match(/^(###$|#options_)/)) {
      let rule = {};
      let site_default = defaultSites.hasOwnProperty(site) ? site : Object.keys(defaultSites).find(default_key => compareKey(default_key, site));
      if (site_default) {
        rule = defaultSites[site_default];
        let site_updated = Object.keys(sites_updated).find(updated_key => compareKey(updated_key, site));
        if (site_updated && !(sites_updated[site_updated].new_site || (sites_updated[site_updated].upd_version && (sites_updated[site_updated].upd_version <= ext_version))))
          rule = sites_updated[site_updated];
      } else if (sites_updated.hasOwnProperty(site)) { // updated (new) sites
        rule = sites_updated[site];
      } else if (sites_custom.hasOwnProperty(site)) { // custom (new) sites
        rule = sites_custom[site];
        custom = true;
      } else
        continue;
      let domains = [site_domain];
      let group = false;
      if (rule.hasOwnProperty('group')) {
        domains = rule.group;
        group = true;
      }
      let rule_default = {};
      if (rule.hasOwnProperty('exception')) {
        for (let key in rule)
          rule_default[key] = rule[key];
      }
      for (let domain of domains) {
        let custom_in_group = false;
        if (rule_default.hasOwnProperty('exception')) {
          let exception_rule = rule_default.exception.filter(x => domain === x.domain || (typeof x.domain !== 'string' && x.domain.includes(domain)));
          if (exception_rule.length > 0)
            rule = exception_rule[0];
          else
            rule = rule_default;
        }
        // custom domain for default site(group)
        if (!custom) {
          let isCustomSite = matchDomain(customSites_domains, domain);
          let customSite_title = isCustomSite ? Object.keys(customSites).find(key => customSites[key].domain === isCustomSite) : '';
          if (customSite_title && !rule.add_ext_link) {
            // add default block_regex
            let block_regex_default = '';
            if (rule.hasOwnProperty('block_regex'))
              block_regex_default = rule.block_regex;
            rule = {};
            for (let key in sites_custom[customSite_title])
              rule[key] = sites_custom[customSite_title][key];
            if (block_regex_default) {
              if (rule.hasOwnProperty('block_regex')) {
                if (block_regex_default instanceof RegExp)
                  block_regex_default = block_regex_default.source;
                rule.block_regex = '(' + block_regex_default + '|' + prep_regex_str(rule.block_regex, domain) + ')';
              } else
                rule.block_regex = block_regex_default;
            }
            if (group)
              custom_in_group = true;
            else
              custom = true;
          }
        }
        addRules(domain, rule);
      }
    }
  }
  blockedRegexesDomains = Object.keys(blockedRegexes);
  blockedJsInlineDomains = Object.keys(blockedJsInline);
  disableJavascriptInline();
  use_random_ip = Object.keys(random_ip);
  change_headers = use_google_bot.concat(use_bing_bot, use_facebook_bot, use_facebook_referer, use_google_referer, use_twitter_referer, use_random_ip);
}

// add grouped sites to en/disabledSites (and exclude sites)
function add_grouped_enabled_domains(groups) {
  for (let key in groups) {
    if (enabledSites.includes(key))
      enabledSites = enabledSites.concat(groups[key]);
    else
      disabledSites = disabledSites.concat(groups[key]);
    for (let site of excludedSites) {
      if (enabledSites.includes(site)) {
        enabledSites.splice(enabledSites.indexOf(site), 1);
        disabledSites.push(site);
      }
    }
  }
}

// Get the enabled sites (from local storage) & set_rules for sites
ext_api.storage.local.get({
  sites: {},
  sites_default: Object.keys(defaultSites).filter(x => defaultSites[x].domain && !defaultSites[x].domain.match(/^(#options_|###$)/)),
  sites_custom: {},
  sites_updated: {},
  sites_excluded: [],
  ext_version_old: '2.3.9.0',
  optIn: false,
  optInUpdate: true
}, function (items) {
  var sites = items.sites;
  optionSites = sites;
  var sites_default = items.sites_default;
  customSites = items.sites_custom;
  customSites = filterObject(customSites, function (val, key) {
    return !(val.add_ext_link && (!val.add_ext_link_type || val.add_ext_link_type === 'google_search_tool'))
  });
  customSites_domains = Object.values(customSites).map(x => x.domain);
  updatedSites = items.sites_updated;
  updatedSites_domains_new = Object.values(updatedSites).filter(x => (x.domain && !defaultSites_domains.includes(x.domain) || x.group)).map(x => x.group ? x.group.filter(y => !defaultSites_domains.includes(y)) : x.domain).flat();
  var ext_version_old = items.ext_version_old;
  optin_setcookie = items.optIn;
  optin_update = items.optInUpdate;
  excludedSites = items.sites_excluded;

  enabledSites = Object.values(sites).filter(function (val) {
    return (val && val !== '###' && (defaultSites_domains.concat(customSites_domains, updatedSites_domains_new).includes(val)));
  }).map(function (val) {
    return val.toLowerCase();
  });

  // Enable new sites by default (opt-in)
  updatedSites_new = Object.keys(updatedSites).filter(x => updatedSites[x].domain && !defaultSites_domains.includes(updatedSites[x].domain) && updatedSites[x].domain !== '###_usa_theathletic');
  for (let site_updated_new of updatedSites_new)
    defaultSites[site_updated_new] = updatedSites[site_updated_new];
  if (ext_version > ext_version_old || updatedSites_new.length > 0) {
    if (enabledSites.includes('#options_enable_new_sites')) {
      let sites_new = Object.keys(defaultSites).filter(x => defaultSites[x].domain && !defaultSites[x].domain.match(/^(#options_|###$)/) && !sites_default.some(key => compareKey(key, x)));
      for (let site_new of sites_new)
        sites[site_new] = defaultSites[site_new].domain;
      // reset ungrouped sites
      let ungrouped_sites = {
        'The Athletic': 'theathletic.com',
        'The Toronto Star (+ local TorStar sites)': 'thestar.com'
      };
      for (let key in ungrouped_sites) {
        if (sites[key] && sites[key] !== ungrouped_sites[key])
          sites[key] = ungrouped_sites[key];
      }
      ext_api.storage.local.set({
        sites: sites
      });
    } else {
      ext_api.management.getSelf(function (result) {
        if ((result.installType === 'development' || (result.installType !== 'development' && !enabledSites.includes('#options_on_update')))) {
          let new_groups = ['###_ch_esh_medias', '###_nl_eu_ftm'];
          let open_options = new_groups.some(group => !enabledSites.includes(group) && grouped_sites[group].some(domain => enabledSites.includes(domain) && !customSites_domains.includes(domain)));
          if (open_options)
            ext_api.runtime.openOptionsPage();
        }
      });
    }
    sites_default = Object.keys(defaultSites).filter(x => defaultSites[x].domain && !defaultSites[x].domain.match(/^(#options_|###$)/));
    ext_api.storage.local.set({
      sites_default: sites_default,
      ext_version_old: ext_version
    });
  }

  disabledSites = defaultSites_grouped_domains.concat(customSites_domains).filter(x => !enabledSites.includes(x));
  add_grouped_enabled_domains(grouped_sites);
  set_rules(sites, updatedSites, customSites);
  if (enabledSites.includes('#options_optin_update_rules')) {
    check_sites_updated();
    sites_custom_ext_json = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean/-/raw/master/custom/sites_custom.json';
  } 
  check_sites_custom_ext();
  if (optin_update)
    check_update();
});

// Listen for changes to options
ext_api.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'sync')
    return;
  for (let key in changes) {
    var storageChange = changes[key];
    if (key === 'sites') {
      var sites = storageChange.newValue;
      optionSites = sites;
      enabledSites = Object.values(sites).filter(function (val) {
        return (val && val !== '###' && (defaultSites_domains.concat(customSites_domains, updatedSites_domains_new).includes(val)));
      }).map(function (val) {
        return val.toLowerCase();
      });
      disabledSites = defaultSites_grouped_domains.concat(customSites_domains).filter(x => !enabledSites.includes(x));
      add_grouped_enabled_domains(grouped_sites);
      set_rules(sites, updatedSites, customSites);
    }
    if (key === 'sites_custom') {
      var sites_custom = storageChange.newValue ? storageChange.newValue : {};
      var sites_custom_old = storageChange.oldValue ? storageChange.oldValue : {};
      customSites = sites_custom;
      customSites_domains = Object.values(sites_custom).map(x => x.domain);
      
      // add/remove custom sites in options (not for default site(group))
      var sites_custom_added = Object.keys(sites_custom).filter(x => !Object.keys(sites_custom_old).includes(x) && !defaultSites.hasOwnProperty(x) && !defaultSites_domains.includes(sites_custom[x].domain));
      var sites_custom_removed = Object.keys(sites_custom_old).filter(x => !Object.keys(sites_custom).includes(x) && !defaultSites.hasOwnProperty(x) && !defaultSites_domains.includes(sites_custom_old[x].domain));
      
      ext_api.storage.local.get({
        sites: {}
      }, function (items) {
        var sites = items.sites;
        if (sites_custom_added.concat(sites_custom_removed).length > 0) {
          for (let key of sites_custom_added)
            sites[key] = sites_custom[key].domain;
          for (let key of sites_custom_removed)
            delete sites[key];
          
          ext_api.storage.local.set({
            sites: sites
          }, function () {
            true;
          });
        } else
          set_rules(sites, updatedSites, customSites);
      });
    }
    if (key === 'sites_updated') {
      var sites_updated = storageChange.newValue ? storageChange.newValue : {};
      updatedSites = sites_updated;
      updatedSites_domains_new = Object.values(updatedSites).filter(x => (x.domain && !defaultSites_domains.includes(x.domain) || x.group)).map(x => x.group ? x.group.filter(y => !defaultSites_domains.includes(y)) : x.domain).flat();
      updatedSites_new = Object.keys(updatedSites).filter(x => updatedSites[x].domain && !defaultSites_domains.includes(updatedSites[x].domain) && updatedSites[x].domain !== '###_usa_theathletic');
      if (updatedSites_new.length > 0) {
        if (enabledSites.includes('#options_enable_new_sites')) {
          for (let site_updated_new of updatedSites_new)
            optionSites[site_updated_new] = updatedSites[site_updated_new].domain;
          ext_api.storage.local.set({
            sites: optionSites
          });
        }
      } else
        set_rules(optionSites, updatedSites, customSites);
    }
    if (key === 'sites_excluded') {
      var sites_excluded = storageChange.newValue ? storageChange.newValue : [];
      var sites_excluded_old = storageChange.oldValue ? storageChange.oldValue : [];
      excludedSites = sites_excluded;

      // add/remove excluded sites in en/disabledSites
      var sites_excluded_added = sites_excluded.filter(x => !sites_excluded_old.includes(x));
      var sites_excluded_removed = sites_excluded_old.filter(x => !sites_excluded.includes(x));

      for (let site of sites_excluded_added) {
        if (enabledSites.includes(site)) {
          enabledSites.splice(enabledSites.indexOf(site), 1);
          disabledSites.push(site);
        }
      }
      for (let site of sites_excluded_removed) {
        if (disabledSites.includes(site)) {
          disabledSites.splice(disabledSites.indexOf(site), 1);
          enabledSites.push(site);
        }
      }
    }
    if (key === 'ext_version_new') {
      ext_version_new = storageChange.newValue;
    }
    if (key === 'optIn') {
      optin_setcookie = storageChange.newValue;
    }
    if (key === 'optInUpdate') {
      optin_update = storageChange.newValue;
    }
  }
});

// Set and show default options on install
ext_api.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    setDefaultOptions();
  } else if (details.reason == "update") {
    ext_api.management.getSelf(function (result) {
      if (enabledSites.includes('#options_on_update') && result.installType !== 'development')
        ext_api.runtime.openOptionsPage(); // User updated extension (non-developer mode)
    });
  }
});

// Google AMP cache redirect
ext_api.webRequest.onBeforeRequest.addListener(function (details) {
  var url = details.url.split('?')[0];
  var updatedUrl;
  if (matchUrlDomain('cdn.ampproject.org', url))
    updatedUrl = 'https://' + url.split(/cdn\.ampproject\.org\/[a-z]\/s\//)[1];
  else if (matchUrlDomain('google.com', url))
    updatedUrl = 'https://' + url.split(/\.google\.com\/amp\/s\//)[1];
  return { redirectUrl: decodeURIComponent(updatedUrl) };
},
{urls:["*://*.cdn.ampproject.org/*/s/*", "*://*.google.com/amp/s/*"], types:["main_frame"]},
["blocking"]
);

// inkl bypass
ext_api.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details)) {
    return;
  }
  var updatedUrl = details.url.replace(/etok=[\w]*&/, '');
  if (details.url.includes('/signin?') && details.url.includes('redirect_to='))
    updatedUrl = 'https://www.inkl.com' + decodeURIComponent(updatedUrl.split('redirect_to=')[1]);
  return { redirectUrl: updatedUrl };
},
{urls:["*://*.inkl.com/*"], types:["main_frame"]},
["blocking"]
);

// m.faz.net set user-agent to mobile
const userAgentMobile = "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Mobile Safari/537.36";
ext_api.webRequest.onBeforeSendHeaders.addListener(function (details) {
  if (!isSiteEnabled(details)) {
    return;
  }
  let headers = details.requestHeaders;
  headers = headers.map(function (header) {
    if (header.name.toLowerCase() === 'user-agent')
      header.value = userAgentMobile;
    return header;
  });
  return {
    requestHeaders: headers
  };
}, {
  urls: ["*://m.faz.net/*"],
  types: ["xmlhttprequest"]
},
  ["blocking", "requestHeaders"]);

// webcache.googleusercontent.com set user-agent to Chrome (on Firefox for Android)
if ((typeof browser !== 'object') && navigator_ua_mobile) {
  ext_api.webRequest.onBeforeSendHeaders.addListener(function (details) {
    let headers = details.requestHeaders;
    headers = headers.map(function (header) {
      if (header.name.toLowerCase() === 'user-agent')
        header.value = userAgentMobile;
      return header;
    });
    return {
      requestHeaders: headers
    };
  }, {
    urls: ["*://webcache.googleusercontent.com/*"],
    types: ["main_frame", "xmlhttprequest"]
  },
    ["blocking", "requestHeaders"]);
}

// economictimes redirect
ext_api.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details) || details.url.includes('.com/epaper/')) {
    return;
  }
  var updatedUrl = details.url.split('?')[0].replace('economictimes.indiatimes.com', 'm.economictimes.com');
  return { redirectUrl: updatedUrl };
},
{urls:["*://economictimes.indiatimes.com/*?from=mdr"], types:["main_frame"]},
["blocking"]
);

// infzm.com redirect to wap (mobile)
ext_api.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details)) {
    return;
  }
  var updatedUrl = details.url.replace('.com/contents/', '.com/wap/#/content/');
  return { redirectUrl: updatedUrl };
},
{urls:["*://www.infzm.com/contents/*"], types:["main_frame"]},
["blocking"]
);

// telegraaf.nl redirect error-page
ext_api.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details)) {
    return;
  }
  let updatedUrl = details.url.split('&')[0].replace('error?ref=/', '');;
  return { redirectUrl: updatedUrl };
},
{urls:["*://www.telegraaf.nl/error?ref=/*"], types:["main_frame"]},
["blocking"]
);

// Australia News Corp redirect subscribe to amp
var au_news_corp_no_amp_fix = ['codesports.com.au'];
var au_news_corp_subscr = au_news_corp_domains.filter(domain => !au_news_corp_no_amp_fix.includes(domain)).map(domain => '*://www.' + domain + '/subscribe/*');
ext_api.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details) || details.url.includes('/digitalprinteditions') || !(details.url.includes('dest=') && details.url.split('dest=')[1].split('&')[0])) {
    return;
  }
  var updatedUrl = decodeURIComponent(details.url.split('dest=')[1].split('&')[0]) + '?amp';
  return {
    redirectUrl: updatedUrl
  };
}, {
  urls: au_news_corp_subscr,
  types: ["main_frame"]
},
  ["blocking"]);

// fix nytimes x-frame-options (hidden iframe content)
ext_api.webRequest.onHeadersReceived.addListener(function (details) {
  if (!isSiteEnabled(details)) {
    return;
  }
  var headers = details.responseHeaders;
  headers = headers.map(function (header) {
      if (header.name === 'x-frame-options')
        header.value = 'SAMEORIGIN';
      return header;
    });
  return {
    responseHeaders: headers
  };
}, {
  urls: ["*://*.nytimes.com/*"]
},
  ['blocking', 'responseHeaders']);

function blockJsInlineListener(details) {
  let domain = matchUrlDomain(blockedJsInlineDomains, details.url);
  let matched = domain && details.url.match(blockedJsInline[domain]);
  if (matched && optin_setcookie && ['uol.com.br'].includes(domain))
    matched = false;
  if (!isSiteEnabled(details) || !matched)
    return;
  var headers = details.responseHeaders;
  headers.push({
    'name': 'Content-Security-Policy',
    'value': "script-src *;"
  });
  return {
    responseHeaders: headers
  };
}

function disableJavascriptInline() {
  // block inline script
  ext_api.webRequest.onHeadersReceived.removeListener(blockJsInlineListener);
  var block_js_inline_urls = [];
  for (let domain in blockedJsInline)
    block_js_inline_urls.push("*://*." + domain + "/*");
  if (block_js_inline_urls.length)
    ext_api.webRequest.onHeadersReceived.addListener(blockJsInlineListener, {
      'types': ['main_frame', 'sub_frame'],
      'urls': block_js_inline_urls
    },
      ['blocking', 'responseHeaders']);
}

if (typeof browser !== 'object') {
  var focus_changed = false;
  ext_api.windows.onFocusChanged.addListener((windowId) => {
    if (windowId > 0)
      focus_changed = true;
  });
}

  function runOnTab(tab) {
    let tabId = tab.id;
    let url = tab.url;
    let rc_domain = matchUrlDomain(remove_cookies, url);
    let rc_domain_enabled = rc_domain && enabledSites.includes(rc_domain);
    let lib_file = 'lib/empty.js';
    if (matchUrlDomain(dompurify_sites, url))
      lib_file = 'lib/purify.min.js';
    var bg2csData = {};
    if (optin_setcookie && matchUrlDomain(['###'], url))
      bg2csData.optin_setcookie = 1;
    if (matchUrlDomain(amp_unhide, url))
      bg2csData.amp_unhide = 1;
    let amp_redirect_domain = '';
    if (amp_redirect_domain = matchUrlDomain(Object.keys(amp_redirect), url))
      bg2csData.amp_redirect = amp_redirect[amp_redirect_domain];
    let cs_code_domain = '';
    if (cs_code_domain = matchUrlDomain(Object.keys(cs_code), url))
      bg2csData.cs_code = cs_code[cs_code_domain];
    let ld_json_domain = '';
    if (ld_json_domain = matchUrlDomain(Object.keys(ld_json), url))
      bg2csData.ld_json = ld_json[ld_json_domain];
    let ld_json_next_domain = '';
    if (ld_json_next_domain = matchUrlDomain(Object.keys(ld_json_next), url))
      bg2csData.ld_json_next = ld_json_next[ld_json_next_domain];
    let ld_google_webcache_domain = '';
    if (ld_google_webcache_domain = matchUrlDomain(Object.keys(ld_google_webcache), url))
      bg2csData.ld_google_webcache = ld_google_webcache[ld_google_webcache_domain];
    let add_ext_link_domain = '';
    if (add_ext_link_domain = matchUrlDomain(Object.keys(add_ext_link), url))
      bg2csData.add_ext_link = add_ext_link[add_ext_link_domain];
    let tab_runs = 5;
    for (let n = 0; n < tab_runs; n++) {
      setTimeout(function () {
        // run contentScript.js on page
        ext_api.tabs.executeScript(tabId, {
          file: lib_file,
          runAt: 'document_start'
        }, function (res) {
          if (ext_api.runtime.lastError)
            return;
          ext_api.tabs.executeScript(tabId, {
            file: 'contentScript.js',
            runAt: 'document_start'
          }, function (res) {
            if (ext_api.runtime.lastError || res[0]) {
              return;
            }
          })
        });
        // send bg2csData to contentScript.js
        if (Object.keys(bg2csData).length) {
          setTimeout(function () {
            ext_api.tabs.sendMessage(tabId, {msg: "bg2cs", data: bg2csData});
          }, 500);
        }
        // remove cookies after page load
        if (rc_domain_enabled) {
          remove_cookies_fn(rc_domain, true);
        }
      }, n * 200);
    }
  }

  function runOnTab_once(tab) {
    let tabId = tab.id;
    let url = tab.url;
    // load contentScript_once.js to identify custom site (flex) of group
    if (!(matchUrlDomain(custom_flex_domains.concat(custom_flex_not_domains, customSites_domains, updatedSites_domains_new, excludedSites, nofix_sites), url) || matchUrlDomain(defaultSites_domains, url))) {
      ext_api.tabs.executeScript(tabId, {
        file: 'contentScript_once.js',
        runAt: 'document_start'
      }, function (res) {
        if (ext_api.runtime.lastError || res[0]) {
          return;
        }
      });
    }
    // load toggleIcon.js (icon for dark or incognito mode in Chrome))
    if (typeof browser !== 'object') {
      ext_api.tabs.executeScript(tabId, {
        file: 'options/toggleIcon.js',
        runAt: 'document_start'
      }, function (res) {
        if (ext_api.runtime.lastError || res[0]) {
          return;
        }
      });
    }
  }

  var set_var_sites =  ['nzherald.co.nz', 'theglobeandmail.com'].concat(de_madsack_domains);
  function runOnTab_once_var(tab) {
    let tabId = tab.id;
    let url = tab.url;
    let domain = matchUrlDomain(set_var_sites, url);
    // load contentScript_once_var.js to set variables for site
    if (domain && enabledSites.includes(domain)) {
      ext_api.tabs.executeScript(tabId, {
        file: 'contentScript_once_var.js',
        runAt: 'document_start'
      }, function (res) {
        if (ext_api.runtime.lastError || res[0]) {
          return;
        }
      });
    }
  }

ext_api.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  let tab_status = changeInfo.status;
  if (/^http/.test(tab.url)) {
    if ((tab_status && tab_status === 'complete') || (changeInfo.url)) {
      let timeout = changeInfo.url ? 500 : 0;
      setTimeout(function () {
        if (matchUrlDomain(enabledSites, tab.url)) {
          runOnTab(tab);
        }
        runOnTab_once(tab);
      }, timeout);
    }
    runOnTab_once_var(tab);
  }
});

setInterval(function () {
  let current_date_str = currentDateStr();
  if (last_date_str < current_date_str) {
    bpc_count_daily_users(current_date_str);
    last_date_str = current_date_str;
  }
}, 60 * 60 * 1000);

var extraInfoSpec = ['blocking', 'requestHeaders'];
if (ext_api.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS'))
  extraInfoSpec.push('extraHeaders');

ext_api.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var requestHeaders = details.requestHeaders;

  var header_referer = '';
  if (details.originUrl)
    header_referer = details.originUrl;
  else {
    for (let n in requestHeaders) {
      if (requestHeaders[n].name.toLowerCase() == 'referer') {
        header_referer = requestHeaders[n].value;
        break;
      }
    }
    var blocked_referer_domains = ['timeshighereducation.com'];
    if (!header_referer && details.initiator) {
      header_referer = details.initiator;
      if (!blocked_referer && matchUrlDomain(blocked_referer_domains, details.url) && ['script', 'xmlhttprequest'].includes(details.type)) {
        for (let domain of blocked_referer_domains)
          restrictions[domain] = new RegExp('((\\/|\\.)' + domain.replace(/\./g, '\\.') + '($|\\/$)|' + restrictions[domain].toString().replace(/(^\/|\/$)/g, '') + ')');
        blocked_referer = true;
      }
    }
  }

  // block external javascript for custom sites (optional)
  if (['script'].includes(details.type)) {
    let domain_blockjs_ext = matchUrlDomain(block_js_custom_ext, header_referer);
    if (domain_blockjs_ext && !matchUrlDomain(domain_blockjs_ext, details.url) && isSiteEnabled({url: header_referer}))
      return { cancel: true };
  }

  // check for blocked regular expression: domain enabled, match regex, block on an internal or external regex
  if (['script', 'xmlhttprequest'].includes(details.type)) {
    let domain = matchUrlDomain(blockedRegexesDomains, header_referer);
    if (domain && details.url.match(blockedRegexes[domain]) && isSiteEnabled({url: header_referer}))
      return { cancel: true };
  }

  // block general paywall scripts
  if (['script', 'xmlhttprequest'].includes(details.type)) {
    for (let domain in blockedRegexesGeneral) {
      if (details.url.match(blockedRegexesGeneral[domain].block_regex) && !(matchUrlDomain(excludedSites.concat(disabledSites, blockedRegexesGeneral[domain].excluded_domains), header_referer)))
        return { cancel: true };
    }
  }

  if (!isSiteEnabled(details)) {
    return;
  }

  // block javascript of (sub)domain for custom sites (optional)
  var domain_blockjs = matchUrlDomain(block_js_custom, details.url);
  if (domain_blockjs && matchUrlDomain(domain_blockjs, details.url) && details.type === 'script') {
    return { cancel: true };
  }

  var useUserAgentMobile = false;
  var setReferer = false;

var ignore_types = ['font', 'image', 'stylesheet'];
if (matchUrlDomain(au_news_corp_domains, details.url))
  ignore_types = ['font', 'image', 'stylesheet', 'other', 'script', 'xmlhttprequest'];

if (matchUrlDomain(change_headers, details.url) && !ignore_types.includes(details.type)) {
  var mobile = details.requestHeaders.filter(x => x.name.toLowerCase() === "user-agent" && x.value.toLowerCase().includes("mobile")).length;
  var googlebotEnabled = matchUrlDomain(use_google_bot, details.url) && 
    !(matchUrlDomain(es_grupo_vocento_domains, details.url) && mobile) &&
    !(matchUrlDomain('barrons.com', details.url) && enabledSites.includes('#options_disable_gb_barrons')) &&
    !(matchUrlDomain(['economictimes.com', 'economictimes.indiatimes.com'], details.url) && !details.url.split(/\?|#/)[0].endsWith('.cms')) &&
    !(matchUrlDomain(au_news_corp_domains, details.url) && (details.url.includes('?amp') || (!matchUrlDomain(au_news_corp_no_amp_fix, details.url) && enabledSites.includes('#options_disable_gb_au_news_corp')))) &&
    !(matchUrlDomain('uol.com.br', details.url) && !matchUrlDomain('folha.uol.com.br', details.url)) &&
    !(matchUrlDomain('wsj.com', details.url) && (enabledSites.includes('#options_disable_gb_wsj') || (!details.url.includes('/articles/') && details.type === 'main_frame' && mobile)));
  var bingbotEnabled = matchUrlDomain(use_bing_bot, details.url);
  var facebookbotEnabled = matchUrlDomain(use_facebook_bot, details.url);

  // if referer exists, set it
  requestHeaders = requestHeaders.map(function (requestHeader) {
    if (requestHeader.name === 'Referer') {
      if (googlebotEnabled || matchUrlDomain(use_google_referer, details.url)) {
        requestHeader.value = 'https://www.google.com/';
      } else if (matchUrlDomain(use_facebook_referer, details.url)) {
        requestHeader.value = 'https://www.facebook.com/';
      } else if (matchUrlDomain(use_twitter_referer, details.url)) {
        requestHeader.value = 'https://t.co/';
      }
      setReferer = true;
    }
    if (requestHeader.name === 'User-Agent') {
      useUserAgentMobile = requestHeader.value.toLowerCase().includes("mobile") && !matchUrlDomain(['telerama.fr'], details.url);
    }
    return requestHeader;
  });

  // otherwise add it
  if (!setReferer) {
    if (googlebotEnabled || matchUrlDomain(use_google_referer, details.url)) {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://www.google.com/'
      });
    } else if (matchUrlDomain(use_facebook_referer, details.url)) {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://www.facebook.com/'
      });
    } else if (matchUrlDomain(use_twitter_referer, details.url)) {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://t.co/'
      });
    }
  }

  // override User-Agent to use Googlebot
  if (googlebotEnabled) {
    requestHeaders.push({
      "name": "User-Agent",
      "value": useUserAgentMobile ? userAgentMobileG : userAgentDesktopG
    })
    requestHeaders.push({
      "name": "X-Forwarded-For",
      "value": "66.249.66.1"
    })
  }

  // override User-Agent to use Bingbot
  if (bingbotEnabled) {
    requestHeaders.push({
      "name": "User-Agent",
      "value": useUserAgentMobile ? userAgentMobileB : userAgentDesktopB
    })
  }

  // override User-Agent to use Facebookbot
  if (facebookbotEnabled) {
    requestHeaders.push({
      "name": "User-Agent",
      "value": userAgentDesktopF
    })
  }

  // random IP for sites in use_random_ip
  let domain_random;
  if (domain_random = matchUrlDomain(use_random_ip, details.url)) {
    let randomIP_val;
    if (random_ip[domain_random] === 'eu')
      randomIP_val = randomIP(185, 185);
    else
      randomIP_val = randomIP();
    requestHeaders.push({
      "name": "X-Forwarded-For",
      "value": randomIP_val
    })
  }
}

  // remove cookies before page load
  if (!matchUrlDomain(allow_cookies, details.url)) {
    requestHeaders = requestHeaders.map(function(requestHeader) {
      if (requestHeader.name === 'Cookie') {
        requestHeader.value = '';
      }
      return requestHeader;
    });
  }

  if (kiwi_browser) {
    let tabId = details.tabId;
    if (tabId !== -1) {
      if (['main_frame', 'sub_frame', 'xmlhttprequest'].includes(details.type)) {
        ext_api.tabs.get(tabId, function (tab) {
          if (!ext_api.runtime.lastError && tab && isSiteEnabled(tab)) {
            runOnTab(tab);
          }
          runOnTab_once(tab);
          runOnTab_once_var(tab);
        });
      }
    } else {
      if (['xmlhttprequest'].includes(details.type)) {
        ext_api.tabs.query({
          active: true,
          currentWindow: true
        }, function (tabs) {
          if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
            let tab = tabs[0];
            if (isSiteEnabled(tab)) {
              runOnTab(tab);
            }
            runOnTab_once(tab);
            runOnTab_once_var(tab);
          }
        });
      }
    }
  }

  return { requestHeaders: requestHeaders };
}, {
  urls: ['*://*/*']
}, extraInfoSpec);
// extraInfoSpec is ['blocking', 'requestHeaders'] + possible 'extraHeaders'

function check_sites_custom_ext() {
  fetch(sites_custom_ext_json)
  .then(response => {
    if (response.ok) {
      response.json().then(json => {
        customSitesExt = Object.values(json).map(x => x.domain);
      })
    }
  }).catch(function (err) {
    false;
  });
}

var customSitesExt = [];
var sites_custom_ext_json = 'custom/sites_custom.json';

ext_api.tabs.onUpdated.addListener(function (tabId, info, tab) { updateBadge(tab); });
ext_api.tabs.onActivated.addListener(function (activeInfo) { if (activeInfo.tabId) ext_api.tabs.get(activeInfo.tabId, updateBadge); });

function updateBadge(activeTab) {
  if (ext_api.runtime.lastError || !activeTab || (activeTab.url && activeTab.url.split('?')[0].includes('/archive.')))
    return;
  let badgeText = '';
  let color = 'red';
  let currentUrl = activeTab.url;
  if (currentUrl) {
    if (isSiteEnabled({url: currentUrl})) {
      badgeText = 'ON';
      color = 'red';
    } else if (matchUrlDomain(enabledSites, currentUrl)) {
      badgeText = 'ON-';
      color = 'orange';
    } else if (matchUrlDomain(disabledSites, currentUrl)) {
      badgeText = 'OFF';
      color = 'blue';
    } else if (matchUrlDomain(nofix_sites, currentUrl)) {
      badgeText = 'X';
      color = 'silver';
    }
    if (ext_version_new)
      badgeText = '^' + badgeText;
    let isDefaultSite = matchUrlDomain(defaultSites_domains, currentUrl);
    let isCustomSite = matchUrlDomain(customSites_domains, currentUrl);
    let isUpdatedSite = matchUrlDomain(updatedSites_domains_new, currentUrl);
    if (!isDefaultSite && (isCustomSite || isUpdatedSite)) {
      ext_api.permissions.contains({
        origins: ['*://*.' + (isCustomSite || isUpdatedSite) + '/*']
      }, function (result) {
        if (!result)
          badgeText = enabledSites.includes(isCustomSite || isUpdatedSite) ? 'C' : '';
        if (color && badgeText)
          ext_api.action.setBadgeBackgroundColor({color: color});
        ext_api.action.setBadgeText({text: badgeText});
      });
    } else {
      if (!badgeText && matchUrlDomain(customSitesExt, currentUrl))
        badgeText = '+C';
      if (color && badgeText)
        ext_api.action.setBadgeBackgroundColor({color: color});
      ext_api.action.setBadgeText({text: badgeText});
    }
  } else
      ext_api.action.setBadgeText({text: badgeText});
}

var ext_version_new;
function check_update() {
  let manifest_new = 'https://gitlab.com/magnolia1234/bypass-paywalls-' + url_loc + '-clean/raw/master/manifest.json';
  fetch(manifest_new)
  .then(response => {
    if (response.ok) {
      response.json().then(json => {
        ext_api.management.getSelf(function (result) {
          var installType = result.installType;
          var ext_version_len = (installType === 'development') ? 7 : 5;
          ext_version_new = json['version'];
          if (ext_version_new.substring(0, ext_version_len) <= ext_version.substring(0, ext_version_len))
            ext_version_new = '';
          ext_api.storage.local.set({
            ext_version_new: ext_version_new
          });
        });
      })
    }
  }).catch(function (err) {
    false;
  });
}

function site_switch() {
  ext_api.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
      let currentUrl = tabs[0].url;
      let isDefaultSite = matchUrlDomain(defaultSites_grouped_domains, currentUrl);
      if (!isDefaultSite) {
        let isDefaultSiteGroup = matchUrlDomain(defaultSites_domains, currentUrl);
        if (isDefaultSiteGroup)
          isDefaultSite = Object.keys(grouped_sites).find(key => grouped_sites[key].includes(isDefaultSiteGroup));
      }
      if (!isDefaultSite) {
        let sites_updated_domains_new = Object.values(updatedSites).filter(x => x.domain && !defaultSites_domains.includes(x.domain));
        let isUpdatedSite = matchUrlDomain(sites_updated_domains_new, currentUrl);
        if (isUpdatedSite)
          isDefaultSite = isUpdatedSite;
      }
      let defaultSite_title = isDefaultSite ? Object.keys(defaultSites).find(key => defaultSites[key].domain === isDefaultSite) : '';
      let isCustomSite = matchUrlDomain(Object.values(customSites_domains), currentUrl);
      let customSite_title = isCustomSite ? Object.keys(customSites).find(key => customSites[key].domain === isCustomSite) : '';
      let site_title = defaultSite_title || customSite_title;
      let domain = isDefaultSite || isCustomSite;
      if (domain && site_title) {
        let added_site = [];
        let removed_site = [];
        if (enabledSites.includes(domain))
          removed_site.push(site_title);
        else
          added_site.push(site_title);
        ext_api.storage.local.get({
          sites: {}
        }, function (items) {
          var sites = items.sites;
          for (let key of added_site)
            sites[key] = domain;
          for (let key of removed_site) {
            key = Object.keys(sites).find(sites_key => compareKey(sites_key, key));
            delete sites[key];
          }
          ext_api.storage.local.set({
            sites: sites
          }, function () {
            ext_api.tabs.reload({bypassCache: true});
          });
        });
      }
    }
  });
}

function remove_cookies_fn(domainVar, exclusions = false) {
  ext_api.cookies.getAllCookieStores(function (cookieStores) {
    ext_api.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (!ext_api.runtime.lastError && tabs && tabs[0] && /^http/.test(tabs[0].url)) {
        let tabId = tabs[0].id;
        let storeId = '0';
        for (let store of cookieStores) {
          if (store.tabIds.includes(tabId))
            storeId = store.id;
        }
        storeId = storeId.toString();
        if (domainVar === 'asia.nikkei.com')
          domainVar = 'nikkei.com';
        var cookie_get_options = {
          domain: domainVar
        };
        if (storeId !== 'null')
          cookie_get_options.storeId = storeId;
        var cookie_remove_options = {};
        ext_api.cookies.getAll(cookie_get_options, function (cookies) {
          for (let cookie of cookies) {
            if (exclusions) {
              var rc_domain = cookie.domain.replace(/^(\.?www\.|\.)/, '');
              // hold specific cookie(s) from remove_cookies domains
              if ((rc_domain in remove_cookies_select_hold) && remove_cookies_select_hold[rc_domain].includes(cookie.name)) {
                continue; // don't remove specific cookie
              }
              // drop only specific cookie(s) from remove_cookies domains
              if ((rc_domain in remove_cookies_select_drop) && !(remove_cookies_select_drop[rc_domain].includes(cookie.name))) {
                continue; // only remove specific cookie
              }
              // hold on to consent-cookie
              if (cookie.name.match(/(consent|^optanon)/i)) {
                continue;
              }
            }
            cookie.domain = cookie.domain.replace(/^\./, '');
            cookie_remove_options = {
              url: (cookie.secure ? "https://" : "http://") + cookie.domain + cookie.path,
              name: cookie.name
            };
            if (storeId !== 'null')
              cookie_remove_options.storeId = storeId;
            ext_api.cookies.remove(cookie_remove_options);
          }
        });
      }
    });
  })
}

function clear_cookies() {
  ext_api.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
      ext_api.tabs.executeScript({
        file: 'options/clearCookies.js',
        runAt: 'document_start'
      }, function (res) {
        if (ext_api.runtime.lastError || res[0]) {
          return;
        }
      });
      ext_api.tabs.update(tabs[0].id, {
        url: tabs[0].url
      });
    }
  });
}

var chrome_scheme = 'light';
ext_api.runtime.onMessage.addListener(function (message, sender) {
  if (message.request === 'clear_cookies') {
    clear_cookies();
  }
  // clear cookies for domain
  if (message.request === 'clear_cookies_domain' && message.data) {
    remove_cookies_fn(message.data.domain);
  }
  if (message.request === 'custom_domain' && message.data && message.data.domain) {
    let custom_domain = message.data.domain;
    let group = message.data.group;
    if (group) {
      let nofix_groups = ['###_be_mediahuis', '###_ch_tamedia', '###_de_rp_aachen_medien', '###_fi_alma_talent', '###_it_citynews', '###_nl_vmnmedia', '###_substack_custom'];
      if (!custom_flex_domains.includes(custom_domain)) {
        if (enabledSites.includes(group)) {
          let rules = Object.values(defaultSites).filter(x => x.domain === group)[0];
          if (rules) {
            if (group === '###_de_madsack') {
              if (!set_var_sites.includes(custom_domain))
                set_var_sites.push(custom_domain);
            } else if (group === '###_usa_townnews') {
              if (!dompurify_sites.includes(custom_domain))
                dompurify_sites.push(custom_domain);
            }
          } else
            rules = Object.values(customSites).filter(x => x.domain === group)[0];
          if (rules) {
            custom_flex_domains.push(custom_domain);
            if (!enabledSites.includes(custom_domain))
              enabledSites.push(custom_domain);
            customFlexAddRules(custom_domain, rules);
          }
        } else if (disabledSites.includes(group))
          custom_flex_not_domains.push(custom_domain);
        else if (nofix_groups.includes(group))
          nofix_sites.push(custom_domain);
    }
  } else
    custom_flex_not_domains.push(custom_domain);
  }
  if (message.request === 'site_switch') {
    site_switch();
  }
  if (message.request === 'check_sites_updated') {
    check_sites_updated();
  }
  if (message.request === 'popup_show_toggle') {
    ext_api.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
        let currentUrl = tabs[0].url;
        let domain;
        let isExcludedSite = matchUrlDomain(excludedSites, currentUrl);
        if (!isExcludedSite) {
          let isDefaultSite = matchUrlDomain(defaultSites_domains, currentUrl);
          let isCustomSite = matchUrlDomain(Object.values(customSites_domains), currentUrl);
          domain = isDefaultSite || isCustomSite;
          if (domain)
            ext_api.runtime.sendMessage({
              msg: "popup_show_toggle",
              data: {
                domain: domain,
                enabled: enabledSites.includes(domain)
              }
            });
        }
      }
    });
  }
  if (message.request === 'refreshCurrentTab') {
    ext_api.tabs.reload({bypassCache: true});
  }
  if (message.request === 'getExtSrc' && message.data) {
    fetch(message.data.url)
    .then(response => {
      if (response.ok) {
        response.text().then(html => {
          if (message.data.base64) {
            html = decode_utf8(atob(html));
            message.data.selector_source = 'body';
          }
          message.data.html = html;
          if (typeof DOMParser === 'function') {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, 'text/html');
            let article_new = doc.querySelector(message.data.selector_source);
            if (article_new)
              message.data.html = article_new.outerHTML;
          }
          ext_api.tabs.query({
            active: true,
            currentWindow: true
          }, function (tabs) {
            if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
              ext_api.tabs.sendMessage(sender.tab.id, {msg: "showExtSrc", data: message.data});
            }
          });
        });
      }
    }).catch(function (err) {
      message.data.html = '';
      ext_api.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
          ext_api.tabs.sendMessage(sender.tab.id, {msg: "showExtSrc", data: message.data});
        }
      });
    });
  }
  if (message.scheme && (![chrome_scheme, 'undefined'].includes(message.scheme) || focus_changed)) {
      let icon_path = {path: {'128': 'bypass.png'}};
      if (message.scheme === 'dark')
          icon_path = {path: {'128': 'bypass-dark.png'}};
      ext_api.action.setIcon(icon_path);
      chrome_scheme = message.scheme;
      focus_changed = false;
  }
});

// show the opt-in tab on installation
ext_api.storage.local.get(["optInShown", "customShown"], function (result) {
  if (!result.optInShown || !result.customShown) {
    ext_api.tabs.create({
      url: "options/optin/opt-in.html"
    });
    ext_api.storage.local.set({
      "optInShown": true,
      "customShown": true
    });
  }
});

function filterObject(obj, filterFn, mapFn = function (val, key) {
  return [key, val];
}) {
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => filterFn(val, key)).map(([key, val]) => mapFn(val, key)));
}

function compareKey(firstStr, secondStr) {
  return firstStr.toLowerCase().replace(/\s\(.*\)/, '') === secondStr.toLowerCase().replace(/\s\(.*\)/, '');
}

function isSiteEnabled(details) {
  var enabledSite = matchUrlDomain(enabledSites, details.url);
  if (!ext_name.startsWith('Bypass Paywalls Clean'))
    enabledSite = '';
  if (enabledSite in restrictions) {
    return restrictions[enabledSite].test(details.url);
  }
  return !!enabledSite;
}

function matchDomain(domains, hostname = '') {
  var matched_domain = false;
  if (typeof domains === 'string')
    domains = [domains];
  domains.some(domain => (hostname === domain || hostname.endsWith('.' + domain)) && (matched_domain = domain));
  return matched_domain;
}

function urlHost(url) {
  if (/^http/.test(url)) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      console.log(`url not valid: ${url} error: ${e}`);
    }
  }
  return url;
}

function matchUrlDomain(domains, url) {
  return matchDomain(domains, urlHost(url));
}

function prepHostname(hostname) {
  return hostname.replace(/^(www|m|account|amp(\d)?|edition|eu|mobil|wap)\./, '');
}

function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function stripQueryStringAndHashFromPath(url) {
  return url.split("?")[0].split("#")[0];
}

function decode_utf8(str) {
  return decodeURIComponent(escape(str));
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomIP(range_low = 0, range_high = 223) {
  let rndmIP = [];
  for (let n = 0; n < 4; n++) {
    if (n === 0)
      rndmIP.push(range_low + randomInt(range_high - range_low + 1));
    else
      rndmIP.push(randomInt(255) + 1);
  }
  return rndmIP.join('.');
}

// Refresh the current tab (http)
function refreshCurrentTab() {
  ext_api.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs && tabs[0] && /^http/.test(tabs[0].url)) {
      if (ext_api.runtime.lastError)
        return;
      ext_api.tabs.update(tabs[0].id, {
        url: tabs[0].url
      });
    }
  });
}
